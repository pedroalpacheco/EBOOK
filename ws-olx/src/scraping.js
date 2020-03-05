/**
 * Site alvo:https://sc.olx.com.br/norte-de-santa-catarina/regiao-do-vale-do-itajai/blumenau?q=iphone
 * Nome:IPhone 6S 32 GB Silver
 * valor:R$ 900
 * divulgação:Publicado em 10/02 às 22:31
 * codigo:716535769
 * links:https://sc.olx.com.br/norte-de-santa-catarina/celulares/iphone-6s-32-gb-silver-716535769
 */
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const sitealvo = 'https://sc.olx.com.br/norte-de-santa-catarina/regiao-do-vale-do-itajai/blumenau?q=iphone'

const dados = []

const dadosbrutos = async () =>{
  try {
    const res = await axios.get(sitealvo)
    return res.data
  } catch (error) {
    console.log('Deu erro ao extrair os DADOS BRUTOS!' + error);
  }
}

const listalinks = async () =>{
  const html = await dadosbrutos();
  const $ = await cheerio.load(html);
  $('.OLXad-list-link').each(function(i, lnk){
    dados[i] = $(lnk).attr('href');
  });
  return dados
}

const coletadados = async (pg) =>{
  try {
    const res = await axios.get(pg);
    const html =res.data
    const $ = await cheerio.load(html);
    let nomeproduto = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.jAHFXn > div.h3us20-5.heHIon > h1').text()
    let valor = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.cpscHx > div.h3us20-5.kXGTwk > div > div.sc-EHOje.sc-dVhcbM.iOixbk > div.sc-EHOje.sc-dVhcbM.sc-12l420o-0.hHjKok > h2').text()
    let publicacao = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.jAHFXn > div.h3us20-5.eeNNeS > div.h3us20-2.bdQAUC > div > span.sc-bZQynM.sc-1oq8jzc-0.dxMPwC').text();
    let codigo = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.jAHFXn > div.h3us20-5.eeNNeS > div.h3us20-2.bdQAUC > div > span.sc-bZQynM.sc-16iz3i7-0.cPAPOU').text();
    
    const resultado = `
    <h1>Produto:${nomeproduto}<h1>
    <h3>Valor:${valor}</h3>
    <h3>${publicacao}</h3>
    <h3>Código:${codigo}</h3>
    <h3>Link: <a href="${pg}">Produto</a></h3>
    <br>

    `
    gravahtml(resultado)

  } catch (error) {
    console.log('Deu pau na extração de dados: '+error);
  }
}

const gravahtml = async (result) =>{
  fs.writeFileSync('./index.html',result, {flag: 'a+'},function(err){
    if(err)
    console.log('Deu erro na gravação de relatorio html : ' + err)
  })
}

const apresentadados = async () =>{
  const todoslnks = await listalinks();
  todoslnks.map(function(linkspai){
    coletadados(linkspai);
  });
}

const main = async () => {
  await apresentadados();
}

main();
