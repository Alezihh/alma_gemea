import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TarotCard as TarotCardType, generateRandomValues } from '@/lib/tarot';
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
  
  // Gerar valores apenas uma vez e mantê-los fixos
  const [randomValues] = useState<{letter: string, skinColor: string, hairColor: string}>(() => generateRandomValues());

  const processCardContent = (content: string) => {
    if (!randomValues) return content;
    
    let processedContent = content
      .replace(/\{\{letra\}\}/g, randomValues.letter)
      .replace(/\{\{cor_pele\}\}/g, randomValues.skinColor)
      .replace(/\{\{cor_cabelo\}\}/g, randomValues.hairColor);
    
    // Converter markdown para HTML
    processedContent = processedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-center">$1</strong>')
      .replace(/\n/g, '<br>');
    
    return processedContent;
  };

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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gold mb-2 sm:mb-4 px-4">
            ✨ Suas Cartas Reveladas ✨
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/80">
            {currentCardIndex} de {selectedCards.length} cartas reveladas
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {selectedCards.map((card, index) => (
            <div key={card.id} className="relative">
              {/* Card Image Container */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] mb-4 sm:mb-6">
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

                  {/* Card Front - Full Image */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-lg overflow-hidden border-4 border-primary shadow-2xl backface-hidden rotate-y-180"
                  >
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23633c88'/%3E%3Ctext x='150' y='200' text-anchor='middle' fill='%23ec4899' font-family='serif' font-size='24'%3E" + card.name + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    {revealedCards[index] && (
                      <div className="absolute top-2 right-2">
                        <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Content - Only show when revealed */}
              {revealedCards[index] && (
                <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gold/20 animate-fade-in">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 text-center">{card.name}</h3>
                  <div 
                    className="text-xs sm:text-sm text-white/90 leading-relaxed text-center"
                    dangerouslySetInnerHTML={{ __html: processCardContent(card.content) }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center px-4">
          {!allCardsRevealed ? (
            <Button
              onClick={handleRevealNext}
              disabled={isRevealing}
              size="lg"
              className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-full w-full sm:w-auto max-w-xs"
            >
              {isRevealing ? (
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                  <span className="text-xs sm:text-sm">Revelando...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-xs sm:text-sm">Revelar Próxima Carta</span>
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-smooth shadow-glow px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-full w-full sm:w-auto max-w-xs"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-xs sm:text-sm">Ver Minha Alma Gêmea</span>
            </Button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CardReveal;
