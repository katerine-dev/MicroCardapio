export const EVENT_NAME = 'cart:add-item';

const STORE_KEY = '__micro_cart_store__';
const fallbackStore = { items: [], listeners: new Set() };

const isBrowser = () => typeof window !== 'undefined';

const ensureStore = () => {
  if (isBrowser()) {
    const existing = window[STORE_KEY];

    if (existing && Array.isArray(existing.items) && existing.listeners instanceof Set) {
      return existing;
    }

    const items = Array.isArray(existing?.items) ? existing.items : [];
    const listeners = existing?.listeners instanceof Set ? existing.listeners : new Set();

    const store = { items, listeners };
    window[STORE_KEY] = store;
    return store;
  }

  return fallbackStore;
};

const cloneItem = (raw = {}) => {
  const { __persisted, ...rest } = raw;
  return {
    ...rest,
    price: Number(rest.price) || 0,
  };
};

const cloneItems = (items) => (Array.isArray(items) ? items.map((item) => cloneItem(item)) : []);

const notifyListeners = (store) => {
  const snapshot = cloneItems(store.items);

  Array.from(store.listeners).forEach((listener) => {
    try {
      listener(snapshot);
    } catch (error) {
      console.error('[cart] listener error', error);
    }
  });
};

export const getCartItems = () => {
  const store = ensureStore();
  return cloneItems(store.items);
};

export const setCartItems = (items) => {
  const store = ensureStore();
  store.items = Array.isArray(items) ? cloneItems(items) : [];
  notifyListeners(store);
  return cloneItems(store.items);
};

export const appendCartItem = (item) => {
  const store = ensureStore();
  const entry = cloneItem(item);
  store.items = [...store.items, entry];
  notifyListeners(store);
  return cloneItems(store.items);
};

export const clearCartItems = () => setCartItems([]);

export const subscribeToCart = (listener) => {
  if (typeof listener !== 'function') return () => {};

  const store = ensureStore();
  store.listeners.add(listener);

  return () => {
    const currentStore = ensureStore();
    currentStore.listeners.delete(listener);
  };
};

export const createPersistedEventDetail = (item) => ({
  ...cloneItem(item),
  __persisted: true,
});

export const normalizeCartItem = (item) => cloneItem(item);
