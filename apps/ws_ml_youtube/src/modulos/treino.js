const NB = require('ml-bayes')

const by = new NB()

by.train("VIDA DOS SONHOS",'historia de vida');
by.train("CONTANDO HISTORIA NA HORA DO ALMOÇO",'Historias de vida');
by.train("A MELHOR ÉPOCA PARA MUDAR PARA O CANADÁ",'Historias de vida');
by.train("GOPRO - COMO FILMAR PARA O INSTAGRAM STORIES",'Dicas');
by.train("Como manter seu endereço nos EUA sempre atualizado?",'Dicas');
by.train("Bate-papo com policial americano - Perguntas e respostas",'Dicas');
by.train("ESCOLA NO CANADÁ - Matrícula, ônibus escolar, idade escolar, formulários, cuidados com as crianças",'Dicas');
by.train("Meu Primeiro Carro nos EUA",'Carros no exterior');
by.train("PREÇO DOS CARROS EM SAN FRANCISCO NA CALIFÓRNIA EUA",'Carros no exterior');
by.train("PREÇO DAS MOTOS EM SAN FRANCISCO NA CALIFÓRNIA EUA",'Carros no exterior');
by.train("LUGARES ONDE EU TRABALHO NOS ESTADOS UNIDOS",'Trabalho no exterior');
by.train("EMPREENDER NO EXTERIOR: Posicionamento de produtos",'Trabalho no exterior');
by.train("FOMOS PARA O CANADÁ E ACABOU O DINHEIRO. E AGORA?",'Trabalho no exterior');
by.train("$50 DOLARES E UM TANQUE CHEIO!!! QUANTO VOCE PAGA PELA GASOLINA NO BRASIL???",'Custo de vida');
by.train("QUANTO CUSTA VIAJAR PARA OS ESTADOS UNIDOS",'Custo de vida');
by.train("COMPRAR OU ALUGAR IMÓVEL NO CANADÁ, O QUE VALE MAIS A PENA? - FINANCIAMENTO DE IMÓVEIS NO CANADÁ ",'Custo de vida')

function analisaFrases(afrase){
    const score = by.guess(afrase)
    const resultado = by.extractWinner(score)
    const numscore = resultado.score
    const rotulo = resultado.label

    return afrase +" - "+ "SCORE: "+numscore.toFixed(2)+ " ROTULO: "+rotulo
}

module.exports = analisaFrases