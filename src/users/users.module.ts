// NestJS
import { Module } from '@nestjs/common';

// Application
import { UsersService } from './users.service';

@Module({
    providers: [UsersService]
})
export class UsersModule { }
