import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';

  const redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    const path = new URL(redirect).pathname;
    if (path !== '/') {
      window.history.replaceState(null, '', path);
    }
  }
}

createRoot(document.getElementById('root')!).render(<App />);
