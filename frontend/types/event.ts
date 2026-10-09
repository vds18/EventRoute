export interface Event {
  _id: string;
  title: string;
  description: string;
  college: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  venue: string;
  entryFee: number;
  registrationLink: string;
  image?: string;
}