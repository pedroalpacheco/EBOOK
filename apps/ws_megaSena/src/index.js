/**
 * http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena
 * consurso: Concurso 2231 (05/02/2020)
 * dezena1:04
 * dezena2:13
 * dezena3:25
 * dezena4:40
 * dezena5:53
 * dezena6:57
 */

 //const request = require('request-promise');
 const puppteer = require('puppeteer');
 const cheerio = require('cheerio');
 const S = require('string');
 const mongoose = require('mongoose');
 const megaSchema = require('./megaSchema');

 async function extraiDados(){
     let dados = []
     const browser = await puppteer.launch();
     const page = await browser.newPage();
     await page.goto('http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena');
     let html = await page.content();
     const $ = await cheerio.load(html);
     let data = $('#conteudoresultado > div.content-section.section-text.with-box.no-margin-bottom > div > h2 > span').text()
     let data1 = S(data).collapseWhitespace().s
     let dezena1 = $('#ulDezenas > li:nth-child(1)').text() 
     let dezena2 = $('#ulDezenas > li:nth-child(2)').text()
     let dezena3 = $('#ulDezenas > li:nth-child(3)').text()
     let dezena4 = $('#ulDezenas > li:nth-child(4)').text()
     let dezena5 = $('#ulDezenas > li:nth-child(5)').text()
     let dezena6 = $('#ulDezenas > li:nth-child(6)').text()
     
     dados = {data1,dezena1,dezena2,dezena3,dezena4,dezena5,dezena6};
     browser.close();
     return dados
 }
async function base(){
    const objdados = await extraiDados();
    mongoose.connect('mongodb://localhost:27017/mega',{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(result =>{
        console.log('Mongodb conectado!');
    })
    .catch(error => {
        console.log('Deu problema' + error)
    })

    const tbresultado = mongoose.model('tbresultado', megaSchema);
    const consulta = await tbresultado.find({concurso:objdados.data1});

    //console.log(consulta)

    function estavazio(obj){
        for(const prop in obj){
            if(obj.hasOwnProperty(prop))
            return false
        }
        return true
    }
    if(estavazio(consulta)){
        const resultado = new tbresultado({
            concurso:objdados.data1,
            umdezena:objdados.dezena1,
            doisdezena:objdados.dezena2,
            tresdezena:objdados.dezena3,
            quatrodezena:objdados.dezena4,
            cincodezena:objdados.dezena5,
            seisdezena:objdados.dezena6,
        });
        resultado.save(function (err, resultado){
            if(err)
            return console.log(err);
        });
        console.log('cadastro realizado!');
    }else{
        console.log('Este concuso já exite!');
    }
}

 base();