const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=__dirname,PUB=path.join(ROOT,'public'),DB=path.join(ROOT,'data','db.json');
const defaults={business:{name:'',category:'',site:'',instagram:'',city:'',radius:15,goal:'whatsapp',budget:20,mode:'approval'},brand:{colors:'#102A43, #FF6B5E',instructions:'',assets:[]},campaigns:[],competitors:[],decisions:[],integrations:{meta:{connected:false},google:{connected:false},whatsapp:{connected:false},payments:{connected:false}}};
function load(){try{return {...defaults,...JSON.parse(fs.readFileSync(DB,'utf8'))}}catch{return structuredClone(defaults)}}
function save(d){fs.writeFileSync(DB,JSON.stringify(d,null,2))}
function json(res,status,obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(obj))}
function body(req){return new Promise((ok,no)=>{let s='';req.on('data',c=>{s+=c;if(s.length>2e6)req.destroy()});req.on('end',()=>{try{ok(s?JSON.parse(s):{})}catch(e){no(e)}})})}
function serve(req,res){let p=req.url==='/'?'/index.html':req.url.split('?')[0];p=path.normalize(p).replace(/^\.\.(\/|\\)/,'');let f=path.join(PUB,p);if(!f.startsWith(PUB)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return false;let ext=path.extname(f),types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};res.writeHead(200,{'Content-Type':(types[ext]||'application/octet-stream')+'; charset=utf-8'});fs.createReadStream(f).pipe(res);return true}
const server=http.createServer(async(req,res)=>{try{
 if(req.url==='/api/health')return json(res,200,{ok:true,version:'anunciae-v1'});
 if(req.url==='/api/state'&&req.method==='GET')return json(res,200,load());
 if(req.url==='/api/onboarding'&&req.method==='POST'){let d=load(),b=await body(req);d.business={...d.business,...b};save(d);return json(res,200,{ok:true,business:d.business})}
 if(req.url==='/api/brand'&&req.method==='POST'){let d=load(),b=await body(req);d.brand={...d.brand,...b};save(d);return json(res,200,{ok:true,brand:d.brand})}
 if(req.url==='/api/competitors'&&req.method==='POST'){let d=load(),b=await body(req);let item={id:crypto.randomUUID(),name:b.name||'Concorrente',url:b.url||'',createdAt:new Date().toISOString()};d.competitors.push(item);save(d);return json(res,201,item)}
 if(req.url==='/api/campaigns'&&req.method==='POST'){let d=load(),b=await body(req);let c={id:crypto.randomUUID(),name:b.name||'Nova campanha',goal:b.goal||d.business.goal,budget:Number(b.budget||d.business.budget||20),creativeMode:b.creativeMode||'ai',status:'draft',createdAt:new Date().toISOString()};d.campaigns.push(c);d.decisions.unshift({id:crypto.randomUUID(),type:'created',text:`Campanha “${c.name}” criada como rascunho. Nenhuma mídia foi publicada.`,createdAt:new Date().toISOString()});save(d);return json(res,201,c)}
 if(req.url.startsWith('/api/integrations/')&&req.method==='POST'){let key=req.url.split('/').pop(),d=load();if(!d.integrations[key])return json(res,404,{error:'Integração desconhecida'});return json(res,409,{ok:false,code:'CREDENTIALS_REQUIRED',message:`${key} requer credenciais e autorização oficiais. O Anunciaê! não simula conexão.`})}
 if(req.url==='/api/reset'&&req.method==='POST'){save(structuredClone(defaults));return json(res,200,{ok:true})}
 if(req.url.startsWith('/api/'))return json(res,404,{error:'Not found'});if(serve(req,res))return;res.writeHead(404);res.end('Not found');
 }catch(e){json(res,500,{error:'Internal error',detail:e.message})}});
if(require.main===module)server.listen(process.env.PORT||3000,()=>console.log(`Anunciaê! v1 em http://localhost:${process.env.PORT||3000}`));module.exports=server;
