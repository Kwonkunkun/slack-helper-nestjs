import {
  MainContractFileInfo,
  SubContractFileInfo,
} from '../file-name/interfaces';

/**
 * @description checkText 가 text 에 포함되어있는지 확인
 */
export const isCommand = (text: string, checkText: string) => {
  const regExp = new RegExp(`^.*${checkText}.*`, 'g');
  return regExp.test(text);
};

/**
 * @description 특정 문자이후의 문자 추출
 */
export const getAfterText = (text: string, checkText: string) => {
  const regExp = new RegExp(`.*${checkText}`, 'g');
  return text.replace(regExp, '').trim();
};

/**
 * @description google drive search 성공시 사용할 slack block builder
 */
export const generateGoogleDriveSearchSlackBlock = (
  items: { id: string; name: string; url: string }[],
) => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '😀 Google Drive 검색 결과에요!',
      },
    },
    {
      type: 'divider',
    },
    ...items.map(({ name, url }) => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: name,
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: '링크로 이동',
          emoji: true,
        },
        value: 'click_me_123',
        url: `${url}`,
        action_id: 'button-action',
      },
    })),
  ];
};

/**
 * @description 주계약 파일명 검사 성공시 사용할 slack block builder
 */
export const generateMainContractFileNameCheckSlackBlock = (
  fileName: string,
  { customer, contractName, companyName, date }: MainContractFileInfo,
) => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `😁 '${fileName}'은 주계약 파일 네이밍 룰에 맞는 이름이에요!!`,
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
};

/**
 * @description 부수계약 파일명 검사 실패시 사용할 slack block builder
 */
export const generateSubContractFileNameCheckSlackBlock = (
  fileName: string,
  {
    customer,
    mainContractName,
    subContractName,
    companyName,
    date,
  }: SubContractFileInfo,
) => {
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
};
