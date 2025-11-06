import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BookingData } from './interfaces/BookingData.interface';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendBookingEmail(data: BookingData) {
    const html = this.generateBookingEmailHtml(data);

    await this.mailerService.sendMail({
      to: process.env.BOOKING_EMAIL_TO || 'florezmnj@gmail.com',
      subject:
        data.language === 'es'
          ? 'Nueva solicitud de reserva'
          : 'New Booking Request',
      html,
    });
  }

  private generateBookingEmailHtml(data: BookingData): string {
    const t = this.getTranslations(data.language);
    const formattedDate = this.formatDate(data.date, data.language);
    const eventType = this.getEventType(data);
    const serviceType = this.getServiceType(data);
    const referralSource = this.getReferralSource(data);

    return `
<!DOCTYPE html>
<html lang="${data.language === 'es' ? 'es' : 'en'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.newBooking} - ObleaFusion</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
            background-color: #f6f9fc;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: #3d85c6;
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            max-width: 150px;
            height: auto;
            margin-bottom: 20px;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin: 0;
        }
        
        .header p {
            color: #e0e7ff;
            font-size: 14px;
            font-weight: 400;
            margin: 8px 0 0 0;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .title {
            color: #1a1a1a;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 20px;
            line-height: 1.3;
        }
        
        .text {
            color: #4a5568;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 12px;
        }
        
        .section {
            margin: 24px 0;
        }
        
        .section-title {
            background-color: #e69138;
            color: #ffffff;
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 16px;
            padding: 12px 16px;
            border-radius: 6px;
            line-height: 1.4;
        }
        
        .divider {
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 32px 0;
        }
        
        .info-table {
            width: 100%;
            margin-bottom: 12px;
        }
        
        .info-table td {
            padding: 6px 0;
            vertical-align: top;
        }
        
        .info-label {
            color: #718096;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            width: 40%;
        }
        
        .info-value {
            color: #2d3748;
            font-size: 16px;
            font-weight: 400;
            width: 60%;
        }
        
        .info-value a {
            color: #667eea;
            text-decoration: underline;
        }
        
        .list {
            margin: 8px 0;
            padding-left: 20px;
        }
        
        .list li {
            color: #2d3748;
            font-size: 15px;
            margin-bottom: 6px;
            line-height: 1.5;
        }
        
        .comment-box {
            background-color: #f7fafc;
            border-left: 4px solid #667eea;
            padding: 16px;
            border-radius: 4px;
            margin-top: 8px;
        }
        
        .comment-text {
            color: #2d3748;
            font-size: 15px;
            line-height: 1.6;
            margin: 0;
            font-style: italic;
        }
        
        .button-container {
            text-align: center;
            margin: 24px 0;
        }
        
        .button {
            display: inline-block;
            background-color: #e69138;
            border-radius: 8px;
            color: #ffffff !important;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            padding: 14px 32px;
            box-shadow: 0 2px 4px rgba(230, 145, 56, 0.3);
        }
        
        .footer-message {
            color: #4a5568;
            font-size: 15px;
            line-height: 1.6;
            margin: 0 0 24px;
            text-align: center;
        }
        
        .footer {
            background-color: #f7fafc;
            padding: 24px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            color: #718096;
            font-size: 13px;
            line-height: 1.5;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="assets/ObleaFusion-Orange-logo.png" alt="ObleaFusion Logo" class="logo">
            <h1>ObleaFusion</h1>
            <p>Premium Dessert Services</p>
        </div>

        <div class="content">
            <h2 class="title">${t.title}</h2>
            <p class="text">
                ${t.greeting} <strong>${process.env.OWNER_NAME || 'Equipo ObleaFusion'}</strong>,
            </p>
            <p class="text">${t.newBooking}</p>

            <hr class="divider">

            <div class="section">
                <h3 class="section-title">👤 ${t.clientDetails}</h3>
                <table class="info-table">
                    <tr>
                        <td class="info-label">${t.name}:</td>
                        <td class="info-value">${data.name}</td>
                    </tr>
                    <tr>
                        <td class="info-label">${t.email}:</td>
                        <td class="info-value">
                            <a href="mailto:${data.email}">${data.email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="info-label">${t.phone}:</td>
                        <td class="info-value">${data.phone}</td>
                    </tr>
                </table>
            </div>

            <hr class="divider">

            <div class="section">
                <h3 class="section-title">🎊 ${t.eventDetails}</h3>
                <table class="info-table">
                    <tr>
                        <td class="info-label">${t.eventType}:</td>
                        <td class="info-value">${eventType}</td>
                    </tr>
                    <tr>
                        <td class="info-label">${t.date}:</td>
                        <td class="info-value">${formattedDate}</td>
                    </tr>
                    <tr>
                        <td class="info-label">${t.time}:</td>
                        <td class="info-value">${data.time}</td>
                    </tr>
                    <tr>
                        <td class="info-label">${t.duration}:</td>
                        <td class="info-value">${data.duration} ${t.hours}</td>
                    </tr>
                    ${data.guests ? `
                    <tr>
                        <td class="info-label">${t.guests}:</td>
                        <td class="info-value">${data.guests}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <hr class="divider">

            <div class="section">
                <h3 class="section-title">🍰 ${t.serviceDetails}</h3>
                <table class="info-table">
                    <tr>
                        <td class="info-label">${t.serviceType}:</td>
                        <td class="info-value">${serviceType}</td>
                    </tr>
                </table>
                
                ${data.desserts && data.desserts.length > 0 ? `
                <p class="info-label" style="margin-top: 12px;">${t.desserts}:</p>
                <ul class="list">
                    ${data.desserts.map(dessert => `<li>${dessert}</li>`).join('')}
                </ul>
                ` : ''}

                <table class="info-table" style="margin-top: 12px;">
                    ${data.budget ? `
                    <tr>
                        <td class="info-label">${t.budget}:</td>
                        <td class="info-value">$${data.budget}</td>
                    </tr>
                    ` : ''}
                    <tr>
                        <td class="info-label">${t.location}:</td>
                        <td class="info-value">${data.location}</td>
                    </tr>
                </table>
            </div>

            ${data.comments || data.referralSource ? `
            <hr class="divider">

            <div class="section">
                <h3 class="section-title">ℹ️ ${t.additionalInfo}</h3>
                
                ${data.comments ? `
                <p class="info-label">${t.comments}:</p>
                <div class="comment-box">
                    <p class="comment-text">${data.comments}</p>
                </div>
                ` : ''}

                ${data.referralSource ? `
                <table class="info-table" style="margin-top: 16px;">
                    <tr>
                        <td class="info-label">${t.referralSource}:</td>
                        <td class="info-value">${referralSource}</td>
                    </tr>
                </table>
                ` : ''}
            </div>
            ` : ''}

            <hr class="divider">

            <div class="section">
                <p class="footer-message">${t.footer}</p>
                <div class="button-container">
                    <a href="mailto:${data.email}?subject=Re: ${data.language === 'es' ? 'Reserva' : 'Booking'} ${formattedDate}" class="button">
                        ${t.contactClient}
                    </a>
                </div>
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">
                © ${new Date().getFullYear()} ObleaFusion. ${t.allRightsReserved}.
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
  }

  private formatDate(dateStr: string, language: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
      language === 'es' ? 'es-ES' : 'en-US',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  }

  private getEventType(data: BookingData): string {
    const t = this.getTranslations(data.language);
    const eventKey = data.eventType.replace(/\s+/g, '_');
    return t.eventTypes[eventKey] || data.otherEvent || data.eventType;
  }

  private getServiceType(data: BookingData): string {
    const t = this.getTranslations(data.language);
    return t.serviceTypes[data.serviceType] || data.serviceType;
  }

  private getReferralSource(data: BookingData): string {
    if (!data.referralSource) return '';
    const t = this.getTranslations(data.language);
    const referralKey = data.referralSource.replace(/\s+/g, '_');
    return t.referralSources[referralKey] || data.referralSource;
  }

  private getTranslations(language: string) {
    const translations = {
      es: {
        title: '🎉 Nueva Reserva Recibida',
        greeting: 'Hola',
        newBooking: 'Has recibido una nueva solicitud de reserva. A continuación los detalles:',
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
        footer: 'Por favor responde a esta solicitud lo antes posible para confirmar disponibilidad.',
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
          Event: 'En un evento',
          Other: 'Otro',
        },
      },
      en: {
        title: '🎉 New Booking Received',
        greeting: 'Hello',
        newBooking: 'You have received a new booking request. Here are the details:',
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
        footer: 'Please respond to this request as soon as possible to confirm availability.',
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
          Event: 'At an event',
          Other: 'Other',
        },
      },
    };

    return translations[language] || translations.es;
  }
}
