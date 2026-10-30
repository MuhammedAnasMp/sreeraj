export type EventType = 'invitation' | 'reception';

export interface TimelineItem {
  time: string;
  icon: string;
  title: string;
  sub?: string;
  desc: string;
  tag: string;
  highlight?: boolean;
  ribbon?: string;
}

export interface WeddingEventData {
  id: EventType;
  pageTitle: string;
  ogTitle: string;
  ogDesc: string;
  tagline: string;
  heroDate: string;
  heroSubtext: string;
  badgeText: string;
  announcementDate: string;
  timingPill: string;
  quote: string;
  inviterName: string;
  inviterHouse: string;
  timelineTitle: string;
  timelineSubtitle: string;
  countdownHeading: string;
  countdownTarget: string; // ISO string
  timeline: TimelineItem[];
  venueName: string;
  venueLocationSub: string;
  venueBlockTitle: string;
  venueBlockDesc: string;
  venueTiming: string;
  mapUrl: string;
  phone: string;
  whatsappNumber: string;
  whatsappMsg: string;
  calendarSummary: string;
  calendarDetails: string;
  calendarLocation: string;
  startUtc: string;
  endUtc: string;
}

export const EVENT_DATA: Record<EventType, WeddingEventData> = {
  invitation: {
    id: 'invitation',
    pageTitle: 'Wedding Invitation | Sreeraj & Suji',
    ogTitle: 'Wedding Invitation: Sreeraj & Suji',
    ogDesc: 'Wednesday, December 30, 2026 • Greens Avenue Auditorium, Desamangalam',
    tagline: 'Wedding Ceremony',
    heroDate: 'Wednesday, December 30, 2026',
    heroSubtext: 'Together with our families',
    badgeText: 'Our son Sreeraj is getting married',
    announcementDate: 'Wednesday, December 30, 2026',
    timingPill: 'Dhanu 15 • 10:00 AM – 1:00 PM',
    quote: '“I, along with my family, cordially invite you to grace this auspicious occasion with your presence and blessings as our children embark on their new journey together.”',
    inviterName: 'Ramadevi Kuttan Marar',
    inviterHouse: 'Vadakkoot Marath House, Karathur, Kainikkara',
    timelineTitle: 'Wedding Schedule',
    timelineSubtitle: 'Wednesday, December 30, 2026 • 10:00 AM to 1:00 PM',
    countdownHeading: 'Counting Down To Sacred Muhurtham',
    countdownTarget: '2026-12-30T10:00:00+05:30',
    timeline: [
      {
        time: '8:00 AM',
        icon: '🚗',
        title: 'Departure of Wedding Party',
        sub: 'Vadakkoot Marath House, Karathur',
        desc: 'The wedding party departs from Karathur, Kainikkara.',
        tag: 'Morning Departure',
        highlight: false
      },
      {
        time: 'Morning Hours',
        icon: '🛕',
        title: 'Thalikettu',
        sub: 'Guruvayur Sree Krishna Temple',
        desc: 'The sacred tying of the mangalsutra in the divine presence of Lord Guruvayurappan.',
        tag: 'Auspicious Ceremony',
        highlight: true,
        ribbon: 'Sacred Muhurtham'
      },
      {
        time: '10:00 AM – 1:00 PM',
        icon: '🌸',
        title: 'Wedding Feast',
        sub: 'Greens Avenue Auditorium',
        desc: 'Desamangalam, Thrissur. Join us for traditional Sadhya, blessings, and joyful celebration.',
        tag: 'Main Reception & Sadhya',
        highlight: false
      }
    ],
    venueName: 'Greens Avenue Auditorium',
    venueLocationSub: 'Desamangalam, Thrissur, Kerala',
    venueBlockTitle: 'Wedding Venue & Feast',
    venueBlockDesc: 'Greens Avenue Auditorium\nDesamangalam, Thrissur',
    venueTiming: '10:00 AM to 1:00 PM\nWednesday, Dec 30, 2026',
    mapUrl: 'https://maps.app.goo.gl/HWu5V4tNpCQ2j7Qp7',
    phone: '+917356721868',
    whatsappNumber: '96566898217',
    whatsappMsg: 'Congratulations Sreeraj and Suji! Looking forward to attending the wedding ceremony at Greens Avenue Auditorium!',
    calendarSummary: 'Wedding of Sreeraj & Suji',
    calendarDetails: 'Wedding Ceremony of Sreeraj and Suji.\n• Thalikettu: Guruvayur Sree Krishna Temple\n• Reception & Sadhya: Greens Avenue Auditorium, Desamangalam (10:00 AM - 1:00 PM)\n• Departure: 8:00 AM from Vadakkoot Marath House\nHost: Ramadevi Kuttan Marar (+91 7356721868)',
    calendarLocation: 'Greens Avenue Auditorium, Desamangalam, Thrissur, Kerala',
    startUtc: '20261230T043000Z',
    endUtc: '20261230T073000Z'
  },
  reception: {
    id: 'reception',
    pageTitle: 'Wedding Reception | Sreeraj & Suji',
    ogTitle: 'Wedding Reception: Sreeraj & Suji',
    ogDesc: 'Wednesday, December 30, 2026 • Kodakkal CSI Parish Hall, Malappuram',
    tagline: 'Wedding Reception',
    heroDate: 'Wednesday, December 30, 2026',
    heroSubtext: 'Celebrating the joyous union of',
    badgeText: 'Cordially invite you to the Wedding Reception of Sreeraj & Suji',
    announcementDate: 'Wednesday, December 30, 2026',
    timingPill: '5:00 PM to 8:30 PM • Grand Evening Reception',
    quote: '“We warmly invite you to join us in celebrating the newly wedded couple Sreeraj & Suji with an evening of felicity, felicitations, and banquet dinner.”',
    inviterName: 'Vadakkoot Family & K.P. Family',
    inviterHouse: 'Karathur, Kainikkara',
    timelineTitle: 'Reception Schedule',
    timelineSubtitle: 'Wednesday, December 30, 2026 • 5:00 PM to 8:30 PM',
    countdownHeading: 'Counting Down To Evening Reception',
    countdownTarget: '2026-12-30T17:00:00+05:30',
    timeline: [
      {
        time: '5:00 PM',
        icon: '✨',
        title: 'Welcome & Guest Arrival',
        sub: 'Kodakkal CSI Parish Hall',
        desc: 'Arrival of esteemed family, friends, and well-wishers with evening refreshments.',
        tag: 'Evening Welcome',
        highlight: false
      },
      {
        time: '5:00 PM – 8:30 PM',
        icon: '🥂',
        title: 'Grand Wedding Reception & Dinner',
        sub: 'Kodakkal CSI Parish Hall',
        desc: 'Malappuram, Kerala. An evening filled with joy, banquet dinner, and heartfelt felicitations.',
        tag: 'Main Reception & Dinner',
        highlight: true,
        ribbon: 'Evening Celebration'
      },
      {
        time: 'Evening Hours',
        icon: '🎉',
        title: 'Felicitations & Blessings',
        sub: 'Cherished Moments with Couple',
        desc: 'Warm blessings, congratulations, and memorable photo moments with the newlyweds.',
        tag: 'Celebrations',
        highlight: false
      }
    ],
    venueName: 'Kodakkal CSI Parish Hall',
    venueLocationSub: 'Malappuram, Kerala',
    venueBlockTitle: 'Reception Venue',
    venueBlockDesc: 'Kodakkal CSI Parish Hall\nMalappuram, Kerala',
    venueTiming: '5:00 PM to 8:30 PM\nWednesday, Dec 30, 2026',
    mapUrl: 'https://maps.app.goo.gl/d3nM1PYz5LEmB9hw9',
    phone: '+917356721868',
    whatsappNumber: '96566898217',
    whatsappMsg: 'Congratulations Sreeraj and Suji! Looking forward to attending the grand wedding reception at Kodakkal CSI Parish Hall!',
    calendarSummary: 'Wedding Reception of Sreeraj & Suji',
    calendarDetails: 'Grand Wedding Reception & Dinner of Sreeraj and Suji at Kodakkal CSI Parish Hall, Malappuram, Kerala (5:00 PM to 8:30 PM).\nHost: Vadakkoot Family & K.P. Family (+91 7356721868)',
    calendarLocation: 'Kodakkal CSI Parish Hall, Malappuram, Kerala',
    startUtc: '20261230T113000Z',
    endUtc: '20261230T150000Z'
  }
};

