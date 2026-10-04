(()=>{try{
const s=document.currentScript||[...document.scripts].find(x=>x.src.includes('/publicia-tag.js')),u=new URL(s.src),id=u.searchParams.get('id'),endpoint=u.origin+'/api/conversions/site/tag';if(!id)return;
const send=(type,extra={})=>{const payload={siteTagId:id,type,externalEventId:type+':'+Date.now()+':'+Math.random().toString(36).slice(2),pageUrl:location.href,pageTitle:document.title,referrer:document.referrer,...extra},raw=JSON.stringify(payload);if(navigator.sendBeacon){navigator.sendBeacon(endpoint,new Blob([raw],{type:'text/plain;charset=UTF-8'}))}else fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:raw,keepalive:true,mode:'cors'}).catch(()=>{})};
send('pageview');
document.addEventListener('click',e=>{const a=e.target.closest?.('a[href]');if(a&&/^(https?:\/\/)?(wa.me|api.whatsapp.com)|whatsapp:/i.test(a.getAttribute('href')||''))send('conversation',{signal:'whatsapp_click'})},true);
// A Tag registra apenas fatos observáveis no navegador. Lead, venda e receita confirmados devem vir de fontes confiáveis/server-side.
window.PublicIA=window.PublicIA||{};window.PublicIA.track=(type,data={})=>{if(['pageview','conversation'].includes(String(type)))send(String(type),data)};
window.PublicIA.capabilities={browser:['pageview','conversation'],businessEventsRequireTrustedSource:true};
}catch(e){}})();
