const React = require('react');
const { Suspense } = React;
const { createRoot } = require('react-dom/client');

const remoteEntries = {
  menu: 'http://localhost:3001/remoteEntry.js',
  order: 'http://localhost:3002/remoteEntry.js',
};

const remotePromises = {};

function loadRemoteEntry(scope) {
  if (window[scope]) return Promise.resolve();

  if (!remoteEntries[scope]) {
    return Promise.reject(new Error(`Remote entry for scope "${scope}" was not configured.`));
  }

  if (!remotePromises[scope]) {
    remotePromises[scope] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = remoteEntries[scope];
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Não foi possível carregar o remote entry "${scope}".`));
      document.head.appendChild(script);
    });
  }

  return remotePromises[scope];
}

function loadRemoteModule(scope, module) {
  return loadRemoteEntry(scope)
    .then(() => __webpack_init_sharing__('default'))
    .then(() => {
      const container = window[scope];
      if (!container || typeof container.get !== 'function') {
        throw new Error(`Container remoto "${scope}" não foi inicializado.`);
      }

      const initResult = container.init?.(__webpack_share_scopes__.default);
      return Promise.resolve(initResult).then(() => container.get(module));
    })
    .then((factory) => {
      if (typeof factory !== 'function') {
        throw new Error(`Módulo "${module}" não encontrado no container "${scope}".`);
      }
      const Module = factory();
      return Module && Module.default ? Module.default : Module;
    });
}

const createRemoteComponent = (scope, module) =>
  React.lazy(() => loadRemoteModule(scope, module).then((component) => ({ default: component })));

const Menu = createRemoteComponent('menu', './Menu');
const Order = createRemoteComponent('order', './Order');

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

module.exports = App;