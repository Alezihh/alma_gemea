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
  const [isRevealing, setIsRevealing] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  
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
    if (!isCardRevealed) {
      // Primeiro: revelar a carta atual
      setIsRevealing(true);
      setTimeout(() => {
        setIsCardRevealed(true);
        setIsRevealing(false);
      }, 800);
    } else {
      // Segundo: passar para a próxima carta
      if (currentCardIndex < selectedCards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
        setIsCardRevealed(false);
      }
    }
  };

  const allCardsRevealed = currentCardIndex >= selectedCards.length - 1;

  const currentCard = selectedCards[currentCardIndex];

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gold mb-2">
            ✨ Suas Cartas Reveladas ✨
          </h2>
          <p className="text-sm text-white/80">
            {currentCardIndex + 1} de {selectedCards.length} cartas reveladas
          </p>
        </div>

        {/* Card Container - Mobile: 1 carta por vez */}
        <div className="mb-8">
          {/* Card Image - Full Size */}
          <div className="relative w-full h-80 mb-4">
            <div 
              className={`relative w-full h-full transition-all duration-1000 transform-style-preserve-3d ${
                isCardRevealed ? 'rotate-y-180' : 'rotate-y-0'
              }`}
            >
              {/* Card Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border-4 border-gold/40 shadow-2xl backface-hidden rotate-y-0">
                <img 
                  src={tarotCardBack} 
                  alt="Tarot Card Back" 
                  className="w-full h-full object-cover"
                />
                {isRevealing && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gold animate-spin" />
                  </div>
                )}
              </div>

              {/* Card Front - Full Image */}
              <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border-4 border-primary shadow-2xl backface-hidden rotate-y-180">
                <img 
                  src={currentCard.image} 
                  alt={currentCard.name}
                  className="w-full h-full object-contain bg-black/20"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23633c88'/%3E%3Ctext x='150' y='200' text-anchor='middle' fill='%23ec4899' font-family='serif' font-size='24'%3E" + currentCard.name + "%3C/text%3E%3C/svg%3E";
                  }}
                />
                {isCardRevealed && (
                  <div className="absolute top-2 right-2">
                    <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Content - Only show when revealed */}
          {isCardRevealed && (
            <div className="bg-black/40 rounded-xl p-4 border border-gold/20 animate-fade-in">
              <h3 className="text-lg font-bold text-white mb-3 text-center">{currentCard.name}</h3>
              <div 
                className="text-sm text-white/90 leading-relaxed text-center"
                dangerouslySetInnerHTML={{ __html: processCardContent(currentCard.content) }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          {!allCardsRevealed ? (
            <Button
              onClick={handleRevealNext}
              disabled={isRevealing}
              size="lg"
              className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-6 py-4 text-base rounded-full w-full max-w-sm"
            >
              {isRevealing ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  <span>Revelando...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5 mr-2" />
                  <span>
                    {!isCardRevealed ? "Revelar Carta" : "Próxima Carta"}
                  </span>
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-smooth shadow-glow px-6 py-4 text-base rounded-full w-full max-w-sm"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              <span>Ver Minha Alma Gêmea</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardReveal;
