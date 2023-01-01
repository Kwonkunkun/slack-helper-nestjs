import { IsString } from 'class-validator';

export class SlackResponseDto {
  @IsString()
  type: string;

  @IsString()
  user: string;

  @IsString()
  text: string;

  @IsString()
  ts: string;

  @IsString()
  channel: string;

  @IsString()
  event_ts: string;
}
