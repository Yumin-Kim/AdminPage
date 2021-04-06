import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LoggerMiddleWare } from './middlewares/logger.middleware';
// import { DmsModule } from './dms/dms.module';
// import { Database } from './database/database.providers';
// import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from "./config/ormconfig" ;
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(connectionOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(LoggerMiddleWare).forRoutes('*');
  }
}
