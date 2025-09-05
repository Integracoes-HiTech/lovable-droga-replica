import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Clock, Truck } from "lucide-react";
import ProductsGrid from "@/components/ProductsGrid"
import HeroCarousel from "./HeroCarousel";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-accent via-accent/50 to-background">
      {/* Carrossel */}
      <HeroCarousel />
      
      <div className="container mx-auto px-4 py-12">
        {/* Features Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-newjune-extrabold">Entrega Rápida</h3>
              <p className="text-sm text-muted-foreground font-newjune-regular">Receba em até 2 horas na região metropolitana</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-newjune-extrabold">Compra Segura</h3>
              <p className="text-sm text-muted-foreground font-newjune-regular">Produtos originais e certificados</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-newjune-extrabold">Cuidado Especializado</h3>
              <p className="text-sm text-muted-foreground font-newjune-regular">Atendimento farmacêutico qualificado</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-newjune-extrabold">24h Online</h3>
              <p className="text-sm text-muted-foreground font-newjune-regular">Faça seus pedidos a qualquer hora</p>
            </CardContent>
          </Card>
        </div>
        <ProductsGrid title="Mais vendidos da semana" />
      </div>
    </section>
    
  );
};

export default HeroSection;