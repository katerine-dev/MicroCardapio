import React, { useEffect, useState } from 'react';

export default function Order() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const onAdd = (e) => setItems((prev) => [...prev, e.detail]);
    window.addEventListener('add-item', onAdd);
    return () => window.removeEventListener('add-item', onAdd);
  }, []);

  const removeAt = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));
  const clear = () => setItems([]);
  const total = items.reduce((acc, i) => acc + (i.price || 0), 0);

  return (
    <div className="box">
      <h3 style={{marginTop:0}}>Pedido</h3>
      {items.length === 0 ? (
        <p className="muted">Nenhum item adicionado.</p>
      ) : (
        <>
          {items.map((i, idx) => (
            <div className="row" key={`${i.id}-${idx}`}>
              <span className="name">{i.name}</span>
              <span>R$ {i.price.toFixed(2)}</span>
              <button className="remove" onClick={() => removeAt(idx)}>remover</button>
            </div>
          ))}
          <div className="total">Total: R$ {total.toFixed(2)}</div>
          <button className="clear" onClick={clear}>Limpar pedido</button>
        </>
      )}
    </div>
  );
}
