import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { SlackModule } from './modules/slack/slack.module';
import { ConfigModule } from './config/config.module';
import { CommandModule } from './modules/command/command.module';

@Module({
  imports: [HealthModule, SlackModule, ConfigModule, CommandModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
