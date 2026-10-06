'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','public','index.html'),'utf8');
const css=fs.readFileSync(path.join(__dirname,'..','public','styles.css'),'utf8');
const pkg=require('../package.json');
for(const n of ['Nuvemshop','RD Station','Pipedrive','Salesforce']){
  assert(html.includes(`alt="${n}"`),`logo ${n}`);
  assert(html.includes(`<span class="logoFallback">${n}</span>`),`fallback ${n}`);
}
for(const n of ['WooCommerce','Wix','Nuvemshop','RD Station','Pipedrive','Salesforce']){
  const re=new RegExp(`logoContainsName[^>]*>.*?alt="${n}".*?<span class="logoFallback">${n}</span>`,'s');
  assert(re.test(html),`sem nome duplicado para ${n}`);
}
assert(html.includes('onerror="this.hidden=true;this.nextElementSibling.classList.add(\'logoFallbackVisible\')"'));
assert(css.includes('.logoFallback.logoFallbackVisible'));
assert.equal(pkg.version,'116.0.0');
console.log('OK: v116 evita logos quebradas visíveis e não repete nomes em wordmarks.');
const cssV116=fs.readFileSync(path.join(__dirname,'..','public','styles.css'),'utf8');
for(const token of ['wordmarkWoo','wordmarkNuvem','wordmarkRD','wordmarkPipedrive','mix-blend-mode:multiply']) assert(cssV116.includes(token),token);
