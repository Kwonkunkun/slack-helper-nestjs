import { Injectable, Logger } from '@nestjs/common';
import { CommandRequestDto } from './dto/command-request.dto';
import { Command, commands } from './constants';

@Injectable()
export class CommandService {
  /**
   * Slack Slash Command 처리
   * @param body
   */
  command(body: CommandRequestDto) {
    Logger.debug(body);

    // 유효한 커맨드인지 확인
    const { text } = body;
    const isValid = this.isValidCommand(text);

    //유효하지 않을 경우의 처리
    if (!isValid) {
      return this.invalidCommand();
    }

    // 유효한 커맨드일 경우 커맨드의 종류에 따른 처리
    return this.commandHandler(text as Command);
  }

  /**
   * 유효한 커맨드일 경우 커맨드의 종류에 따른 처리
   */
  private commandHandler(command: Command) {
    switch (command) {
      case 'help':
        return this.help();
    }
  }

  /**
   * help 커맨드 처리
   */
  private help() {
    return {
      blocks: [
        {
          type: 'section',
          text: { type: 'mrkdwn', text: "Hi! I'm enlighten helper" },
        },
        { type: 'divider' },
        { type: 'section', text: { type: 'mrkdwn', text: '*File naming*' } },
        {
          type: 'section',
          fields: [
            {
              type: 'plain_text',
              text: 'Is Valid fileNaming rule?',
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
              text: 'show valid file name helper',
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
   * 유효하지 않을 경우의 처리
   */
  private invalidCommand() {
    return '❌ 유효하지 않은 커맨드입니다.';
  }

  /**
   * 유효한 커맨드인지 확인
   */
  private isValidCommand(text: string) {
    return commands.includes(text as Command);
  }
}
