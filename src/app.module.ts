import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ← Hace que ConfigModule esté disponible globalmente
    }),
    EmailModule, // ← Solo importa el EmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
