require('dotenv').config();
const request = require('request');
const http = require('http');
const fetch = require('cross-fetch');
const TelegramBot = require('node-telegram-bot-api');



var intervalo = 60000 * 30;

setInterval(() => {


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

    const chatId = "ChatIdAqui";
    
    const linkApi = "https://api.telegram.org/bot" + `${TOKEN}` + "/sendMessage?chat_id=" + chatId + "&text=" + "🕗 Preço às: " + horaAtual + "%0A%0A" + priceFinal + "%0A%0A" + sobeDesce;
    
    
     fetch(linkApi)
    .then(response => response.json())
    .then(data =>{})
    

    
   });

 });

  
}, intervalo);