import { createRoot } from 'react-dom/client';
import Menu from './Menu';

const el = document.getElementById('root');
if (el) createRoot(el).render(<Menu />);

export default Menu;
