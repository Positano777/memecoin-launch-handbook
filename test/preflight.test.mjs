import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {checkPlan,toBaseUnits} from '../tools/preflight.mjs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {mkdtempSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const plan=()=>JSON.parse(readFileSync(new URL('../templates/plan.self-managed.example.json',import.meta.url),'utf8'));
const codes=p=>checkPlan(p).findings.map(x=>x.code);
test('BigInt units preserve exact supply',()=>assert.equal(toBaseUnits('1000000000',6),1000000000000000n));
test('fractional amounts are exact',()=>assert.equal(toBaseUnits('1.000001',6),1000001n));
test('floats, scientific notation, excess precision and huge exponents are rejected',()=>{
  for(const [n,d] of [[1.2,6],['1e9',6],['0.0000001',6],['1',255],['-1',6]])assert.throws(()=>toBaseUnits(n,d));
});
test('example plan is structurally consistent but keeps pending-review warnings',()=>{
  const r=checkPlan(plan());assert.equal(r.assessment,'plan_consistent_with_local_checks');assert.ok(r.findings.some(f=>f.code==='REVIEW_PENDING'));
});
test('u64 overflow is a plan error',()=>{const p=plan();p.supplyTokens='999999999999999999999999999999';assert.ok(codes(p).includes('SUPPLY'));});
test('allocations must total 10000 integer bps',()=>{const p=plan();p.allocations[0].bps=6999;assert.ok(codes(p).includes('ALLOCATION_TOTAL'));p.allocations[0].bps=7000.5;assert.ok(codes(p).includes('ALLOCATION_BPS'));});
test('duplicate allocation labels are rejected',()=>{const p=plan();p.allocations[1].label=p.allocations[0].label;assert.ok(codes(p).includes('ALLOCATION_NAME'));});
test('launch cannot keep unresolved self-reported reviews',()=>{const p=plan();p.stage='launch';assert.equal(checkPlan(p).assessment,'needs_changes');});
test('fixed supply and retained mint authority are inconsistent at launch',()=>{const p=plan();p.stage='launch';p.authorities.mint='single-signer';assert.ok(codes(p).includes('FIXED_SUPPLY_MISMATCH'));});
test('unknown authority policy remains visible',()=>{const p=plan();p.authorities.freeze='unknown';assert.ok(codes(p).includes('UNKNOWN_AUTHORITY'));});
test('nested credential field is rejected without reflecting its value',()=>{const p=plan();p.extra={apiKey:'synthetic-sensitive-marker'};const r=checkPlan(p);assert.ok(r.findings.some(x=>x.code==='PRIVATE_FIELD'));assert.ok(!JSON.stringify(r).includes('synthetic-sensitive-marker'));});
test('credential URLs are rejected without echoing URL contents',()=>{const p=plan();p.metadataUri='https://example.com/token.json?api-key=synthetic-sensitive-marker';assert.ok(codes(p).includes('CREDENTIAL_URL'));assert.ok(!JSON.stringify(checkPlan(p)).includes('synthetic-sensitive-marker'));});
test('unsafe URI schemes are rejected',()=>{const p=plan();p.imageUri='file:///private/key.json';assert.ok(codes(p).includes('PUBLIC_URI'));});
test('pump route does not accept custom mint allocations or decimals',()=>{const p=plan();p.route='pumpfun';assert.ok(codes(p).includes('PLATFORM_PARAMETERS'));});
test('rehearsal commands must not be labeled mainnet rehearsal',()=>{const p=plan();p.stage='rehearsal';p.network='mainnet-beta';assert.ok(codes(p).includes('REHEARSAL_NETWORK'));});
test('invalid top level input fails',()=>{for(const p of [null,[],false])assert.throws(()=>checkPlan(p));});
test('CLI checks the public example without network or credentials',()=>{
  const cli=fileURLToPath(new URL('../tools/preflight.mjs',import.meta.url));
  const example=fileURLToPath(new URL('../templates/plan.self-managed.example.json',import.meta.url));
  const r=spawnSync(process.execPath,[cli,example],{encoding:'utf8'});
  assert.equal(r.status,0);assert.equal(JSON.parse(r.stdout).supplyBaseUnits,'1000000000000000');
});
test('CLI syntax errors do not echo invalid input contents',()=>{
  const file=join(mkdtempSync(join(tmpdir(),'public-plan-')),'invalid.json');writeFileSync(file,'synthetic-sensitive-marker is not JSON');
  const cli=fileURLToPath(new URL('../tools/preflight.mjs',import.meta.url));
  const r=spawnSync(process.execPath,[cli,file],{encoding:'utf8'});assert.equal(r.status,1);assert.ok(!r.stderr.includes('synthetic-sensitive-marker'));
});
