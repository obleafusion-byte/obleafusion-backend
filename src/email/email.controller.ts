import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('booking')
  @ApiOperation({ summary: 'Enviar correo de solicitud de reserva' })
  async sendBookingEmail(@Body() data: any) {
    try {
      await this.emailService.sendBookingEmail(data);
      return {
        success: true,
        message:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          data.language === 'es'
            ? 'Correo de reserva enviado correctamente.'
            : 'Booking email sent successfully.',
      };
    } catch (error) {
      console.error('Error enviando correo:', error);
      return {
        success: false,
        message:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          data.language === 'es'
            ? 'Error al enviar el correo de reserva.'
            : 'Error sending booking email.',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      };
    }
  }
}
