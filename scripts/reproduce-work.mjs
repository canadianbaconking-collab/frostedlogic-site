// Node 24.19+; pass local Coldgate, Driftglass and SignalForge checkout paths.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { stripTypeScriptTypes } from 'node:module';
import { execFileSync, spawnSync } from 'node:child_process';
const [cold, drift, signal] = process.argv.slice(2).map(p => resolve(p));
if (!cold || !drift || !signal) throw new Error('Pass three project checkout paths');
const revisions = {coldgate:'87844dd8bbfeefae60202d175f18eefc51eecb0f',driftglass:'e6858ef591b0012d3334d8943ef853eb4a6b04d4',signalforge:'bfe0a9f93d7049ac9554061a58c119ae5ba517da'};
for (const [name, dir] of [['coldgate',cold],['driftglass',drift],['signalforge',signal]]) {
  if(execFileSync('git',['rev-parse','HEAD'],{cwd:dir,encoding:'utf8'}).trim() !== revisions[name]) throw new Error(`Checkout pinned ${name} revision first`);
  if(execFileSync('git',['status','--porcelain'],{cwd:dir,encoding:'utf8'}).trim()) throw new Error(`${name} checkout must be clean`);
}
const out = resolve('work/evidence');
const save = (name, data) => writeFileSync(join(out, name+'.json'), JSON.stringify(data,null,2)+'\n');
const before = JSON.parse(readFileSync(join(cold,'examples/diff/before.json')));
const after = JSON.parse(readFileSync(join(cold,'examples/diff/after.json')));
const run = spawnSync(process.execPath, ['packages/cli/bin/coldgate.js','diff','examples/diff/before.json','examples/diff/after.json','--format','json'],{cwd:cold,encoding:'utf8'});
if(run.status !== 0) throw new Error(run.stderr);
const coldResult = JSON.parse(run.stdout);
assert.equal(coldResult.changes.length,9);
for(const category of ['approval:weakening','boundaries:widening','credentials:expansion']) assert(coldResult.changes.some(c=>c.category===category));
save('coldgate',{synthetic:true,source_commit:revisions.coldgate,before,after,result:coldResult});
const { assessPolicyChange } = await import(pathToFileURL(join(drift,'src/ci/index.js')));
const { evaluate } = await import(pathToFileURL(join(drift,'src/index.js')));
const baseline = {schema_version:1,default:'deny',rules:[{id:'write-repo',allow:{tool:'files.write',effect:'WRITE',resource:'repo/*'}}]};
const candidate = {schema_version:1,default:'deny',rules:[{id:'write-repo',allow:{tool:'files.write',effect:'WRITE'}}]};
const event = {schema_version:1,tool:'files.write',effect:'WRITE',resource:'repo/readme'};
// Replay accepts traces as an array of identified envelopes; match its public contract.
const traces = [{id:'recorded-write',schema_version:1,events:[event]}];
const result = assessPolicyChange(baseline,candidate,traces);
assert.equal(result.gate.historical_regressions,0);
assert.equal(result.gate.newly_allowed_cells,16);
assert.equal(result.gate.passed,false);
const witness = {schema_version:1,tool:'files.write',effect:'WRITE',resource:'outside/payroll'};
save('driftglass',{synthetic:true,source_commit:revisions.driftglass,baseline,candidate,traces,result,witness:{event:witness,baseline:evaluate(baseline,witness),candidate:evaluate(candidate,witness)}});
// Transpile the pure adjudicator only; no collectors, database or live services run.
const temp = mkdtempSync(join(tmpdir(),'frosted-evidence-'));
try {
  const engine = join(signal,'last30-engine/engine');
  let source = readFileSync(join(engine,'evidence/adjudicate.ts'),'utf8').replace('import { CollectedItem }','import type { CollectedItem }').replace('assignTimestampTier, TimestampTier','assignTimestampTier, type TimestampTier').replace('../ranking/timestampTier','./timestampTier.mjs');
  writeFileSync(join(temp,'adjudicate.mjs'),stripTypeScriptTypes(source));
  writeFileSync(join(temp,'timestampTier.mjs'),stripTypeScriptTypes(readFileSync(join(engine,'ranking/timestampTier.ts'),'utf8')));
  const { adjudicateEvidence } = await import(pathToFileURL(join(temp,'adjudicate.mjs')));
  const item = (id,primary,stance='supports') => ({title:'Tool X supports approval review',url:`https://example.org/${id}`,snippet:'Synthetic observation',published_at:'2026-10-15T12:00:00Z',source:'synthetic',claim_key:'approval-review',stance,primary_url:`https://example.org/${primary}`,metadata_origin:'operator'});
  const echoes = [item('article-a','original'),item('article-b','original'),item('article-c','original')];
  const independent = [...echoes,item('independent-test','test-report')];
  const contested = [...independent,item('counter-test','counter-report','refutes')];
  const scenarios = [echoes,independent,contested].map(input=>({input,result:adjudicateEvidence(input,'2026-10-16',30)}));
  assert.deepEqual(scenarios.map(s=>s.result.claims[0].status),['single_origin','corroborated','contested']);
  assert.deepEqual(scenarios.map(s=>s.result.claims[0].independent_support_families),[1,2,2]);
  save('signalforge',{synthetic:true,source_commit:revisions.signalforge,scenarios});
} finally { rmSync(temp,{recursive:true,force:true}); }
console.log('Reproduced all three synthetic walkthroughs.');
