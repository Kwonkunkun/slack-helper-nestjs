import { Test, TestingModule } from '@nestjs/testing';
import { FileNameMainContractService } from './file-name.main-contract.service';

describe('FileNameMainContractService', () => {
  let service: FileNameMainContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileNameMainContractService],
    }).compile();

    service = module.get<FileNameMainContractService>(
      FileNameMainContractService,
    );
  });

  it('FileNameMainContractService lint', () => {
    expect(
      service.isValid('솔라 커넥트_양도계약서_엔라이튼_950822'),
    ).toBeTruthy();
    expect(service.isValid('_양도계약서_엔라이튼_950822')).toBeFalsy();
    expect(
      service.isValid('솔라커넥트_양도계약서_엔라이튼_950822'),
    ).toBeTruthy();
    expect(service.isValid('솔라커넥트__엔라이튼_950822')).toBeFalsy();
  });

  it('FileNameMainContractService getFileName', () => {
    expect(
      service.getFileName('솔라 커넥트', '양도계약서', '엔라이튼', '950822'),
    ).toEqual('솔라 커넥트_양도계약서_엔라이튼_950822');
  });

  it('FileNameMainContractService getFileInfo', () => {
    expect(
      service.separateFileName('솔라 커넥트_양도계약서_엔라이튼_950822'),
    ).toEqual(['솔라 커넥트', '양도계약서', '엔라이튼', '950822']);
    expect(
      service.separateFileName('파일이름_파일이름_파일이름_950822'),
    ).toEqual(['파일이름', '파일이름', '파일이름', '950822']);
  });

  it('임시 테스트', function () {
    const fileName = ' 확인 파일이름_파일네임'
      .replace(/.*(확인|check)/g, '')
      .trim();

    expect(fileName).toEqual('파일이름_파일네임');
  });
});
