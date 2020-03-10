const request = require('request-promise');
const cheerio = require('cheerio');

const sitealvo = "https://www.melhorcambio.com/dolar-hoje"

async function main(){
    const resposta = await request.get(sitealvo);
    let $ = cheerio.load(resposta);
    const dolar = $('#snipet-div > table > tbody > tr:nth-child(1) > td.tdvalor').text();
    const data = $('#snipet-div > h2 > span').text()
    console.log(` 
    Data: ${data},
    1 DOLAR esta custando: R$ ${dolar}
    `);
};
main();