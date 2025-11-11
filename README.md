# Micro Frontends: Cardápio + Pedido + Container

Aplicação de exemplo construída com micro frontends utilizando Webpack Module Federation. O projeto é composto por três apps independentes:

- **container/** – Shell responsável por orquestrar e renderizar os demais micros.
- **menu/** – Lista pratos e emite eventos para adicionar itens ao pedido.
- **order/** – Consome os eventos do cardápio e exibe o carrinho.

## Pré-requisitos

- Node.js 18+
- npm 9+

Instale as dependências em cada micro com um único comando na raiz:

```bash
npm install
```

## Executando em modo desenvolvimento

O script abaixo inicia simultaneamente o container e os dois micros, cada um em sua porta (3000, 3001 e 3002 respectivamente).

**Rodar**
```bash
npm i
npm run dev
```

Após o build, acesse o container em [http://localhost:3000](http://localhost:3000) e o cardápio/pedido diretamente em [http://localhost:3001](http://localhost:3001) e [http://localhost:3002](http://localhost:3002) caso queira testá-los de forma isolada.

## Comunicação entre os micros

A comunicação acontece por meio de um evento global simples:

- O micro **menu** dispara o evento `cart:add-item` com o item selecionado no `detail` do evento.
- O micro **order** registra um `window.addEventListener('cart:add-item', handler)` e atualiza o carrinho sempre que o evento é disparado.

Esse mecanismo leve é suficiente para o exercício e mantém os micros desacoplados.

## Estrutura de pastas

```
MicroCardapio/
├── container/   # shell principal com o layout compartilhado
├── menu/        # micro front-end responsável pelo cardápio
├── order/       # micro front-end do resumo de pedidos
└── README.md
```

Cada micro possui sua própria configuração de Webpack, `package.json`, `public/index.html` e ponto de entrada React.

## Principais comandos

Em qualquer micro individual você pode rodar:

```bash
npm install
npm start
```

Isso facilita o desenvolvimento isolado e garante que cada micro possa evoluir de forma independente.

## Licença

Projeto desenvolvido apenas para fins educacionais.