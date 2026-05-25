import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow('DATABASE_HOST'),
                port: configService.getOrThrow('DATABASE_PORT'),
                username: configService.getOrThrow('DATABASE_USER'),
                password: configService.getOrThrow('DATABASE_PASSWORD'),
                database: configService.getOrThrow('DATABASE_NAME'),
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}