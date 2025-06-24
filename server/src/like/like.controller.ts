import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('api/murmurs')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id/like')
  like(@Param('id') murmurId: string, @Body('userId') userId: number) {
    return this.likeService.likeMurmur(userId, +murmurId);
  }

  @Delete(':id/like')
  unlike(@Param('id') murmurId: string, @Body('userId') userId: number) {
    return this.likeService.unlikeMurmur(userId, +murmurId);
  }
}
