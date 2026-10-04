<script setup lang="ts">
useHead({ title: 'Rapports — Flowstate' })

const sort = ref<'views' | 'time' | 'bounce'>('views')
const dir = ref<'asc' | 'desc'>('desc')
const { data: rows } = await useFetch('/api/reports', { query: { sort, dir } })
const maxViews = computed(() => Math.max(...(rows.value ?? []).map(r => r.views), 1))

function by(key: 'views' | 'time' | 'bounce') {
  if (sort.value === key) dir.value = dir.value === 'desc' ? 'asc' : 'desc'
  else { sort.value = key; dir.value = 'desc' }
}
const arrow = (key: string) => (sort.value === key ? (dir.value === 'desc' ? '↓' : '↑') : '')
const fmtTime = (s: number) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s`
</script>

<template>
  <main class="page">
    <h1>Pages les plus vues</h1>
    <p class="mut">Cliquez sur une colonne pour trier (tri effectué par l'API).</p>
    <div class="p table">
      <div class="row head">
        <span>Page</span>
        <button @click="by('views')">Vues {{ arrow('views') }}</button>
        <button @click="by('time')">Temps moyen {{ arrow('time') }}</button>
        <button @click="by('bounce')">Rebond {{ arrow('bounce') }}</button>
      </div>
      <div v-for="r in rows" :key="r.path" class="row">
        <span class="path">{{ r.path }}<i :style="{ width: `${(r.views / maxViews) * 100}%` }" /></span>
        <span>{{ r.views.toLocaleString('fr-FR') }}</span>
        <span>{{ fmtTime(r.time) }}</span>
        <span :class="r.bounce > 40 ? 'down' : 'up'">{{ r.bounce }} %</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 { font-size: 26px; }
.mut { color: var(--mut); margin: 6px 0 18px; font-size: 14px; }
.table { padding: 8px 20px; }
.row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--line); font-size: 14px; align-items: center; }
.row:last-child { border: 0; }
.head { color: var(--mut); font-size: 13px; }
.head button { font: inherit; color: inherit; background: none; border: 0; text-align: left; cursor: pointer; padding: 0; }
.head button:hover { color: var(--txt); }
.path { position: relative; }
.path i { position: absolute; left: 0; bottom: -8px; height: 2px; background: var(--a); border-radius: 2px; }
@media (max-width: 700px) { .row { grid-template-columns: 1.4fr 1fr; } .row > :nth-child(3), .row > :nth-child(4) { display: none; } }
</style>
