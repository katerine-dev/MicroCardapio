import { createRoot } from 'react-dom/client';
import Order from './Order';

const el = document.getElementById('root');
if (el) {
  createRoot(el).render(<Order />);
}

export default Order;
