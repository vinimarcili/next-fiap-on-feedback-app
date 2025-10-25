import { NextResponse } from 'next/server';
import { products } from '@/data/products.data';

interface GetProductParams {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<GetProductParams> }
) {
  try {
    const { id } = await params;
    const product = products.find(p => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}