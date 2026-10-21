import {readFileSync, statSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

export function toBaseUnits(amount, decimals) {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 9) throw new Error('Supported decimals: integers 0 through 9');
  if (typeof amount !== 'string' || amount.length > 100 || !/^(0|[1-9][0-9]*)(\.[0-9]+)?$/.test(amount)) throw new Error('Use a non-negative plain decimal string');
  const [whole,fraction=''] = amount.split('.');
  if (fraction.length > decimals) throw new Error('Amount has more fractional digits than decimals');
  return BigInt(whole)*10n**BigInt(decimals)+BigInt(fraction.padEnd(decimals,'0') || '0');
}

export function checkPlan(plan) {
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) throw new Error('Expected a public launch-plan object');
  const findings=[];
  const add=(severity,code,path,message)=>findings.push({severity,code,path,message});
  const secretKeys=new Set(['privatekey','secretkey','seed','seedphrase','recoveryphrase','mnemonic','apikey','accesstoken','sessiontoken','keypair','rpcurl']);
  const walk=(value,path='plan')=>{
    if (!value || typeof value !== 'object') return;
    for(const [key,v] of Object.entries(value)) {
      if(secretKeys.has(key.toLowerCase().replace(/[_-]/g,'')))add('error','PRIVATE_FIELD',path,'Remove credential/keypair/RPC configuration fields. This is a public plan only.');
      if(typeof v === 'string' && /^https?:/i.test(v)) {
        try {const u=new URL(v);if(u.username || u.password || [...u.searchParams.keys()].some(k=>/^(api[-_]?key|token|auth|secret|key)$/i.test(k)))add('error','CREDENTIAL_URL',path,'Remove credential-bearing URLs.');} catch {add('error','INVALID_URL',path,'Malformed HTTP URL.');}
      }
      walk(v,`${path}.${key}`);
    }
  };
  walk(plan);
  if(!['planning','rehearsal','launch'].includes(plan.stage))add('error','STAGE','stage','Choose planning, rehearsal, or launch.');
  if(!['self-managed','pumpfun'].includes(plan.route))add('error','ROUTE','route','Choose self-managed or pumpfun.');
  if(!['devnet','mainnet-beta'].includes(plan.network))add('error','NETWORK','network','Choose devnet or mainnet-beta.');
  if(typeof plan.name!=='string' || !plan.name.trim())add('error','NAME','name','Provide a public token name.');
  if(typeof plan.symbol!=='string' || !plan.symbol.trim())add('error','SYMBOL','symbol','Provide a public symbol. Route-specific limits must be checked upstream.');
  let supplyBaseUnits=null;
  if(plan.route==='self-managed') {
    try {const n=toBaseUnits(plan.supplyTokens,plan.decimals);if(n<=0n || n>18446744073709551615n)throw new Error();supplyBaseUnits=n.toString();}
    catch {add('error','SUPPLY','supplyTokens','Supply must fit the supported decimal format and the SPL u64 base-unit range.');}
    if(!Array.isArray(plan.allocations) || !plan.allocations.length)add('error','ALLOCATIONS','allocations','Define the self-managed supply allocation in integer basis points.');
    else {
      const names=new Set();let sum=0;
      for(const a of plan.allocations) {
        if(!a || typeof a.label!=='string' || !a.label.trim() || names.has(a.label))add('error','ALLOCATION_NAME','allocations','Use unique, non-empty allocation labels.');
        else names.add(a.label);
        if(!a || !Number.isSafeInteger(a.bps) || a.bps<0 || a.bps>10000)add('error','ALLOCATION_BPS','allocations','Allocation bps must be integers from 0 to 10000.');
        else sum+=a.bps;
      }
      if(sum!==10000)add('error','ALLOCATION_TOTAL','allocations','Allocation basis points must sum to 10000. This does not verify distribution on-chain.');
    }
    for(const role of ['mint','freeze','metadata']) {
      if(!['none','single-signer','multisig','unknown'].includes(plan.authorities?.[role]))add('error','AUTHORITY_POLICY',`authorities.${role}`,'Choose none, single-signer, multisig, or unknown.');
      else if(plan.authorities[role]==='unknown')add(plan.stage==='launch'?'error':'warning','UNKNOWN_AUTHORITY',`authorities.${role}`,'Resolve this authority policy before launch.');
    }
    if(typeof plan.fixedSupply!=='boolean')add('error','FIXED_SUPPLY','fixedSupply','Declare fixedSupply as a boolean.');
    if(plan.fixedSupply===true && plan.authorities?.mint!=='none')add(plan.stage==='launch'?'error':'warning','FIXED_SUPPLY_MISMATCH','authorities.mint','A fixed-supply claim requires the final mint authority state to match; this offline checker cannot verify that state.');
  }
  if(plan.route==='pumpfun') {
    if(plan.supplyTokens!==null || plan.decimals!==null || !Array.isArray(plan.allocations) || plan.allocations.length)add('error','PLATFORM_PARAMETERS','route','Do not describe self-managed supply/decimals/free allocations as pump.fun creation parameters. Use null/null/[] and inspect platform state.');
    if(plan.network==='devnet')add('warning','PLATFORM_REHEARSAL','network','This handbook does not establish an official pump.fun devnet route. Use a local simulation or the separate SPL devnet exercise.');
    if(plan.platformSettingsReviewed!==true)add(plan.stage==='launch'?'error':'warning','PLATFORM_REVIEW','platformSettingsReviewed','Review current creator fee, quote asset, special modes, and migration settings.');
  }
  for(const field of ['metadataUri','imageUri']) {
    try {
      const u=new URL(plan[field]);
      if(!['https:','ipfs:','ar:'].includes(u.protocol) || !u.hostname && u.protocol!=='ar:')throw new Error();
      if(u.hostname==='example.com')add(plan.stage==='launch'?'error':'warning','PLACEHOLDER_URI',field,'Replace example.com with reviewed published content.');
    } catch {add('error','PUBLIC_URI',field,'Provide a public HTTPS/IPFS/Arweave URI without credentials. Reachability is not checked.');}
  }
  for(const field of ['disclosuresReviewed','rehearsalRecorded','independentReviewRecorded']) {
    if(typeof plan[field]!=='boolean')add('error','REVIEW_TYPE',field,'Use a boolean review-record flag.');
    else if(!plan[field])add(plan.stage==='launch'?'error':'warning','REVIEW_PENDING',field,'Complete and link the actual review record; a boolean is not proof.');
  }
  if(plan.stage==='rehearsal' && plan.network!=='devnet')add('error','REHEARSAL_NETWORK','network','The handbook rehearsal examples are devnet-only.');
  return {schema:'positano.launch-plan.v1',assessment:findings.some(f=>f.severity==='error')?'needs_changes':'plan_consistent_with_local_checks',
    supplyBaseUnits,findings,limitations:['Offline planning checks only; does not approve or execute a launch.','Does not verify addresses, authorities, URLs, fees, licenses, legal status, liquidity, or deployed programs.','Supports 0-9 decimals for this handbook; does not model every Token-2022 extension or platform mode.','No wallet, signer, network call, automatic upload, or transaction submission.']};
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  try {
    const paths=process.argv.slice(2);if(paths.length!==1)throw new Error('Usage: node tools/preflight.mjs public-plan.json');
    if(statSync(paths[0]).size>1_000_000)throw new Error('Plan exceeds the 1 MB limit');
    const report=checkPlan(JSON.parse(readFileSync(paths[0],'utf8')));
    process.stdout.write(JSON.stringify(report,null,2)+'\n');process.exitCode=report.assessment==='needs_changes'?2:0;
  } catch(error) {console.error(error instanceof SyntaxError?'Invalid plan JSON':error instanceof Error?error.message:'Plan check failed');process.exitCode=1;}
}
