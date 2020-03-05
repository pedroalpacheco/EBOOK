/**
 * https://app.sendgrid.com/
 */

 const nodemailer = require('nodemailer');
 const sendgridTransport = require('nodemailer-sendgrid-transport');
 const fs = require('fs');

 const transporter = nodemailer.createTransport(
   sendgridTransport({
     auth:{
       api_key:
       '*****************************************'
     }
   })
 );

 const excluirelatorio = () =>{
   try {
     fs.unlinkSync('./index.html');
     console.log('Arquivo excluido com sucesso!')
   } catch (error) {
     console.log('Deu erro ao excluir relatorio html: '+error)
   }
 }

 const envioemail = () =>{
   transporter.sendMail({
     to: 'meuemail@seudominio.com.br',
     from: 'empresa@empresa.com.br',
     subject: 'IPHONES USADOS NO OLX BLUMENAU/SC',
     html:({path: './index.html'})
   })
 }

 const main = async () =>{
   await envioemail();
   await excluirelatorio();
 }

 main();