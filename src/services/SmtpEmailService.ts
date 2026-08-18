import nodemailer from "nodemailer";
import { EmailService } from "./EmailService";

export class SmtpEmailService implements EmailService {
    async sendEmail(to: string, subject: string, body: string): Promise<void>{
        
    }

}