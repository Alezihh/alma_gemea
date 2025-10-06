export interface TarotCard {
  id: string;
  name: string;
  meaning: string;
  content: string;
  image: string;
}

// Arrays para geração aleatória
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V'];
const SKIN_COLORS = ['morena', 'branca', 'parda', 'negra', 'amarela'];
const HAIR_COLORS = ['castanhos', 'loiros', 'pretos', 'ruivos', 'grisalhos'];

// Função para gerar valores aleatórios
export function generateRandomValues() {
  return {
    letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
    skinColor: SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)],
    hairColor: HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)]
  };
}

export const TAROT_CARDS: TarotCard[] = [
  { 
    id: "1", 
    name: "A Primeira Letra", 
    meaning: "A inicial do nome da sua alma gêmea",
    content: "Ao me conectar com a sua energia, algo começa a brilhar entre as linhas do destino…\nE vejo nitidamente que o nome da sua alma gêmea começa com a letra **{{letra}}**.\nÉ como se essa inicial vibrasse em sintonia com o seu campo emocional —\ne cada vez que você pensa nela, o universo responde.",
    image: "/CARTA-1.png"
  },
  { 
    id: "2", 
    name: "A Pele do Encontro", 
    meaning: "O tom da pele da sua alma gêmea",
    content: "Nesta leitura, a luz me mostra o tom da pele dessa alma.\nUma cor {{cor_pele}}, envolvente e cheia de presença,\nque reflete a essência de quem é intenso e verdadeiro.\nSó de olhar, você vai sentir familiaridade — como se já conhecesse essa energia.",
    image: "/CARTA-2.png"
  },
  { 
    id: "3", 
    name: "A Personalidade", 
    meaning: "A personalidade marcante da sua alma gêmea",
    content: "Vejo uma energia forte, curiosa e profunda…\nA sua alma gêmea é alguém de personalidade marcante, que sente muito e fala pouco.\nUma pessoa que escuta com os olhos e transmite calma mesmo no silêncio.\nÉ alguém que entende sem precisar explicar.",
    image: "/CARTA-3.png"
  },
  { 
    id: "4", 
    name: "O Traço Físico", 
    meaning: "O detalhe físico que se destaca",
    content: "Um detalhe físico se destaca nessa visão — e é impossível ignorar.\nPode ser um sorriso que prende o ar, um olhar hipnótico, ou um jeito único de se mover.\nEsse traço será o primeiro sinal.\nQuando você o vir, vai sentir algo diferente… como se o tempo parasse por um segundo.",
    image: "/CARTA-4.png"
  },
  { 
    id: "5", 
    name: "A Cor do Cabelo", 
    meaning: "A cor dos cabelos da sua alma gêmea",
    content: "O fluxo da energia revela movimento e brilho.\nConsigo ver cabelos {{cor_cabelo}},\numa cor que combina com a intensidade dessa alma e reflete magnetismo.\nEssa tonalidade carrega o mesmo tipo de energia que você irradia — e é por isso que ela te atrai.",
    image: "/CARTA-5.png"
  },
  { 
    id: "6", 
    name: "A Distância", 
    meaning: "A proximidade da sua alma gêmea",
    content: "A vibração se aproxima de você…\nSinto que essa alma não está distante.\nPode já ter cruzado o seu caminho, talvez de forma sutil, talvez em silêncio.\nMas o universo mostra que a conexão já aconteceu — só falta o momento certo para o reencontro.",
    image: "/CARTA-6.png"
  },
  { 
    id: "7", 
    name: "O Vínculo Invisível", 
    meaning: "A ligação silenciosa entre vocês",
    content: "Sinto uma ligação silenciosa e constante entre vocês.\nEssa pessoa sente quando você pensa nela — e o contrário também acontece.\nOs sinais estão por toda parte: horários repetidos, músicas, nomes que surgem do nada.\nTudo isso é o universo tentando te lembrar que essa alma existe.",
    image: "/CARTA-7.png"
  },
  { 
    id: "8", 
    name: "O Presságio Final", 
    meaning: "A revelação próxima da sua alma gêmea",
    content: "A energia agora é clara e vibrante…\nTudo aponta para uma revelação próxima.\nEssa alma já está sendo atraída pela sua vibração.\nEm pouco tempo, o universo mostrará o rosto por trás dessa energia —\ne você vai entender que nada do que sentiu foi coincidência.",
    image: "/CARTA-8.png"
  }
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
