/**
 * Twenty CRM Integration for LargerUp Onboarding
 * Instance: https://demgrow.chad-crm.demgrow.online
 */

const TWENTY_BASE_URL = 'https://demgrow.chad-crm.demgrow.online';
const TWENTY_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TWENTY_API_KEY) ||
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRjYjhhOTRlLTk0MTMtNDZmMC1hZjUzLWU2YzA4YTJlODJmZSJ9.eyJzdWIiOiIzY2Y2OWY5Ny0yOTNkLTQ2NWMtOTk4Ni04M2U1MGNkMTQ1OTgiLCJ0eXBlIjoiQVBJX0tFWSIsIndvcmtzcGFjZUlkIjoiM2NmNjlmOTctMjkzZC00NjVjLTk5ODYtODNlNTBjZDE0NTk4IiwiaWF0IjoxNzk1MTAxNTkzLCJleHAiOjQ5NDg3MDE1ODksImp0aSI6ImM2ZjZmYWFiLWZkNDYtNDVjNC1hMDQ3LTIxNzYxODFjMzYzNiJ9.-AY7eYZJqmPj8AIaXYjQkkBOf36MkNtbA9aR48MvZxacSDK3meemtY7qRCk9qTM4-11YRc-injPtvIJ8SSjoHg';

/**
 * Creates or links a Person and creates an Opportunity with:
 * - leadStatus: "NEW_LEAD" (for the "Lead life" pipeline view)
 * - Stage is untouched to preserve the separate "Lead Pipeline"
 * Non-blocking, returns { personId, opportunityId } or null.
 */
export async function createTwentyLead({
  name = '',
  email = '',
  phone = '',
  rawPhone = '',
  city = '',
  studioName = '',
  role = '',
}) {
  try {
    const parts = (name || '').trim().split(' ');
    const firstName = parts[0] || 'Interior';
    const lastName = parts.slice(1).join(' ') || (studioName || 'Professional');
    const cleanPhone = (rawPhone || phone || '').replace(/[^0-9]/g, '').slice(-10);

    let personId = null;

    // 1. Attempt to create Person
    try {
      const isKolkata = (city || '').trim().toUpperCase() === 'KOLKATA';
      const personPayload = {
        name: {
          firstName,
          lastName,
        },
        emails: email
          ? {
              primaryEmail: email.trim().toLowerCase(),
            }
          : undefined,
        phones: cleanPhone
          ? {
              primaryPhoneNumber: cleanPhone,
              primaryPhoneCountryCode: 'IN',
              primaryPhoneCallingCode: '+91',
            }
          : undefined,
        // In Twenty CRM, city1 is a free-form string for all cities (Mumbai, Delhi, etc.)
        // while city is a strict enum that only accepts 'KOLKATA'.
        city1: city || '',
        city: isKolkata ? 'KOLKATA' : undefined,
        jobTitle: `${role || 'Interior Professional'} — ${studioName || 'Studio'}`,
      };

      const personRes = await fetch(`${TWENTY_BASE_URL}/rest/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TWENTY_API_KEY}`,
        },
        body: JSON.stringify(personPayload),
      });

      const personData = await personRes.json();
      personId = personData?.data?.createPerson?.id;
    } catch (e) {
      console.warn('[Twenty CRM] Person creation notice:', e);
    }

    // 2. If Person already existed (duplicate constraint), find existing Person ID
    // CRITICAL: Filter candidates strictly by phone or email. NEVER grab people[0] blindly!
    if (!personId && (cleanPhone || email)) {
      try {
        const queryTerm = cleanPhone || email;
        const searchRes = await fetch(
          `${TWENTY_BASE_URL}/rest/people?search=${encodeURIComponent(queryTerm)}&limit=10`,
          {
            headers: { Authorization: `Bearer ${TWENTY_API_KEY}` },
          }
        );
        const searchData = await searchRes.json();
        const candidatePeople = searchData?.data?.people || [];
        const matched = candidatePeople.find((p) => {
          const pEmail = (p.emails?.primaryEmail || '').trim().toLowerCase();
          const pPhone = (p.phones?.primaryPhoneNumber || '').replace(/[^0-9]/g, '').slice(-10);
          return (
            (email && pEmail === email.trim().toLowerCase()) ||
            (cleanPhone && pPhone === cleanPhone)
          );
        });
        if (matched) {
          personId = matched.id;
        }
      } catch (err) {
        console.warn('[Twenty CRM] Person search notice:', err);
      }
    }

    // 3. Create Opportunity in leadStatus: "NEW_LEAD" for the "Lead life" pipeline
    // NOTE: stage is strictly omitted so it does not interfere with the old "Lead Pipeline"
    const opportunityName = `${name || 'New Lead'} — ${studioName || 'Interior Studio'}`;
    const opportunityPayload = {
      name: opportunityName,
      leadStatus: 'NEW_LEAD',
      pointOfContactId: personId || null,
    };

    const oppRes = await fetch(`${TWENTY_BASE_URL}/rest/opportunities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TWENTY_API_KEY}`,
      },
      body: JSON.stringify(opportunityPayload),
    });

    const oppData = await oppRes.json();
    const opportunityId = oppData?.data?.createOpportunity?.id;

    console.log('[Twenty CRM] Lead created with leadStatus NEW_LEAD (Lead life):', {
      personId,
      opportunityId,
    });

    return { personId, opportunityId };
  } catch (err) {
    console.warn('[Twenty CRM] Error in background lead dispatch:', err);
    return null;
  }
}

