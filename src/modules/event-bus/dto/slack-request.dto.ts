import { IsBoolean, IsObject, IsString } from 'class-validator';

export class SlackRequestDto {
  @IsObject()
  event: Event;
  @IsString()
  token: string;

  @IsString()
  team_id: string;

  @IsString()
  api_app_id: string;

  @IsString()
  Blocks: any[];

  @IsString()
  type: string;

  @IsString()
  event_id: string;

  @IsString()
  event_time: number;

  @IsObject({ each: true })
  authorizations: Authorization[];

  @IsBoolean()
  is_ext_shared_channel: boolean;

  @IsString()
  event_context: string;
}

interface Authorization {
  enterprise_id?: any;
  team_id: string;
  user_id: string;
  is_bot: boolean;
  is_enterprise_install: boolean;
}

interface Event {
  type: string;
}
