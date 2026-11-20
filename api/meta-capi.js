import crypto from 'crypto';

const META_ACCESS_TOKEN =
  process.env.META_CAPI_ACCESS_TOKEN ||
  'EAAU6PE7PhU4BTBAUXZAQ9UWJ3542otBrtvzoE8Fw2ZCTPvRUhoE8dELKwmyxGpDNFXoZBMOc9ZATbflDcOZAlflXJoHK4KRiZC4UrZCtgEN2CcpoJgHwFYajSYF1HDOCqJ4pMSQhFiv0H5shY1cbRonjvUZApy0s2pD60wf5pllthhrX51T6u2gJDUUGxpazWVRO6gZDZD';

const DATASET_ID = '2524151041412632';

function sha256(val) {
  if (!val) return undefined;
  const cleaned = String(val).trim().toLowerCase();
  if (!cleaned) return undefined;
  return crypto.createHash('sha256').update(cleaned).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      eventName = 'Lead',
      eventId = null,
      email = '',
      phone = '',
      name = '',
      city = '',
      studioName = '',
      role = '',
      bookingSlot = '',
      eventSourceUrl = 'https://interior-signup.largerup.com',
      fbp = null,
      fbc = null,
      testEventCode = null,
    } = req.body || {};

    // Extract client IP and User Agent from request headers
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress;
    const clientUserAgent = req.headers['user-agent'] || '';

    // Normalize phone (strip non-digits, ensure country code 91 for India)
    let cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone && !cleanPhone.startsWith('91')) {
      cleanPhone = '91' + cleanPhone.slice(-10);
    }

    const firstName = (name || '').trim().split(' ')[0] || '';

    const userData = {
      client_ip_address: clientIp || undefined,
      client_user_agent: clientUserAgent || undefined,
      country: [sha256('in')],
    };

    if (email) userData.em = [sha256(email)];
    if (cleanPhone) userData.ph = [sha256(cleanPhone)];
    if (firstName) userData.fn = [sha256(firstName)];
    if (city) userData.ct = [sha256(city)];
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const customData = {
      content_name:
        eventName === 'Schedule'
          ? '15-Min Strategy Walkthrough'
          : eventName === 'ViewContent'
          ? 'Interior Studio Initiative'
          : 'Studio Website Application',
      content_category: role || 'Interior Studio',
      studio_name: studioName || '',
      city: city || 'Kolkata',
      booking_slot: bookingSlot || undefined,
      currency: 'INR',
      value: 0,
    };

    const eventObj = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId || undefined,
      action_source: 'website',
      event_source_url: eventSourceUrl,
      user_data: userData,
      custom_data: customData,
    };

    const eventPayload = {
      data: [eventObj],
      access_token: META_ACCESS_TOKEN,
    };

    if (testEventCode) {
      eventPayload.test_event_code = testEventCode;
    }

    const fbRes = await fetch(`https://graph.facebook.com/v19.0/${DATASET_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload),
    });

    const fbData = await fbRes.json();

    if (!fbRes.ok) {
      console.warn('[Meta CAPI Server] Error response from Graph API:', fbData);
      return res.status(fbRes.status).json({ success: false, error: fbData });
    }

    console.log('[Meta CAPI Server] Successfully dispatched event:', eventName, fbData);
    return res.status(200).json({ success: true, meta: fbData });
  } catch (err) {
    console.error('[Meta CAPI Server] Internal error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
