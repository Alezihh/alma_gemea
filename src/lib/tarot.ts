export interface TarotCard {
  id: string;
  name: string;
  meaning: string;
}

export const TAROT_CARDS: TarotCard[] = [
  { id: "1", name: "O Amante", meaning: "Conexão verdadeira e escolhas do coração" },
  { id: "2", name: "A Estrela", meaning: "Esperança e renovação no amor" },
  { id: "3", name: "O Sol", meaning: "Alegria e vitalidade no relacionamento" },
  { id: "4", name: "A Lua", meaning: "Intuição e mistérios do coração" },
  { id: "5", name: "A Imperatriz", meaning: "Abundância e fertilidade emocional" },
  { id: "6", name: "O Mago", meaning: "Manifestação dos desejos amorosos" },
  { id: "7", name: "A Sacerdotisa", meaning: "Sabedoria interior e segredos revelados" },
  { id: "8", name: "O Carro", meaning: "Determinação para conquistar o amor" },
  { id: "9", name: "A Justiça", meaning: "Equilíbrio e harmonia no relacionamento" },
  { id: "10", name: "A Roda da Fortuna", meaning: "Destino e encontros providenciais" },
  { id: "11", name: "A Força", meaning: "Coragem e paixão verdadeira" },
  { id: "12", name: "O Mundo", meaning: "Realização completa do amor" },
];

export function shuffleCards<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomPosition(index: number, total: number) {
  // Gera posições aleatórias mas distribuídas para evitar sobreposição severa
  const seed = index / total;
  const row = Math.floor(index / 4);
  const col = index % 4;
  
  // Adiciona aleatoriedade dentro de uma grade
  const baseTop = 15 + (row * 25) + (Math.random() * 8 - 4);
  const baseLeft = 10 + (col * 22) + (Math.random() * 8 - 4);
  const rotation = Math.random() * 20 - 10; // -10 a 10 graus
  
  return {
    top: `${Math.min(Math.max(baseTop, 5), 75)}%`,
    left: `${Math.min(Math.max(baseLeft, 5), 85)}%`,
    rotation,
  };
}
