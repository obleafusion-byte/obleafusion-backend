import { Language } from '../templates/translations';

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  otherEvent?: string;
  date: string;
  time: string;
  duration: string;
  guests?: string;
  desserts: string[];
  serviceType: string;
  budget?: string;
  location: string;
  comments?: string;
  referralSource: string;
  language: Language;
}
