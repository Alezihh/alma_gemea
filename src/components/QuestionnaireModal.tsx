import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  User, Calendar, MapPin, Star, Ruler, Mail, 
  X, ArrowLeft, ArrowRight 
} from "lucide-react";
import { toast } from "sonner";

interface QuestionnaireModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const zodiacSigns = [
  { value: "aries", label: "Áries", emoji: "♈" },
  { value: "touro", label: "Touro", emoji: "♉" },
  { value: "gemeos", label: "Gêmeos", emoji: "♊" },
  { value: "cancer", label: "Câncer", emoji: "♋" },
  { value: "leao", label: "Leão", emoji: "♌" },
  { value: "virgem", label: "Virgem", emoji: "♍" },
  { value: "libra", label: "Libra", emoji: "♎" },
  { value: "escorpiao", label: "Escorpião", emoji: "♏" },
  { value: "sagitario", label: "Sagitário", emoji: "♐" },
  { value: "capricornio", label: "Capricórnio", emoji: "♑" },
  { value: "aquario", label: "Aquário", emoji: "♒" },
  { value: "peixes", label: "Peixes", emoji: "♓" },
];

const heightOptions = [
  { value: "baixo", label: "Baixo(a) - até 1,60m" },
  { value: "medio", label: "Médio(a) - 1,61m a 1,75m" },
  { value: "alto", label: "Alto(a) - acima de 1,75m" },
];

export default function QuestionnaireModal({ open, onOpenChange, onComplete }: QuestionnaireModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    city: "",
    zodiacSign: "",
    height: "",
    email: "",
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.birthdate.length > 0;
      case 3:
        return formData.city.trim().length > 0;
      case 4:
        return formData.zodiacSign.length > 0;
      case 5:
        return formData.height.length > 0;
      case 6:
        return true; // Email é opcional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error("Por favor, preencha este campo para continuar");
      return;
    }

    if (step === totalSteps) {
      // Última etapa - finalizar
      onComplete();
      toast.success("Análise iniciada! Agora escolha suas cartas.");
      onOpenChange(false);
      setStep(1);
      setFormData({
        name: "",
        birthdate: "",
        city: "",
        zodiacSign: "",
        height: "",
        email: "",
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-pink flex items-center justify-center animate-pulse">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground animate-fade-in-up">
              Qual é o seu nome?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Como você gostaria de ser chamado(a)?
            </p>
            <Input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Digite seu nome completo"
              className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 animate-fade-in-up transition-all duration-300 focus:scale-105 focus:border-primary/50 focus:bg-black/50 text-sm sm:text-base"
              style={{ animationDelay: '0.2s' }}
              autoFocus
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-pink flex items-center justify-center">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
              Quando você nasceu?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Sua data de nascimento é essencial para análise
            </p>
            <Input
              type="date"
              value={formData.birthdate}
              onChange={(e) => updateField("birthdate", e.target.value)}
              className="bg-black/30 border-white/20 text-white focus:border-primary/50 focus:bg-black/50 text-sm sm:text-base"
              max={new Date().toISOString().split('T')[0]}
            />
            {formData.birthdate && (
              <p className="text-sm text-rose">Data de nascimento é sua história</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-pink flex items-center justify-center">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
              Onde você mora?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Sua localização influencia sua personalidade única
            </p>
            <Input
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Digite sua cidade"
              className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:bg-black/50 text-sm sm:text-base"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-pink flex items-center justify-center">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
              Qual o seu signo?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              As estrelas podem revelar sua personalidade
            </p>
            <RadioGroup value={formData.zodiacSign} onValueChange={(value) => updateField("zodiacSign", value)}>
              <div className="grid grid-cols-2 gap-3 max-h-60 sm:max-h-80 overflow-y-auto">
                {zodiacSigns.map((sign) => (
                  <div key={sign.value}>
                    <RadioGroupItem
                      value={sign.value}
                      id={sign.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={sign.value}
                      className="flex items-center gap-2 cursor-pointer rounded-lg border-2 border-white/20 bg-black/20 p-3 hover:bg-black/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/20 transition-all"
                    >
                      <span className="text-2xl">{sign.emoji}</span>
                      <span className="text-foreground">{sign.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-pink flex items-center justify-center">
              <Ruler className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
              Qual a sua altura?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Suas características físicas únicas
            </p>
            <RadioGroup value={formData.height} onValueChange={(value) => updateField("height", value)}>
              <div className="space-y-3">
                {heightOptions.map((option) => (
                  <div key={option.value}>
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex items-center cursor-pointer rounded-lg border-2 border-white/20 bg-black/20 p-4 hover:bg-black/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/20 transition-all"
                    >
                      <span className="text-foreground">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-pink flex items-center justify-center">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
              Seu e-mail
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Para que possamos enviar seu resultado
              <br />
              <span className="text-sm text-gold">(opcional)</span>
            </p>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Digite seu e-mail"
              className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:bg-black/50 text-sm sm:text-base"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] sm:w-full bg-transparent backdrop-blur-xl border-2 border-primary/50 p-0 gap-0 overflow-hidden shadow-[0_0_60px_rgba(236,72,153,0.6)]">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-purple-900/20 pointer-events-none rounded-lg"></div>
        
        {/* Header com progresso */}
        <div className="relative z-10 p-4 sm:p-6 pb-4 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gold animate-fade-in-up">Passo {step} de {totalSteps}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 text-foreground/80 hover:text-foreground hover:rotate-90 transition-all duration-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Conteúdo da pergunta */}
        <div className="relative z-10 px-4 sm:px-6 pb-6 animate-fade-in">
          {renderStep()}
        </div>

        {/* Botões de navegação */}
        <div className="relative z-10 flex gap-3 p-4 sm:p-6 pt-4 border-t border-white/10">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 bg-black/50 border-white/20 hover:bg-black/70 hover:border-white/30 text-white text-sm sm:text-base"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Anterior
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-pink hover:opacity-90 transition-smooth group relative overflow-hidden text-sm sm:text-base"
          >
            <span className="relative z-10">
              {step === totalSteps ? "Finalizar" : "Próximo"}
            </span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
