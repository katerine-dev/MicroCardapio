import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const Menu = React.lazy(() => import('menu/Menu'));
const Order = React.lazy(() => import('order/Order'));

function App() {
  return (
    <div>
      <h2 className="title">Cardápio e Pedido</h2>
      <div className="grid">
        <div className="card">
          <Suspense fallback={<p style={{padding:16}}>Carregando Cardápio…</p>}>
            <Menu />
          </Suspense>
        </div>
        <div className="card">
          <Suspense fallback={<p style={{padding:16}}>Carregando Pedido…</p>}>
            <Order />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
