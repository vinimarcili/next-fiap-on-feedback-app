import { Product } from '@/interfaces/product.interface';
import { ProductCard } from '@/components/ProductCard';

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-24">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-5xl">📦</span>
          </div>
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">Nenhum produto encontrado</h3>
          <p className="text-gray-600 text-lg">Estamos trabalhando para trazer novos produtos em breve.</p>
        </div>
      )}
    </div>
  );
}
