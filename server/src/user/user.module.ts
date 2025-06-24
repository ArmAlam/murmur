import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Follow } from 'src/entities/follow.entity';
import { Murmur } from 'src/entities/murmur.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Murmur, Follow])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
