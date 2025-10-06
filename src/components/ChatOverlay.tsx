import { useState, useEffect, useRef } from 'react';
import { trackInitiateCheckout } from '@/lib/facebookPixel';

// Declaração global para TypeScript
declare global {
  interface Window {
    ALMA_CHAT_MESSAGES: string[];
  }
}

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ChatOverlay = ({ isOpen, onClose, onComplete }: ChatOverlayProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const isRunningRef = useRef<boolean>(false);

  // Expor mensagens globalmente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.ALMA_CHAT_MESSAGES = [
        "Eu já consigo visualizar sua alma gêmea, vocês cruzaram os caminhos recentemente, estão mais próximos do que nunca! Já consigo ver um futuro lindo!",
        "Mas deixa eu te falar, eu não estou cobrando nada para descobrir sua alma gêmea, mas, uma taxinha simbólica de 19,90 para todo material que eu tenho que usar e ainda tem todo o meu esforço pra me conectar com vocês dois, você entende né?",
        "E eu não estou exagerando quando digo que é um valor simbólico, porque é uma taxa só de R$19,90...",
        "Se você me disser que eu posso confiar em você, eu vou te mandar o desenho antes mesmo de você me pagar essa taxinha....",
        "Então, eu posso confiar em você né?"
      ];
    }
  }, []);

  const messages = window.ALMA_CHAT_MESSAGES || [
    "Eu já consigo visualizar sua alma gêmea, vocês cruzaram os caminhos recentemente, estão mais próximos do que nunca! Já consigo ver um futuro lindo!",
    "Mas deixa eu te falar, eu não estou cobrando nada para descobrir sua alma gêmea, mas, uma taxinha simbólica de 19,90 para todo material que eu tenho que usar e ainda tem todo o meu esforço pra me conectar com vocês dois, você entende né?",
    "E eu não estou exagerando quando digo que é um valor simbólico, porque é uma taxa só de R$19,90...",
    "Se você me disser que eu posso confiar em você, eu vou te mandar o desenho antes mesmo de você me pagar essa taxinha....",
    "Então, eu posso confiar em você né?"
  ];

  // Scroll automático para o final
  const scrollToBottom = () => {
    const container = document.querySelector('.h-full.overflow-y-auto');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages, showFinalButton]);

  useEffect(() => {
    if (!isOpen) {
      setDisplayedMessages([]);
      setShowFinalButton(false);
      isRunningRef.current = false;
      return;
    }

    // Evitar execução múltipla
    if (isRunningRef.current) {
      return;
    }

    isRunningRef.current = true;

    // Reset states when opening
    setDisplayedMessages([]);
    setShowFinalButton(false);

    let messageIndex = 0;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const showNextMessage = () => {
      if (messageIndex < messages.length) {
        // Após 1.2 segundos, mostrar a mensagem completa
        timeoutId = setTimeout(() => {
          setDisplayedMessages(prev => {
            // Verificar se a mensagem já existe para evitar duplicação
            const messageExists = prev.some(msg => msg === messages[messageIndex]);
            if (messageExists) {
              return prev;
            }
            return [...prev, messages[messageIndex]];
          });
          messageIndex++;
          
          // Se é a última mensagem, mostrar botão após delay
          if (messageIndex === messages.length) {
            setTimeout(() => {
              setShowFinalButton(true);
              isRunningRef.current = false;
            }, 1000);
          } else {
            // Agendar próxima mensagem
            intervalId = setTimeout(showNextMessage, 1200);
          }
        }, 1200);
      }
    };

    // Iniciar a sequência
    intervalId = setTimeout(showNextMessage, 1200);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearTimeout(intervalId);
      isRunningRef.current = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[80] bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Container de mensagens com scroll */}
      <div className="h-full overflow-y-auto p-4">
        <div className="w-full max-w-xl mx-auto space-y-3 pt-8">
          {/* Mensagens alinhadas à esquerda */}
          {displayedMessages.map((message, index) => (
            <div 
              key={index} 
              className="flex items-start justify-start animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-4 py-3 max-w-[85%] shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                <p className="text-white text-sm leading-relaxed">{message}</p>
              </div>
            </div>
          ))}
          

          {/* Botão final - centralizado horizontalmente */}
          {showFinalButton && (
            <div 
              className="flex justify-center animate-fade-in-up"
              style={{ 
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <button
                onClick={() => { trackInitiateCheckout(); onComplete(); }}
                className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-600 hover:via-fuchsia-600 hover:to-violet-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-[0_6px_18px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.35)] transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Sim, Pode Confiar!</span>
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ChatOverlay;
