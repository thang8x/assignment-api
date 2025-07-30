import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { ResidentModule } from './modules/resident.modules';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath: join(__dirname, '..', '.env'), // Load environment variables from .env file
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot(      
      {
        transport: {
                  host: process.env.EMAIL_HOST,
                  port: parseInt(process.env.EMAIL_PORT ?? '0', 10),
                  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
                  auth: {
                      user: process.env.EMAIL_USER,
                      pass: process.env.EMAIL_PASS,
                  },
                  defaults: {
                      from: `"No Reply" <${process.env.EMAIL_USER}>`, // Default sender
                  },
                  templates: {
                      adapter: new HandlebarsAdapter(), // Use Handlebars for templating
                      options: {
                          strict: true, // Enable strict mode for template rendering
                          extension: 'hbs', // Template file extension
                          layout: false, // Disable layout if not needed
                      },
                  }
                }
        }),
      ResidentModule,
      AuthModule      
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
