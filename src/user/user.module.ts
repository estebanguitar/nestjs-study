import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET,
      global: true,
      signOptions: { expiresIn: 5 }
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
