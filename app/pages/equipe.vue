<script setup lang="ts">
useHead({ title: 'Équipe — Flowstate' })
const { data: team } = await useFetch('/api/team')
const query = ref('')
const shown = computed(() => (team.value ?? []).filter(m => `${m.name} ${m.role}`.toLowerCase().includes(query.value.toLowerCase())))
</script>

<template>
  <main class="page">
    <div class="bar"><h1>Équipe</h1><input v-model="query" placeholder="Filtrer un membre…"></div>
    <div class="cards">
      <article v-for="m in shown" :key="m.name" class="p member">
        <div class="avatar" :style="{ background: m.color }">{{ m.name.split(' ').map(w => w[0]).join('') }}</div>
        <div><b>{{ m.name }}</b><p>{{ m.role }}</p></div>
        <span class="access">{{ m.access }}</span>
        <small>Dernière activité : {{ m.last }}</small>
      </article>
    </div>
  </main>
</template>

<style scoped>
.bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; gap: 12px; }
h1 { font-size: 26px; }
input { font: inherit; background: var(--panel); color: var(--txt); border: 1px solid var(--line); border-radius: 10px; padding: 10px 14px; outline: none; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.member { display: grid; grid-template-columns: auto 1fr auto; gap: 14px; align-items: center; }
.avatar { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; font-weight: 700; color: #0e1116; }
.member p { color: var(--mut); font-size: 13px; }
.access { font-size: 12px; border: 1px solid var(--line); border-radius: 99px; padding: 4px 10px; }
.member small { grid-column: 1 / -1; color: var(--mut); }
</style>
