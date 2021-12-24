var axios = require("axios").default;

module.exports = function whatsapp(numero, msg){
    return new Promise((resolve, reject)=>{
        var options = {
        method: 'POST',
        url: 'http://172.17.1.227:3333/enviar/',
        headers: {'Content-Type': 'application/json'},
        data: {numero: numero, message: msg}
        };

        axios.request(options).then(function (response) {
        resolve(response.data);
        }).catch(function (error) {
        reject(error);
        });

    });
}

/*
{
  error: 'nao',
  code: 200,
  msg: 'Enviado com sucesso',
  zapMsg: 'Teste de MSG de WhatsApp',
  zapErro: false,
  zapStatus: 'OK'
}
*/