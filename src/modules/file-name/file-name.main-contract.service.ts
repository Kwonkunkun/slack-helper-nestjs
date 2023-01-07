import { Injectable } from '@nestjs/common';
import { FileName } from './file-name';
import { MainContractFileInfo } from './interfaces';
import { InjectSlackClient, SlackClient } from 'nestjs-slack-listener';

/**
 * TODO: slack block 을 여기서 만드는게 나을듯
 * @description 주 계약
 */
@Injectable()
export class FileNameMainContractService extends FileName {
  constructor() {
    super(/([^_]+)_([^_]+)_([^_]+)_(\d{6})/g);
  }

  /**
   * @description fileName 을 받아서 적절한 slack block 을 반환
   */
  getSlackBlock(fileName: string) {
    const { customer, contractName, companyName, date } =
      this.getFileInfo(fileName);
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🎉 '${fileName}'은 주계약 파일 네이밍 룰에 맞는 이름이에요!!`,
        },
      },
      { type: 'divider' },
      { type: 'section', text: { type: 'mrkdwn', text: '*분석*' } },
      {
        type: 'section',
        fields: [
          { type: 'plain_text', text: '계약상대방', emoji: true },
          { type: 'mrkdwn', text: `${customer}` },
        ],
      },

      {
        type: 'section',
        fields: [
          { type: 'plain_text', text: '계약명', emoji: true },
          { type: 'mrkdwn', text: `${contractName}` },
        ],
      },
      {
        type: 'section',
        fields: [
          { type: 'plain_text', text: '자사명', emoji: true },
          { type: 'mrkdwn', text: `${companyName}` },
        ],
      },
      {
        type: 'section',
        fields: [
          { type: 'plain_text', text: '체결일자', emoji: true },
          { type: 'mrkdwn', text: `${date}` },
        ],
      },
      { type: 'divider' },
    ];
  }

  /**
   * @param fileName
   */
  private getFileInfo(fileName: string): MainContractFileInfo {
    const [customer, contractName, companyName, date] =
      this.separateFileName(fileName);
    return { customer, contractName, companyName, date };
  }
}
