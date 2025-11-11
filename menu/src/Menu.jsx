import React, { useMemo } from 'react';

const ITEMS = [
  {
    id: 1,
    name: 'Chef Special',
    desc: 'Molho da casa com especiarias',
    price: 25,
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Dim Sum',
    desc: 'Seleção artesanal',
    price: 25,
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Eggs Supreme',
    desc: 'Ovos cremosos com ervas',
    price: 25,
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Healthy Herbs',
    desc: 'Caldo leve de legumes',
    price: 25,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop'
  }
];

export default function Menu() {
  const list = useMemo(() => ITEMS, []);

  const add = (item) => {
    window.dispatchEvent(new CustomEvent('add-item', { detail: item }));
  };

  return (
    <div className="menu">
      <div className="grid">
        {list.map((it) => (
          <div className="item" key={it.id} title={it.desc}>
            <div className="imgwrap">
              <img src={it.img} alt={it.name} loading="lazy" />
            </div>
            <div className="name">{it.name}</div>
            <div className="price">R$ {it.price.toFixed(2)}</div>
            <button className="btn" onClick={() => add(it)}>Adicionar ao pedido</button>
          </div>
        ))}
      </div>
    </div>
  );
}
