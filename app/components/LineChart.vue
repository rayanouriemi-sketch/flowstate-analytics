<script setup lang="ts">
const props = defineProps<{ values: number[] }>()
const W = 600
const H = 240

const points = computed(() => {
  const min = Math.min(...props.values)
  const max = Math.max(...props.values)
  const n = props.values.length - 1 || 1
  return props.values.map((v, i) => [(i / n) * W, H - 20 - ((v - min) / (max - min || 1)) * (H - 50)] as const)
})
const path = computed(() => points.value.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' '))
const hover = ref<number | null>(null)

function onMove(e: MouseEvent) {
  const rect = (e.currentTarget as SVGElement).getBoundingClientRect()
  hover.value = Math.round(((e.clientX - rect.left) / rect.width) * (props.values.length - 1))
}
</script>

<template>
  <div class="wrap">
    <svg :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" @mousemove="onMove" @mouseleave="hover = null">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#f5c542" stop-opacity=".35" />
          <stop offset="1" stop-color="#f5c542" stop-opacity="0" />
        </linearGradient>
      </defs>
      <line v-for="y in [60, 120, 180]" :key="y" x1="0" :x2="W" :y1="y" :y2="y" stroke="#242b36" />
      <path :d="`${path} L${W},${H} L0,${H} Z`" fill="url(#g)" />
      <path :d="path" fill="none" stroke="#f5c542" stroke-width="2.5" vector-effect="non-scaling-stroke" />
      <line v-if="hover !== null" :x1="points[hover]![0]" :x2="points[hover]![0]" y1="0" :y2="H" stroke="#7d8798" stroke-dasharray="4 4" vector-effect="non-scaling-stroke" />
    </svg>
    <div v-if="hover !== null" class="tip" :style="{ left: `${(hover / (values.length - 1)) * 100}%` }">
      Jour {{ hover + 1 }} · <b>{{ values[hover]?.toLocaleString('fr-FR') }}</b> sessions
    </div>
  </div>
</template>

<style scoped>
.wrap { position: relative; }
svg { width: 100%; height: 240px; display: block; cursor: crosshair; }
.tip { position: absolute; top: 0; transform: translateX(-50%); background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 6px 10px; font-size: 12px; white-space: nowrap; pointer-events: none; }
</style>
