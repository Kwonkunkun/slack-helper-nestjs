import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule } from './config/config.module';
import { SlackModule } from './modules/slack/slack.module';
import { SlackModule as SlackListenerModule } from 'nestjs-slack-listener';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';

/**
 * @module AppModule
 * @description 모듈을 등록하는 메인 모듈
 */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    SlackListenerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        botToken: configService.get('SLACK_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    SlackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
