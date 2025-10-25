import { Product } from '../interfaces/product.interface';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy S23',
    description: 'Smartphone premium com câmera de 50MP, processador Snapdragon 8 Gen 2 e bateria de longa duração.',
    price: 2999.99,
    image: 'https://picsum.photos/400/400?random=1'
  },
  {
    id: '2',
    name: 'Notebook Dell Inspiron 15',
    description: 'Notebook versátil com processador Intel Core i5, 8GB RAM e SSD de 512GB para trabalho e estudos.',
    price: 4599.99,
    image: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: '3',
    name: 'Fone de Ouvido Sony WH-1000XM4',
    description: 'Fone de ouvido wireless com cancelamento de ruído ativo e até 30 horas de bateria.',
    price: 1299.99,
    image: 'https://picsum.photos/400/400?random=3'
  },
  {
    id: '4',
    name: 'Smart TV LG 55" 4K',
    description: 'Smart TV 4K com inteligência artificial, HDR e sistema operacional webOS para streaming.',
    price: 3299.99,
    image: 'https://picsum.photos/400/400?random=4'
  },
  {
    id: '5',
    name: 'Console PlayStation 5',
    description: 'Console de última geração com SSD ultra-rápido, gráficos 4K e controle DualSense.',
    price: 4299.99,
    image: 'https://picsum.photos/400/400?random=5'
  }
];