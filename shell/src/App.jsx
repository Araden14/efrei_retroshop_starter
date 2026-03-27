import { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './App.css';
import { RemoteMFE } from './remoteMFE';

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribe = eventBus.on('cart:update', (count) => {
      setCartCount(count);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="shell">
      <header className="shell-header">
        <h1 className="logo">RetroShop</h1>
        <div className="cart-badge">Panier ({cartCount})</div>
      </header>
      <main className="shell-main">
        <section className="product-area">
          <RemoteMFE name="Products" importFn={() => import('mfeProduct/ProductGrid')} />
        </section>
        <aside className="cart-area">
          <RemoteMFE name="Cart" importFn={() => import('cart/Cart')} />
        </aside>
      </main>
      <section className="reco-area">
          <RemoteMFE name="Recommendations" importFn={() => import('mfeReco/RecoList')} />
      </section>
    </div>
  );
}

export default App;