// src/email/i18n/translations.ts

export type Language = 'es' | 'en';

export interface BookingTranslations {
  address: string;
  subject: string;
  greeting: string;
  title: string;
  newBooking: string;
  clientDetails: string;
  name: string;
  email: string;
  phone: string;
  eventDetails: string;
  eventType: string;
  date: string;
  time: string;
  duration: string;
  hours: string;
  guests: string;
  serviceDetails: string;
  serviceType: string;
  desserts: string;
  budget: string;
  location: string;
  additionalInfo: string;
  comments: string;
  referralSource: string;
  footer: string;
  contactClient: string;
  allRightsReserved: string;
  eventTypes: {
    Matrimonial: string;
    Birthday: string;
    Corporate: string;
    Anniversary: string;
    Graduation: string;
    Baby_Shower: string;
    Other: string;
  };
  serviceTypes: {
    'Driver Assistance': string;
    'Full Service': string;
    'Basic Package': string;
    'Premium Package': string;
  };
  referralSources: {
    'Friend / Family': string;
    'Social Media': string;
    'Google Search': string;
    Advertisement: string;
    Other: string;
  };
}

export const translations: Record<Language, BookingTranslations> = {
  es: {
    address: 'Dirección',
    subject: '🎉 Nueva Reserva de Servicio - ObleaFusion',
    greeting: 'Hola',
    title: 'Nueva Solicitud de Reserva',
    newBooking: 'Has recibido una nueva solicitud de reserva para tu servicio.',
    clientDetails: 'Datos del Cliente',
    name: 'Nombre',
    email: 'Correo',
    phone: 'Teléfono',
    eventDetails: 'Detalles del Evento',
    eventType: 'Tipo de Evento',
    date: 'Fecha',
    time: 'Hora',
    duration: 'Duración',
    hours: 'horas',
    guests: 'Invitados',
    serviceDetails: 'Detalles del Servicio',
    serviceType: 'Tipo de Servicio',
    desserts: 'Postres Seleccionados',
    budget: 'Presupuesto',
    location: 'Ubicación',
    additionalInfo: 'Información Adicional',
    comments: 'Comentarios',
    referralSource: '¿Cómo nos conoció?',
    footer:
      'Por favor, contacta al cliente lo antes posible para confirmar la disponibilidad y los detalles finales.',
    contactClient: 'Contactar Cliente',
    allRightsReserved: 'Todos los derechos reservados',
    eventTypes: {
      Matrimonial: 'Matrimonio',
      Birthday: 'Cumpleaños',
      Corporate: 'Corporativo',
      Anniversary: 'Aniversario',
      Graduation: 'Graduación',
      Baby_Shower: 'Baby Shower',
      Other: 'Otro',
    },
    serviceTypes: {
      'Driver Assistance': 'Asistencia del Conductor',
      'Full Service': 'Servicio Completo',
      'Basic Package': 'Paquete Básico',
      'Premium Package': 'Paquete Premium',
    },
    referralSources: {
      'Friend / Family': 'Amigo / Familia',
      'Social Media': 'Redes Sociales',
      'Google Search': 'Búsqueda en Google',
      Advertisement: 'Publicidad',
      Other: 'Otro',
    },
  },
  en: {
    address: 'Address',
    subject: '🎉 New Service Booking - ObleaFusion',
    greeting: 'Hello',
    title: 'New Booking Request',
    newBooking: 'You have received a new booking request for your service.',
    clientDetails: 'Client Details',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    eventDetails: 'Event Details',
    eventType: 'Event Type',
    date: 'Date',
    time: 'Time',
    duration: 'Duration',
    hours: 'hours',
    guests: 'Guests',
    serviceDetails: 'Service Details',
    serviceType: 'Service Type',
    desserts: 'Selected Desserts',
    budget: 'Budget',
    location: 'Location',
    additionalInfo: 'Additional Information',
    comments: 'Comments',
    referralSource: 'How did you hear about us?',
    footer:
      'Please contact the client as soon as possible to confirm availability and final details.',
    contactClient: 'Contact Client',
    allRightsReserved: 'All rights reserved',
    eventTypes: {
      Matrimonial: 'Wedding',
      Birthday: 'Birthday',
      Corporate: 'Corporate',
      Anniversary: 'Anniversary',
      Graduation: 'Graduation',
      Baby_Shower: 'Baby Shower',
      Other: 'Other',
    },
    serviceTypes: {
      'Driver Assistance': 'Driver Assistance',
      'Full Service': 'Full Service',
      'Basic Package': 'Basic Package',
      'Premium Package': 'Premium Package',
    },
    referralSources: {
      'Friend / Family': 'Friend / Family',
      'Social Media': 'Social Media',
      'Google Search': 'Google Search',
      Advertisement: 'Advertisement',
      Other: 'Other',
    },
  },
};

export const getTranslations = (lang: Language): BookingTranslations => {
  return translations[lang] || translations.es;
};
