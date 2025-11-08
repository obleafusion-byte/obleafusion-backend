import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailService } from './email.service';
import type { BookingData } from './interfaces/BookingData.interface';
import type { ContactData } from './interfaces/ContactData.interface';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(private readonly emailService: EmailService) {}

  @Post('booking')
  @ApiOperation({ summary: 'Enviar correo de solicitud de reserva' })
  @ApiResponse({
    status: 200,
    description: 'Correo de reserva enviado correctamente',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al enviar el correo de reserva',
  })
  async sendBookingEmail(@Body() data: BookingData) {
    try {
      // Validación básica de datos requeridos
      if (!data || !data.email || !data.name) {
        this.logger.warn('Booking email attempt with missing required fields');
        throw new HttpException(
          {
            success: false,
            message:
              data?.language === 'es'
                ? 'Faltan datos requeridos (nombre y email son obligatorios).'
                : 'Missing required fields (name and email are required).',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const emailSent = await this.emailService.sendBookingEmail(data);

      if (emailSent) {
        this.logger.log(`Booking email sent successfully for ${data.email}`);
        return {
          success: true,
          message:
            data.language === 'es'
              ? 'Correo de reserva enviado correctamente.'
              : 'Booking email sent successfully.',
        };
      } else {
        // El email falló pero no lanzamos error crítico
        this.logger.warn(
          `Booking email failed for ${data.email}, but request processed`,
        );
        return {
          success: true,
          message:
            data.language === 'es'
              ? 'Tu solicitud de reserva fue recibida correctamente. Te contactaremos pronto.'
              : 'Your booking request was received successfully. We will contact you soon.',
          warning: 'Email notification could not be sent',
        };
      }
    } catch (error) {
      // Si es una excepción HTTP que ya lanzamos, la re-lanzamos
      if (error instanceof HttpException) {
        throw error;
      }

      // Log del error inesperado
      this.logger.error(
        'Unexpected error in sendBookingEmail',
        error instanceof Error ? error.stack : String(error),
      );

      // Respuesta genérica para errores inesperados
      throw new HttpException(
        {
          success: false,
          message:
            data?.language === 'es'
              ? 'Ocurrió un error inesperado. Por favor intenta nuevamente.'
              : 'An unexpected error occurred. Please try again.',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('contact')
  @ApiOperation({ summary: 'Enviar correo de contacto' })
  @ApiResponse({
    status: 200,
    description: 'Correo de contacto enviado correctamente',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al enviar el correo de contacto',
  })
  async sendContactEmail(@Body() data: ContactData) {
    try {
      // Validación básica de datos requeridos
      if (!data || !data.email || !data.name) {
        this.logger.warn('Contact email attempt with missing required fields');
        throw new HttpException(
          {
            success: false,
            message:
              data?.language === 'es'
                ? 'Faltan datos requeridos (nombre y email son obligatorios).'
                : 'Missing required fields (name and email are required).',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const emailSent = await this.emailService.sendContactEmail(data);

      if (emailSent) {
        this.logger.log(`Contact email sent successfully for ${data.email}`);
        return {
          success: true,
          message:
            data.language === 'es'
              ? 'Mensaje de contacto enviado correctamente. ¡Pronto te contactaremos!'
              : 'Contact message sent successfully. We will contact you soon!',
        };
      } else {
        // El email falló pero no lanzamos error crítico
        this.logger.warn(
          `Contact email failed for ${data.email}, but request processed`,
        );
        return {
          success: true,
          message:
            data.language === 'es'
              ? 'Tu mensaje fue recibido correctamente. Te contactaremos pronto.'
              : 'Your message was received successfully. We will contact you soon.',
          warning: 'Email notification could not be sent',
        };
      }
    } catch (error) {
      // Si es una excepción HTTP que ya lanzamos, la re-lanzamos
      if (error instanceof HttpException) {
        throw error;
      }

      // Log del error inesperado
      this.logger.error(
        'Unexpected error in sendContactEmail',
        error instanceof Error ? error.stack : String(error),
      );

      // Respuesta genérica para errores inesperados
      throw new HttpException(
        {
          success: false,
          message:
            data?.language === 'es'
              ? 'Ocurrió un error inesperado. Por favor intenta nuevamente.'
              : 'An unexpected error occurred. Please try again.',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
