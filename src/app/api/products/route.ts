import { NextResponse } from 'next/server';
import { products } from '../../../data/products.data';

export async function GET() {
  try {
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}