/**
 * Updates an Opportunity leadStatus to "MEETING_BOOKED" in "Lead life" pipeline,
 * populates the "Meeting Booked Date & Time" (meetingBookedAt) field,
 * and creates a Note containing the Google Meet link attached to the opportunity.
 * Stage is kept untouched.
 */
export async function updateTwentyLeadToMeetingBooked(
  opportunityId,
  { bookingSlot = '', startTime = null, meetingUrl = '' } = {}
) {
  if (!opportunityId) {
    console.warn('[Twenty CRM] No opportunityId provided to update stage.');
    return null;
  }

  try {
    const bookedIsoTime = startTime || new Date().toISOString();

    // 1. Update Opportunity: leadStatus and meetingBookedAt (Do NOT touch stage!)
    const patchPayload = {
      leadStatus: 'MEETING_BOOKED',
      meetingBookedAt: bookedIsoTime,
    };

    const res = await fetch(`${TWENTY_BASE_URL}/rest/opportunities/${opportunityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TWENTY_API_KEY}`,
      },
      body: JSON.stringify(patchPayload),
    });

    const data = await res.json();
    console.log('[Twenty CRM] Updated opportunity to MEETING_BOOKED with meetingBookedAt:', data);

    // 2. Create Note with meeting link and details
    const meetLink = meetingUrl || 'https://meet.google.com/demgrow-meet';
    const noteText = `15-Min Strategy Walkthrough confirmed for ${bookingSlot || bookedIsoTime}.\nGoogle Meet Link: ${meetLink}`;

    try {
      const noteRes = await fetch(`${TWENTY_BASE_URL}/rest/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TWENTY_API_KEY}`,
        },
        body: JSON.stringify({
          title: 'Scheduled Call & Meet Link',
          bodyV2: {
            blocknote: JSON.stringify([
              {
                type: 'paragraph',
                content: [{ type: 'text', text: noteText }],
              },
            ]),
            markdown: noteText,
          },
        }),
      });

      const noteData = await noteRes.json();
      const noteId = noteData?.data?.createNote?.id;

      if (noteId) {
        // 3. Attach Note to this Opportunity
        await fetch(`${TWENTY_BASE_URL}/rest/noteTargets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TWENTY_API_KEY}`,
          },
          body: JSON.stringify({
            noteId,
            targetOpportunityId: opportunityId,
          }),
        });
        console.log('[Twenty CRM] Note with meeting link attached to Opportunity:', noteId);
      }
    } catch (noteErr) {
      console.warn('[Twenty CRM] Note attachment notice:', noteErr);
    }

    return data;
  } catch (err) {
    console.warn('[Twenty CRM] Error updating opportunity stage & note:', err);
    return null;
  }
}
