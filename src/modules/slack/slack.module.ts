import { Module } from '@nestjs/common';
import { SlackEventService } from './slack.event.service';
import { SlackController } from './slack.controller';
import { SlackInteractivityService } from './slack.interactivity.service';
import { FileNameModule } from '../file-name/file-name.module';
import {CusswordModule} from '../cussword/cussword.module';

@Module({
  imports: [FileNameModule, CusswordModule],
  controllers: [SlackController],
  providers: [SlackEventService, SlackInteractivityService],
})
export class SlackModule {}
