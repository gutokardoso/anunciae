const assert=require('assert');
const d=require('../datahub');
let x=d.normalizeMetric('google',{date:'2026-10-03',campaignId:'123',spend:'12.34',impressions:'1000',reach:'800',clicks:'50',leads:'7',conversions:'9',purchases:'2',conversionValue:'99.90'});
assert.equal(x.externalCampaignId,'123'); assert.equal(x.spend,12.34); assert.equal(x.impressions,1000); assert.equal(x.contacts,7); assert.equal(x.sales,2); assert.equal(x.revenue,99.9);
assert.equal(d.adapterState({connected:false}).state,'NOT_CONNECTED');
assert.equal(d.adapterState({connected:true,selected:false}).state,'ACCOUNT_NOT_SELECTED');
assert.equal(d.adapterState({connected:true,selected:true,permission:false}).state,'WAITING_PERMISSION');
assert.equal(d.freshness(new Date().toISOString()).state,'FRESH');
console.log('datahub.test.js OK');
