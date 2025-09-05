import React from 'react';
import { Facebook, Instagram, MapPin, Phone, Clock, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#e41e3c] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col items-start">
              {/* Logo */}
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/branca.png" 
                  alt="Drogaria Popular" 
                  className="h-16 w-auto"
                />
              </div>
              
              <p className="text-white/90 text-sm font-newjune-regular leading-relaxed max-w-md">
                💛 💊Medicamentos, cosméticos e muito+<br/>
              </p>
            </div>
          </div>

          {/* Informações de Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-newjune-extrabold text-white">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-white" />
                <span className="text-sm font-newjune-regular text-white/90">Seg-Sáb: 7h30-22h | Dom: 8h-21h</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-white" />
                <span className="text-sm font-newjune-regular text-white/90">Delivery: (62) 3284-9091/ 3273-4029/ 3281-5818</span>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-newjune-extrabold text-white">Redes Sociais</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100090792279997" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/drogariapopular.pqatheneu/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://www.google.com/maps/place/Drogaria+Popular+-+Farm%C3%A1cia+Parque+Atheneu/data=!4m2!3m1!1s0x0:0x6674decbfbd38783?sa=X&ved=1t:2428&ictx=111" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Como Chegar"
              >
                <MapPin className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/80 font-newjune-regular">
              © 2024 Drogaria Popular Atheneu. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-white/80 hover:text-white font-newjune-regular">Política de Privacidade</a>
              <a href="#" className="text-sm text-white/80 hover:text-white font-newjune-regular">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
