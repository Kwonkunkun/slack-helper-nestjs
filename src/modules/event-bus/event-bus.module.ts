import { Module } from '@nestjs/common';
import { EventBusService } from './event-bus.service';
import { EventBusController } from './event-bus.controller';
import { MentionModule } from '../modules/mention/mention.module';

/**
 * @module EventBusModule
 * @description slack event api 의 event type 별로 모듈을 분리하여 처리, splash command 는 예외
 */
@Module({
  imports: [MentionModule],
  controllers: [EventBusController],
  providers: [EventBusService],
})
export class EventBusModule {}
