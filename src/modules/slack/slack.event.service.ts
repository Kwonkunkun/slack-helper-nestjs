import { Injectable, Logger } from '@nestjs/common';
import { MessageEvent } from 'nestjs-slack-listener/dist/slack/interfaces/incoming.interface';
import { ACTION_ID, HELP_MESSAGE_BLOCK } from './slack.constants';
import { InjectSlackClient, SlackClient } from 'nestjs-slack-listener';

@Injectable()
export class SlackEventService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectSlackClient()
    private readonly slack: SlackClient,
  ) {}

  /**
   * @description app mention 이벤트 핸들러
   * @param event MessageEvent
   */
  async handleMessage(event: MessageEvent) {
    this.logger.debug(event);

    //text 에 따라서 다른 handler 실행
    const { text } = event;

    //도움 명령어라면
    if (this.isHelpCommand(text)) {
      return await this.slack.chat.postMessage(
        this.buildSlackBlock(event.channel, HELP_MESSAGE_BLOCK),
      );
    }

    //파일 이름 확인 명령어라면
    // if (this.isFileNameCheckCommand(text)) {
    //   await this.slack.chat.postMessage(
    //     this.buildFileNamingQuestionBlock(event.channel),
    //   );
    // }

    //전부 해당되지 않을때
    return await this.slack.chat.postMessage({
      channel: event.channel,
      text: `❌ ${text}에 해당되는 기능을 찾을 수 없습니다.`,
    });
  }

  /**
   * @description 파일의 이름을 만드는데 필요한 필드 작성
   * @param channel
   * @param blocks slack block
   * @private
   */
  private buildSlackBlock(channel: string, blocks: any[]) {
    return {
      channel: channel,
      blocks,
    };
  }

  /**
   * @description 파일 이름 확인 명령어인지 체크
   */
  private isFileNameCheckCommand(text: string) {
    const regex = /^.*(확인|check).*/g;
    return regex.test(text);
  }

  /**
   * @description 도움 명령어인지 체크
   */
  private isHelpCommand(text: string) {
    const regex = /^.*(도움|help).*/g;
    return regex.test(text);
  }
}
