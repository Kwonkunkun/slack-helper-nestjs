import { Module } from '@nestjs/common';
import { FileNameMainContractService } from './file-name.main-contract.service';
import { FileNameSubContractService } from './file-name.sub-contract.service';

/**
 * @module FileNameModule
 * @description 파일 이름에 대한 모듈 ex) 파일 이름이 유효한지 or rule 에 맞는 파일 이름인지
 */
@Module({
  providers: [FileNameMainContractService, FileNameSubContractService],
  exports: [FileNameMainContractService, FileNameSubContractService],
})
export class FileNameModule {}
