import fs from 'node:fs';
import assert from 'node:assert/strict';
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.deepEqual(config,JSON.parse(fs.readFileSync('ops/vercel.cybergrc.json','utf8')));
function destination(path){
 for(const rule of config.rewrites){
  if(rule.source===path)return rule.destination;
  if(rule.source==='/(.*)')return rule.destination;
  if(rule.source.endsWith('/:path*')){const base=rule.source.slice(0,-7);if(path.startsWith(base+'/'))return rule.destination.replace(':path*',path.slice(base.length+1));}
 }
 return null;
}
for(const path of ['/sector-overview','/provider-reviews','/provider-reviews/244','/sign-in','/users','/api/provider-reviews','/cybergrc-assets/index.js'])assert.equal(destination(path),'https://cybergrc-origin.novrgrc.com'+path);
for(const path of ['/','/platform','/framework','/solutions','/security','/about','/contact','/demo'])assert.equal(destination(path),'/index.html');
assert(config.rewrites.every(rule=>!rule.destination.includes('ncc.novrgrc.com')));
console.log('CyberGRC routing passed: neutral application deep links, unchanged marketing fallback, no NCC destination.');
