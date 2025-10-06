import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TarotCard as TarotCardType, generateRandomValues } from "@/lib/tarot";
import { Sparkles, Star } from "lucide-react";
import { useState, useEffect } from "react";
// Removed Purchase tracking as requested
import { QuestionnaireData } from "@/hooks/useQuestionnaire";

interface TarotModalProps {
  open: boolean;
  onClose: () => void;
  selectedCards: TarotCardType[];
  questionnaireData?: QuestionnaireData;
}

const TarotModal = ({ open, onClose, selectedCards, questionnaireData }: TarotModalProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showCardContent, setShowCardContent] = useState(false);
  
  // Gerar valores apenas uma vez e mantê-los fixos
  const [randomValues] = useState<{letter: string, skinColor: string, hairColor: string}>(() => generateRandomValues());

  useEffect(() => {
    if (open && selectedCards.length > 0) {
      setCurrentCardIndex(0);
      setShowCardContent(false);
    }
  }, [open, selectedCards]);

  const handlePaymentClick = () => {
    // Direct link to payment (no tracking)
    window.open("https://pay.kirvano.com/e4c41901-7afa-47a8-a3ea-160341cc2d01", "_blank");
  };

  const handleNextCard = () => {
    if (currentCardIndex < selectedCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

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

  const currentCard = selectedCards[currentCardIndex];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-full bg-transparent backdrop-blur-xl border-2 border-primary/50 shadow-[0_0_80px_rgba(236,72,153,0.4)] animate-scale-in overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-purple-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none"></div>
        
        <div className="relative z-10 py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50 shadow-lg animate-pulse">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-gold fill-gold" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"></div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gold">
              Suas Cartas Reveladas
            </h2>
            <p className="text-sm text-gray-300">
              Carta {currentCardIndex + 1} de {selectedCards.length}
            </p>
          </div>

          {/* Card Content */}
          {currentCard && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Card Image */}
              <div className="flex justify-center">
                <div className="w-48 h-64 sm:w-56 sm:h-72 rounded-lg overflow-hidden border-2 border-gold/30 shadow-lg bg-black/20">
                  <img 
                    src={currentCard.image} 
                    alt={currentCard.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23633c88'/%3E%3Ctext x='150' y='200' text-anchor='middle' fill='%23ec4899' font-family='serif' font-size='24'%3E" + currentCard.name + "%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>

              {/* Card Title */}
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gold mb-2">
                  {currentCard.name}
                </h3>
                <p className="text-sm text-gray-400 italic">
                  {currentCard.meaning}
                </p>
              </div>

              {/* Card Content */}
              <div className="bg-black/30 rounded-lg p-4 sm:p-6 border border-gold/20">
                <div 
                  className="text-xs sm:text-sm text-gray-200 leading-relaxed text-center"
                  dangerouslySetInnerHTML={{ __html: processCardContent(currentCard.content) }}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          {selectedCards.length > 1 && (
            <div className="flex justify-between items-center">
              <Button
                onClick={handlePreviousCard}
                disabled={currentCardIndex === 0}
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 disabled:opacity-30"
              >
                Anterior
              </Button>
              
              <div className="flex gap-2">
                {selectedCards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentCardIndex ? 'bg-gold' : 'bg-gold/30'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={handleNextCard}
                disabled={currentCardIndex === selectedCards.length - 1}
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 disabled:opacity-30"
              >
                Próxima
              </Button>
            </div>
          )}

          {/* CTA Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handlePaymentClick}
              size="lg"
              className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-8 py-4 text-base rounded-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                <span>Descobrir minha alma gêmea</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TarotModal;

