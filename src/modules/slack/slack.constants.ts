export const ACTION_ID = {
  COMPLETE_FILE_NAMING_QUESTION: 'complete_file_naming_question',
};

export const HELP_MESSAGE_BLOCK = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'π μλνμΈμ¬ μ λ νμΌλ΄μ΄μμ¬',
    },
  },
  { type: 'divider' },
  {
    type: 'section',
    text: { type: 'mrkdwn', text: '*νμΌ λ€μ΄λ° (dm μ΄λ mention)*' },
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: 'λ£°μ λ§λ νμΌ μ΄λ¦μΈμ§ νμ€νΈ ν΄λ³Όμ μλ κΈ°λ₯',
        emoji: true,
      },
      { type: 'mrkdwn', text: 'νμΈ `[fileName]`' },
    ],
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: 'λ£°μ μλ €μ£Όλ κΈ°λ₯',
        emoji: true,
      },
      { type: 'mrkdwn', text: 'λ£°' },
    ],
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: 'google drive νμΌμ μ°Ύμμ μλ κΈ°λ₯',
        emoji: true,
      },
      { type: 'mrkdwn', text: 'μ°ΎκΈ° `[κ²μλͺ]`' },
    ],
  },
  { type: 'divider' },
  {
    type: 'section',
    text: { type: 'mrkdwn', text: '*κ·Έ μΈ*' },
  },
  {
    type: 'section',
    fields: [
      {
        type: 'plain_text',
        text: 'λμμ΄ νμν λλ!',
        emoji: true,
      },
      { type: 'mrkdwn', text: 'λμ' },
    ],
  },
];

export const RULE_MESSAGE_BLOCK = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'π *λ£°μ λ€μκ³Ό κ°μμ¬!*',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*[κ³μ½μλͺ κ·μΉ]* \n *μ£Όκ³μ½μ κ²½μ°* : κ³μ½μλλ°©_κ³μ½λͺ_μμ¬λͺ_μ²΄κ²°μΌμ \n *λΆμκ³μ½μ κ²½μ°* : κ³μ½μλλ°©_λ³Έκ³μ½λͺ_λΆμκ³μ½λͺ_μμ¬λͺ_μ²΄κ²°μΌμ',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*[μμ]* \n *μ£Όκ³μ½* : μλΌμμ΄νΈ_μμ°μμλκ³μ½_μλΌμμΏΌν°μ½λ¦¬μ002_221202 \n *λΆμκ³μ½* : JAμλΌ_λ¬Όνκ³΅κΈκ³μ½_ν©μμ_μλΌμ΄νΌ_221205',
    },
  },
];
