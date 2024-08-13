// NestJS
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// node-mdaemon-api
import { version } from 'node-mdaemon-api';

// Application
import { AppModule } from './app.module';

function setupOpenAPI(app: INestApplication<any>) {
    const oadb = new DocumentBuilder()
        .setTitle('MD REST API')
        .setDescription('MD RESTful API Documentation')
        .setVersion(version)
        .setContact('MTKA Dev', 'https://mtka.eu/software/node-mdaemon-api', 'dev@mtka.eu')
        .setLicense('MIT License', 'https://opensource.org/license/mit')
        .addBearerAuth() // Authentication: Bearer {jwtToken}
        .build();
    const oaDoc = SwaggerModule.createDocument(app, oadb);
    SwaggerModule.setup('openapi', app, oaDoc);
}

async function bootstrap() {
    const logger = new Logger(bootstrap.name);

    // NestJS application with bootstrap module
    const app = await NestFactory.create(AppModule);

    // Global route prefix
    app.setGlobalPrefix('api');

    // OpenAPI document definition
    setupOpenAPI(app);

    // Configuration via .env file
    const config = app.get(ConfigService)

    // Read listener PORT from configuration or default value
    const port: number = config.get<number>('PORT', 8080);

    // Start HTTP server
    await app.listen(port, () => {
        logger.debug(`Server listening on port ${port}`);
    });
}

bootstrap();
