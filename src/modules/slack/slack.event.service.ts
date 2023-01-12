import { Injectable, Logger } from '@nestjs/common';
import { MessageEvent } from 'nestjs-slack-listener/dist/slack/interfaces/incoming.interface';
import { HELP_MESSAGE_BLOCK, RULE_MESSAGE_BLOCK } from './slack.constants';
import { InjectSlackClient, SlackClient } from 'nestjs-slack-listener';
import { FileNameMainContractService } from '../file-name/file-name.main-contract.service';
import { FileNameSubContractService } from '../file-name/file-name.sub-contract.service';
import { CusswordService } from '../cussword/cussword.service';
import { GoogleDriveService } from '@app/google-drive';
import {
  generateGoogleDriveSearchSlackBlock,
  generateMainContractFileNameCheckSlackBlock,
  generateSubContractFileNameCheckSlackBlock,
  getAfterText,
  isCommand,
} from './slack.util';

@Injectable()
export class SlackEventService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly fileNameMainContractService: FileNameMainContractService,
    private readonly fileNameSubContractService: FileNameSubContractService,
    private readonly cusswordService: CusswordService,
    private readonly googleDriveService: GoogleDriveService,
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
    if (isCommand(text, '확인')) {
      //command 이후의 문자 추출
      const fileName = getAfterText(text, '확인');

      this.logger.debug(fileName);
      //주계약의 경우
      if (this.fileNameMainContractService.isValid(fileName)) {
        return await this.slack.chat.postMessage({
          channel: event.channel,
          blocks: generateMainContractFileNameCheckSlackBlock(
            fileName,
            this.fileNameMainContractService.getFileInfo(fileName),
          ),
        });
      }

      //부수 계약의 경우
      if (this.fileNameSubContractService.isValid(fileName)) {
        return await this.slack.chat.postMessage({
          channel: event.channel,
          blocks: generateSubContractFileNameCheckSlackBlock(
            fileName,
            this.fileNameSubContractService.getFileInfo(fileName),
          ),
        });
      }

      //파일 이름이 룰에 위배되는 경우
      return await this.slack.chat.postMessage({
        channel: event.channel,
        text: `☹️'${fileName}'은 파일 네이밍 룰에 위배됩니다! '룰'을 확인해주세요!.`,
      });
    }

    //찾기 명령어라면
    if (isCommand(text, '찾기')) {
      //command 이후의 문자 추출
      const query = getAfterText(text, '찾기');
      const files = await this.googleDriveService.find(query);

      //파일이 없는 경우
      if (files.length === 0) {
        return await this.slack.chat.postMessage({
          channel: event.channel,
          text: `☹️'${query}'에 해당하는 파일이 없습니다ㅠ`,
        });
      }

      return await this.slack.chat.postMessage({
        channel: event.channel,
        blocks: generateGoogleDriveSearchSlackBlock(files),
      });
    }

    //룰 확인 명령어라면
    if (isCommand(text, '룰')) {
      return await this.slack.chat.postMessage({
        channel: event.channel,
        blocks: RULE_MESSAGE_BLOCK,
      });
    }

    //도움 명령어라면
    if (isCommand(text, '도움')) {
      return await this.slack.chat.postMessage({
        channel: event.channel,
        blocks: HELP_MESSAGE_BLOCK,
      });
    }

    //욕설이 섞여있다면
    if (this.cusswordService.isCussWord(text)) {
      return await this.slack.chat.postMessage({
        channel: event.channel,
        text: '🫥 욕설은 마라...',
      });
    }

    //전부 해당되지 않을때
    return await this.slack.chat.postMessage({
      channel: event.channel,
      text: `😰 해당되는 기능을 찾을 수 없습니다.`,
    });
  }

  /**
   * @description 봇인지 확인하는 함수
   */
  isBot(event: MessageEvent) {
    return 'bot_id' in event;
  }
}
