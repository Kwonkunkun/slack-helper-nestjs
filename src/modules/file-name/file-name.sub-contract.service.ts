import { Injectable } from '@nestjs/common';
import { FileName } from './file-name';
import { SubContractFileInfo } from './interfaces';

/**
 * @description 부수 계약
 */
@Injectable()
export class FileNameSubContractService extends FileName {
  constructor() {
    super(/([^_]+)_([^_]+)_([^_]+)_([^_]+)_(\d{6})/g);
  }

  /**
   * @param fileName
   */
  getFileInfo(fileName: string): SubContractFileInfo {
    const [customer, mainContractName, subContractName, companyName, date] =
      this.separateFileName(fileName);
    return { customer, mainContractName, subContractName, companyName, date };
  }
}
