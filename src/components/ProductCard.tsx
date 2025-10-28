import { Product } from '@/interfaces/product.interface';
import Image from 'next/image';
import Link from 'next/link';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-card-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-card-img"
          />
          <div className="product-card-overlay"></div>
          <div className="product-card-details">
            <span className="product-card-details-text">Ver detalhes</span>
          </div>
        </div>

        <div className="product-card-content">
          <h2 className="product-card-title">
            {product.name}
          </h2>

          <p className="product-card-desc">
            {product.description}
          </p>

          <div className="product-card-bottom">
            <div className="product-card-price">
              <span className="product-card-price-value">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="product-card-price-note">à vista</span>
            </div>

            <div className="product-card-btn">
              Ver Produto
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}