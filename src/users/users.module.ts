// NestJS
import { Module } from '@nestjs/common';

// Application
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule { }
