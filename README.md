# Micro Frontends: Cardápio + Pedido + Container

**Apps**
- `container/` – integra os micros
- `menu/` – lista pratos e dispara `add-item`
- `order/` – escuta `add-item` e mostra o pedido

**Rodar**
```bash
npm i
npm run dev