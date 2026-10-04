'use strict';
process.env.NODE_ENV='test';
delete process.env.DATABASE_URL;
process.env.PUBLIC_BASE_URL='https://publicia.com.br';
process.env.GOOGLE_CLIENT_ID='google-client';
process.env.GOOGLE_CLIENT_SECRET='google-secret';
process.env.ADMIN_EMAIL='admin-ga4@teste.local';
process.env.ADMIN_PASSWORD='Admin123!';
const assert=require('assert');
const {server,init,ensureAdmin}=require('../server');
(async()=>{
  await init();await ensureAdmin();
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=`http://127.0.0.1:${server.address().port}`;
  try{
    const health=await (await fetch(base+'/api/health')).json();
    assert.equal(health.version,'publicia-v87');
    assert.equal(health.ga4OAuthConfigured,true);
    assert.equal(health.ga4CallbackUrl,'https://publicia.com.br/api/integrations/ga4/callback');
    const email=`ga4-${Date.now()}@teste.local`;
    const reg=await fetch(base+'/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'GA4 QA',email,password:'Senha123!'})});
    assert.equal(reg.status,201);
    const cookie=reg.headers.get('set-cookie').split(';')[0];
    const connect=await fetch(base+'/api/integrations/ga4/connect',{headers:{Cookie:cookie},redirect:'manual'});
    assert.equal(connect.status,302);
    const auth=new URL(connect.headers.get('location'));
    assert.equal(auth.origin,'https://accounts.google.com');
    assert.equal(auth.searchParams.get('redirect_uri'),'https://publicia.com.br/api/integrations/ga4/callback');
    assert.equal(auth.searchParams.get('scope'),'https://www.googleapis.com/auth/analytics.readonly');
    assert.equal(auth.searchParams.get('access_type'),'offline');
    assert.equal(auth.searchParams.get('prompt'),'consent');
    assert(/^[a-f0-9]{64}$/i.test(auth.searchParams.get('state')));
    const noState=await fetch(base+'/api/integrations/ga4/callback',{redirect:'manual'});
    assert.equal(noState.status,302);
    assert.equal(noState.headers.get('location'),'/?integration=ga4&status=error&reason=state');
    const appSource=require('fs').readFileSync(require('path').join(__dirname,'..','public','app.js'),'utf8');const cssSource=require('fs').readFileSync(require('path').join(__dirname,'..','public','styles.css'),'utf8');assert(appSource.includes("await loadState();closeModal();alert('Propriedade GA4 salva.')"));assert(cssSource.includes('.ga4Manager{padding:24px 28px 28px}'));console.log('ga4.test.js OK');
  }finally{await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exit(1)});
