import { Module } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';

/**
 * TODO: option 을 받아야 하므로 dynamic module 로 받아서 사용
 * @description Google Drive Api Module
 */
@Module({
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
