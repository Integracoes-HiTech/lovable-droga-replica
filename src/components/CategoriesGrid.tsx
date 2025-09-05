import { Card, CardContent } from "@/components/ui/card";
import { 
  Pill, 
  Sparkles, 
  Droplets, 
  Baby, 
  Dumbbell, 
  Stethoscope,
  Scissors,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Medicamentos",
    icon: Pill,
    description: "Genéricos e de marca",
    color: "bg-red-50 hover:bg-red-100 border-red-200"
  },
  {
    name: "Beleza",
    icon: Sparkles,
    description: "Cosméticos e maquiagem",
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200"
  },
  {
    name: "Higiene",
    icon: Droplets,
    description: "Cuidados pessoais",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
  },
  {
    name: "Mamãe e Bebê",
    icon: Baby,
    description: "Tudo para o seu bebê",
    color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
  },
  {
    name: "Suplementos",
    icon: Dumbbell,
    description: "Vitaminas e minerais",
    color: "bg-green-50 hover:bg-green-100 border-green-200"
  },
  {
    name: "Saúde",
    icon: Stethoscope,
    description: "Equipamentos médicos",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
  },
  {
    name: "Cuidados",
    icon: Scissors,
    description: "Cabelo e pele",
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200"
  },
  {
    name: "Casa",
    icon: Home,
    description: "Limpeza e organização",
    color: "bg-gray-50 hover:bg-gray-100 border-gray-200"
  }
];

const CategoriesGrid = () => {
  const getCategoryLink = (categoryName: string) => {
    // Mapear nomes das categorias para filtros do catálogo
    const categoryMap: { [key: string]: string } = {
      "Medicamentos": "medicamentos",
      "Beleza": "beleza",
      "Higiene": "higiene",
      "Mamãe e Bebê": "mae-bebe",
      "Suplementos": "suplementos",
      "Saúde": "saude",
      "Cuidados": "cuidados",
      "Casa": "casa"
    };
    
    const categoryParam = categoryMap[categoryName] || categoryName.toLowerCase();
    return `/catalogo?categoria=${categoryParam}`;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-newjune">
            Encontre o que precisa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navegue pelas nossas categorias e encontre os melhores produtos para sua saúde e bem-estar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link key={index} to={getCategoryLink(category.name)} className="block">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${category.color} border-2`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;