import React, { useEffect, useMemo, useState } from 'react';

const EVENT_NAME = 'cart:add-item';

const DELIVERY_SLOT = '13:00 – 13:30';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function Order() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const onAdd = (event) => {
      const item = event.detail;
      if (!item) return;

      const normalized = {
        ...item,
        price: Number(item.price) || 0,
      };

      setItems((prev) => {
        const index = prev.findIndex((entry) => entry.id === normalized.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            quantity: updated[index].quantity + 1,
          };
          return updated;
        }

        return [...prev, { ...normalized, quantity: 1 }];
      });
    };

    window.addEventListener(EVENT_NAME, onAdd);
    return () => window.removeEventListener(EVENT_NAME, onAdd);
  }, []);

  const remove = (id) =>
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  return (
    <section className="order-card" aria-label="Resumo do pedido">
      <header className="order-card__header">
        <div className="order-card__title">
          <span className="order-card__icon" aria-hidden="true">🧺</span>
          <div>
            <p className="order-card__heading">Seu Pedido</p>
            <span className="order-card__subtitle">Itens adicionados a partir do cardápio</span>
          </div>
        </div>
        {items.length > 0 && (
          <button className="order-card__clear" type="button" onClick={clear}>
            Limpar tudo
          </button>
        )}
      </header>
      {items.length === 0 ? (
        <p className="order-card__empty">Nenhum item adicionado ainda.</p>
      ) : (
        <>
          <ul className="order-card__list">
            {items.map((item) => (
              <li key={item.id} className="order-card__item">
                <div>
                  <p className="order-card__item-name">{item.name}</p>
                  {item.info && <span className="order-card__item-info">{item.info}</span>}
                  {item.desc && <span className="order-card__item-desc">{item.desc}</span>}
                  <span className="order-card__item-qty">
                    {item.quantity} × {formatCurrency(item.price)}
                  </span>
                </div>
                <div className="order-card__item-actions">
                  <span className="order-card__item-price">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    className="order-card__remove"
                    onClick={() => remove(item.id)}
                    aria-label={`Remover uma unidade de ${item.name}`}
                  >
                    remover 1
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <dl className="order-card__totals">
            <div className="order-card__totals-row">
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
            <div className="order-card__totals-row">
              <dt>Entrega estimada</dt>
              <dd>{DELIVERY_SLOT}</dd>
            </div>
          </dl>

          <button className="order-card__confirm" type="button">
            Confirmar pedido
          </button>
        </>
      )}
    </section>
  );
}
