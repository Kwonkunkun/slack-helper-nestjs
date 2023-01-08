import { Injectable, Logger } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';

@Injectable()
export class GoogleDriveService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  drive: drive_v3.Drive;

  constructor() {
    const authClient = new google.auth.GoogleAuth({
      //TODO:
      keyFile: '/google-credentials.json',
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    this.drive = google.drive({ version: 'v3', auth: authClient });
  }

  /**
   * @description google share drive 의 리스트를 가져온다.
   */
  async find() {
    //share drive 의 데이터를 가져온다.
    const res = await this.drive.drives.list({
      // q: "organizerCount = 0",
      pageSize: 10,
      fields: 'nextPageToken, drives(id, name)',
    });

    //적절한 dto 로 변환하여 return 한다.
  }
}
