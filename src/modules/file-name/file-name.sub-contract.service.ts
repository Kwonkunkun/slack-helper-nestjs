import { Injectable } from '@nestjs/common';
import { FileName } from './file-name';
import { SubContractFileInfo } from './interfaces';

/**
 * @description 부수 계약
 */
@Injectable()
export class FileNameSubContractService extends FileName {
  constructor() {
    super(/^([^_]+)_([^_]+)_([^_]+)_([^_]+)_(\d{6})/g);
  }

  /**
   * @description fileName 을 받아서 적절한 slack block 을 반환
   */
  getSlackBlock(fileName: string) {
    const { customer, mainContractName, subContractName, companyName, date } =
      this.getFileInfo(fileName);
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `😁 '${fileName}'은 부수계약 파일 네이밍 룰에 맞는 이름이에요!!`,
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
          { type: 'plain_text', text: '주계약명', emoji: true },
          { type: 'mrkdwn', text: `${mainContractName}` },
        ],
      },
      {
        type: 'section',
        fields: [
          { type: 'plain_text', text: '부수계약명', emoji: true },
          { type: 'mrkdwn', text: `${subContractName}` },
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
  getFileInfo(fileName: string): SubContractFileInfo {
    const [customer, mainContractName, subContractName, companyName, date] =
      this.separateFileName(fileName);
    return { customer, mainContractName, subContractName, companyName, date };
  }
}
