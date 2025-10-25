import { Product } from '../interfaces/product.interface';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy S23',
    description: 'Smartphone premium com câmera de 50MP, processador Snapdragon 8 Gen 2 e bateria de longa duração.',
    price: 2999.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: '2',
    name: 'Notebook Dell Inspiron 15',
    description: 'Notebook versátil com processador Intel Core i5, 8GB RAM e SSD de 512GB para trabalho e estudos.',
    price: 4599.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: '3',
    name: 'Fone de Ouvido Sony WH-1000XM4',
    description: 'Fone de ouvido wireless com cancelamento de ruído ativo e até 30 horas de bateria.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: '4',
    name: 'Smart TV LG 55" 4K',
    description: 'Smart TV 4K com inteligência artificial, HDR e sistema operacional webOS para streaming.',
    price: 3299.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: '5',
    name: 'Console PlayStation 5',
    description: 'Console de última geração com SSD ultra-rápido, gráficos 4K e controle DualSense.',
    price: 4299.99,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: '6',
    name: 'Apple iPad Pro 12.9"',
    description: 'Tablet profissional com tela Liquid Retina XDR, chip M2 e suporte ao Apple Pencil Pro.',
    price: 8999.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center'
  }
];