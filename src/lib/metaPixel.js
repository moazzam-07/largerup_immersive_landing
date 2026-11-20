/**
 * Meta Pixel Tracking Client for LargerUp Onboarding Flow
 * Dataset / Pixel ID: 2524151041412632
 */

export const META_PIXEL_ID = '2524151041412632';

/**
 * Safe wrapper to execute window.fbq calls
 */
export function fbq(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq(...args);
    } catch (err) {
      console.warn('[Meta Pixel] Call failed:', err);
    }
  }
}

/**
 * Standard PageView event
 */
export function trackPageView() {
  fbq('track', 'PageView');
}

/**
 * Track step progression in onboarding funnel
 */
export function trackStepView(stepNumber, stepName = '') {
  fbq('trackCustom', 'FunnelStep', {
    step: stepNumber,
    step_name: stepName || `Step_${stepNumber}`,
  });
}

/**
 * Standard Lead Event (Fired when user completes contact info - Name, Phone, Email, Studio)
 */
export function trackLeadEvent(leadData = {}) {
  // 1. Advanced Matching - pass hashed or plain info to improve Event Match Quality (EMQ)
  if (leadData.email || leadData.phone) {
    const cleanPhone = (leadData.phone || '').replace(/[^0-9]/g, '');
    fbq('init', META_PIXEL_ID, {
      em: (leadData.email || '').trim().toLowerCase(),
      ph: cleanPhone ? (cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone.slice(-10)) : undefined,
      fn: (leadData.name || '').trim().split(' ')[0]?.toLowerCase(),
      ct: (leadData.city || '').trim().toLowerCase(),
    });
  }

  // 2. Fire Standard 'Lead' Event
  fbq('track', 'Lead', {
    content_name: 'Studio Website Application',
    content_category: leadData.role || 'Interior Studio',
    city: leadData.city || 'Kolkata',
    studio_name: leadData.studioName || '',
    value: 0,
    currency: 'INR',
  });

  // Custom event for custom conversions / ad reporting
  fbq('trackCustom', 'ApplicationSubmitted', {
    name: leadData.name || '',
    studio_name: leadData.studioName || '',
    city: leadData.city || '',
  });

  console.log('[Meta Pixel] Tracked standard Lead event:', leadData.name);
}

/**
 * Standard Schedule Event (Fired when meeting slot is confirmed on Cal.com)
 */
export function trackScheduleEvent(bookingData = {}) {
  fbq('track', 'Schedule', {
    content_name: '15-Min Strategy Walkthrough',
    content_type: 'consultation',
    booking_slot: bookingData.bookingSlot || '',
    status: 'confirmed',
    value: 0,
    currency: 'INR',
  });

  fbq('trackCustom', 'MeetingBooked', {
    booking_slot: bookingData.bookingSlot || '',
    start_time: bookingData.startTime || '',
    city: bookingData.city || '',
    studio_name: bookingData.studioName || '',
  });

  console.log('[Meta Pixel] Tracked standard Schedule event:', bookingData.bookingSlot);
}
