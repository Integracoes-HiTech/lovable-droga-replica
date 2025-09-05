import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Omeprazol 20mg",
    subtitle: "25% OFF",
    description: "Protetor gástrico eficaz para azia e refluxo. Alívio rápido e duradouro. Consulte o farmacêutico.",
    imageUrl: "/lovable-uploads/carrossel5.png",
    buttonText: "Ver Oferta",
    buttonLink: "/catalogo?produto=omeprazol",
    bgColor: "bg-[#e41e3c]"
  },
  {
    id: 2,
    title: "Dipirona 500mg",
    subtitle: "20% OFF",
    description: "Analgésico e Antitérmico. Alívio rápido para dores e febre. Consulte o farmacêutico.",
    imageUrl: "/lovable-uploads/carrossel2.png",
    buttonText: "Ver Oferta",
    buttonLink: "/catalogo?produto=dipirona",
    bgColor: "bg-[#e41e3c]"
  },
  {
    id: 3,
    title: "Paracetamol 750mg",
    subtitle: "15% OFF",
    description: "Alívio para dores e febre. Eficaz e seguro para toda a família. Consulte o farmacêutico.",
    imageUrl: "/lovable-uploads/carrossel3.png",
    buttonText: "Ver Oferta",
    buttonLink: "/catalogo?produto=paracetamol",
    bgColor: "bg-[#e41e3c]"
  },
  {
    id: 4,
    title: "Semana da Saúde",
    subtitle: "Até 30% OFF",
    description: "Vitaminas e bem-estar com descontos especiais. Consulte o farmacêutico. Ofertas por tempo limitado.",
    imageUrl: "/lovable-uploads/carrossel.png",
    buttonText: "Ver Ofertas",
    buttonLink: "/catalogo",
    bgColor: "bg-gradient-to-br from-teal-50 to-green-100"
  },
  {
    id: 5,
    title: "Vitamina C 1000mg",
    subtitle: "30% OFF",
    description: "Fortalece o sistema imunológico e combate os radicais livres. Essencial para sua saúde e bem-estar.",
    imageUrl: "/lovable-uploads/carrossel4.png",
    buttonText: "Ver Oferta",
    buttonLink: "/catalogo?produto=vitamina-c",
    bgColor: "bg-[#e41e3c]"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Retomar auto-play após 3 segundos
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full ${slide.bgColor} relative`}>
              {/* Background Image */}
              {(slide.imageUrl.includes('carrossel.png') || slide.imageUrl.includes('carrossel2.png') || slide.imageUrl.includes('carrossel3.png') || slide.imageUrl.includes('carrossel4.png') || slide.imageUrl.includes('carrossel5.png')) && (
                <div className="absolute inset-0">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              )}
              
              <div className="container mx-auto px-4 h-full relative z-5">
                <div className="flex items-center h-full">
                  {/* Conteúdo */}
                  <div className={`space-y-6 ${(slide.imageUrl.includes('carrossel.png') || slide.imageUrl.includes('carrossel2.png') || slide.imageUrl.includes('carrossel3.png') || slide.imageUrl.includes('carrossel4.png') || slide.imageUrl.includes('carrossel5.png')) ? 'w-full' : 'w-full lg:w-1/2'}`}>
                    <div>
                      <h2 className="text-sm font-semibold text-white font-newjune-extrabold mb-2 drop-shadow-lg">
                        {slide.subtitle}
                      </h2>
                      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 font-newjune-extrabold leading-tight drop-shadow-lg">
                        {slide.title}
                      </h1>
                    </div>
                    
                    <p className="text-lg text-white/90 leading-relaxed font-newjune-regular max-w-md drop-shadow-lg">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to={slide.buttonLink}>
                        <Button size="lg" className="bg-[#e41e3c] hover:bg-[#c41e3c] px-8 py-6 text-lg font-newjune-extrabold shadow-lg">
                          {slide.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Imagem */}
                  {!(slide.imageUrl.includes('carrossel.png') || slide.imageUrl.includes('carrossel2.png') || slide.imageUrl.includes('carrossel3.png') || slide.imageUrl.includes('carrossel4.png') || slide.imageUrl.includes('carrossel5.png')) && (
                    <div className="hidden lg:block w-1/2">
                      <div className="relative h-full flex items-center justify-center">
                        <div className="w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

                   {/* Controles */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#e41e3c] scale-125' : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 z-20"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-8 w-8 text-gray-700" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 z-20"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-8 w-8 text-gray-700" />
      </button>

      {/* Indicadores de progresso */}
      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-lg border border-gray-200 z-20">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
};

export default HeroCarousel;
