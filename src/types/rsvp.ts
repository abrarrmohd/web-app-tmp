export type AttendanceStatus = 'attending' | 'declining' | '';

export type Ceremony = 'nikkah' | 'walima';

export type RsvpFormState = {
  fullName: string;
  phone: string;
  countryCode: string;
  attendance: AttendanceStatus;
  ceremonies: Ceremony[];
  guestCount: string;
  notes: string;
};
