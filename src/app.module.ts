import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule } from './config/config.module';
import { SlackModule } from './modules/slack/slack.module';
import { SlackModule as SlackListenerModule } from 'nestjs-slack-listener';
import { ConfigService } from '@nestjs/config';

/**
 * @module AppModule
 * @description 모듈을 등록하는 메인 모듈
 */
@Module({
  imports: [
    ConfigModule,
    SlackListenerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        botToken: configService.get('SLACK_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    SlackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
