
const tw = require('./tw');
require('dotenv').config();

const main = async () => {

  const USERNAME = process.env.MAIL_USER;
  const PASSWORD = process.env.PASS_USER;
  
  
  await tw.start();
  
  
  
  //let todostwits = await tw.scrapingtwets('Nodejs',20);
  //console.log(todostwits);
  
  //await tw.efetualogin(USERNAME, PASSWORD);
  
  //let details = await tw.scrapinguser('Nodejs');
  //await console.log(details)
  
  //await tw.twittar('Boa semana pessoas!');
  

  await tw.finaliza();
}
main();