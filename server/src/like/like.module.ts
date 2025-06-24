import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { User } from 'src/entities/user.entity';
import { Murmur } from 'src/entities/murmur.entity';
import { Like } from 'src/entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Murmur, User])],
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikeModule {}
