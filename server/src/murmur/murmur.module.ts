import { Module } from '@nestjs/common';
import { MurmurService } from './murmur.service';
import { MurmurController } from './murmur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Murmur } from 'src/entities/murmur.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User, Murmur])],
  providers: [MurmurService],
  controllers: [MurmurController]
})
export class MurmurModule {}
