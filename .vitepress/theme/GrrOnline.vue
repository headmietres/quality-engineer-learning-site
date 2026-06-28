<template>
  <div class="grr-online">
    <h3>📏 GRR 在线计算器</h3>
    <p>量具重复性与再现性分析 — 均值-极差法 (AIAG)</p>
    
    <div class="grr-section">
      <h4>⚙️ 设置</h4>
      <div class="grr-row">
        <label>操作员: <select v-model.number="nOps"><option :value="2">2</option><option :value="3">3</option><option :value="4">4</option></select></label>
        <label>零件: <select v-model.number="nParts"><option :value="5">5</option><option :value="8">8</option><option :value="10">10</option><option :value="15">15</option></select></label>
        <label>测量次数: <select v-model.number="nTrials"><option :value="2">2</option><option :value="3">3</option></select></label>
        <label>公差: <input v-model.number="tolVal" placeholder="可选" class="grr-input-sm" /></label>
      </div>
    </div>

    <div class="grr-section">
      <h4>📊 测量数据</h4>
      <p class="grr-hint">输入每位操作员对各零件的测量值</p>
      <div class="grr-table-wrap">
        <table class="grr-table">
          <thead>
            <tr>
              <th>零件</th>
              <template v-for="op in opList" :key="op">
                <th :colspan="nTrials">{{ op }}</th>
              </template>
            </tr>
            <tr>
              <th></th>
              <template v-for="op in opList" :key="'s'+op">
                <th v-for="t in nTrials" :key="t">{{ t }}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in nParts" :key="p">
              <td class="grr-pl">{{ p }}</td>
              <template v-for="op in opList" :key="'c'+op+p">
                <td v-for="t in nTrials" :key="t">
                  <input v-model="cells[op+'-'+(p-1)+'-'+(t-1)]" class="grr-cell" />
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="grr-actions">
      <button class="grr-btn" @click="doCalc">计算</button>
      <button class="grr-btn-sec" @click="loadEx">加载示例</button>
      <button class="grr-btn-sec" @click="doClear">清空</button>
    </div>

    <div v-if="hasResult" class="grr-section">
      <h4>📈 分析结果</h4>
      <div class="grr-cards">
        <div class="grr-card" :class="pctCls">
          <div class="grr-cls">%GRR</div>
          <div class="grr-val">{{ pctRes.toFixed(1) }}%</div>
          <div class="grr-tag">{{ pctRes <= 10 ? '✅ 可接受' : pctRes < 30 ? '⚠️ 临界' : '❌ 不可接受' }}</div>
        </div>
        <div class="grr-card"><div class="grr-cls">重复性 EV</div><div class="grr-val">{{ evRes.toFixed(4) }}</div></div>
        <div class="grr-card"><div class="grr-cls">再现性 AV</div><div class="grr-val">{{ avRes.toFixed(4) }}</div></div>
        <div class="grr-card"><div class="grr-cls">ndc</div><div class="grr-val">{{ ndcRes.toFixed(1) }}</div><div class="grr-tag">{{ ndcRes >= 5 ? '✅' : '❌' }}</div></div>
      </div>
      <table class="grr-tbl">
        <thead><tr><th>来源</th><th>σ</th><th>%变差</th></tr></thead>
        <tbody>
          <tr><td>重复性 EV</td><td>{{ evRes.toFixed(4) }}</td><td>{{ pctEv.toFixed(1) }}</td></tr>
          <tr><td>再现性 AV</td><td>{{ avRes.toFixed(4) }}</td><td>{{ pctAv.toFixed(1) }}</td></tr>
          <tr class="grr-hl"><td><strong>GRR</strong></td><td><strong>{{ grrRes.toFixed(4) }}</strong></td><td><strong>{{ pctRes.toFixed(1) }}%</strong></td></tr>
          <tr><td>零件 PV</td><td>{{ pvRes.toFixed(4) }}</td><td>{{ pctPv.toFixed(1) }}</td></tr>
          <tr class="grr-hl2"><td><strong>总变差 TV</strong></td><td><strong>{{ tvRes.toFixed(4) }}</strong></td><td><strong>100%</strong></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const NAMES = ['A','B','C','D']
const nOps = ref(3)
const nParts = ref(10)
const nTrials = ref(3)
const tolVal = ref(null)
const hasResult = ref(false)
const cells = reactive({})

const opList = computed(() => NAMES.slice(0, nOps.value))

