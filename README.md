Script para envio de SMS, E-mail e WhatsApp para os clientes rurais da Micks Telecom

O script extrai de um arquivo .csv o email e número dos clientes para aviso automático de mudanças nos planos, mudanças como: velocidade de conexão, interrupção programada, atualização de preços, etc...

Após o envio o arquivo log.txt mostrará o log completo do que foi enviado e seu status.

Ex:
Sex 24/12/2021 11:5:47.518ms - Cliente: 8839 - Email: OK - WhatsApp: OK - SMS: OK
Sex 24/12/2021 11:5:59.95ms - Cliente: 10328 - Email: OK - WhatsApp: OK - SMS: OK
Sex 24/12/2021 11:6:10.708ms - Cliente: 7194 - Email: OK - WhatsApp: OK - SMS: OK
Sex 24/12/2021 11:6:21.628ms - Cliente: 1234 - Email: OK - WhatsApp: OK - SMS: OK

 - O envio de email usa o nodemailer (biblioteca NodeJs)
 - O envio de WhatsApp usa o Venon-Bot (instalado em um de nossos servidores locais), apenas chamado aqui como endpoit de api.
 - O envio de SMS usa um módulo ESP8266 + SIM800L com um chip com envio ilimitado de SMSs. Disponível aqui: https://github.com/chacalgbi/Servidor_SMS