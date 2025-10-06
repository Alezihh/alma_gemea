import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Palette, Wand2 } from 'lucide-react';

interface SoulmateModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const SoulmateModal = ({ open, onClose, onComplete }: SoulmateModalProps) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    "Analisando suas cartas...",
    "Conectando com as energias...",
    "Desenhando sua alma gêmea...",
    "Finalizando os detalhes...",
    "Quase pronto..."
  ];

  useEffect(() => {
    if (!open) return;

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

  const handleComplete = () => {
    setIsComplete(false);
    setLoadingStep(0);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[95vw] sm:w-full bg-transparent backdrop-blur-xl border-2 border-primary/50 shadow-[0_0_80px_rgba(236,72,153,0.4)] animate-scale-in overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-purple-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none"></div>
        
        <div className="relative z-10 py-8 px-6 space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center border-4 border-primary/50 shadow-lg animate-pulse">
              <Palette className="w-10 h-10 text-gold animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gold">
              {isComplete ? "✨ Sua Alma Gêmea Está Pronta! ✨" : "🎨 Estou Desenhando em Tempo Real"}
            </h2>
            
            <p className="text-lg text-white/80">
              {isComplete ? "Sua alma gêmea foi revelada através das cartas!" : "Sua alma gêmea está sendo desenhada..."}
            </p>
          </div>

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

          {/* Complete State */}
          {isComplete && (
            <div className="space-y-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center animate-pulse">
                <Heart className="w-12 h-12 text-white fill-white" />
              </div>
              
              <div className="space-y-2">
                <p className="text-lg text-white">Sua alma gêmea foi revelada!</p>
                <p className="text-sm text-white/70">Agora você pode descobrir quem é essa pessoa especial</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            {isComplete ? (
              <Button
                onClick={handleComplete}
                size="lg"
                className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-8 py-4 text-lg rounded-full"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Descobrir Minha Alma Gêmea
              </Button>
            ) : (
              <div className="flex items-center space-x-2 text-gold">
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SoulmateModal;
