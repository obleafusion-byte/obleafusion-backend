import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ← Hace que ConfigModule esté disponible globalmente
    }),
    EmailModule, // ← Solo importa el EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
