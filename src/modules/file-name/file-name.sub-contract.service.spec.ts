import { Test, TestingModule } from '@nestjs/testing';
import { FileNameSubContractService } from './file-name.sub-contract.service';

describe('FileNameSubContractService', () => {
  let service: FileNameSubContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileNameSubContractService],
    }).compile();

    service = module.get<FileNameSubContractService>(
      FileNameSubContractService,
    );
  });

  it('FileNameSubContractService lint', () => {
    expect(
      service.isValid('JA솔라_물품공급계약_합의서_엔라이튼_221205'),
    ).toBeTruthy();
    expect(
      service.isValid('솔라커넥트_양도계약서_엔라이튼_950822'),
    ).toBeFalsy();
    expect(
      service.isValid('JA솔라__물품공급계약_합의서_엔라이튼_221205'),
    ).toBeFalsy();
  });

  it('FileNameSubContractService getFileName', () => {
    expect(
      service.getFileName(
        '솔라커넥트',
        '양도계약서',
        '합의서',
        '엔라이튼',
        '950822',
      ),
    ).toEqual('솔라커넥트_양도계약서_합의서_엔라이튼_950822');
  });

  it('FileNameSubContractService getFileInfo', () => {
    expect(
      service.separateFileName('JA솔라_물품공급계약_합의서_엔라이튼_221205'),
    ).toEqual(['JA솔라', '물품공급계약', '합의서', '엔라이튼', '221205']);
  });
});
