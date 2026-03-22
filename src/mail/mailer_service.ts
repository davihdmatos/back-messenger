import { Resend } from "resend";

export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.EMAIL_KEY);
  }

  async sendUserConfirmation(username: string, email: string, code: string) {
    try {
      await this.resend.emails.send({
        from: '"Simple Messenger" d47701206@gmail.com',
        to: email,
        subject: "Confirme seu email",
        html: `<div class="container"><h1>Olá, ${username} o código para autenticação é: </h1><br><h2>${code}</h2></div>`,
      });
    } catch (e) {
      console.error("------ERRO DO EMAIL-------", e);
      throw e;
    }
  }
}
