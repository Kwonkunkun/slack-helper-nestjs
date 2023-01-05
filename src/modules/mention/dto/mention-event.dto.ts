import { IsString } from 'class-validator';

export class MentionEvent {
  @IsString()
  client_msg_id: string;
  @IsString()
  type: string;
  @IsString()
  text: string;
  @IsString()
  user: string;
  @IsString()
  ts: string;
  @IsString()
  team: string;
  @IsString()
  channel: string;
  @IsString()
  event_ts: string;
}
