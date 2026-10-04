const fs=require('fs'),path=require('path'),assert=require('assert');
const js=fs.readFileSync(path.join(__dirname,'..','public','app.js'),'utf8');
const css=fs.readFileSync(path.join(__dirname,'..','public','styles.css'),'utf8');
assert(js.includes('class="siteApiManager"'));
assert(js.includes('class="connectorHubModal"'));
assert(css.includes('.connectorHubModal,.siteApiManager{padding:24px 28px 28px'));
assert(css.includes('@media(max-width:760px){.connectorHubModal,.siteApiManager{padding:18px}'));
for(const cls of ['ga4Manager','metaManager','profilePanel','planManager','publicationManager','formatsModal']) assert(css.includes('.'+cls),`modal sem regra própria: ${cls}`);
console.log('modal-spacing.test.js OK');
