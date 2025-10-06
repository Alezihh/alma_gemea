import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Wand2 } from 'lucide-react';
import ChatOverlay from './ChatOverlay';
import { trackInitiateCheckout } from '@/lib/facebookPixel';

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
  const [showMessages, setShowMessages] = useState(false);
  const [showChatOverlay, setShowChatOverlay] = useState(false);

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
    setShowMessages(false);
    onComplete();
  };

  const handleShowMessages = () => {
    setShowChatOverlay(true);
  };

  const handleChatClose = () => {
    setShowChatOverlay(false);
  };

  const handleChatComplete = () => {
    trackInitiateCheckout();
    setShowChatOverlay(false);
    onComplete();
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Chat container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-sm w-full bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl border border-gold/30 rounded-2xl overflow-hidden animate-slide-up min-h-[80vh] sm:min-h-[70vh] md:min-h-[60vh]">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-purple-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none"></div>
        
        <div className="relative z-10 py-3 px-3 sm:py-4 sm:px-4 md:py-8 md:px-6 flex flex-col justify-center min-h-full">
          {/* Loading Animation */}
          {!isComplete && (
            <div className="space-y-4 sm:space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-black/20 rounded-full h-2 sm:h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                ></div>
              </div>

              {/* Loading Text */}
              <div className="text-center">
                <p className="text-sm sm:text-base md:text-lg text-gold font-medium animate-pulse">
                  {loadingSteps[loadingStep]}
                </p>
              </div>

              {/* Animated Icons */}
              <div className="flex justify-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-pink-500/20 flex items-center justify-center animate-bounce">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-purple-500/20 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-500" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.4s' }}>
                  <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-500" />
                </div>
              </div>
            </div>
          )}

          {/* Complete State - Primeira Etapa: Só a Imagem */}
          {isComplete && !showMessages && (
            <div className="space-y-4 sm:space-y-4 md:space-y-6 flex flex-col justify-center">
              {/* Texto sobre os olhos */}
              <div className="text-center px-1 sm:px-2">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gold font-bold animate-fade-in leading-tight">
                  Já consigo ver os olhos da sua alma gêmea
                </p>
              </div>
              
              {/* Imagem */}
              <div className="flex justify-center">
                <div className="w-full max-w-sm h-[28rem] sm:h-96 md:h-96 rounded-lg overflow-hidden border-2 border-gold/30 shadow-lg bg-black/20">
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
          )}

          {/* Segunda Etapa: Mensagens WhatsApp */}
          {isComplete && showMessages && (
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="bg-black/30 rounded-lg p-3 sm:p-4 md:p-6 border border-gold/20">
                <div className="h-48 sm:h-64 md:h-80 lg:h-96 overflow-y-auto space-y-3 sm:space-y-4">
                  {displayedMessages.map((message, index) => (
                    <div key={index} className="flex justify-start">
                      <div className="bg-blue-500 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3 max-w-xs">
                        <p className="text-white text-xs sm:text-sm leading-relaxed">{message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {showTyping && (
                    <div className="flex justify-start">
                      <div className="bg-blue-500 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3 max-w-xs">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isComplete && !showMessages && (
            <div className="flex justify-center pt-4 sm:pt-4 md:pt-6 mt-auto">
              <Button
                onClick={handleShowMessages}
                size="lg"
                className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full w-full sm:w-auto max-w-xs"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Quero ver o rosto da minha alma Gêmea
              </Button>
            </div>
          )}

          {isComplete && showMessages && (
            <div className="flex justify-center pt-4 sm:pt-4 md:pt-6 mt-auto">
              <Button
                onClick={handleComplete}
                size="lg"
                className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full w-full sm:w-auto max-w-xs"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Sim, Pode Confiar!
              </Button>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Chat Overlay */}
      <ChatOverlay 
        isOpen={showChatOverlay}
        onClose={handleChatClose}
        onComplete={handleChatComplete}
      />
    </div>
  );
};

export default SoulmateModal;