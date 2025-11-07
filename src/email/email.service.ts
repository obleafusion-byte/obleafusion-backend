import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BookingData } from './interfaces/BookingData.interface';
import { ContactData } from './interfaces/ContactData.interface';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendBookingEmail(data: BookingData): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const t = this.getBookingTranslations(data.language);
      await this.mailerService.sendMail({
        to: process.env.BOOKING_EMAIL_TO || 'florezmnj@gmail.com',
        subject:
          data.language === 'es'
            ? 'Nueva solicitud de reserva'
            : 'New Booking Request',
        template: 'BookingNotification',
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '/templates/logo.png',
            cid: 'obleafusionlogo',
          },
        ],
        context: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          eventType: this.getEventType(data),
          formattedDate: this.formatDate(data.date, data.language),
          time: data.time,
          duration: data.duration,
          guests: data.guests,
          serviceType: this.getServiceType(data),
          desserts: data.desserts,
          budget: data.budget,
          location: data.location,
          comments: data.comments,
          referralSource: this.getReferralSource(data),
          language: data.language === 'es' ? 'es' : 'en',
          ownerName: process.env.OWNER_NAME || 'Equipo ObleaFusion',
          year: new Date().getFullYear(),
          bookingSubject: data.language === 'es' ? 'Reserva' : 'Booking',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          t: t,
        },
      });

      this.logger.log(`Booking email sent successfully to ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send booking email to ${data.email}`,
        error instanceof Error ? error.stack : String(error),
      );
      // No lanzamos el error para que no detenga la aplicación
      return false;
    }
  }

  async sendContactEmail(data: ContactData): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const t = this.getContactTranslations(data.language);
      await this.mailerService.sendMail({
        to: process.env.CONTACT_EMAIL_TO || 'florezmnj@gmail.com',
        subject:
          data.language === 'es'
            ? 'Nuevo mensaje de contacto'
            : 'New Contact Message',
        template: 'ContactUs',
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '/templates/logo.png',
            cid: 'obleafusionlogo',
          },
        ],
        context: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          referralSource: this.getContactReferralSource(data),
          language: data.language === 'es' ? 'es' : 'en',
          ownerName: process.env.OWNER_NAME || 'Equipo ObleaFusion',
          year: new Date().getFullYear(),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          t: t,
        },
      });

      this.logger.log(`Contact email sent successfully to ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send contact email to ${data.email}`,
        error instanceof Error ? error.stack : String(error),
      );
      // No lanzamos el error para que no detenga la aplicación
      return false;
    }
  }

  private formatDate(dateStr: string, language: string): string {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        this.logger.warn(`Invalid date format: ${dateStr}`);
        return dateStr; // Devolvemos el string original si la fecha es inválida
      }

      return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      this.logger.error(`Error formatting date: ${dateStr}`, error);
      return dateStr;
    }
  }

  private getEventType(data: BookingData): string {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const t = this.getBookingTranslations(data.language);
      const eventKey = data.eventType.replace(/\s+/g, '_');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return t.eventTypes[eventKey] || data.otherEvent || data.eventType;
    } catch (error) {
      this.logger.error('Error getting event type', error);
      return data.eventType || 'Unknown';
    }
  }

  private getServiceType(data: BookingData): string {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const t = this.getBookingTranslations(data.language);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return t.serviceTypes[data.serviceType] || data.serviceType;
    } catch (error) {
      this.logger.error('Error getting service type', error);
      return data.serviceType || 'Unknown';
    }
  }

  private getReferralSource(data: BookingData): string {
    try {
      if (!data.referralSource) return '';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const t = this.getBookingTranslations(data.language);
      const referralKey = data.referralSource.replace(/\s+/g, '_');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return t.referralSources[referralKey] || data.referralSource;
    } catch (error) {
      this.logger.error('Error getting referral source', error);
      return data.referralSource || '';
    }
  }

  private getContactReferralSource(data: ContactData): string {
    try {
      if (!data.referralSource) return '';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const t = this.getContactTranslations(data.language);
      const referralKey = data.referralSource.replace(/\s+/g, '_');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return t.referralSources[referralKey] || data.referralSource;
    } catch (error) {
      this.logger.error('Error getting contact referral source', error);
      return data.referralSource || '';
    }
  }

  private getBookingTranslations(language: string) {
    const translations = {
      es: {
        title: '🎉 Nueva Reserva Recibida',
        greeting: 'Hola',
        newBooking:
          'Has recibido una nueva solicitud de reserva. A continuación los detalles:',
        clientDetails: 'Datos del Cliente',
        name: 'Nombre',
        email: 'Email',
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
          'Por favor responde a esta solicitud lo antes posible para confirmar disponibilidad.',
        contactClient: 'Contactar Cliente',
        allRightsReserved: 'Todos los derechos reservados',
        eventTypes: {
          Birthday: 'Cumpleaños',
          Wedding: 'Boda',
          Corporate: 'Evento Corporativo',
          Anniversary: 'Aniversario',
          Baby_Shower: 'Baby Shower',
          Graduation: 'Graduación',
          Other: 'Otro',
        },
        serviceTypes: {
          live_station: 'Estación de Postres en Vivo',
          catering: 'Catering de Postres',
          delivery: 'Entrega a Domicilio',
        },
        referralSources: {
          Instagram: 'Instagram',
          Facebook: 'Facebook',
          Google: 'Google',
          Friend: 'Recomendación de un amigo',
          'Radio_/_TV': 'Radio / TV',
          Event: 'En un evento',
          Other: 'Otro',
        },
      },
      en: {
        title: '🎉 New Booking Received',
        greeting: 'Hello',
        newBooking:
          'You have received a new booking request. Here are the details:',
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
          'Please respond to this request as soon as possible to confirm availability.',
        contactClient: 'Contact Client',
        allRightsReserved: 'All rights reserved',
        eventTypes: {
          Birthday: 'Birthday',
          Wedding: 'Wedding',
          Corporate: 'Corporate Event',
          Anniversary: 'Anniversary',
          Baby_Shower: 'Baby Shower',
          Graduation: 'Graduation',
          Other: 'Other',
        },
        serviceTypes: {
          live_station: 'Live Dessert Station',
          catering: 'Dessert Catering',
          delivery: 'Home Delivery',
        },
        referralSources: {
          Instagram: 'Instagram',
          Facebook: 'Facebook',
          Google: 'Google',
          Friend: 'Friend referral',
          'Radio_/_TV': 'Radio / TV',
          Event: 'At an event',
          Other: 'Other',
        },
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return translations[language] || translations.es;
  }

  private getContactTranslations(language: string) {
    const translations = {
      es: {
        title: 'Nuevo Mensaje de Contacto',
        greeting: '¡Hola',
        newContact: 'Nuevo Mensaje de Contacto',
        newContactMessage:
          'Una persona está interesada en tus servicios y quiere ponerse en contacto contigo.',
        contactInfo: 'Información de Contacto',
        name: 'Nombre',
        email: 'Email',
        phone: 'Teléfono',
        referralSource: '¿Cómo nos conoció?',
        ctaMessage:
          'No dejes esperando a tu cliente. ¡Responde ahora y cierra esa venta! 🎯',
        replyNow: 'Responder Ahora',
        callDirectly: 'Llamar Directamente',
        replySubject: 'Re: Contacto desde ObleaFusion',
        proTip: 'Consejo Profesional',
        tipMessage:
          'Los clientes que reciben una respuesta en las primeras 24 horas tienen un 80% más de probabilidades de contratar el servicio. ¡La velocidad importa!',
        tagline: 'Creando momentos dulces e inolvidables',
        allRightsReserved: 'Todos los derechos reservados.',
        autoGenerated:
          'Este correo fue generado automáticamente por tu sistema de contacto.',
        referralSources: {
          Instagram: 'Instagram',
          Facebook: 'Facebook',
          Google: 'Google',
          Friend: 'Recomendación de un amigo',
          'Radio_/_TV': 'Radio / TV',
          Event: 'En un evento',
          Other: 'Otro',
        },
      },
      en: {
        title: 'New Contact Message',
        greeting: 'Hello',
        newContact: 'New Contact Message',
        newContactMessage:
          'Someone is interested in your services and wants to get in touch with you.',
        contactInfo: 'Contact Information',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        referralSource: 'How did you hear about us?',
        ctaMessage:
          "Don't keep your client waiting. Respond now and close that sale! 🎯",
        replyNow: 'Reply Now',
        callDirectly: 'Call Directly',
        replySubject: 'Re: Contact from ObleaFusion',
        proTip: 'Pro Tip',
        tipMessage:
          'Clients who receive a response within the first 24 hours are 80% more likely to hire the service. Speed matters!',
        tagline: 'Creating sweet and unforgettable moments',
        allRightsReserved: 'All rights reserved.',
        autoGenerated:
          'This email was automatically generated by your contact system.',
        referralSources: {
          Instagram: 'Instagram',
          Facebook: 'Facebook',
          Google: 'Google',
          Friend: 'Friend referral',
          'Radio_/_TV': 'Radio / TV',
          Event: 'At an event',
          Other: 'Other',
        },
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return translations[language] || translations.es;
  }
}
