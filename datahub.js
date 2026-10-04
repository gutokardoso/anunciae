'use strict';
const PROVIDERS=['meta','google','tiktok','linkedin','x'];
const num=v=>Number.isFinite(Number(v))?Number(v):0;
const int=v=>Math.max(0,Math.round(num(v)));
const money=v=>Math.max(0,num(v));
function normalizeMetric(provider,row={}){
 if(!PROVIDERS.includes(provider)) throw new Error('Provider inválido');
 const date=String(row.metricDate||row.date||row.metric_date||'').slice(0,10);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Data de métrica inválida');
 return {provider,externalCampaignId:String(row.externalCampaignId||row.campaignId||row.external_campaign_id||''),metricDate:date,
  spend:money(row.spend),impressions:int(row.impressions),reach:int(row.reach),clicks:int(row.clicks),contacts:int(row.contacts||row.leads),
  conversions:int(row.conversions),sales:int(row.sales||row.purchases),revenue:money(row.revenue||row.conversionValue),currency:String(row.currency||''),raw:row.raw||row};
}
function freshness(lastSuccessAt,now=Date.now()){
 if(!lastSuccessAt)return {state:'NO_DATA',ageMinutes:null,stale:true};
 const age=Math.max(0,Math.floor((now-new Date(lastSuccessAt).getTime())/60000));
 return {state:age<=180?'FRESH':age<=1440?'AGING':'STALE',ageMinutes:age,stale:age>180};
}
function adapterState({connected=false,selected=false,permission=true,lastSuccessAt=null,error=''}){
 let state=!connected?'NOT_CONNECTED':!selected?'ACCOUNT_NOT_SELECTED':!permission?'WAITING_PERMISSION':error?'SYNC_ERROR':'READY';
 return {...freshness(lastSuccessAt),state,lastError:error||null};
}
module.exports={PROVIDERS,normalizeMetric,freshness,adapterState};
