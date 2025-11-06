import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ← AGREGA ESTO
  app.setGlobalPrefix('api');
  // Habilita CORS si lo necesitas
  app.enableCors();
  const port = process.env.PORT || 3010;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}/api`);
}
bootstrap();
