import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TarotCard as TarotCardType } from '@/lib/tarot';
import { Sparkles, ArrowRight } from 'lucide-react';
import tarotCardBack from '@/assets/tarot-card-back.png';

interface CardRevealProps {
  selectedCards: TarotCardType[];
  onComplete: () => void;
}

const CardReveal = ({ selectedCards, onComplete }: CardRevealProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState<boolean[]>(new Array(selectedCards.length).fill(false));
  const [isRevealing, setIsRevealing] = useState(false);

  const handleRevealNext = () => {
    if (currentCardIndex < selectedCards.length) {
      setIsRevealing(true);
      
      // Simulate card flip animation
      setTimeout(() => {
        setRevealedCards(prev => {
          const newRevealed = [...prev];
          newRevealed[currentCardIndex] = true;
          return newRevealed;
        });
        setCurrentCardIndex(prev => prev + 1);
        setIsRevealing(false);
      }, 800);
    }
  };

  const allCardsRevealed = currentCardIndex >= selectedCards.length;

  useEffect(() => {
    // Auto-reveal first card after component mounts
    const timer = setTimeout(() => {
      handleRevealNext();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
            ✨ Suas Cartas Reveladas ✨
          </h2>
          <p className="text-lg text-white/80">
            {currentCardIndex} de {selectedCards.length} cartas reveladas
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {selectedCards.map((card, index) => (
            <div key={card.id} className="relative">
              <div className="relative w-full h-64 md:h-80">
                {/* Card Container */}
                <div 
                  className={`relative w-full h-full transition-all duration-1000 transform-style-preserve-3d ${
                    revealedCards[index] ? 'rotate-y-180' : 'rotate-y-0'
                  } ${isRevealing && index === currentCardIndex ? 'card-flip' : ''}`}
                >
                  {/* Card Back */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-lg overflow-hidden border-4 border-gold/40 shadow-2xl backface-hidden rotate-y-0"
                  >
                    <img 
                      src={tarotCardBack} 
                      alt="Tarot Card Back" 
                      className="w-full h-full object-cover"
                    />
                    {!revealedCards[index] && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-gold animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Card Front */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-lg overflow-hidden border-4 border-primary shadow-2xl bg-gradient-to-br from-purple-900 to-pink-900 backface-hidden rotate-y-180"
                  >
                    <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                      <div className="text-4xl mb-4">🃏</div>
                      <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
                      <p className="text-sm text-white/80 leading-relaxed">{card.description}</p>
                      {revealedCards[index] && (
                        <div className="absolute top-2 right-2">
                          <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          {!allCardsRevealed ? (
            <Button
              onClick={handleRevealNext}
              disabled={isRevealing}
              size="lg"
              className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-8 py-4 text-lg rounded-full"
            >
              {isRevealing ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Revelando...
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Revelar Próxima Carta
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-smooth shadow-glow px-8 py-4 text-lg rounded-full"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Ver Minha Alma Gêmea
            </Button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CardReveal;
