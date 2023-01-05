/**
 * @description command 목록
 */
export const commands = [
  'help',
  'isValid',
  'invalidCommand',
  'invalidFileName',
] as const;
export type Command = typeof commands[number];
