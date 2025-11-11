import React, { useEffect, useMemo, useState } from 'react';

const EVENT_NAME = 'cart:add-item';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);

export default function Order() {
  const [items, setItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleAdd = (event) => {
      const item = event.detail;
      if (!item) return;

      setItems((prev) => [...prev, item]);
      setSubmitted(false);
    };

    window.addEventListener(EVENT_NAME, handleAdd);
    return () => window.removeEventListener(EVENT_NAME, handleAdd);
  }, []);

  useEffect(() => {
    if (!submitted) return undefined;

    const timeout = window.setTimeout(() => {
      setItems([]);
      setSubmitted(false);
    }, 3000);

   return () => window.clearTimeout(timeout);
  }, [submitted])

  const total = useMemo(
    () => items.reduce((acc, item) => acc + (Number(item.price) || 0), 0),
    [items]
  );
    const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <section className="order-card" aria-label="Resumo do pedido">
        <style>
          {`
            @keyframes confetti-fall {
              0% { transform: translateY(-20%) rotate(0deg); opacity: 0; }
              10% { opacity: 1; }
              100% { transform: translateY(120%) rotate(360deg); opacity: 0; }
            }
          `}
        </style>
        <div
          style={{
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '1rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {[...Array(12)].map((_, index) => (
            <span
              key={index}
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-10%',
                left: `${(index / 12) * 100}%`,
                fontSize: '1.5rem',
                animation: 'confetti-fall 2.4s ease-in-out infinite',
                animationDelay: `${index * 0.15}s`,
              }}
            >
              {index % 2 === 0 ? '🎊' : '🎉'}
            </span>
          ))}

          <div style={{ fontSize: '3rem' }} role="img" aria-label="Fogos de artifício">
            🎉
          </div>
          <h2 style={{ margin: 0 }}>Pedido enviado!</h2>
          <p style={{ margin: 0 }}>Estamos preparando tudo com carinho.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="order-card" aria-label="Resumo do pedido">
      <header className="order-card__header">
        <div className="order-card__title">
          <span className="order-card__icon" aria-hidden="true">
            🧺
          </span>
          <div>
            <p className="order-card__heading">Seu Pedido</p>
            <span className="order-card__subtitle">Itens adicionados a partir do cardápio</span>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <p className="order-card__empty">Nenhum item adicionado ainda.</p>
      ) : (
        <>
          <ul className="order-card__list">
            {items.map((item, index) => (
              <li key={`${item.id}-${index}`} className="order-card__item">
                <div>
                  <p className="order-card__item-name">{item.name}</p>
                  <span className="order-card__item-price">{formatCurrency(item.price)}</span>
                </div>
              </li>
            ))}
          </ul>

          <dl className="order-card__totals">
            <div className="order-card__totals-row">
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
          </dl>
          {items.length > 0 && (
            <button className="order-card__confirm" type="button" onClick={handleSubmit}>
              Concluir pedido
            </button>
          )}
        </>
      )}
    </section>
  );
}
