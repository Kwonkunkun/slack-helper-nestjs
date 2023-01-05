import { Module } from '@nestjs/common';
import { MentionService } from './mention.service';

/**
 * @module MentionModule
 * @description slack mention event 처리를 담당하는 모듈 controller x
 */
@Module({
  providers: [MentionService],
  exports: [MentionService],
})
export class MentionModule {}
