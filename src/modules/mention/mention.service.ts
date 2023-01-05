import { Injectable, Logger } from '@nestjs/common';
import { SlackService } from '../slack/slack.service';
import { MentionEvent } from './dto/mention-event.dto';

@Injectable()
export class MentionService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly slackService: SlackService) {}

  /**
   * @description mention event handler
   */
  async handleEvent(event: MentionEvent) {
    this.logger.debug(event);

    const { channel } = event;

    //TODO: 이 부분은 나중에 더 구현해야함
    return await this.slackService.sendMessage(channel, 'hello');
  }
}
