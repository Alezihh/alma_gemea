import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TarotCard as TarotCardType } from "@/lib/tarot";
import { Sparkles } from "lucide-react";
// Removed Purchase tracking as requested
import { QuestionnaireData } from "@/hooks/useQuestionnaire";

interface TarotModalProps {
  open: boolean;
  onClose: () => void;
  selectedCards: TarotCardType[];
  questionnaireData?: QuestionnaireData;
}

const TarotModal = ({ open, onClose, selectedCards, questionnaireData }: TarotModalProps) => {
  const handlePaymentClick = () => {
    // Direct link to payment (no tracking)
    window.open("https://pay.kirvano.com/e4c41901-7afa-47a8-a3ea-160341cc2d01", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[95vw] sm:w-full bg-transparent backdrop-blur-xl border-2 border-primary/50 shadow-[0_0_80px_rgba(236,72,153,0.4)] animate-scale-in overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-purple-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none"></div>
        
        <div className="relative z-10 py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Star Icon */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 sm:border-4 border-primary/50 shadow-lg animate-pulse">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gold fill-gold animate-spin-slow" style={{ animationDuration: '8s' }} />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"></div>
            </div>
          </div>

          {/* Title / Selected cards image */}
          <div className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <p className="text-sm sm:text-base text-gold font-medium">
              O destino me revelou essas 3 cartas
            </p>
            <div className="rounded-lg overflow-hidden border border-gold/30 shadow-lg bg-black/20">
              <img 
                src="https://bot-minio.ggiegp.easypanel.host/typebot/public/workspaces/cmg2u7y9x004itn1je5cwv7es/typebots/cmg2x6ka4004stn1j8slwwb9w/blocks/v2o98guxbhxl6km5i7lqns2f?v=1759031348356" 
                alt="Cartas selecionadas" 
                className="w-full h-auto max-h-32 sm:max-h-40 object-contain"
                onLoad={() => console.log('Imagem carregada com sucesso')}
                onError={() => console.log('Erro ao carregar imagem')}
              />
            </div>
          </div>

          {/* Main Text */}
          <div className="space-y-4 sm:space-y-6 text-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gold leading-relaxed font-medium px-2">
              Algo muito especial está prestes a ser desvendado sobre quem está destinado a cruzar o seu caminho...
            </p>
            
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed px-2">
              Irei analisar profundamente as suas cartas, e junto ao meu dom...
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 sm:gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '0s', animationDuration: '1s' }}></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1s' }}></div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-3 sm:pt-4 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
            <Button 
              onClick={handlePaymentClick}
              size="lg"
              className="bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-sm sm:text-base rounded-full group relative overflow-hidden w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-xs sm:text-sm lg:text-base">Descobrir minha alma gêmea</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-700" />
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
