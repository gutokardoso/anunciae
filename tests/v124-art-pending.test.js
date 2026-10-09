const assert=require('node:assert/strict');
const fs=require('node:fs');
const app=fs.readFileSync('public/app.js','utf8');
const review=app.match(/function renderReview\(\)[\s\S]*?(?=\nfunction initWizard\()/);
assert(review,'Tela de revisão presente');
assert(review[0].includes('Arte pendente de envio'),'Aviso de arte pendente na revisão');
assert(review[0].includes('["upload","enhance"].includes(o.creativeMode)'),'Aviso apenas para modos que exigem upload');
assert(review[0].includes('creativeName[o.creativeMode]'),'Modalidade original mantida');
console.log('v124 arte pendente: OK');
