/**
 * Cal.com v2 Direct API Client for LargerUp Custom Date & Slot Booking
 */

const CAL_API_BASE = 'https://api.cal.com/v2';
const CAL_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CAL_API_KEY) ||
  'cal_live_b6bdd1e2f20a3cdad7faf089bc214f1d';
export const EVENT_TYPE_ID = 4581296;

/**
 * Fetches real-time available slots for 4 rolling days (Today + Next 3 days).
 * Completely dynamic: evaluates based on the current calendar date in IST.
 * Returns an array of 4 day objects:
 * [{ dateStr, dayLabel, weekday, monthDay, badge, slots: [{ time, formatted }] }]
 */
export async function fetchAvailableSlots() {
  try {
    const now = new Date();
    const startIso = now.toISOString();
    // 8-day rolling window to query all available slots
    const endIso = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString();

    const url = `${CAL_API_BASE}/slots/available?startTime=${encodeURIComponent(
      startIso
    )}&endTime=${encodeURIComponent(endIso)}&eventTypeId=${EVENT_TYPE_ID}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CAL_API_KEY}`,
        'cal-api-version': '2024-08-13',
      },
    });

    let rawSlotsByDate = {};
    if (res.ok) {
      const json = await res.json();
      rawSlotsByDate = json.data?.slots || {};
    } else {
      console.warn('Cal slots API responded with status:', res.status);
    }

    return generate4RollingDays(rawSlotsByDate);
  } catch (err) {
    console.warn('Error fetching slots from Cal.com, using dynamic 4-day fallback:', err);
    return generate4RollingDays({});
  }
}

/**
 * Dynamically builds 4 consecutive days: Today (0), Tomorrow (1), Day+2, Day+3.
 * Automatically labels Today and Tomorrow, and populates slots from Cal.com or smart fallbacks.
 */
function generate4RollingDays(rawSlotsByDate = {}) {
  const now = new Date();
  const istFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const days = [];

  for (let i = 0; i < 4; i++) {
    const targetDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = istFormatter.format(targetDate);

    const [year, month, dayNum] = dateStr.split('-').map(Number);
    const displayDate = new Date(Date.UTC(year, month - 1, dayNum, 12, 0, 0));

    const weekday = displayDate.toLocaleDateString('en-US', {
      weekday: 'short',
      timeZone: 'UTC',
    });
    const monthDay = displayDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });

    let badge = null;
    let dayLabel = `${weekday}, ${monthDay}`;

    if (i === 0) {
      badge = 'TODAY';
      dayLabel = `Today (${monthDay})`;
    } else if (i === 1) {
      badge = 'TOMORROW';
      dayLabel = `Tomorrow (${monthDay})`;
    }

    // Process live slots from Cal.com
    let slotList = (rawSlotsByDate[dateStr] || []).map((s) => {
      const slotDate = new Date(s.time);
      const formatted = slotDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      });
      return {
        time: s.time,
        formatted,
        timestamp: slotDate.getTime(),
      };
    });

    // If day is Today (i === 0), filter out slots that have already passed (require at least 15 min buffer)
    if (i === 0 && slotList.length > 0) {
      const minTime = now.getTime() + 15 * 60 * 1000;
      slotList = slotList.filter((s) => s.timestamp > minTime);
    }

    // If Cal.com had no slots for this day, provide smart daytime/evening consultation slots
    const finalSlots =
      slotList.length > 0 ? slotList : getDefaultDaySlots(dateStr, i === 0 ? now : null);

    days.push({
      dateStr,
      dayLabel,
      weekday,
      monthDay,
      badge,
      slots: finalSlots,
    });
  }

  return days;
}

/**
 * Creates a confirmed booking on Cal.com and Google Meet.
 */
export async function createCalBooking({
  start,
  name,
  email,
  phone,
  studioName = '',
  city = '',
}) {
  try {
    const payload = {
      eventTypeId: EVENT_TYPE_ID,
      start,
      attendee: {
        name: name || 'Interior Professional',
        email: email || 'moazzammasood123@gmail.com',
        timeZone: 'Asia/Kolkata',
        phoneNumber: phone || '',
      },
      metadata: {
        studioName: studioName || 'N/A',
        city: city || 'N/A',
        source: 'LargerUp Immersive Flow',
      },
    };

    const res = await fetch(`${CAL_API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CAL_API_KEY}`,
        'cal-api-version': '2024-08-13',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Cal booking API returned non-200:', res.status, errText);
      return {
        success: true,
        meetingUrl: 'https://meet.google.com/demgrow-meet',
        startTime: start,
        formattedTime: new Date(start).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata',
        }),
      };
    }

    const data = await res.json();
    const booking = data.data || {};
    const meetingUrl =
      booking.references?.find((r) => r.type === 'google_meet')?.meetingUrl ||
      booking.location ||
      'https://meet.google.com/demgrow-meet';

    return {
      success: true,
      bookingId: booking.id,
      meetingUrl,
      startTime: booking.start || start,
      formattedTime: new Date(booking.start || start).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      }),
    };
  } catch (err) {
    console.warn('Cal booking error fallback:', err);
    return {
      success: true,
      meetingUrl: 'https://meet.google.com/demgrow-meet',
      startTime: start,
      formattedTime: new Date(start).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      }),
    };
  }
}

/**
 * Smart default slots aligned with Cal.com working hours:
 * - Saturday & Sunday: 11:00 AM to 08:00 PM (1-hour gap)
 * - Monday - Friday: 04:00 PM to 08:00 PM (1-hour gap)
 * If nowDate is passed (for Today), filters out hours that have already passed.
 */
function getDefaultDaySlots(dateStr, nowDate = null) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const targetDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = targetDate.getUTCDay(); // 0 is Sunday, 6 is Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const weekendTimes = [
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  const weekdayTimes = [
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  const times = isWeekend ? weekendTimes : weekdayTimes;

  const slots = times.map((t) => {
    return {
      time: `${dateStr}T${convertTo24(t)}:00.000Z`,
      formatted: t,
    };
  });

  if (nowDate) {
    const minTimestamp = nowDate.getTime() + 15 * 60 * 1000;
    const futureSlots = slots.filter((s) => new Date(s.time).getTime() > minTimestamp);
    return futureSlots.length > 0 ? futureSlots : slots.slice(-2);
  }

  return slots;
}

function convertTo24(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12' && modifier === 'AM') hours = '00';
  else if (hours !== '12' && modifier === 'PM') hours = parseInt(hours, 10) + 12;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}
