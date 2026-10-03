'use strict';
const EVENT_TYPES=['pageview','conversation','lead','sale','revenue'];
const SOURCES=['whatsapp','site','ga4','crm','ecommerce','manual'];
const clean=v=>String(v??'').trim();
function normalizeEvent(input={}){
 const type=clean(input.type).toLowerCase(),source=clean(input.source).toLowerCase();
 if(!EVENT_TYPES.includes(type))throw new Error('Tipo de conversão inválido');
 if(!SOURCES.includes(source))throw new Error('Fonte de conversão inválida');
 const occurredAt=new Date(input.occurredAt||Date.now());if(Number.isNaN(occurredAt.getTime()))throw new Error('Data de conversão inválida');
 const value=Math.max(0,Number(input.value||0)||0);
 return {type,source,occurredAt:occurredAt.toISOString(),externalEventId:clean(input.externalEventId),campaignId:clean(input.campaignId),externalCampaignId:clean(input.externalCampaignId),contactRef:clean(input.contactRef),value,quantity:Math.max(1,Number(input.quantity||1)||1),currency:clean(input.currency||'BRL').toUpperCase(),metadata:input.metadata&&typeof input.metadata==='object'?input.metadata:{}};
}
function whatsappEvents(payload={}){
 const out=[];for(const entry of payload.entry||[])for(const change of entry.changes||[]){const v=change.value||{},phoneNumberId=clean(v.metadata?.phone_number_id);for(const m of v.messages||[]){if(!m.id)continue;out.push(normalizeEvent({type:'conversation',source:'whatsapp',occurredAt:Number(m.timestamp||0)*1000||Date.now(),externalEventId:m.id,contactRef:m.from?`wa:${m.from}`:'',metadata:{phoneNumberId,messageType:clean(m.type),displayPhoneNumber:clean(v.metadata?.display_phone_number)}}))}}
 return out;
}
module.exports={EVENT_TYPES,SOURCES,normalizeEvent,whatsappEvents};
