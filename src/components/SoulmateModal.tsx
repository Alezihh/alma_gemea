import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Wand2 } from 'lucide-react';

interface SoulmateModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const SoulmateModal = ({ open, onClose, onComplete }: SoulmateModalProps) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);

  const loadingSteps = [
    "Analisando suas cartas...",
    "Conectando com as energias...",
    "Desenhando sua alma gêmea...",
    "Finalizando os detalhes...",
    "Quase pronto..."
  ];

  const messages = [
    "Eu já consigo visualizar sua alma gêmea, vocês cruzaram os caminhos recentemente, estão mais próximos do que nunca! Já consigo ver um futuro lindo!",
    "Mas deixa eu te falar, eu não estou cobrando nada para descobrir sua alma gêmea, mas, uma taxinha simbólica de 19,90 para todo material que eu tenho que usar e ainda tem todo o meu esforço pra me conectar com vocês dois, você entende né?",
    "E eu não estou exagerando quando digo que é um valor simbólico, porque é uma taxa só de R$19,90...",
    "Se você me disser que eu posso confiar em você, eu vou te mandar o desenho antes mesmo de você me pagar essa taxinha....",
    "Então, eu posso confiar em você né?"
  ];

  useEffect(() => {
    if (!open) {
      // Reset states when modal is closed
      setLoadingStep(0);
      setIsComplete(false);
      setCurrentMessageIndex(0);
      setShowTyping(false);
      setDisplayedMessages([]);
      return;
    }

    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          clearInterval(interval);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (!isComplete) return;

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        // Mostrar 3 pontinhos digitando
        setShowTyping(true);
        
        // Após 2 segundos, mostrar a mensagem completa
        setTimeout(() => {
          setDisplayedMessages(prev => [...prev, messages[messageIndex]]);
          setShowTyping(false);
          messageIndex++;
        }, 2000);
      } else {
        clearInterval(messageInterval);
      }
    }, 3000);

    return () => clearInterval(messageInterval);
  }, [isComplete]);

  const handleComplete = () => {
    setIsComplete(false);
    setLoadingStep(0);
    setCurrentMessageIndex(0);
    setShowTyping(false);
    setDisplayedMessages([]);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-full bg-transparent backdrop-blur-xl border-2 border-primary/50 shadow-[0_0_80px_rgba(236,72,153,0.4)] animate-scale-in overflow-hidden mx-4 sm:mx-0">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-purple-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none"></div>
        
        <div className="relative z-10 py-4 px-4 sm:py-8 sm:px-6">
          {/* Loading Animation */}
          {!isComplete && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                ></div>
              </div>

              {/* Loading Text */}
              <div className="text-center">
                <p className="text-lg text-gold font-medium animate-pulse">
                  {loadingSteps[loadingStep]}
                </p>
              </div>

              {/* Animated Icons */}
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center animate-bounce">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.4s' }}>
                  <Wand2 className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </div>
          )}

          {/* Complete State - WhatsApp Style */}
          {isComplete && (
            <div className="space-y-4 sm:space-y-6">
              {/* Texto sobre os olhos */}
              <div className="text-center px-2">
                <p className="text-lg sm:text-xl text-gold font-bold animate-fade-in leading-tight">
                  Já consigo ver os olhos da sua alma gêmea
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                {/* Card Esquerdo - Mensagens WhatsApp */}
                <div className="bg-black/30 rounded-lg p-4 sm:p-6 border border-gold/20">
                  <div className="h-64 sm:h-96 overflow-y-auto space-y-4">
                    {displayedMessages.map((message, index) => (
                      <div key={index} className="flex justify-start">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                          <p className="text-white text-sm leading-relaxed">{message}</p>
                        </div>
                      </div>
                    ))}
                    
                    {showTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Direito - Imagem */}
                <div className="bg-black/30 rounded-lg p-4 sm:p-6 border border-gold/20 flex flex-col items-center justify-center">
                  <div className="w-full h-64 sm:h-96 rounded-lg overflow-hidden border-2 border-gold/30 shadow-lg bg-black/20">
                    <img 
                      src="/DESENHO ALMA GEMEA.png" 
                      alt="Prévia da Alma Gêmea"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23633c88'/%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%23ec4899' font-family='serif' font-size='24'%3EAlma Gêmea%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {isComplete && (
            <div className="flex justify-center pt-4 sm:pt-6">
              <Button
                onClick={handleComplete}
                size="lg"
                className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full w-full sm:w-auto max-w-xs"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Sim, Pode Confiar!
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SoulmateModal;