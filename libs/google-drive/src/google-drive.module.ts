import { Module } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';

/**
 * @description Google Drive Api Module
 */
@Module({
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
