import { MailerService } from '@nestjs-modules/mailer';
import { strict } from 'assert';
import * as nodemailer from 'nodemailer';
import { join } from 'path';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly mailerService:MailerService) {
    }

    async sendEmail(to: string, subject: string, residentName: string, templateFile: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            template: join(__dirname, 'templates', templateFile), // Assuming you have a template file
            context: {
                residentName: residentName,
                supportEmail: process.env.EMAIL_USER, // Use the environment variable for the support email
            }
        };

        try {
            await this.mailerService.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}