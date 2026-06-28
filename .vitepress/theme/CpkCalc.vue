<template>
  <div class="cpk-calc">
    <div class="cpk-header">
      <h3>📊 Cp / Cpk 交互计算器</h3>
      <p class="cpk-desc">输入规格界限和样本数据，自动计算过程能力指数</p>
    </div>

    <div class="cpk-section">
      <h4>📐 规格界限</h4>
      <div class="cpk-row">
        <div class="cpk-fld">
          <label>规格下限 (LSL)</label>
          <input v-model.number="lsl" type="number" step="any" placeholder="e.g. 99.0" />
        </div>
        <div class="cpk-fld">
          <label>规格上限 (USL)</label>
          <input v-model.number="usl" type="number" step="any" placeholder="e.g. 101.0" />
        </div>
        <div class="cpk-fld">
          <label>目标值 (T) <span class="cpk-opt">可选</span></label>
          <input v-model.number="target" type="number" step="any" placeholder="e.g. 100.0" />
        </div>
      </div>
    </div>

    <div class="cpk-section">
      <h4>📊 样本统计量</h4>
      <div class="cpk-row">
        <div class="cpk-fld">
          <label>样本均值 (x̄)</label>
          <input v-model.number="mean" type="number" step="any" placeholder="e.g. 100.3" />
        </div>
        <div class="cpk-fld">
          <label>样本标准差 (s)</label>
          <input v-model.number="stddev" type="number" step="any" placeholder="e.g. 0.25" />
        </div>
        <div class="cpk-fld">
          <label>样本量 (n) <span class="cpk-opt">可选</span></label>
          <input v-model.number="n" type="number" min="2" placeholder="e.g. 50" />
        </div>
      </div>
    </div>

    <div class="cpk-actions">
      <button class="cpk-btn" @click="doCalc">计算</button>
      <button class="cpk-btn-sec" @click="doReset">重置</button>
    </div>

    <div v-if="showRes" class="cpk-section">
      <h4>📈 计算结果</h4>
      <div class="cpk-cards">
        <div class="cpk-card" :class="cpCls">
          <div class="cpk-lbl">Cp</div>
          <div class="cpk-val">{{ cp.toFixed(4) }}</div>
          <div class="cpk-tag">{{ rateCp }}</div>
        </div>
        <div class="cpk-card" :class="cpkCls">
          <div class="cpk-lbl">Cpk</div>
          <div class="cpk-val">{{ cpk.toFixed(4) }}</div>
          <div class="cpk-tag">{{ rateCpk }}</div>
        </div>
        <div class="cpk-card" :class="cpuCls">
          <div class="cpk-lbl">Cpu（上侧）</div>
          <div class="cpk-val">{{ cpu.toFixed(4) }}</div>
        </div>
        <div class="cpk-card" :class="cplCls">
          <div class="cpk-lbl">Cpl（下侧）</div>
          <div class="cpk-val">{{ cpl.toFixed(4) }}</div>
        </div>
      </div>

      <table class="cpk-tbl">
        <tr><td>Pp</td><td>{{ pp.toFixed(4) }}</td></tr>
        <tr><td>Ppk</td><td>{{ ppk.toFixed(4) }}</td></tr>
        <tr><td>偏移量</td><td>{{ offset.toFixed(4) }}</td></tr>
        <tr><td>预期不良率</td><td>{{ defectPpm.toFixed(2) }} ppm</td></tr>
        <tr><td>样本数</td><td>{{ nVal }}</td></tr>
      </table>

      <div class="cpk-meter">
        <div class="cpk-mbar">
          <div class="cpk-mfill" :style="{width: gaugePct+'%'}"></div>
          <span class="cpk-mm" style="left:25%">1.0</span>
          <span class="cpk-mm" style="left:50%">1.33</span>
          <span class="cpk-mm" style="left:75%">1.67</span>
        </div>
        <div class="cpk-mptr" :style="{marginLeft:gaugePct+'%'}">▲ {{ cpk.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const lsl = ref(null), usl = ref(null), target = ref(null)
const mean = ref(null), stddev = ref(null), n = ref(null)
const showRes = ref(false)

const cp = ref(0), cpk = ref(0), cpu = ref(0), cpl = ref(0)
const pp = ref(0), ppk = ref(0), offset = ref(0), defectPpm = ref(0), nVal = ref(0)

const gaugePct = computed(() => Math.min(100, Math.max(0, cpk.value / 2 * 100)))

function rating(v) {
  if (v >= 1.67) return '优秀'
  if (v >= 1.33) return '良好'
  if (v >= 1.0) return '一般'
  return '不足'
}

const rateCp = computed(() => rating(cp.value))
const rateCpk = computed(() => rating(cpk.value))
const cpuCls = computed(() => cls(cpu.value))
const cplCls = computed(() => cls(cpl.value))
const cpCls = computed(() => cls(cp.value))
const cpkCls = computed(() => cls(cpk.value))

function cls(v) {
  if (v >= 1.33) return 'cpk-ok'
  if (v >= 1.0) return 'cpk-warn'
  return 'cpk-bad'
}

// Standard normal CDF
function normCdf(x) {
  const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911
  const s = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)
  const t = 1/(1+p*x)
  return 0.5*(1+s*(1-((((a5*t+a4)*t+a3)*t+a2)*t+a1)*t*Math.exp(-x*x)))
}

function doCalc() {
  if (lsl.value === null || usl.value === null || lsl.value >= usl.value) {
    alert('请输入有效规格界限 (USL > LSL)')
    return
  }
  if (mean.value === null || stddev.value === null || stddev.value <= 0) {
    alert('请输入有效的样本均值和标准差')
    return
  }

  const xb = mean.value, s = stddev.value
  const USL = usl.value, LSL = lsl.value

  cp.value = (USL - LSL) / (6 * s)
  cpu.value = (USL - xb) / (3 * s)
  cpl.value = (xb - LSL) / (3 * s)
  cpk.value = Math.min(cpu.value, cpl.value)
  pp.value = cp.value
  ppk.value = cpk.value
  offset.value = Math.abs(xb - (USL + LSL) / 2)
  nVal.value = n.value || 30

  const zMin = 3 * cpk.value
  defectPpm.value = (2 * (1 - normCdf(zMin))) * 1e6

  showRes.value = true
}

function doReset() {
  lsl.value = null; usl.value = null; target.value = null
  mean.value = null; stddev.value = null; n.value = null
  showRes.value = false
}
</script>

<style scoped>
.cpk-calc { border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:20px 0; font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f8f9fa; }
.cpk-header h3 { margin:0 0 4px 0; font-size:1.3rem; }
.cpk-desc { margin:0 0 16px 0; color:#666; font-size:0.9rem; }
.cpk-section { margin-bottom:16px; }
.cpk-section h4 { margin:0 0 8px 0; font-size:1rem; color:#444; }
.cpk-row { display:flex; gap:12px; flex-wrap:wrap; }
.cpk-fld { flex:1; min-width:130px; }
.cpk-fld label { display:block; font-size:0.85rem; color:#555; margin-bottom:4px; }
.cpk-opt { color:#999; font-size:0.8rem; }
.cpk-fld input { width:100%; padding:8px 10px; border:1px solid #d1d5db; border-radius:6px; font-size:0.95rem; box-sizing:border-box; background:#fff; }
.cpk-actions { display:flex; gap:10px; margin:16px 0; }
.cpk-btn { padding:10px 28px; background:#3b82f6; color:#fff; border:none; border-radius:8px; font-size:1rem; cursor:pointer; }
.cpk-btn:hover { background:#2563eb; }
.cpk-btn-sec { padding:10px 20px; background:#fff; color:#666; border:1px solid #d1d5db; border-radius:8px; font-size:1rem; cursor:pointer; }
.cpk-btn-sec:hover { background:#f3f4f6; }
.cpk-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:12px; margin-bottom:16px; }
.cpk-card { background:#fff; border:2px solid #e2e8f0; border-radius:10px; padding:16px; text-align:center; }
.cpk-card.cpk-ok { border-color:#22c55e; background:#f0fdf4; }
.cpk-card.cpk-warn { border-color:#f59e0b; background:#fffbeb; }
.cpk-card.cpk-bad { border-color:#ef4444; background:#fef2f2; }
.cpk-lbl { font-size:0.85rem; color:#666; margin-bottom:4px; }
.cpk-val { font-size:1.6rem; font-weight:700; font-family:'SF Mono','Consolas',monospace; color:#1e293b; }
.cpk-tag { font-size:0.8rem; margin-top:4px; color:#666; }
.cpk-tbl { width:100%; border-collapse:collapse; margin:12px 0; }
.cpk-tbl td { padding:6px 12px; border-bottom:1px solid #f1f5f9; font-size:0.9rem; }
.cpk-tbl td:first-child { color:#666; font-weight:500; }
.cpk-tbl td:last-child { font-family:'SF Mono','Consolas',monospace; text-align:right; font-weight:600; }
.cpk-meter { margin-top:16px; }
.cpk-mbar { height:20px; background:linear-gradient(to right,#ef4444 0%,#f59e0b 25%,#22c55e 50%,#22c55e 75%,#3b82f6 75%,#3b82f6 100%); border-radius:10px; position:relative; overflow:hidden; }
.cpk-mfill { position:absolute; left:0; top:0; height:100%; background:rgba(0,0,0,0.15); border-radius:10px; transition:width 0.5s; }
.cpk-mm { position:absolute; top:-16px; font-size:0.7rem; color:#555; transform:translateX(-50%); }
.cpk-mptr { font-size:0.85rem; font-weight:600; color:#1e293b; transition:margin-left 0.5s; text-align:center; }
</style>
