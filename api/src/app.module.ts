import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { configModuleOptions } from "./config/configModuleOptions";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { RedisModule } from "./redis/redis.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ScraperModule } from './scraper/scraper.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), UserModule, AuthModule, MailModule, RedisModule, PrismaModule, ScraperModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
