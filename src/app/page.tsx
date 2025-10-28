import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/interfaces/product.interface';
import './page.css';

export default async function Home() {
  // TODO: implementar
  const products: Product[] = [];

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <span>📦</span>
          </div>
          <h3 className="empty-title">Nenhum produto encontrado</h3>
          <p className="empty-text">Estamos trabalhando para trazer novos produtos em breve.</p>
        </div>
      )}
    </div>
  );
}
