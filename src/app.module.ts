import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: (configService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }, // Set token expiration time
      })
    }),
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
        })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
