<script setup lang="ts">
const range = ref(30)
const { data: m } = await useFetch('/api/metrics', { query: { range } })
const donut = computed(() => {
  let acc = 0
  return `conic-gradient(${(m.value?.sources ?? []).map((s) => {
    const from = acc
    acc += s.share
    return `${s.color} ${from}% ${acc}%`
  }).join(', ')})`
})
</script>

<template>
  <main v-if="m" class="page">
    <div class="bar">
      <h1>Vue d'ensemble</h1>
      <div class="seg">
        <button v-for="r in [7, 30, 90]" :key="r" :class="{ on: range === r }" @click="range = r">{{ r }} j</button>
      </div>
    </div>
    <section class="kpis">
      <div v-for="k in m.kpis" :key="k.label" class="p">
        <small>{{ k.label }}</small>
        <strong>{{ k.value }}</strong>
        <span :class="k.label === 'Churn' ? 'down' : 'up'">{{ k.delta > 0 ? '▲' : '▼' }} {{ Math.abs(k.delta).toString().replace('.', ',') }} {{ k.label.includes('Taux') || k.label === 'Churn' ? 'pt' : '%' }}</span>
      </div>
    </section>
    <section class="grid">
      <div class="p"><h2>Sessions quotidiennes <span>{{ m.range }} derniers jours</span></h2><LineChart :values="m.sessions" /></div>
      <div class="p">
        <h2>Sources de trafic <span>%</span></h2>
        <div class="donut" :style="{ background: donut }"><div>{{ m.kpis[0]?.value.split(' ')[0] }}<small>visiteurs</small></div></div>
        <div v-for="s in m.sources" :key="s.name" class="src"><i :style="{ background: s.color }" />{{ s.name }}<span>{{ s.share }} %</span></div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
h1 { font-size: 26px; }
.kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 16px; }
.kpis small { color: var(--mut); font-size: 13px; }
.kpis strong { display: block; font-size: 30px; margin: 8px 0 4px; letter-spacing: -.5px; }
.grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
.donut { width: 170px; height: 170px; border-radius: 50%; margin: 6px auto 10px; display: grid; place-items: center; }
.donut div { width: 118px; height: 118px; border-radius: 50%; background: var(--panel); display: grid; place-items: center; align-content: center; font-size: 22px; font-weight: 700; }
.donut small { display: block; font-size: 12px; color: var(--mut); font-weight: 400; }
.src { display: flex; align-items: center; gap: 12px; margin: 12px 0; font-size: 14px; }
.src i { width: 10px; height: 10px; border-radius: 3px; }
.src span { margin-left: auto; color: var(--mut); }
@media (max-width: 900px) { .kpis { grid-template-columns: 1fr 1fr; } .grid { grid-template-columns: 1fr; } }
</style>
