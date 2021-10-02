import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FarewellPipe } from './common/pipes/farewell.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('farewell/:farewell')
  getGreetings(
    @Param('farewell', FarewellPipe) farewell: string,
    @Query('repeat', ParseIntPipe) repeat: number,
  ) {
    let message = `Hello, Hello. I don't know why you say ${farewell} and I say Hello.`;
    if (repeat === 1) {
      message = `${message} \n ${message}`;
    }
    return {
      message,
      serv: this.appService.getHello(),
    };
  }
}
