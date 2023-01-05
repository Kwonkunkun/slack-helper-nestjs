import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';

/**
 * TODO: 더 구현할 사항이 있는지 체크해봐야함
 */
@Injectable()
export class SlackService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly httpService: HttpService) {}

  /**
   * @description slack 에 메시지 전송
   * @param channel 메시지 전송할 채널
   * @param text 메시지
   */
  async sendMessage(channel: string, text: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post('/chat.postMessage', {
          channel,
          text,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
