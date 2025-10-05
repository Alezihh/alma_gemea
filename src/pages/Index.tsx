import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
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
      <Navbar />

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
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <div className="container mx-auto max-w-5xl text-center space-y-6 sm:space-y-8 animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight px-2">
                Descubra Sua{" "}
                <span className="bg-gradient-to-r from-rose via-secondary to-gold bg-clip-text text-transparent">
                  Alma Gêmea
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gold max-w-3xl mx-auto leading-relaxed px-4">
                Graças ao Método Serena, revelamos o perfil da pessoa que não apenas combina com você, 
                mas desperta o amor e a conexão que sua alma sempre buscou.
              </p>

              {/* Video do YouTube */}
              <div className="relative max-w-3xl mx-auto my-6 sm:my-8 px-4">
                <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 shadow-glow">
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
                className="text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-7 bg-foreground hover:bg-foreground/90 transition-smooth hover:scale-105 rounded-full text-background w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 fill-background" />
                <span className="text-sm sm:text-base">Começar Minha Jornada</span>
              </Button>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-center mb-8 sm:mb-12 text-gold animate-fade-in-up px-4">
                Pessoas que encontraram suas almas gêmeas através da nossa análise mística
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                    <CardContent className="p-6 space-y-4 relative z-10">
                      {/* Foto do casal */}
                      <div className="aspect-square rounded-lg overflow-hidden mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.names}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-primary mb-3">
                        <Heart className="w-5 h-5 fill-current" />
                        <h3 className="text-lg font-semibold">{testimonial.names}</h3>
                      </div>

                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {testimonial.text}{" "}
                        <span className="text-accent font-bold">{testimonial.highlight}</span>{" "}
                        {testimonial.continuation}{" "}
                        <span className="text-accent font-bold">{testimonial.highlight2}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8 sm:mt-12 px-4">
                <p className="text-gold text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Você também pode encontrar sua alma gêmea!</p>
                <Button
                  onClick={() => scrollToSection("como-funciona")}
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 bg-foreground hover:bg-foreground/90 transition-smooth rounded-full text-background w-full sm:w-auto max-w-xs sm:max-w-none"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 fill-background" />
                  <span className="text-sm sm:text-base">Descobrir Minha Alma Gêmea</span>
                </Button>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="como-funciona" className="py-20 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-display font-bold">Como Funciona</h2>
                <p className="text-muted-foreground text-lg">
                  Um processo simples para descobrir sua conexão perfeita
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                    className="text-center space-y-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-glow`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-semibold">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section id="privacidade" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12 space-y-4 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  Privacidade & Transparência
                </h2>
                <p className="text-muted-foreground text-lg">Sua privacidade é nossa prioridade</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                    <CardContent className="p-8 space-y-4">
                      <div className={`${item.color}`}>
                        <item.icon className="w-12 h-12" />
                      </div>
                      <h3 className="text-xl font-display font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 border-t border-border/50">
            <div className="container mx-auto max-w-4xl text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-foreground fill-foreground" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">
                  ALMA GÊMEA
                </span>
              </div>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                Conectando corações através de uma análise única e personalizada. 
                Descubra a magia de encontrar sua alma gêmea perfeita.
              </p>

              <div className="pt-6 border-t border-border/30">
                <p className="text-sm text-muted-foreground">
                  © 2024 Alma Gêmea. Feito com <Heart className="w-4 h-4 inline text-primary fill-primary" /> para conectar almas.
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
