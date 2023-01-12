import { Injectable, Logger } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';

@Injectable()
export class GoogleDriveService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  drive: drive_v3.Drive;

  constructor() {
    const authClient = new google.auth.GoogleAuth({
      scopes: [
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
      ],
    });

    this.drive = google.drive({ version: 'v3', auth: authClient });
  }

  /**
   * @description google share drive 의 리스트를 가져온다.
   */
  async find(query: string) {
    this.logger.debug(query);
    //share drive 의 데이터를 가져온다. 5게민 pagination 의 구현은 필요없음.
    const res = await this.drive.files.list({
      q: `name contains '${query}'`,
      pageSize: 5,
      fields: 'nextPageToken, files(id, name, webViewLink)',
    });

    this.logger.debug(res.data);

    //적절한 dto 로 변환하여 return 한다.
    return res.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      url: file.webViewLink,
    }));
  }
}
