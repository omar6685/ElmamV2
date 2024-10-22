import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerOptions: MailerOptions = {
  transport: {
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  defaults: {
    from: `"Elmam" <${process.env.MAILER_MAIL}>`,
  },
};
