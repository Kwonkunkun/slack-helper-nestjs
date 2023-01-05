import { Injectable, Logger } from '@nestjs/common';
import { CommandRequestDto } from './dto/command-request.dto';
import { Command, commands } from './constants';

@Injectable()
export class CommandService {
  /**
   * @param body
   * @description Slack Slash Command 처리
   */
  command(body: CommandRequestDto) {
    const { text } = body;

    // 커맨드의 종류에 따른 처리
    return this.commandHandler(
      this.getCommandType(text),
      this.getCommandOption(text),
    );
  }

  /**
   * @description 유효한 커맨드일 경우 커맨드의 종류에 따른 처리
   */
  private commandHandler(command: Command, commandOption?: string) {
    Logger.debug(command);
    switch (command) {
      case 'help':
        return this.help();
      case 'isValid':
        return this.isValid(commandOption);

      default:
        return this.invalidCommand();
    }
  }

  /**
   * @param fileName 체크해볼 파일 이름
   * @description isValid 커맨드 처리, 파일 이름이 유효한지 확인 후 유효하지 않을 경우 어떤 부분이 유효하지 않은지 알려줌
   */
  private isValid(fileName: string) {
    //법인명_서류이름_보내는사람_날짜 인지 체크
    const regex = /([^_]+)_([^_]+)_([^_]+)_(\d{6,8})/g;
    if (!regex.test(fileName)) {
      return `❌ ${fileName}은 형식이 맞지 않습니다. \n[법인명_서류이름_보내는사람_날짜] 형식으로 작성했는지 확인해보세요!`;
    }

    Logger.debug(fileName);
    regex.lastIndex = 0;
    const [, ...sections] = regex.exec(fileName);
    const [corporation, docs, receiver, date] = sections;

    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `🎉 ${fileName}은 파일 네이밍 룰에 맞는 이름이에요!!`,
          },
        },
        { type: 'divider' },
        { type: 'section', text: { type: 'mrkdwn', text: '*분석*' } },
        {
          type: 'section',
          fields: [
            { type: 'plain_text', text: '법인명', emoji: true },
            { type: 'mrkdwn', text: `${corporation}` },
          ],
        },

        {
          type: 'section',
          fields: [
            { type: 'plain_text', text: '서류이름', emoji: true },
            { type: 'mrkdwn', text: `${docs}` },
          ],
        },
        {
          type: 'section',
          fields: [
            { type: 'plain_text', text: '보내는사람', emoji: true },
            { type: 'mrkdwn', text: `${receiver}` },
          ],
        },
        {
          type: 'section',
          fields: [
            { type: 'plain_text', text: '날짜', emoji: true },
            { type: 'mrkdwn', text: `${date}` },
          ],
        },
        { type: 'divider' },
      ],
    };
  }

  /**
   * @description help 커맨드 처리
   */
  private help() {
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '안녕하세여 저는 엔라이튼 봇이에여 크킄',
          },
        },
        { type: 'divider' },
        { type: 'section', text: { type: 'mrkdwn', text: '*파일 네이밍 룰*' } },
        {
          type: 'section',
          fields: [
            {
              type: 'plain_text',
              text: '네이밍 룰에 맞는 파일 이름인지 테스트 해볼수 있는 기능',
              emoji: true,
            },
            { type: 'mrkdwn', text: '`/enlightenHelper isValid [fileName]`' },
          ],
        },
        {
          type: 'section',
          fields: [
            {
              type: 'plain_text',
              text: '파일 네이밍을 지어주는 기능',
              emoji: true,
            },
            { type: 'mrkdwn', text: '`/enlightenHelper fileName`' },
          ],
        },
        { type: 'divider' },
      ],
    };
  }

  /**
   * @description invalid 한 커맨드 처리
   */
  private invalidCommand() {
    return '❌ 유효하지 않은 커맨드입니다.';
  }

  /**
   * @description text 를 확인해보고, command 의 옵션을 반환
   */
  getCommandOption(text: string): string | undefined {
    const commandOption = text
      .split(' ')
      .filter((v, idx) => idx !== 0)
      .join(' ');
    if (!commandOption) {
      return undefined;
    }
    return commandOption;
  }

  /**
   * @description text 를 확인해보고, command 의 종류를 반환
   */
  private getCommandType(text: string): Command {
    const command = text.split(' ')[0] as Command;
    if (!this.isValidCommand(command)) {
      return 'invalidCommand';
    }
    return command;
  }

  /**
   * @description 유효한 커맨드인지 확인
   */
  private isValidCommand(text: string) {
    let isValid = false;
    text.split(' ').forEach((command) => {
      if (commands.includes(command as Command)) {
        return (isValid = true);
      }
    });
    return isValid;
  }

  /**
   * @private
   * @description 파일 네이밍 룰에 맞는지 확인
   * @param fileName
   */
  private isValidFileName(fileName: string) {
    //법인명_서류이름_보내는사람_날짜 인지 체크
    const regex = /([^_]+)_([^_]+)_([^_]+)_(\d{6,8})/g;
    return regex.test(fileName);
  }
}
