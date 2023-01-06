import { Controller, Logger } from '@nestjs/common';
import { SlackEventService } from './slack.event.service';
import {
  IncomingSlackEvent,
  IncomingSlackInteractivity,
  SlackEventHandler,
  SlackEventListener,
  SlackInteractivityHandler,
  SlackInteractivityListener,
} from 'nestjs-slack-listener';
import { MessageEvent } from 'nestjs-slack-listener/dist/slack/interfaces/incoming.interface';
import { ACTION_ID } from './slack.constants';
import { SlackInteractivityService } from './slack.interactivity.service';

@Controller()
@SlackEventListener()
@SlackInteractivityListener()
export class SlackController {
  constructor(
    private readonly slackEventService: SlackEventService,
    private readonly slackInteractivityService: SlackInteractivityService,
  ) {}

  /**
   * @description slack 에서 dm 을 처리
   * @param event
   */
  @SlackEventHandler('message')
  async handleMessage({ event }: any) {
    //자기 자신일때는 return
    if (event.bot_id) {
      return;
    }
    return await this.slackEventService.handleMessage(event as MessageEvent);
  }

  /**
   * @description app mention 이벤트 핸들러
   */
  @SlackEventHandler('app_mention')
  async handleAppMention({ event }: IncomingSlackEvent<MessageEvent>) {
    return await this.slackEventService.handleMessage(event);
  }

  /**
   * @description 파일의 이름을 만드는데 필요한 필드 작성 완료
   */
  @SlackInteractivityHandler(ACTION_ID.COMPLETE_FILE_NAMING_QUESTION)
  async handleCompleteFileNamingQuestion({
    actions: [{ value: questUserId }],
  }: IncomingSlackInteractivity) {
    await this.slackInteractivityService.handleCompleteFileNamingQuestion(
      questUserId,
    );
  }
}
