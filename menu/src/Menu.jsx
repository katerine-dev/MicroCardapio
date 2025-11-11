import React, { useMemo } from 'react';

const EVENT_NAME = 'cart:add-item';

// importe as imagens locais:
import imgEstrela from './assets/estrelados.png';
import imgCotidiano from './assets/cotidiano.png';
import imgTabua from './assets/tabua.png';
import imgOmega from './assets/omega3.png';

const ITEMS = [
  {
    id: 1,
    name: 'Ovos Estrelados com Creme de Ricota',
    info: '350 g',
    desc: 'Flatbread com creme de ricota, tomate confit e azeite picante.',
    price: 36.25,
    img: imgEstrela
  },
  {
    id: 2,
    name: 'Combo Cotitiano',
    info: '200 ml',
    desc: 'Mini baguete de fermentação natural com manteiga grelhada, porção de salada de frutas, ovos mexidos e café expresso.',
    price: 42.4,
    img: imgCotidiano
  },
  {
    id: 3,
    name: 'Tábua de Brunch com Frios',
    info: '480 g',
    desc: 'Tabua com queijo emmental, queijo brie, presunto royale, presunto cru, mini parfait (iogurte, granola e frutas), ovo cozido, pães de fermentação natural, croissant, gelei, manteiga e acompanhada de suco de laranja e uma bebida quente.',
    price: 79.5,
    img: imgTabua
  },
  {
    id: 4,
    name: 'Omega 3 Tartine',
    info: '1 fatia',
    desc: 'Pão de fermentação natural integral, guacamole e granola caseira salgada.',
    price: 28.3,
    img: imgOmega
  }
];

export default function Menu() {
  const list = useMemo(() => ITEMS, []);

  const currency = useMemo(
    () => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
    []
  );
  

  const add = (item) => {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: item }));
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
            <div className="info">{it.info}</div>
            <p className="desc">{it.desc}</p>
            <div className="price">{currency.format(it.price)}</div>
            <button className="btn" onClick={() => add(it)}>Adicionar ao pedido</button>
          </div>
        ))}
      </div>
    </div>
  );
}
