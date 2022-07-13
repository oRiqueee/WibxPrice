require('dotenv').config();
const request = require('request');
const TelegramBot = require('node-telegram-bot-api');

const hostnamePrice = 'https://www.mercadobitcoin.net/api';

const pathPrice = '/WBX/ticker/';


horario = new Date;

horaAtual = horario.getHours() + ":" + String(horario.getMinutes()).padStart(2, '0');

request(`${hostnamePrice}${pathPrice}`, (err, res, body) => {

    var apiPrice = JSON.parse(body);
    var consumindoPrice = apiPrice['ticker']['last'];
    var priceFinal = "💸 R$ " + consumindoPrice.slice(0, -4).replace('.',',');



    ano = horario.getFullYear();
    mes = horario.getMonth() + 1;
    dia = horario.getDate();

if (dia = 1) {
   dia = 1;
} else {
   dia - 1;
}

    const hostnameLast = 'https://www.mercadobitcoin.net/api';
    const pathLast= '/WBX/day-summary/' + ano + '/' + mes + '/' + dia;


        
    request(`${hostnameLast}${pathLast}`, (err, res, body) => {

    var apiLast = JSON.parse(body);
    var consumindoLast = apiLast['closing'];
    var menorMaior = consumindoLast - consumindoPrice;


   if (menorMaior < 0) {
       var sobeDesce = "Desde o preço de fechamento de ontem: Subindo 📈";
    } else {
       var sobeDesce = "Desde o preço de fechamento de ontem: Caindo 📉";
    }



    const {TOKEN} = process.env;
    const bot = new TelegramBot(`${TOKEN}`, {polling:true});
    
    bot.on('message', (msg)=>{
       const chatId = msg.chat.id;
       bot.sendMessage(chatId, "🕗 Preço às: " + horaAtual + "\n\n" + priceFinal + "\n\n" + sobeDesce)
       return true;
    })

    
   });

 });
