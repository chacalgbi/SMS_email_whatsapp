const log = require('./log');
const dataHora = require('./dataHora');
const email = require('./email');
const sms = require('./sms');
const whatsapp = require('./whatsapp');
const ler_csv = require('./ler_csv');
var fs = require('fs');
var logger = fs.createWriteStream('log.txt', { flags: 'a' });
var array_clientes = [];
var titulo_email = `Informe Micks`;
var corpo = `Prezado cliente,

Conforme previsto no termo de uso de serviço e em decorrência das mudanças ocorridas na economia, como a desvalorização do real frente ao dólar, a inflação e o aumento dos custos de operação, informamos que a partir de janeiro de 2022 nosso Plano Rural passará a custar R$ 69,90. 

Os novos boletos serão ajustados automaticamente, enquanto você trabalha e se diverte com a experiência de navegação da Micks. 

A Micks Telecom agradece pela compreensão e estamos à disposição para quaisquer dúvidas.

Nosso WhatsApp: (77) 98802-3452

Link direto:
https://api.whatsapp.com/send?phone=5577988023452&text=D%C3%BAvidas?

Chat Web:
https://bityli.com/MicksPlano
`;

var msg_sms = "Caro cliente, conforme previsto no termo de servico a partir de 01/2022 seu plano sofrera reajuste. A Micks esta a disposicao. WhatsApp: (77)98802-3452.";

function formatar_celular(num){
  let formatado = num.replace(/\D+/g, "");
  let final = '';
  if(formatado.length == 11){
      final = formatado.replace(/(\d{2})?(\d{5})?(\d{4})/, "($1) $2-$3");
  }else if(formatado.length == 10){
      final = formatado.replace(/(\d{2})?(\d{4})?(\d{4})/, "($1) 9$2-$3");
  }else if(formatado.length ==  9){
      final = formatado.replace(/(\d{5})?(\d{4})/, "(77) $1-$2");
  }else if(formatado.length ==  8){
      final = formatado.replace(/(\d{4})?(\d{4})/, "(77) 9$1-$2");
  }else{
      final = "erro";
  }
  let final1 = final.replace(/\D+/g, "");
  return final1;
}

async function cobrar(){

  await ler_csv('teste.csv').then((res)=>{ array_clientes = res; })

  log(`${array_clientes.length} Clientes encontrados`, 'alerta');

  for (const [index, cliente] of array_clientes.entries()) {

    console.log(`Enviando para: ${cliente.CLIENTE}`);

    let cel = formatar_celular(cliente.CELULAR);
    let frase_log = `${dataHora()}Cliente: ${cliente.CODIGO} - `;

    await email(cliente.E_MAIL, titulo_email, corpo).then((res)=>{
      frase_log += "Email: OK - ";
    }).catch((err)=>{ console.log(err); frase_log += "Email: ERRO - "; });

    await whatsapp(cel, corpo).then((res)=>{
      if(res.error === 'sim'){
        frase_log += "WhatsApp: ERRO - ";
      }else{
        frase_log += "WhatsApp: OK - ";
      }
    }).catch((err)=>{ console.log(err); frase_log += "WhatsApp: ERRO - "; });

    await sms(cel, msg_sms).then((res)=>{
      if(res == 'OK - SMS Enviado'){
        frase_log += "SMS: OK";
      }else{
        frase_log += "SMS: ERRO";
      }
    }).catch((err)=>{ console.log(err); frase_log += "SMS: ERRO"; });

    frase_log += "\n";
    logger.write(frase_log);

  }

  logger.end();

}

cobrar();