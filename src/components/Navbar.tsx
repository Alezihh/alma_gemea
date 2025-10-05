import { Heart, Star, Shield, Users, Sparkles } from "lucide-react";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-foreground fill-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold text-foreground">
              Metodo - Serena
            </span>
            <span className="text-xs text-muted-foreground font-medium hidden sm:block">Alma Gêmea</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("como-funciona")}
            className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-smooth text-sm hover:bg-primary/10 px-3 py-2 rounded-lg"
          >
            <Sparkles className="w-4 h-4" />
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-smooth text-sm hover:bg-primary/10 px-3 py-2 rounded-lg"
          >
            <Star className="w-4 h-4" />
            Depoimentos
          </button>
          <button
            onClick={() => scrollToSection("privacidade")}
            className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-smooth text-sm hover:bg-primary/10 px-3 py-2 rounded-lg"
          >
            <Shield className="w-4 h-4" />
            Privacidade
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button className="flex items-center gap-2 bg-foreground hover:bg-foreground/90 transition-smooth text-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:scale-105">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Começar Agora</span>
            <span className="sm:hidden">Começar</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-foreground/80 hover:text-foreground transition-smooth">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <Heart className="w-6 h-6 text-foreground/5 animate-pulse" />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <Heart className="w-6 h-6 text-foreground/5 animate-pulse" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
