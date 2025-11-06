import React, { useEffect, useState } from 'react';

export default function Order() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const onAdd = (e) => setItens((prev) => [...prev, e.detail]);
    window.addEventListener('add-item', onAdd);
    return () => window.removeEventListener('add-item', onAdd);
  }, []);

  const total = itens.reduce((acc, i) => acc + (i.preco || 0), 0);

  return (
    <div style={{ padding: 16 }}>
      <h2>Pedido</h2>
      {itens.length === 0 ? (
        <p>Nenhum item ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {itens.map((i, idx) => (
            <li key={`${i.id}-${idx}`} style={{ marginBottom: 8 }}>
              {i.nome} — R$ {i.preco}
            </li>
          ))}
        </ul>
      )}
      <hr />
      <p><strong>Total:</strong> R$ {total}</p>
    </div>
  );
}
