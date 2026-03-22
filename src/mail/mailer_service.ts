import sgMail from "@sendgrid/mail";
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.EMAIL_KEY || "");
  }

  async sendUserConfirmation(username: string, email: string, code: string) {
    try {
      console.log(process.env.EMAIL_KEY);
      const response = await sgMail.send({
        from: "d47701206@gmail.com",
        to: email,
        subject: "Confirme seu email",
        html: `<div class="container"><h1>Olá, ${username} o código para autenticação é: </h1><br><h2>${code}</h2></div>`,
      });

      console.log(response);
    } catch (e) {
      console.error("------ERRO DO EMAIL-------", e);
      throw e;
    }
  }
}
