import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuestionnaireModal from "@/components/QuestionnaireModal";
import TarotGrid from "@/components/TarotGrid";
import { Heart, Shield, Eye, Clock, UserCheck, User, Wand2, Share2 } from "lucide-react";
import feedback1 from "@/assets/feedback1.png";
import feedback2 from "@/assets/feedback2.png";
import feedback3 from "@/assets/feedback3.png";
import { trackPageView, trackViewContent, trackInitiateCheckout } from "@/lib/facebookPixel";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showTarotSelection, setShowTarotSelection] = useState(false);
  const { formData } = useQuestionnaire();

  // Facebook Pixel tracking
  useEffect(() => {
    trackPageView();
    trackViewContent();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartJourney = () => {
    trackInitiateCheckout();
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireComplete = () => {
    setShowTarotSelection(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Decorative floating hearts */}
      <div className="fixed left-12 top-1/4 animate-pulse opacity-20 hidden xl:block">
        <Heart className="w-12 h-12 text-foreground" />
      </div>
      <div className="fixed right-12 top-1/3 animate-pulse opacity-20 hidden xl:block" style={{ animationDelay: "1s" }}>
        <Heart className="w-10 h-10 text-foreground" />
      </div>
      <div className="fixed left-16 bottom-1/4 animate-pulse opacity-20 hidden xl:block" style={{ animationDelay: "2s" }}>
        <Heart className="w-8 h-8 text-foreground" />
      </div>
      <div className="fixed right-16 top-2/3 animate-pulse opacity-20 hidden xl:block" style={{ animationDelay: "1.5s" }}>
        <Heart className="w-14 h-14 text-foreground" />
      </div>

      {/* Tarot Selection Section - appears after questionnaire */}
      {showTarotSelection ? (
        <section id="tarot-selection" className="relative py-20 px-4 min-h-screen flex items-center justify-center pt-24 bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 overflow-hidden">
          {/* Background blur orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          
          <div className="relative z-10">
            <TarotGrid questionnaireData={formData} />
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
            <div className="container mx-auto max-w-6xl text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 animate-fade-in-up">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-display font-bold leading-tight px-2">
                Descubra Sua{" "}
                <span className="bg-gradient-to-r from-rose via-secondary to-gold bg-clip-text text-transparent">
                  Alma Gêmea
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gold max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
                Graças ao Método Serena, revelamos o perfil da pessoa que não apenas combina com você, 
                mas desperta o amor e a conexão que sua alma sempre buscou.
              </p>

              {/* Video do YouTube */}
              <div className="relative max-w-3xl mx-auto my-4 sm:my-6 md:my-8 px-2 sm:px-4">
                <div className="aspect-video rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 border-primary/30 shadow-glow">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/UJmFGklL7N4?autoplay=1&mute=1&loop=1&playlist=UJmFGklL7N4&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=1&cc_load_policy=0&start=0&end=0&hd=1&vq=hd1080"
                    title="Renomada Astróloga Psíquica Serena Reportagem"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    autoPlay
                    muted
                    playsInline
                  ></iframe>
                </div>
              </div>

              <Button
                onClick={handleStartJourney}
                size="lg"
                className="text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 bg-foreground hover:bg-foreground/90 transition-smooth hover:scale-105 rounded-full text-background w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-none"
              >
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 fill-background" />
                <span className="text-xs sm:text-sm md:text-base">Começar Minha Jornada</span>
              </Button>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-gold animate-fade-in-up px-2">
                Pessoas que encontraram suas almas gêmeas através da nossa análise mística
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {[
                  {
                    names: "Fernanda & Daniel",
                    text: "A Fernanda não acreditava que o desenho dela fosse realmente a sua alma gêmea, até conhecer o Daniel dois meses depois em uma festa, ele era",
                    highlight: "IDÊNTICO",
                    continuation: "ao desenho e a conexão entre os dois foi",
                    highlight2: "IMEDIATA!",
                    image: feedback1,
                  },
                  {
                    names: "Daniela & Júnior",
                    text: "Daniela nunca acreditou nessas coisas e achava que era golpe, mas por curiosidade fez o pedido do seu desenho e, para sua surpresa, conheceu o Júnior",
                    highlight: "3 DIAS DEPOIS...",
                    continuation: "Ela me mandou essa foto e hoje em dia já fazem seis meses que eles se",
                    highlight2: "CASARAM!",
                    image: feedback2,
                  },
                  {
                    names: "Franciele & Leandro",
                    text: "E a Franciele que sempre conviveu ao lado da sua alma gêmea e não sabia, mas após o desenho ela pode ter certeza que seu colega de trabalho Leandro, era o",
                    highlight: "amor da sua vida.",
                    continuation: "Ela também como a Daniele achava que era mais um desses golpes da internet, mas após acreditar ela recebeu o seu desenho da sua alma gêmea e pode ter certeza que o seu sentimento pelo Leandro estava",
                    highlight2: "correto!",
                    image: feedback3,
                  },
                ].map((testimonial, index) => (
                  <Card
                    key={index}
                    className="border-2 bg-card/50 backdrop-blur-sm relative overflow-hidden animate-fade-in-up hover-lift"
                    style={{
                      borderImage: "linear-gradient(135deg, hsl(330 80% 50%), hsl(280 70% 55%)) 1",
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-card opacity-30"></div>
                    <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4 relative z-10">
                      {/* Foto do casal */}
                      <div className="aspect-square rounded-lg overflow-hidden mb-2 sm:mb-3 md:mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.names}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-primary mb-2 sm:mb-3">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-current" />
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold">{testimonial.names}</h3>
                      </div>

                      <p className="text-xs sm:text-sm md:text-base text-foreground/90 leading-relaxed">
                        {testimonial.text}{" "}
                        <span className="text-accent font-bold">{testimonial.highlight}</span>{" "}
                        {testimonial.continuation}{" "}
                        <span className="text-accent font-bold">{testimonial.highlight2}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-6 sm:mt-8 md:mt-12 px-2 sm:px-4">
                <p className="text-gold text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">Você também pode encontrar sua alma gêmea!</p>
                <Button
                  onClick={() => scrollToSection("como-funciona")}
                  size="lg"
                  className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 bg-foreground hover:bg-foreground/90 transition-smooth rounded-full text-background w-full sm:w-auto max-w-xs sm:max-w-none"
                >
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 fill-background" />
                  <span className="text-xs sm:text-sm md:text-base">Descobrir Minha Alma Gêmea</span>
                </Button>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="como-funciona" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-4 animate-fade-in-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">Como Funciona</h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                  Um processo simples para descobrir sua conexão perfeita
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
                {[
                  {
                    icon: User,
                    number: 1,
                    title: "Compartilhe Seus Dados",
                    description: "Forneça informações básicas como nome, data de nascimento e cidade para nossa análise personalizada",
                    gradient: "from-rose to-primary",
                  },
                  {
                    icon: Wand2,
                    number: 2,
                    title: "Análise Mística",
                    description: "Nosso algoritmo único analiza sua essência para encontrar o perfil que mais combina com você",
                    gradient: "from-secondary to-lilac",
                  },
                  {
                    icon: Share2,
                    number: 3,
                    title: "Descubra & Compartilhe",
                    description: "Receba o perfil da sua alma gêmea e compartilhe o resultado com seus amigos",
                    gradient: "from-accent to-gold",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="text-center space-y-3 sm:space-y-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-glow`}>
                      <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section id="privacidade" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-2 sm:space-y-4 animate-fade-in-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">
                  Privacidade & Transparência
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Sua privacidade é nossa prioridade</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Dados Seguros",
                    description: "Todas as informações são processadas de forma segura e não são compartilhadas com terceiros.",
                    color: "text-primary",
                  },
                  {
                    icon: Eye,
                    title: "Uso Limitado",
                    description: "Seus dados são usados apenas para gerar seu perfil de alma gêmea e podem ser removidos a qualquer momento.",
                    color: "text-secondary",
                  },
                  {
                    icon: Clock,
                    title: "Retenção Transparente",
                    description: "Mantemos os dados apenas pelo tempo necessário para fornecer o serviço.",
                    color: "text-accent",
                  },
                  {
                    icon: UserCheck,
                    title: "Seu Controle",
                    description: "Você tem total controle sobre seus dados e pode solicitar remoção através do nosso suporte.",
                    color: "text-primary",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border-border/50 hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                      <div className={`${item.color}`}>
                        <item.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 border-t border-border/50">
            <div className="container mx-auto max-w-4xl text-center space-y-4 sm:space-y-6">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground fill-foreground" />
                </div>
                <span className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  ALMA GÊMEA
                </span>
              </div>

              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                Conectando corações através de uma análise única e personalizada. 
                Descubra a magia de encontrar sua alma gêmea perfeita.
              </p>

              <div className="pt-4 sm:pt-6 border-t border-border/30">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  © 2024 Alma Gêmea. Feito com <Heart className="w-3 h-3 sm:w-4 sm:h-4 inline text-primary fill-primary" /> para conectar almas.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Questionnaire Modal */}
      <QuestionnaireModal
        open={showQuestionnaire}
        onOpenChange={setShowQuestionnaire}
        onComplete={handleQuestionnaireComplete}
      />
    </div>
  );
};

export default Index;
