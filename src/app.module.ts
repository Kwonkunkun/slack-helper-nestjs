import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { SlackModule } from './modules/slack/slack.module';
import { ConfigModule } from './config/config.module';
import { CommandModule } from './modules/command/command.module';
import { EventBusModule } from './modules/event-bus/event-bus.module';

/**
 * @module AppModule
 * @description 모듈을 등록하는 메인 모듈
 */
@Module({
  imports: [
    HealthModule,
    SlackModule,
    ConfigModule,
    CommandModule,
    EventBusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
