import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserProfile(+id);
  }

  @Post(':id/follow')
  follow(@Param('id') followingId: string, @Body('followerId') followerId: number) {
    return this.userService.followUser(followerId, +followingId);
  }

  @Delete(':id/follow')
  unfollow(@Param('id') followingId: string, @Body('followerId') followerId: number) {
    return this.userService.unfollowUser(followerId, +followingId);
  }
}
