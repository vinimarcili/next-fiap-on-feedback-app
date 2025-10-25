import { Rating } from '../interfaces/rating.interface';

export const ratings: Record<string, Rating[]> = {
  '1': [
    {
      id: '1',
      username: 'João Silva',
      text: 'Excelente smartphone, câmera incrível e bateria dura o dia todo!',
      rating: 5
    },
    {
      id: '2',
      username: 'Maria Santos',
      text: 'Muito bom, mas o preço está um pouco alto.',
      rating: 4
    }
  ],
  '2': [
    {
      id: '3',
      username: 'Pedro Oliveira',
      text: 'Ótimo para trabalho, processador rápido e tela bonita.',
      rating: 5
    },
    {
      id: '4',
      username: 'Ana Costa',
      text: 'Bom custo-benefício, só aquece um pouco quando uso por muito tempo.',
      rating: 4
    }
  ],
  '3': [
    {
      id: '5',
      username: 'Carlos Mendes',
      text: 'Cancelamento de ruído perfeito, som excelente!',
      rating: 5
    }
  ],
  '4': [
    {
      id: '6',
      username: 'Fernanda Lima',
      text: 'Imagem 4K impressionante, interface fácil de usar.',
      rating: 5
    },
    {
      id: '7',
      username: 'Roberto Alves',
      text: 'Boa TV, mas o controle remoto poderia ser melhor.',
      rating: 4
    }
  ],
  '5': [
    {
      id: '8',
      username: 'Lucas Pereira',
      text: 'Jogos carregam rápido, gráficos incríveis!',
      rating: 5
    }
  ],
  '6': []
};