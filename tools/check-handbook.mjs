import {readdirSync,readFileSync,statSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
import {checkPlan} from './preflight.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name==='.git'||e.name==='node_modules'?[]:e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
const files=walk(root);
const chapters=readdirSync(join(root,'guide')).filter(n=>/^[a-z]-.*\.md$/.test(n));
if(chapters.length!==26 || new Set(chapters.map(n=>n[0])).size!==26)throw new Error('Expected one chapter per A-Z letter');
let links=0;
for(const file of files.filter(f=>f.endsWith('.md'))) {
  const text=readFileSync(file,'utf8');
  for(const m of text.matchAll(/\]\(([^)]+)\)/g)) {
    const href=m[1];if(/^(https?:|mailto:|#)/.test(href))continue;
    const path=decodeURIComponent(href.split('#')[0]);
    if(!existsSync(resolve(dirname(file),path)))throw new Error(`Broken local link in ${file}: ${path}`);
    links++;
  }
}
for(const file of files.filter(f=>f.endsWith('.json')))JSON.parse(readFileSync(file,'utf8'));
for(const name of ['plan.self-managed.example.json','plan.pumpfun.example.json']) {
  const r=checkPlan(JSON.parse(readFileSync(join(root,'templates',name),'utf8')));
  if(r.assessment!=='plan_consistent_with_local_checks' || !r.findings.length)throw new Error('Example should remain consistent but visibly incomplete');
}
console.log(`Checked 26 chapters, ${links} local links, JSON files, and both example plans. External URLs were not fetched by this check.`);
