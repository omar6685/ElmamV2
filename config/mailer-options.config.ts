import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerOptions: MailerOptions = {
  transport: {
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  },
  defaults: {
    from: `"Elmam" <${process.env.NODEMAILER_MAIL}>`,
  },
};
