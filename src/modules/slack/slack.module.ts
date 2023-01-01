import { Module } from '@nestjs/common';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://slack.com/api',
        timeout: 5000,
        maxRedirects: 5,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${configService.get('SLACK_TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SlackController],
  providers: [SlackService],
})
export class SlackModule {}
