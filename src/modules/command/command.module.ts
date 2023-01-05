import { Module } from '@nestjs/common';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';

/**
 * @module CommandModule
 * @description Slack Slash Command 모듈
 */
@Module({
  controllers: [CommandController],
  providers: [CommandService],
})
export class CommandModule {}
