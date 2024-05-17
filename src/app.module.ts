// Nest.js
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

// Application
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { AuthGuard, RolesGuard } from './auth';
import { UsersModule } from './users/users.module';

const optionsConfig: ConfigModuleOptions = {
    isGlobal: true,
};

@Module({
    imports: [
        ConfigModule.forRoot(optionsConfig),
        ServeStaticModule.forRoot({
            rootPath: 'C:\\MDaemon-REST-public', // index.html
        }),
        AuthModule,
        LogsModule,
        UsersModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ]
})
export class AppModule { }
