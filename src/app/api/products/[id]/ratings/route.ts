import { NextRequest, NextResponse } from 'next/server';
import { ratings } from '@/data/ratings.data';
import { Rating } from '@/interfaces/rating.interface';


interface CreateRatingParams {
  id: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<CreateRatingParams> }
) {
  try {
    const { id: productId } = await params;
    const body: Omit<Rating, 'id'> = await request.json();

    if (!body.username || !body.text || typeof body.rating !== 'number') {
      return NextResponse.json(
        { error: 'Dados inválidos. Campos obrigatórios: username, text, rating' },
        { status: 400 }
      );
    }

    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Rating deve ser entre 1 e 5' },
        { status: 400 }
      );
    }

    const newId = Date.now().toString();

    const newRating: Rating = {
      id: newId,
      username: body.username,
      text: body.text,
      rating: body.rating
    };

    if (!ratings[productId]) {
      ratings[productId] = [];
    }

    ratings[productId].push(newRating);

    return NextResponse.json(newRating, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao adicionar avaliação' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const productRatings = ratings[productId] || [];

    return NextResponse.json(productRatings);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar avaliações do produto' },
      { status: 500 }
    );
  }
}