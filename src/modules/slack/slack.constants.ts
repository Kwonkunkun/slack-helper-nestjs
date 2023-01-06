export const ACTION_ID = {
  COMPLETE_FILE_NAMING_QUESTION: 'complete_file_naming_question',
};

export const HELP_MESSAGE_BLOCK = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '😃 안녕하세여 저는 파일봇이에여',
    },
  },
  { type: 'divider' },
  {
    type: 'section',
    text: { type: 'mrkdwn', text: '*파일 네이밍 (dm 이나 mention)*' },
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: '네이밍 룰에 맞는 파일 이름인지 테스트 해볼수 있는 기능',
        emoji: true,
      },
      { type: 'mrkdwn', text: '확인|check `[fileName]`' },
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
      { type: 'mrkdwn', text: '만들기|make' },
    ],
  },
  { type: 'divider' },
];
