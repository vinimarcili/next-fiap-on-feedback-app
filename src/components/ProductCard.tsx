import { Product } from '@/interfaces/product.interface';
import Image from 'next/image';
import Link from 'next/link';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {  return (
    <Link href={`/products/${product.id}`} className="product-link">
      <div className="product-card">
        <div className="product-image-bg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-image"
          />
          <div className="product-image-overlay"></div>
          <div className="product-details-btn">
            Ver detalhes
          </div>
        </div>

        <div className="product-content">
          <h2 className="product-title">
            {product.name}
          </h2>

          <p className="product-description">
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="product-price">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="product-price-info">à vista</span>
            </div>

            <div className="product-btn">
              Ver Produto
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}