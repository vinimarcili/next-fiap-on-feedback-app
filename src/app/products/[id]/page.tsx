
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductRatings } from '@/components/ProductRatings';
import { Product } from '@/interfaces/product.interface';
import './product-page.css';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="product-page">
      <div className="product-page-layout">
        <div className="product-page-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-page-img"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="product-page-details">
          <Link
            href="/"
            className="product-page-back"
          >
            <div className="product-page-back-icon">
              <span className="product-page-back-arrow">←</span>
            </div>
            <span className="product-page-back-text">Voltar para produtos</span>
          </Link>

          <div className="product-page-title-block">
            <h1 className="product-page-title">
              {product.name}
            </h1>
          </div>

          <p className="product-page-desc">
            {product.description}
          </p>

          <div className="product-page-price-block">
            <div className="product-page-price">
              <span className="product-page-price-value">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="product-page-stock">
            <button disabled={true} className="product-page-stock-btn">
              Fora de estoque
            </button>
          </div>

          <ProductRatings productId={id} />
        </div>
      </div>
    </div>
  );
}