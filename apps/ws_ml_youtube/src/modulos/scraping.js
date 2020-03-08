const cheerio = require('cheerio')
const request = require('request')
const analisaFrases = require('./treino')

function sanitizar(text){
    const allines = text.split('\n')
    const dellines = allines.filter((linha)=>{
        if (linha.trim().length === 0 || linha.trim().startsWith('=')){
            return false
        }
        return true
    })
    return dellines
}

function scraping(){
    request({
        method: 'GET',
        url:'https://www.youtube.com/channel/UC7hG6Y7UiTrBGt3w1wwrnCQ/videos'
    },(err, res, body)=>{
        if (err) return console.log(err)
        const $ = cheerio.load(body)
        const title = $('a').text()

        const titlesanitizado = title.replace("  Enviar feedbackTestar os novos recursosFaça login","")
        const titlesanitizado1 = titlesanitizado.replace("Política e Segurança","")
        const titlesanitizado2 = titlesanitizado1.replace("Uma jogatina Retrô |Mega driveHistóricoSobreImprensaDireitos autoraisCriadores de conteúdoPublicidadeDesenvolvedoresTermosPrivacidade","")
        const titlesanitizado3 = titlesanitizado2.replace("BR","")
        const titlesanitizado4 = titlesanitizado3.replace("  Fê Gourmet OficialPlaylistsComunidadeCanaisSobre","")
        const titlesanitizado5 = titlesanitizado4.replace("Início","")
        const titlesanitizado6 = titlesanitizado5.replace("Em alta","")
        const titlesanitizado7 = titlesanitizado6.replace("Histórico","")
        const titlesanitizado8 = titlesanitizado7.replace("Tenha acesso ao YouTube Premium","")
        const titlesanitizado9 = titlesanitizado8.replace("Música","")
        const titlesanitizado10 = titlesanitizado9.replace("Esportes","")
        const titlesanitizado11 = titlesanitizado10.replace("Jogos","")
        const titlesanitizado12 = titlesanitizado11.replace("Filmes","")
        const titlesanitizado13 = titlesanitizado12.replace("Notícias","")
        const titlesanitizado14 = titlesanitizado13.replace("Ao vivo","")
        const titlesanitizado15 = titlesanitizado14.replace("Destaque","")
        const titlesanitizado16 = titlesanitizado15.replace("Vídeo em 360°","")
        const titlesanitizado17 = titlesanitizado16.replace("Procurar canais","")
        const titlesanitizado18 = titlesanitizado17.replace("Faça loginSaiba maisView this message in Englishalterar essa preferência abaixoLearn morechange this preference below","")
        const titlesanitizado19 = titlesanitizado18.replace("Instagram","")
        const titlesanitizado20 = titlesanitizado19.replace("Fê Gourmet OficialInícioPlaylistsComunidadeCanaisSobre","")
        const titlesanitizado21 = titlesanitizado20.replace("HistóricoSobreImprensaDireitos autoraisCriadores de conteúdoPublicidadeDesenvolvedoresTermosPrivacidade","")
        
        const frasesanitizada = sanitizar(titlesanitizado21)

        const asfrases = frasesanitizada.map(function(name){
            return analisaFrases(name)
        })
        console.log(asfrases)
    })
}

module.exports = scraping