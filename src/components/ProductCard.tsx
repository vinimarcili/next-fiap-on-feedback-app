import { Product } from '@/interfaces/product.interface';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] border border-gray-100">
        <div className="relative h-64 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-gray-600 text-sm font-medium">Ver detalhes</span>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {product.name}
          </h2>

          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-blue-600 leading-none">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-gray-500 mt-1">à vista</span>
            </div>

            <div className="bg-linear-to-r from-blue-600 to-indigo-600 group-hover:from-blue-700 group-hover:to-indigo-700 text-white p-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg group-hover:shadow-xl">
              Ver Produto
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}