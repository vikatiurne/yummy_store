import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 2525,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активація акаунту на ${process.env.API_URL}`,
      text: '',
      html: ` <div>
                    <h1>Для активації акаунту YUMMY перейдіть за посиланням</h1>
                    <a href="${link}">${link}</a>
                </div>`,
    });
  }
  async sendResetPasswordMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Зміна паролю на ${process.env.API_URL}`,
      text: '',
      html: ` <div>
                    <h1>Натисніть на посилання для збросу пароля</h1>
                    <a href="${link}">${link}</a>
                </div>`,
    });
  }
}

export const mailService = new MailService();
