// NestJS
import { Module } from '@nestjs/common';

// Application
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
    controllers: [LogsController],
    providers: [LogsService],
})
export class LogsModule { }
