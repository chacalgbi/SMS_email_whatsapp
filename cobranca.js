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

function formatar_celular(num) {
	let formatado = num.replace(/\D+/g, "");
	let final = '';
	if(formatado.indexOf("345") != -1){
		final = "erro";
	} else if (formatado.length == 11) {
		final = formatado.replace(/(\d{2})?(\d{5})?(\d{4})/, "($1) $2-$3");
	} else if (formatado.length == 10) {
		final = formatado.replace(/(\d{2})?(\d{4})?(\d{4})/, "($1) 9$2-$3");
	} else if (formatado.length == 9) {
		final = formatado.replace(/(\d{5})?(\d{4})/, "(77) $1-$2");
	} else if (formatado.length == 8) {
		final = formatado.replace(/(\d{4})?(\d{4})/, "(77) 9$1-$2");
	} else {
		final = "erro";
	}
	let final1 = final.replace(/\D+/g, "");
	return final1;
}

function verificar_email(email){
	if(email.indexOf("@") === -1){
		return "";
	}else if(email.indexOf(" ") != -1){
		return "";
	}else if(email.indexOf("naotem") != -1){
		return "";
	}else if(email.length < 11){
		return "";
	}else{
		return email;
	}
}

function delay(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{ resolve("OK"); }, 10);
    });
}

async function cobrar() {

	await ler_csv('rurais.csv').then((res) => { array_clientes = res; })

	log(`${array_clientes.length} Clientes encontrados`, 'alerta');

	for (const [index, cliente] of array_clientes.entries()) {

		let frase_log = `${cliente.CLIENTE.substring(18, 0)} - `;
		log(`${index}/${array_clientes.length} Enviando para: ${cliente.CLIENTE}`, "info");

		let cel = formatar_celular(cliente.CELULAR);
		let tel = formatar_celular(cliente.TELEFONE);
		let email = verificar_email(cliente.E_MAIL);

		cel === tel ? tel = "" : tel; // Se os dois campos forem iguais, inutiliza o de TELEFONE

		cel === "" ? cel = "  NAO_TEM  " : cel;
		tel === "" ? tel = "  NAO_TEM  " : tel;
		email === "" ? email = "  NAO_TEM  " : email;

		frase_log += `${cel} - ${tel} - ${email}`;
		
		frase_log += "\n";
		logger.write(frase_log);

		await delay();
	}

	logger.end();

}

cobrar();




/*		

		if (cel.length === 11) {
			await whatsapp(cel, corpo).then((res) => {
				if (res.error === 'sim') {
					frase_log += "WhatsApp1: ERRO - ";
				} else {
					frase_log += "WhatsApp1: OK - ";
				}
			}).catch((err) => { console.log(err); frase_log += "WhatsApp1: ERRO - "; });
	
			await sms(cel, msg_sms).then((res) => {
				if (res == 'OK - SMS Enviado') {
					frase_log += "SMS1: OK - ";
				} else {
					frase_log += "SMS1: ERRO - ";
				}
			}).catch((err) => { console.log(err); frase_log += "SMS1: ERRO - "; });

		}else{frase_log += "WhatsApp1: ERRO - SMS1: ERRO - ";}

		if (tel.length === 11) {
			await whatsapp(tel, corpo).then((res) => {
				if (res.error === 'sim') {
					frase_log += "WhatsApp2: ERRO - ";
				} else {
					frase_log += "WhatsApp2: OK - ";
				}
			}).catch((err) => { console.log(err); frase_log += "WhatsApp2: ERRO - "; });
	
			await sms(tel, msg_sms).then((res) => {
				if (res == 'OK - SMS Enviado') {
					frase_log += "SMS2: OK - ";
				} else {
					frase_log += "SMS2: ERRO - ";
				}
			}).catch((err) => { console.log(err); frase_log += "SMS2: ERRO - "; });

		}else{frase_log += "WhatsApp2: ERRO - SMS2: ERRO - ";}

		if(email.length > 10){
			await email(cliente.E_MAIL, titulo_email, corpo).then((res) => {
				frase_log += "Email: OK";
			}).catch((err) => { console.log(err); frase_log += "Email: ERRO"; });
		}else{frase_log += "Email: ERRO";}
*/