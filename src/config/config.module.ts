import { Module } from '@nestjs/common';
import { ConfigModule as NestJsConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * custom config module
 */
@Module({
  imports: [
    NestJsConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        SLACK_TOKEN: Joi.string(),
      }),
    }),
  ],
})
export class ConfigModule {}
