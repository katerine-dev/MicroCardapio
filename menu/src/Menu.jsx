import React, { useState } from 'react';

const LISTA = [
  { id: 1, nome: 'Spaghetti', descricao: 'Massa ao sugo', preco: 35 },
  { id: 2, nome: 'Risotto', descricao: 'Cogumelos frescos', preco: 42 },
  { id: 3, nome: 'Salada Caesar', descricao: 'Clássica', preco: 28 }
];

export default function Menu() {
  const [itens] = useState(LISTA);

  const adicionar = (item) => {
    // Comunicação global simples: emite evento que o micro "order" escuta
    window.dispatchEvent(new CustomEvent('add-item', { detail: item }));
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Cardápio</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {itens.map((i) => (
          <li key={i.id} style={{ marginBottom: 8, border: '1px solid #ddd', padding: 8, borderRadius: 8 }}>
            <strong>{i.nome}</strong> — {i.descricao} — R$ {i.preco}
            <button style={{ marginLeft: 8 }} onClick={() => adicionar(i)}>
              Adicionar ao pedido
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
