export const couple = {
  groom: 'Abrar',
  bride: 'Naafia',
  groomLineage: 'Son of Mrs. & Mr. Zubair',
  brideLineage: 'Daughter of Mrs. & Mr. Thangalvadi',
  hashtag: '#AbrarWedsNaafia',
};

export const bismillah = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

export const ayah = {
  arabic:
    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوٓا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  translation:
    'And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you love and mercy.',
  reference: 'Surah Ar-Rum 30:21',
};

export type ScheduleItem = {
  ceremony: string;
  arabicName: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  note: string;
};

export const schedule: ScheduleItem[] = [
  {
    ceremony: 'Nikkah',
    arabicName: 'نکاح',
    date: '27 December 2026',
    day: 'Sunday',
    time: '11:00 AM onwards',
    venue: 'BKN Auditorium',
    address: 'Periyapet, Chennai, Tamil Nadu',
    mapsUrl: 'https://maps.google.com/?q=BKN+Auditorium+Periyapet+Chennai',
    note: 'Nikkah ceremony followed by lunch',
  },
  {
    ceremony: 'Walima',
    arabicName: 'وليمة',
    date: '28 December 2026',
    day: 'Monday',
    time: '7:00 PM onwards',
    venue: 'Hablis Hotel',
    address: 'Guindy, Chennai, Tamil Nadu',
    mapsUrl: 'https://maps.google.com/?q=Hablis+Hotel+Guindy+Chennai',
    note: 'Reception dinner in honour of the newlyweds',
  },
];

export const nikkahDate = '2026-12-27T11:00:00+05:30';

export const dressCode = {
  title: 'Dress Code',
  description:
    'Traditional and festive attire is welcomed with open arms — sherwanis, kurtas, sarees and lehengas in rich, celebratory colours.',
};

export const rsvpNote =
  'Kindly RSVP by 10th December 2026 so we can reserve your seat and set the table with love.';

// TODO: replace with real contact numbers before publishing
export const contact = [
  { name: "Zubair (Groom's side)", phone: '+91 00000 00000' },
  { name: "Thangalvadi (Bride's side)", phone: '+91 00000 00000' },
];

