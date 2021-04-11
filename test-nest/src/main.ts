import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Admin Page Swagger')
    .setDescription('관리자 페이지 API 문서입니다')
    .build();

  //baseURL Change /api
  app.setGlobalPrefix('api');

  // app.use(cookieParser());
  // app.use(
  //   session({
  //     resave: false,
  //     saveUninitialized: false,
  //     secret: 'hello',
  //     cookie: {
  //       httpOnly: true,
  //     },
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('document', app, document);
  await app.listen(3000);
}
bootstrap();
