import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const Menu = React.lazy(() => import('menu/Menu'));
const Order = React.lazy(() => import('order/Order'));

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Container</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ border: '1px solid #ddd', borderRadius: 8 }}>
          <Suspense fallback={<p>Carregando Cardápio...</p>}>
            <Menu />
          </Suspense>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: 8 }}>
          <Suspense fallback={<p>Carregando Pedido...</p>}>
            <Order />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
