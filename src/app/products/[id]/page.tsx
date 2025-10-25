import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductRatings } from '@/components/ProductRatings';
import { Product } from '@/interfaces/product.interface';

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
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 w-full">
      <div className="lg:flex">
        <div className="lg:w-1/2 relative">
          <div className="relative h-96 lg:h-full bg-linear-to-br from-gray-100 to-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="lg:w-1/2 p-8 lg:p-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span className="text-sm">←</span>
            </div>
            <span className="font-medium">Voltar para produtos</span>
          </Link>

          <div className="mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-5xl font-bold text-blue-600">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <ProductRatings productId={id} />

          <div className="mt-8 space-y-4">
            <button disabled={true} className="w-full bg-gray-500 text-gray-300 cursor-not-allowed py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg">
              Fora de estoque
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}