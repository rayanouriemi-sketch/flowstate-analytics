# Flowstate

Concept de dashboard analytics pour un produit SaaS. **Projet concept** : toutes les données sont générées par l'API et fictives.

## Pages

- `/` : KPI, courbe de sessions SVG interactive (survol), sources de trafic, sélecteur de période 7 / 30 / 90 jours
- `/rapports` : tableau des pages les plus vues, tri par colonne effectué côté serveur
- `/equipe` : membres de l'équipe avec filtre

## API (Nitro / Node)

- `GET /api/metrics?range=7|30|90`
- `GET /api/reports?sort=views|time|bounce&dir=asc|desc`
- `GET /api/team`

## Stack

Nuxt 4 · Vue 3 · TypeScript · SVG · Nitro (Node)

## Lancer le projet

```bash
pnpm install
pnpm dev
```
