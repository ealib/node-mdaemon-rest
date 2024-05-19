// NestJS
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';

// Application
import { AuthGuard, AuthModule, RolesGuard } from './auth';
import { LogsModule } from './logs/logs.module';
import { UsersModule } from './users/users.module';

const optionsConfig: ConfigModuleOptions = {
    isGlobal: true,
};

const optionsServeStatic: ServeStaticModuleOptions = {
    rootPath: 'C:\\MDaemon-REST-public', // index.html
};

@Module({
    imports: [
        ConfigModule.forRoot(optionsConfig),
        ServeStaticModule.forRoot(optionsServeStatic),
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
