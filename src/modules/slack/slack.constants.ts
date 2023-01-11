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
        text: '룰에 맞는 파일 이름인지 테스트 해볼수 있는 기능',
        emoji: true,
      },
      { type: 'mrkdwn', text: '확인 `[fileName]`' },
    ],
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: '룰을 알려주는 기능',
        emoji: true,
      },
      { type: 'mrkdwn', text: '룰' },
    ],
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: 'google drive 파일을 찾을수 있는 기능',
        emoji: true,
      },
      { type: 'mrkdwn', text: '찾기 `[검색명]`' },
    ],
  },
  { type: 'divider' },
  {
    type: 'section',
    text: { type: 'mrkdwn', text: '*그 외*' },
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: '도움이 필요할때는!',
        emoji: true,
      },
      { type: 'mrkdwn', text: '도움' },
    ],
  },
];

export const RULE_MESSAGE_BLOCK = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '👇 *룰은 다음과 같아여!*',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*[계약서명 규칙]* \n *주계약의 경우* : 계약상대방_계약명_자사명_체결일자 \n *부수계약의 경우* : 계약상대방_본계약명_부속계약명_자사명_체결일자',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*[예시]* \n *주계약* : 솔라원이호_자산양수도계약_솔라에쿼티코리아002_221202 \n *부수계약* : JA솔라_물품공급계약_합의서_엔라이튼_221205',
    },
  },
];
