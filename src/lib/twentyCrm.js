/**
 * Twenty CRM Integration for LargerUp Onboarding
 * Instance: https://demgrow.chad-crm.demgrow.online
 */

const TWENTY_BASE_URL = 'https://demgrow.chad-crm.demgrow.online';
const TWENTY_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TWENTY_API_KEY) ||
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRjYjhhOTRlLTk0MTMtNDZmMC1hZjUzLWU2YzA4YTJlODJmZSJ9.eyJzdWIiOiIzY2Y2OWY5Ny0yOTNkLTQ2NWMtOTk4Ni04M2U1MGNkMTQ1OTgiLCJ0eXBlIjoiQVBJX0tFWSIsIndvcmtzcGFjZUlkIjoiM2NmNjlmOTctMjkzZC00NjVjLTk5ODYtODNlNTBjZDE0NTk4IiwiaWF0IjoxNzk1MTAxNTkzLCJleHAiOjQ5NDg3MDE1ODksImp0aSI6ImM2ZjZmYWFiLWZkNDYtNDVjNC1hMDQ3LTIxNzYxODFjMzYzNiJ9.-AY7eYZJqmPj8AIaXYjQkkBOf36MkNtbA9aR48MvZxacSDK3meemtY7qRCk9qTM4-11YRc-injPtvIJ8SSjoHg';

/**
 * Creates or links a Person and creates an Opportunity with stage "NEW_LEAD" in Twenty CRM.
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
        city: city ? city.toUpperCase() : undefined,
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

    // 2. If Person already existed (duplicate constraint), search and find existing Person ID
    if (!personId && (cleanPhone || email)) {
      try {
        const queryTerm = cleanPhone || email;
        const searchRes = await fetch(
          `${TWENTY_BASE_URL}/rest/people?search=${encodeURIComponent(queryTerm)}&limit=1`,
          {
            headers: { Authorization: `Bearer ${TWENTY_API_KEY}` },
          }
        );
        const searchData = await searchRes.json();
        personId = searchData?.data?.people?.[0]?.id || null;
      } catch (err) {
        console.warn('[Twenty CRM] Person search notice:', err);
      }
    }

    // 3. Create Opportunity in NEW_LEAD stage
    const opportunityName = `${name || 'New Lead'} — ${studioName || 'Interior Studio'}`;
    const opportunityPayload = {
      name: opportunityName,
      stage: 'NEW_LEAD',
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

    console.log('[Twenty CRM] Lead created in NEW_LEAD stage:', {
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
 * Updates an Opportunity stage to "MEETING_BOOKED" when user confirms a Cal.com slot.
 */
export async function updateTwentyLeadToMeetingBooked(
  opportunityId,
  { bookingSlot = '', startTime = null } = {}
) {
  if (!opportunityId) {
    console.warn('[Twenty CRM] No opportunityId provided to update stage.');
    return null;
  }

  try {
    const patchPayload = {
      stage: 'MEETING_BOOKED',
      meetingBookedAt: startTime || new Date().toISOString(),
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
    console.log('[Twenty CRM] Updated stage to MEETING_BOOKED:', data);
    return data;
  } catch (err) {
    console.warn('[Twenty CRM] Error updating opportunity stage:', err);
    return null;
  }
}
