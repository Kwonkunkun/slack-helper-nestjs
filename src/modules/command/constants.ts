/**
 * command 목록
 */
export const commands = ['help'] as const;
export type Command = typeof commands[number];
