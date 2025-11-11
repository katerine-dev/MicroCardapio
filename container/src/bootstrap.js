import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const Menu = React.lazy(() => import('menu/Menu'));
const Order = React.lazy(() => import('order/Order'));

function App() {
  return (
    <main>
      <section className="hero">
        <h1 className="hero__title">Monte seu pedido</h1>
        <p className="hero__subtitle">
          Selecione seus pratos favoritos no cardápio e acompanhe o carrinho sendo montado em tempo real.
        </p>
      </section>

      <div className="grid">
        <section className="card" aria-label="Cardápio">
          <Suspense fallback={<p style={{ padding: 24 }}>Carregando Cardápio…</p>}>
            <Menu />
          </Suspense>
        </section>

        <aside className="card" aria-label="Pedido">
          <Suspense fallback={<p style={{ padding: 24 }}>Carregando Pedido…</p>}>
            <Order />
          </Suspense>
       </aside>
      </div>
     </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
