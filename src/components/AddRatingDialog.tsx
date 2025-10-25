'use client';

import { useState } from 'react';

interface AddRatingDialogProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onRatingAdded: () => void;
}

export function AddRatingDialog({ productId, isOpen, onClose, onRatingAdded }: AddRatingDialogProps) {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !text.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${productId}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          rating,
          text: text.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar avaliação');
      }

      setUsername('');
      setRating(5);
      setText('');
      onRatingAdded();
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Adicionar Avaliação</h2>
            <button
              onClick={onClose}
              className="cursor-pointer w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-600 text-lg">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Seu Nome
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Sua Avaliação
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-3xl focus:outline-none transition-colors"
                  >
                    <span className={`cursor-pointer ${star <= rating ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'}`}>
                      ★
                    </span>
                  </button>
                ))}
                <span className="ml-2 text-gray-600 font-medium">{rating} estrela{rating !== 1 ? 's' : ''}</span>
              </div>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                Seu Comentário
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Conte sua experiência com o produto..."
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="cursor-pointer flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}