const evRes = ref(0); const avRes = ref(0); const grrRes = ref(0)
const pvRes = ref(0); const tvRes = ref(0); const pctRes = ref(0); const ndcRes = ref(0)
const pctEv = ref(0); const pctAv = ref(0); const pctPv = ref(0)
const pctCls = ref('')

function gv(op, p, t) {
  const v = cells[op+'-'+p+'-'+t]
  return (v !== undefined && v !== null && v !== '') ? Number(v) : NaN
}

function doCalc() {
  const ops = opList.value
  const np = nParts.value, nt = nTrials.value, no = ops.length
  
  // Check data
  let ok = false
  for (const op of ops) for (let p = 0; p < np; p++) for (let t = 0; t < nt; t++) if (!isNaN(gv(op,p,t))) ok = true
  if (!ok) { alert('请输入数据或加载示例'); return }
  
  // Part means
  const pm = []
  for (let p = 0; p < np; p++) {
    let s = 0, c = 0
    for (const op of ops) for (let t = 0; t < nt; t++) { const v = gv(op,p,t); if (!isNaN(v)) { s+=v; c++ } }
    pm.push(c ? s/c : 0)
  }
  
  // Op means
  const om = {}
  for (const op of ops) {
    let s = 0, c = 0
    for (let p = 0; p < np; p++) for (let t = 0; t < nt; t++) { const v = gv(op,p,t); if (!isNaN(v)) { s+=v; c++ } }
    om[op] = c ? s/c : 0
  }
  
  // Rbar
  let tr = 0
  for (const op of ops) {
    let or = 0
    for (let p = 0; p < np; p++) {
      const va = []
      for (let t = 0; t < nt; t++) { const v = gv(op,p,t); if (!isNaN(v)) va.push(v) }
      or += va.length >= 2 ? Math.max(...va) - Math.min(...va) : 0
    }
    tr += or / np
  }
  const Rbar = tr / no
  
  const d2 = nt === 2 ? 1.128 : nt === 3 ? 1.693 : 2.059       // for EV (based on trials)
  const d2Op = no === 2 ? 1.128 : no === 3 ? 1.693 : 2.059      // for AV (based on # operators)
  const ev = Rbar / d2
  const xd = Math.max(...ops.map(o=>om[o])) - Math.min(...ops.map(o=>om[o]))
  const av = Math.sqrt(Math.max(0, (xd/d2Op)**2 - ev**2/(np*nt)))
  const grr = Math.sqrt(ev*ev + av*av)
  const pv = (Math.max(...pm) - Math.min(...pm)) / d2
  const tv = Math.sqrt(grr*grr + pv*pv)
  const pct = tv > 0 ? grr/tv*100 : 0
  const ndc = grr > 0 ? 1.41 * pv/grr : 0
  
  evRes.value = ev; avRes.value = av; grrRes.value = grr
  pvRes.value = pv; tvRes.value = tv
  pctRes.value = pct; ndcRes.value = ndc
  pctEv.value = tv>0 ? ev*ev/(tv*tv)*100 : 0
  pctAv.value = tv>0 ? av*av/(tv*tv)*100 : 0
  pctPv.value = tv>0 ? pv*pv/(tv*tv)*100 : 0
  pctCls.value = pct<=10 ? 'grr-ok' : pct<30 ? 'grr-warn' : 'grr-bad'
  hasResult.value = true
}

