import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { mid } from './request-context'

!(async () => {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.use(mid)
  app.use(cookieParser())
  await app.listen(3000)
})()
