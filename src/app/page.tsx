import { Product } from '@/interfaces/product.interface';
import { ProductCard } from '@/components/ProductCard';
import './page.css';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <div className="page-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="page-empty">
          <div className="page-empty-icon">
            <span className="page-empty-emoji">📦</span>
          </div>
          <h3 className="page-empty-title">Nenhum produto encontrado</h3>
          <p className="page-empty-text">Estamos trabalhando para trazer novos produtos em breve.</p>
        </div>
      )}
    </div>
  );
}
