import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { ListsModule } from './lists/lists.module';
import { CampaignModule } from './campaign/campaign.module';
import { OrganizationModule } from './organization/organization.module';
import { ClickStatsModule } from './click_stats/click_stats.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Organization } from './organization/entities/organization.entity';
import { Subscriber } from './subscriber/entities/subscriber.entity';
import { List } from './lists/entities/list.entity';
import { Campaign } from './campaign/entities/campaign.entity';
import { ClickStat } from './click_stats/entities/click_stat.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-expect-error/ passing from .env file so no types for now
      type: process.env.DB_TYPE,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Organization, Subscriber, List, Campaign, ClickStat],
      synchronize: process.env.RUN_MIGRATIONS === 'true',
      logging: process.env.LOGGING === 'true',
    }),
    AuthModule,
    CommonModule,
    UserModule,
    SubscriberModule,
    ListsModule,
    CampaignModule,
    OrganizationModule,
    ClickStatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
