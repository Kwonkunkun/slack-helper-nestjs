import { Injectable, Logger } from '@nestjs/common';
import { SlackUriVerificationRequestDto } from './dto/slack-uri-verification-request.dto';
import { MentionService } from '../modules/mention/mention.service';
import { SlackRequestDto } from './dto/slack-request.dto';
import { MentionEvent } from '../modules/mention/dto/mention-event.dto';

@Injectable()
export class EventBusService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly mentionService: MentionService) {}

  async receiveEvent(body: any) {
    //url_verification 인 경우 challenge 값 반환
    if (body.type === 'url_verification') {
      const { challenge } = body as SlackUriVerificationRequestDto;
      return challenge;
    }

    //event_callback 인 경우
    if (body.type === 'event_callback') {
      const { event } = body as SlackRequestDto;

      this.logger.debug(event.type);
      if (event.type === 'app_mention') {
        return await this.mentionService.handleEvent(event as MentionEvent);
      }
    }
  }
}
