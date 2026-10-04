// Génère des séries déterministes (même graine = mêmes données) pour une période donnée
function series(days: number, seed: number) {
  return Array.from({ length: days }, (_, i) =>
    Math.round(1400 + Math.sin((i + seed) / 3) * 260 + i * (900 / days) + ((i * 37 + seed) % 11) * 30),
  )
}

export default defineEventHandler((event) => {
  const range = Number(getQuery(event).range ?? 30)
  const days = [7, 30, 90].includes(range) ? range : 30
  const factor = days / 30
  return {
    range: days,
    kpis: [
      { label: 'Utilisateurs actifs', value: Math.round(48210 * factor).toLocaleString('fr-FR'), delta: 12.4 },
      { label: 'Taux de conversion', value: '3,82 %', delta: 0.6 },
      { label: 'Revenu', value: `${(86.4 * factor).toFixed(1).replace('.', ',')} k€`, delta: 8.1 },
      { label: 'Churn', value: '2,1 %', delta: -0.3 },
    ],
    sessions: series(days, days),
    sources: [
      { name: 'Organique', share: 42, color: '#f5c542' },
      { name: 'Réseaux sociaux', share: 29, color: '#4fd1c5' },
      { name: 'Campagnes', share: 17, color: '#f472b6' },
      { name: 'Direct', share: 12, color: '#6366f1' },
    ],
  }
})
