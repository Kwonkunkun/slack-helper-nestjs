import { IsString } from 'class-validator';

export class SlackUriVerificationRequestDto {
  @IsString()
  token: string;

  @IsString()
  challenge: string;

  @IsString()
  type: string;
}
