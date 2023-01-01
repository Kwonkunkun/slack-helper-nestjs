import { Injectable, Logger } from '@nestjs/common';
import {
  CheckUriVerificationDto,
  ReceiveMentionDto,
} from './dto/slack-request.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';

@Injectable()
export class SlackService {
  constructor(private readonly httpService: HttpService) {}
  async receiveEvent(body: any) {
    // Logger.debug(body);

    //type: url_verification
    if (body.type === 'url_verification') {
      const { challenge } = body as CheckUriVerificationDto;
      return this.healthCheck(challenge);
    }

    //type: event_callback
    if (body.type === 'event_callback') {
      const { event } = body as ReceiveMentionDto;
      const { user, channel } = event;
      await this.sendMessage(channel, 'hello world');
    }

    return 'ok';
  }

  /**
   * slack 용 uri verification event 처리
   * @private
   * @param challenge
   * @returns challenge 값
   */
  private healthCheck(challenge: string) {
    return challenge;
  }

  /**
   * slack 용 mention event 처리
   */

  /**
   * slack 에 메시지 전송
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
            Logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    Logger.debug(data);
    return data;
  }
}
