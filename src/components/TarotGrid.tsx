import { useState } from "react";
import { Button } from "@/components/ui/button";
import TarotCard from "./TarotCard";
import TarotModal from "./TarotModal";
import { shuffleCards, TAROT_CARDS, TarotCard as TarotCardType } from "@/lib/tarot";
import { Shuffle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import tarotCardBack from "@/assets/tarot-card-back.png";

export default function TarotGrid() {
  const [cards] = useState<TarotCardType[]>(() => shuffleCards(TAROT_CARDS).slice(0, 8));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleCardToggle = (index: number) => {
    setSelectedCards((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      if (prev.length >= 3) {
        toast.error("Você já selecionou 3 cartas!");
        return prev;
      }
      const newSelected = [...prev, index];
      if (newSelected.length === 3) {
        toast.success("Perfeito! 3 cartas selecionadas.");
      }
      return newSelected;
    });
  };

  const handleReveal = () => {
    if (selectedCards.length === 3) {
      setShowModal(true);
    }
  };

  const selected = selectedCards.map((index) => cards[index]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 w-full">
      <div className="text-center space-y-6 mb-12 animate-fade-in-up">
        <div className="inline-block px-6 py-2 rounded-full bg-gradient-pink/20 border border-primary/30 mb-4">
          <p className="text-gold font-medium">Deixe sua intuição guiar suas escolhas</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="px-6 py-3 rounded-full bg-primary/20 border-2 border-primary">
            <span className="text-lg font-semibold text-primary">
              <Sparkles className="w-5 h-5 inline mr-2" />
              {selectedCards.length} de 3 selecionadas
            </span>
          </div>
        </div>
      </div>

      {/* Cards Grid - 4 em cima, 4 embaixo */}
      <div className="space-y-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {cards.slice(0, 4).map((card, index) => (
            <div key={card.id} className="relative">
              <button
                onClick={() => handleCardToggle(index)}
                aria-pressed={selectedCards.includes(index)}
                className={`
                  w-32 h-44 md:w-36 md:h-52 rounded-lg overflow-hidden
                  border-4 transition-all duration-300 cursor-pointer
                  hover:scale-110 hover:-translate-y-3 hover:rotate-2
                  focus:outline-none focus:ring-4 focus:ring-primary/50
                  active:scale-95
                  ${
                    selectedCards.includes(index)
                      ? "border-primary scale-105 shadow-[0_0_40px_rgba(236,72,153,0.8)] animate-glow rotate-2"
                      : "border-gold/40 shadow-card hover:border-primary/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                  }
                `}
              >
                <div className="w-full h-full relative">
                  <img 
                    src={tarotCardBack} 
                    alt="Tarot Card" 
                    className="w-full h-full object-cover"
                  />
                  {selectedCards.includes(index) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent animate-pulse"></div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {cards.slice(4, 8).map((card, index) => (
            <div key={card.id} className="relative">
              <button
                onClick={() => handleCardToggle(index + 4)}
                aria-pressed={selectedCards.includes(index + 4)}
                className={`
                  w-32 h-44 md:w-36 md:h-52 rounded-lg overflow-hidden
                  border-4 transition-all duration-300 cursor-pointer
                  hover:scale-110 hover:-translate-y-3 hover:rotate-2
                  focus:outline-none focus:ring-4 focus:ring-primary/50
                  active:scale-95
                  ${
                    selectedCards.includes(index + 4)
                      ? "border-primary scale-105 shadow-[0_0_40px_rgba(236,72,153,0.8)] animate-glow rotate-2"
                      : "border-gold/40 shadow-card hover:border-primary/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                  }
                `}
              >
                <div className="w-full h-full relative">
                  <img 
                    src={tarotCardBack} 
                    alt="Tarot Card" 
                    className="w-full h-full object-cover"
                  />
                  {selectedCards.includes(index + 4) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent animate-pulse"></div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 items-center">
        <Button
          onClick={handleReveal}
          disabled={selectedCards.length !== 3}
          size="lg"
          className="w-full max-w-md bg-gradient-pink hover:opacity-90 transition-smooth shadow-glow disabled:opacity-30 disabled:cursor-not-allowed py-7 text-lg rounded-full"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {selectedCards.length === 3 ? "Revelar Minhas Cartas" : "Selecione 3 cartas"}
        </Button>

        <p className="text-sm text-gold text-center">
          {selectedCards.length === 3 
            ? "Perfeito! Clique para revelar suas cartas" 
            : "Escolha 3 cartas para continuar"}
        </p>
      </div>

      <TarotModal open={showModal} onClose={() => setShowModal(false)} selectedCards={selected} />
    </div>
  );
}
