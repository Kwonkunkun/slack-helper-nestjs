import { Body, Controller, Post, Req } from '@nestjs/common';
import { EventBusService } from './event-bus.service';

@Controller('slack')
export class EventBusController {
  constructor(private readonly routerService: EventBusService) {}

  /**
   * TODO: 보안쪽은 일단 생략 참고링크: https://api.slack.com/authentication/verifying-requests-from-slack
   * health check, receive mention 기능이 같은 url 로 들어오기 때문에 유의할것
   */
  @Post()
  receiveEvent(@Req() req, @Body() body: any) {
    return this.routerService.receiveEvent(body);
  }
}
