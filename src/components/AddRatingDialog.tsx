"use client";

import { useState } from "react";
import "./AddRatingDialog.css";

interface AddRatingDialogProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onRatingAdded: () => void;
}

export function AddRatingDialog({ productId, isOpen, onClose, onRatingAdded }: AddRatingDialogProps) {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !text.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${productId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          rating,
          text: text.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar avaliação");
      }

      setUsername("");
      setRating(5);
      setText("");
      onRatingAdded();
      onClose();
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Erro ao enviar avaliação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-rating-dialog-overlay">
      <div className="add-rating-dialog">
        <div className="add-rating-dialog-content">
          <div className="add-rating-dialog-header">
            <h2 className="add-rating-dialog-title">Adicionar Avaliação</h2>
            <button
              onClick={onClose}
              className="add-rating-dialog-close"
            >
              <span className="add-rating-dialog-close-icon">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="add-rating-dialog-form">
            <div>
              <label htmlFor="username" className="add-rating-dialog-label">
                Seu Nome
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="add-rating-dialog-input"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div>
              <label className="add-rating-dialog-label" style={{ marginBottom: "0.75rem" }}>
                Sua Avaliação
              </label>
              <div className="add-rating-dialog-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="add-rating-dialog-star-btn"
                  >
                    <span className={`add-rating-dialog-star${star <= rating ? " filled" : ""}`}>
                      ★
                    </span>
                  </button>
                ))}
                <span className="add-rating-dialog-stars-count">{rating} estrela{rating !== 1 ? "s" : ""}</span>
              </div>
            </div>

            <div>
              <label htmlFor="text" className="add-rating-dialog-label">
                Seu Comentário
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="add-rating-dialog-textarea"
                placeholder="Conte sua experiência com o produto..."
                required
              />
            </div>

            {error && (
              <div className="add-rating-dialog-error">
                <p className="add-rating-dialog-error-text">{error}</p>
              </div>
            )}

            <div className="add-rating-dialog-actions">
              <button
                type="button"
                onClick={onClose}
                className="add-rating-dialog-cancel"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="add-rating-dialog-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}