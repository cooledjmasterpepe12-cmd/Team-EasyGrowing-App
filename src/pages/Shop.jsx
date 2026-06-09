import React from 'react';
import { useI18n } from '../core/i18n';

const Shop = () => {
  const { t } = useI18n();

  const products = [
    {
      id: 1,
      name: 'KEIM-EI 3D',
      emoji: '🥚',
      price: '29.99€',
      description: 'Starter kit for germination',
    },
    {
      id: 2,
      name: 'GROW BOX KIT',
      emoji: '📦',
      price: '199.99€',
      description: 'Complete grow box kit with ventilation',
    },
    {
      id: 3,
      name: 'NUTRIENT PACK',
      emoji: '🧪',
      price: '49.99€',
      description: 'Premium nutrient set for all stages',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0c1a0c', color: '#6ab86a', minHeight: '100vh', padding: '20px' }}>
      <h1 className="pixel-h1 font-pixel" style={{ color: '#6ab86a' }}>
        {t('shop.title')}
      </h1>

      {/* Products Grid */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div key={product.id} className="pixel-card" style={{ border: '2px solid #6ab86a', padding: '20px', backgroundColor: '#0c1a0c' }}>
              <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '15px' }}>
                {product.emoji}
              </div>
              <h3 className="pixel-h3 font-pixel" style={{ color: '#6ab86a', marginBottom: '10px', fontSize: '16px' }}>
                {product.name}
              </h3>
              <p className="font-pixel" style={{ color: '#6ab86a', fontSize: '12px', marginBottom: '15px', lineHeight: '1.4' }}>
                {product.description}
              </p>
              <span className="pixel-tag-amber" style={{ display: 'inline-block', backgroundColor: '#ffaa00', color: '#0c1a0c', padding: '6px 10px', fontSize: '14px', fontWeight: 'bold' }}>
                {product.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Shop CTA */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <a
          href="https://easygrowing.at/"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn-amber font-pixel"
          style={{
            display: 'inline-block',
            backgroundColor: '#ffaa00',
            color: '#0c1a0c',
            padding: '15px 40px',
            border: '2px solid #ffaa00',
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            minWidth: '200px',
          }}
        >
          VISIT SHOP ➔
        </a>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '60px', textAlign: 'center', paddingTop: '20px', borderTop: '2px solid #20c8d8' }}>
        <span className="pixel-tag font-pixel" style={{ backgroundColor: '#20c8d8', color: '#0c1a0c', padding: '8px 12px', display: 'inline-block' }}>
          BOTANICAL INTEL 2026
        </span>
      </footer>
    </div>
  );
};

export default Shop;
