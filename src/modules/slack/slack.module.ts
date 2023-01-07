import { Module } from '@nestjs/common';
import { SlackEventService } from './slack.event.service';
import { SlackController } from './slack.controller';
import { SlackInteractivityService } from './slack.interactivity.service';
import { FileNameModule } from '../file-name/file-name.module';

@Module({
  imports: [FileNameModule],
  controllers: [SlackController],
  providers: [SlackEventService, SlackInteractivityService],
})
export class SlackModule {}
