import { Test, TestingModule } from '@nestjs/testing';
import { CommandService } from './command.service';

describe('CommandService', () => {
  let service: CommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandService],
    }).compile();

    service = module.get<CommandService>(CommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('isValid function 에 있는 regex test', () => {
    const regex = /([^_]+)_([^_]+)_([^_]+)_(\d{6,8})/g;
    expect(regex.test('솔라 커넥트_양도계약서_엔라이튼_950822')).toBeTruthy();
    expect(regex.test('_양도계약서_엔라이튼_950822')).toBeFalsy();
    expect(regex.test('솔라커넥트_양도계약서_엔라이튼_19950822')).toBeTruthy();
    expect(regex.test('솔라커넥트__엔라이튼_19950822')).toBeFalsy();
    expect(regex.exec('솔라 커넥트_양도계약서_엔라이튼_19950822')).toEqual([
      '솔라커넥트_양도계약서_엔라이튼_19950822',
      '솔라커넥트',
      '양도계약서',
      '엔라이튼',
      '19950822',
    ]);
  });

  it('getCommandOption function test', () => {
    expect(
      service.getCommandOption(
        'isValid 솔라 커넥트_양도계약서_엔라이튼_19950822',
      ),
    ).toEqual('솔라 커넥트_양도계약서_엔라이튼_19950822');
  });
});
