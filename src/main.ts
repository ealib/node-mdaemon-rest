// NestJS
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// node-mdaemon-api
import { version } from 'node-mdaemon-api';

// Application
import { AppModule } from './app.module';

async function bootstrap() {

    // NestJS application with bootstrap module
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    //#region OpenAPI document definition
    const oadb = new DocumentBuilder()
        .setTitle('MD REST API')
        .setDescription('MD RESTful API Documentation')
        .setVersion(version)
        .setContact('MTKA Dev', 'https://mtka.eu', 'dev@mtka.eu')
        .setLicense('MIT', 'https://opensource.org/license/mit')
        .addBearerAuth() // Authentication: Bearer {jwtToken}
        .build();
    const oaDoc = SwaggerModule.createDocument(app, oadb);
    SwaggerModule.setup('openapi', app, oaDoc);
    //#endregion

    // Configuration via .env file
    const config = app.get(ConfigService)

    // Read listener PORT from configuration or default value
    const port: number = config.get<number>('PORT', 4242)

    // Start HTTP server
    await app.listen(port);
}

bootstrap();
