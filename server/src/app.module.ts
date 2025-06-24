import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Murmur } from './entities/murmur.entity';
import { Like } from './entities/like.entity';
import { Follow } from './entities/follow.entity';
import { MurmurModule } from './murmur/murmur.module';
import { LikeModule } from './like/like.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MurmurModule,
    LikeModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'test',
      entities: [User, Murmur, Like, Follow],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Murmur]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
