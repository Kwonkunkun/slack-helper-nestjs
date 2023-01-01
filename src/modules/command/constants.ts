/**
 * @description command 목록
 */
export const commands = ['help', 'isValid', 'invalidCommand'] as const;
export type Command = typeof commands[number];
