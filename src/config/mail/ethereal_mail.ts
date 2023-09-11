import { promises } from 'dns';
import nodemailer from 'nodemailer';
import handlebarsMailTemplete from './handlebars_mail_templete';
import HandlebarsMailTemplete from './handlebars_mail_templete';

interface ITempleteVariable {
  [key: string]: string | number;
}


interface IParsemailTemplate {
  file: string;
  variables: ITempleteVariable;
}


interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParsemailTemplate;
}


export default class EherealMail{
  static async sendMail({ to, from,subject,templateData }: ISendMail): Promise<void>{
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplete();

    const tranporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      }

    });
    const message = await tranporter.sendMail({
      from: {
        name: from?.name || 'Equipe Vendas',
        address: from?.email || 'edvaldo@vendas.com.br',
      } ,
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData),

    });

    console.log('Message sent: %s', message.messageId);

    console.log('Preview URL %S', nodemailer.getTestMessageUrl(message));

  }


}
