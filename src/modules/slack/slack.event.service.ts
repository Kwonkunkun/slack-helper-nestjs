import { Injectable, Logger } from '@nestjs/common';
import { MessageEvent } from 'nestjs-slack-listener/dist/slack/interfaces/incoming.interface';
import {ACTION_ID, HELP_MESSAGE_BLOCK, RULE_MESSAGE_BLOCK} from './slack.constants';
import { InjectSlackClient, SlackClient } from 'nestjs-slack-listener';
import { FileNameMainContractService } from '../file-name/file-name.main-contract.service';
import { FileNameSubContractService } from '../file-name/file-name.sub-contract.service';

@Injectable()
export class SlackEventService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly fileNameMainContractService: FileNameMainContractService,
    private readonly fileNameSubContractService: FileNameSubContractService,
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

    //파일 이름 확인 명령어라면
    if (this.isFileNameCheckCommand(text)) {
      //command 이후의 문자 추출
      const fileName = text.replace(/.*(확인|check)/g, '').trim();

      this.logger.debug(fileName);
      //주계약의 경우
      if (this.fileNameMainContractService.isValid(fileName)) {
        return await this.slack.chat.postMessage({
          channel: event.channel,
          blocks: this.fileNameMainContractService.getSlackBlock(fileName),
        });
      }

      //부수 계약의 경우
      if (this.fileNameSubContractService.isValid(fileName)) {
        return await this.slack.chat.postMessage({
          channel: event.channel,
          blocks: this.fileNameSubContractService.getSlackBlock(fileName),
        });
      }

      //파일 이름이 룰에 위배되는 경우
      return await this.slack.chat.postMessage({
        channel: event.channel,
        text: `'${fileName}'은 파일 네이밍 룰에 위배됩니다! '룰'을 확인해주세요!.`,
      });
    }

    //도움 명령어라면
    if (this.isHelpCommand(text)) {
      return await this.slack.chat.postMessage({
        channel: event.channel,
        blocks: HELP_MESSAGE_BLOCK,
      });
    }

    //룰 확인 명령어라면
    if (this.isRuleCommand(text)) {
      return await this.slack.chat.postMessage({
        channel: event.channel,
        blocks: RULE_MESSAGE_BLOCK,
      });
    }

    //전부 해당되지 않을때
    return await this.slack.chat.postMessage({
      channel: event.channel,
      text: `❌ 해당되는 기능을 찾을 수 없습니다.`,
    });
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

  /**
   * @description 룰 확인 명령어인지 체크
   */
  private isRuleCommand(text: string) {
    const regex = /^.*(룰|룰알려주|파일룰|rule).*/g;
    return regex.test(text);
  }
}
