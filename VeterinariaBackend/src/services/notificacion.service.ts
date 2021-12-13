import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Llaves} from '../config/llaves';
const sgMail = require('@sendgrid/mail')

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  SendEmail(destino: string, asunto:string, contenido:string){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino,
      //Correo registrado en sendgrid
      from: Llaves.email_origin,
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error:any) => {
        console.error(error)
      })
  }
}
