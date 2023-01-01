import { Body, Controller, Post } from '@nestjs/common';
import { CommandRequestDto } from './dto/command-request.dto';
import { CommandService } from './command.service';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  /**
   * Slack Slash Command 처리
   * @param body Slack Slash Command Request Body
   */
  @Post()
  command(@Body() body: CommandRequestDto) {
    return this.commandService.command(body);
  }
}