function loadEx() {
  nOps.value = 3; nParts.value = 10; nTrials.value = 3
  for (const k of Object.keys(cells)) delete cells[k]
  const d = {
    'A-0-0':10.1,'A-0-1':10.2,'A-0-2':10.1,'A-1-0':10.5,'A-1-1':10.4,'A-1-2':10.5,
    'A-2-0':9.8,'A-2-1':9.9,'A-2-2':9.9,'A-3-0':10.3,'A-3-1':10.2,'A-3-2':10.3,
    'A-4-0':10.0,'A-4-1':10.1,'A-4-2':10.0,'A-5-0':10.7,'A-5-1':10.6,'A-5-2':10.7,
    'A-6-0':10.2,'A-6-1':10.3,'A-6-2':10.2,'A-7-0':9.9,'A-7-1':10.0,'A-7-2':9.9,
    'A-8-0':10.4,'A-8-1':10.5,'A-8-2':10.4,'A-9-0':10.6,'A-9-1':10.5,'A-9-2':10.6,
    'B-0-0':10.3,'B-0-1':10.2,'B-0-2':10.2,'B-1-0':10.5,'B-1-1':10.6,'B-1-2':10.5,
    'B-2-0':10.0,'B-2-1':9.9,'B-2-2':10.0,'B-3-0':10.2,'B-3-1':10.3,'B-3-2':10.2,
    'B-4-0':10.1,'B-4-1':10.0,'B-4-2':10.1,'B-5-0':10.8,'B-5-1':10.7,'B-5-2':10.8,
    'B-6-0':10.3,'B-6-1':10.2,'B-6-2':10.3,'B-7-0':10.0,'B-7-1':9.9,'B-7-2':10.0,
    'B-8-0':10.5,'B-8-1':10.4,'B-8-2':10.5,'B-9-0':10.6,'B-9-1':10.7,'B-9-2':10.6,
    'C-0-0':10.1,'C-0-1':10.2,'C-0-2':10.1,'C-1-0':10.4,'C-1-1':10.5,'C-1-2':10.4,
    'C-2-0':9.9,'C-2-1':10.0,'C-2-2':9.9,'C-3-0':10.3,'C-3-1':10.2,'C-3-2':10.3,
    'C-4-0':10.0,'C-4-1':10.1,'C-4-2':10.0,'C-5-0':10.7,'C-5-1':10.6,'C-5-2':10.7,
    'C-6-0':10.2,'C-6-1':10.3,'C-6-2':10.2,'C-7-0':9.9,'C-7-1':10.0,'C-7-2':9.9,
    'C-8-0':10.4,'C-8-1':10.5,'C-8-2':10.4,'C-9-0':10.5,'C-9-1':10.6,'C-9-2':10.5
  }
  for (const [k,v] of Object.entries(d)) cells[k] = v
  hasResult.value = false
}

function doClear() {
  for (const k of Object.keys(cells)) delete cells[k]
  hasResult.value = false
}
</script>

<style scoped>
.grr-online { border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:20px 0; font-family:-apple-system,BlinkMacSystemFont,sans-serif; }
.grr-section { margin-bottom:16px; }
.grr-section h4 { margin:0 0 8px 0; font-size:1rem; color:#444; }
.grr-row { display:flex; gap:12px; flex-wrap:wrap; }
.grr-row label { font-size:0.9rem; }
.grr-row select, .grr-input-sm { padding:4px 8px; border:1px solid #ccc; border-radius:4px; font-size:0.9rem; width:70px; }
.grr-hint { font-size:0.85rem; color:#888; margin-bottom:8px; }
.grr-table-wrap { overflow-x:auto; }
.grr-table { border-collapse:collapse; font-size:0.85rem; width:100%; }
.grr-table th, .grr-table td { border:1px solid #d1d5db; padding:3px; text-align:center; }
.grr-table th { background:#e2e8f0; font-weight:600; }
.grr-pl { font-weight:600; background:#f1f5f9; min-width:40px; }
.grr-cell { width:50px; padding:3px 4px; border:1px solid #ddd; border-radius:3px; text-align:center; font-size:0.85rem; }
.grr-actions { display:flex; gap:8px; margin:12px 0; flex-wrap:wrap; }
.grr-btn { padding:8px 24px; background:#3b82f6; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:1rem; }
.grr-btn:hover { background:#2563eb; }
.grr-btn-sec { padding:8px 16px; background:#fff; color:#666; border:1px solid #ccc; border-radius:6px; cursor:pointer; }
.grr-btn-sec:hover { background:#f3f4f6; }
.grr-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:10px; margin-bottom:12px; }
.grr-card { border:2px solid #e2e8f0; border-radius:8px; padding:12px; text-align:center; background:#fff; }
.grr-card.grr-ok { border-color:#22c55e; background:#f0fdf4; }
.grr-card.grr-warn { border-color:#f59e0b; background:#fffbeb; }
.grr-card.grr-bad { border-color:#ef4444; background:#fef2f2; }
.grr-cls { font-size:0.85rem; color:#666; }
.grr-val { font-size:1.5rem; font-weight:700; color:#1e293b; }
.grr-tag { font-size:0.8rem; margin-top:4px; }
.grr-tbl { width:100%; border-collapse:collapse; margin:12px 0; }
.grr-tbl th, .grr-tbl td { border:1px solid #e2e8f0; padding:6px 10px; text-align:center; font-size:0.9rem; }
.grr-tbl th { background:#f1f5f9; }
.grr-hl { background:#eff6ff; }
.grr-hl2 { background:#f8fafc; }
</style>
