import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  // app.useGlobalGuards(new (AuthGuard('jwt')))
  await app.listen(3000);
}
bootstrap();
