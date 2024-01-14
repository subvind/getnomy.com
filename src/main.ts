import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 3000

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set the view engine and the views folder
  app.setViewEngine('ejs');
  app.set('view options');
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));

  // so browsers can use api
  app.enableCors({
    origin: '*',
  });

  // Create a Swagger document builder
  const options = new DocumentBuilder()
    .setTitle('Instant Messenger Software - nomy.IMS')
    .setDescription(`Built with NestJS & HTMX!`)
    .setVersion('1.0')
    .build();

  // Create a Swagger document and configure the UI
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  console.log('started on port', port)
  await app.listen(port);
}

bootstrap();
