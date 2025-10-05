import { cn } from "@/lib/utils";

interface TarotCardProps {
  id: string;
  selected: boolean;
  onToggle: (id: string) => void;
  position: {
    top: string;
    left: string;
    rotation: number;
  };
  index: number;
}

const TarotCard = ({ id, selected, onToggle, position, index }: TarotCardProps) => {
  return (
    <button
      onClick={() => onToggle(id)}
      aria-pressed={selected}
      aria-label={`Carta de Tarot ${index + 1}`}
      className={cn(
        "absolute w-24 h-36 md:w-28 md:h-40 lg:w-32 lg:h-44 rounded-lg overflow-hidden",
        "bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900",
        "border-2 transition-smooth cursor-pointer",
        "hover:scale-105 hover:-translate-y-2",
        "focus:outline-none focus:ring-4 focus:ring-primary/50",
        "animate-fade-in",
        selected
          ? "border-primary scale-105 shadow-selected animate-glow"
          : "border-purple-700/50 shadow-card hover:border-primary/50 hover:shadow-hover"
      )}
      style={{
        top: position.top,
        left: position.left,
        transform: `rotate(${position.rotation}deg)`,
        animationDelay: `${index * 0.05}s`,
        animationFillMode: "backwards",
      }}
    >
      <div className="w-full h-full relative flex items-center justify-center">
        {/* Padrão decorativo */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-gold/40 rounded"></div>
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold/30 rounded"></div>
        </div>
        
        {/* Símbolo central */}
        <div className="relative z-10 text-4xl md:text-5xl">✨</div>
        
        {/* Brilho de seleção */}
        {selected && (
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
        )}
      </div>
    </button>
  );
};

export default TarotCard;
