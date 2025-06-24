import { Controller, Post, Body, Delete, Param, Get, Query } from '@nestjs/common';
import { MurmurService } from './murmur.service';

@Controller('api')
export class MurmurController {
  constructor(private readonly murmurService: MurmurService) {}

  @Post('me/murmurs')
  create(@Body() body: { userId: number; content: string }) {
    return this.murmurService.createMurmur(body.userId, body.content);
  }

  @Delete('me/murmurs/:id')
  delete(@Param('id') id: string, @Body('userId') userId: number) {
    return this.murmurService.deleteMurmur(+id, userId);
  }

  @Get('murmurs/timeline')
  getTimeline(@Query('userId') userId: number, @Query('page') page = 1) {
    return this.murmurService.getTimeline(userId, +page);
  }

  @Get('murmurs/:id')
  getDetail(@Param('id') id: string) {
    return this.murmurService.getMurmurDetail(+id);
  }
}
