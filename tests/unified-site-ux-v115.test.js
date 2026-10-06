const fs=require('fs'),assert=require('assert'); const app=fs.readFileSync('public/app.js','utf8');
assert(app.includes("['ga4','Google Analytics 4'],['siteapi','Dados do seu site'],['crm','CRM','Hub']"));
assert(!app.includes("['ecommerce','E-commerce','Hub']"));
assert(app.includes('Uma única instalação reúne a medição de visitas do site e as conversões confirmadas pelo servidor'));
assert(!app.includes('CRM <small style="font-weight:400">(opcional)</small>'));
assert(!app.includes('Fontes confiáveis para leads'));
assert(!app.includes("openModal('Conectar E-commerce'"));
assert(app.includes('PUBLICAÇÃO MULTICANAL'));
console.log('OK unified site UX v115');
