/**
 * Meta Pixel & Conversions API (CAPI) Tracking Client
 * Dataset / Pixel ID: 2524151041412632
 *
 * Implements Meta standard dual-channel tracking with:
 * 1. Browser Meta Pixel (window.fbq)
 * 2. Server-side Meta Conversions API (via /api/meta-capi serverless route)
 * 3. Event Deduplication via matching `event_id`
 * 4. Automatic Advanced Matching (em, ph, fn, ct, fbp, fbc)
 */

export const META_PIXEL_ID = '2524151041412632';

/**
 * Retrieve cookie value by name
 */
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Extract Facebook click ID (fbclid) from current URL if present
 */
function getFbc() {
  const cookieFbc = getCookie('_fbc');
  if (cookieFbc) return cookieFbc;

  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    if (fbclid) {
      // Format: fb.1.{creation_time}.{fbclid}
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  }
  return null;
}

/**
 * Generate unique event_id for client/server deduplication
 */
export function generateEventId(prefix = 'evt') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Safe wrapper to execute window.fbq calls
 */
export function fbq(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq(...args);
    } catch (err) {
      console.warn('[Meta Pixel] Call error:', err);
    }
  }
}

/**
 * Non-blocking dispatcher to server-side Conversions API
 */
async function dispatchToCapi(eventPayload) {
  try {
    const fbp = getCookie('_fbp');
    const fbc = getFbc();

    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...eventPayload,
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        eventSourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://interior-signup.largerup.com',
      }),
    });
  } catch (err) {
    // Non-blocking background log
    console.warn('[Meta CAPI Client] Dispatch notice:', err);
  }
}

/**
 * Standard PageView event
 */
export function trackPageView() {
  fbq('track', 'PageView');
}

/**
 * Standard ViewContent event (Fired when landing page is viewed)
 */
export function trackViewContent(details = {}) {
  const eventId = generateEventId('vc');

  // 1. Browser Pixel
  fbq('track', 'ViewContent', {
    content_name: 'Interior Studio Website Initiative',
    content_category: 'Interior Studio',
    currency: 'INR',
    value: 0,
    ...details,
  }, { eventID: eventId });

  // 2. Server CAPI
  dispatchToCapi({
    eventName: 'ViewContent',
    eventId,
    ...details,
  });
}

/**
 * Track step progression in onboarding funnel (Custom FunnelStep)
 */
export function trackStepView(stepNumber, stepName = '') {
  fbq('trackCustom', 'FunnelStep', {
    step: stepNumber,
    step_name: stepName || `Step_${stepNumber}`,
  });
}

/**
 * Standard Lead Event (Fired when user completes contact info - Name, Phone, Email, Studio)
 * Deduplicated across Browser Pixel and Server Conversions API
 */
export function trackLeadEvent(leadData = {}) {
  const eventId = generateEventId('lead');

  // 1. Advanced Matching on Browser Pixel
  if (leadData.email || leadData.phone) {
    const cleanPhone = (leadData.phone || '').replace(/[^0-9]/g, '');
    fbq('init', META_PIXEL_ID, {
      em: (leadData.email || '').trim().toLowerCase(),
      ph: cleanPhone ? (cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone.slice(-10)) : undefined,
      fn: (leadData.name || '').trim().split(' ')[0]?.toLowerCase(),
      ct: (leadData.city || '').trim().toLowerCase(),
    });
  }

  // 2. Fire Standard 'Lead' on Browser Pixel with eventID
  fbq('track', 'Lead', {
    content_name: 'Studio Website Application',
    content_category: leadData.role || 'Interior Studio',
    city: leadData.city || 'Kolkata',
    studio_name: leadData.studioName || '',
    value: 0,
    currency: 'INR',
  }, { eventID: eventId });

  // 3. Custom event for immediate ad conversion reporting
  fbq('trackCustom', 'ApplicationSubmitted', {
    name: leadData.name || '',
    studio_name: leadData.studioName || '',
    city: leadData.city || '',
  });

  // 4. Server-Side Conversions API (CAPI) with matching eventId
  dispatchToCapi({
    eventName: 'Lead',
    eventId,
    email: leadData.email,
    phone: leadData.phone,
    name: leadData.name,
    city: leadData.city,
    studioName: leadData.studioName,
    role: leadData.role,
  });

  console.log('[Meta Tracking] Dispatched Lead event (Browser + CAPI) ID:', eventId);
  return eventId;
}

/**
 * Standard Schedule Event (Fired when meeting slot is confirmed on Cal.com)
 * Deduplicated across Browser Pixel and Server Conversions API
 */
export function trackScheduleEvent(bookingData = {}) {
  const eventId = generateEventId('sched');

  // 1. Browser Pixel with eventID
  fbq('track', 'Schedule', {
    content_name: '15-Min Strategy Walkthrough',
    content_type: 'consultation',
    booking_slot: bookingData.bookingSlot || '',
    status: 'confirmed',
    value: 0,
    currency: 'INR',
  }, { eventID: eventId });

  // 2. Custom event for verification
  fbq('trackCustom', 'MeetingBooked', {
    booking_slot: bookingData.bookingSlot || '',
    start_time: bookingData.startTime || '',
    city: bookingData.city || '',
    studio_name: bookingData.studioName || '',
  });

  // 3. Server-Side Conversions API (CAPI) with matching eventId
  dispatchToCapi({
    eventName: 'Schedule',
    eventId,
    bookingSlot: bookingData.bookingSlot,
    name: bookingData.name,
    email: bookingData.email,
    phone: bookingData.phone,
    city: bookingData.city,
    studioName: bookingData.studioName,
  });

  console.log('[Meta Tracking] Dispatched Schedule event (Browser + CAPI) ID:', eventId);
  return eventId;
}
