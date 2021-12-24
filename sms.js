var axios = require("axios").default;

module.exports = function sms(numero, msg){
    return new Promise((resolve, reject)=>{
        var options = {
            method: 'POST',
            url: 'http://172.17.1.187/teste',
            headers: {'Content-Type': 'application/json'},
            data: {
              key: 'QMDCGQ889B',
              numero: numero,
              msg: msg
            }
          };
          axios.request(options).then(function (response) {
            resolve(response.data);
          }).catch(function (error) {
            reject(error);
          });
    });
}