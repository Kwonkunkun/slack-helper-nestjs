import { Injectable } from '@nestjs/common';
import { FileName } from './file-name';
import { MainContractFileInfo } from './interfaces';

/**
 * @description 주 계약
 */
@Injectable()
export class FileNameMainContractService extends FileName {
  constructor() {
    super(/^([^_]+)_([^_]+)_([^_]+)_(\d{6})/g);
  }

  /**
   * @param fileName
   */
  getFileInfo(fileName: string): MainContractFileInfo {
    const [customer, contractName, companyName, date] =
      this.separateFileName(fileName);
    return { customer, contractName, companyName, date };
  }
}
