import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.use(cookieParser())
  await app.listen(3000)
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
bootstrap()
