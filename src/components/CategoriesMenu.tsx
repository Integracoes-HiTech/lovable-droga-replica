import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SubCategory {
  id: string;
  name: string;
  items?: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

const categories: Category[] = [
  {
    id: "saude",
    name: "Saúde",
    icon: "🏥",
    subCategories: [
      {
        id: "bem-estar",
        name: "Bem Estar",
        items: ["Fitness"]
      },
      {
        id: "diabetes",
        name: "Diabetes",
        items: ["Alimentos Dietéticos", "Adoçantes"]
      },
      {
        id: "saude-sexual",
        name: "Saúde Sexual",
        items: ["Preservativos", "Higiene Íntima", "Lubrificantes", "Acessórios para Saúde Sexual"]
      },
      {
        id: "pele-cabelos-unhas",
        name: "Pele, Cabelos e Unhas",
        items: ["Micoses de Pele e Unha", "Tratamento Contra Piolhos"]
      },
      {
        id: "cuidado-adulto",
        name: "Cuidado Adulto",
        items: ["Absorvente Adulto", "Fralda Adulta", "Lenços e Pomadas"]
      }
    ]
  },
  {
    id: "medicamentos",
    name: "Medicamentos",
    icon: "💊",
    subCategories: [
      {
        id: "analgesicos",
        name: "Analgésicos",
        items: ["Paracetamol", "Dipirona", "Ibuprofeno"]
      },
      {
        id: "anti-inflamatorios",
        name: "Anti-inflamatórios",
        items: ["Anti-inflamatórios Orais", "Anti-inflamatórios Tópicos"]
      },
      {
        id: "antialergicos",
        name: "Antialérgicos",
        items: ["Antialérgicos Orais", "Antialérgicos Tópicos"]
      },
      {
        id: "protetores-gastricos",
        name: "Protetores Gástricos",
        items: ["Omeprazol", "Pantoprazol", "Ranitidina"]
      }
    ]
  },
  {
    id: "vitaminas-suplementos",
    name: "Vitaminas e Suplementos",
    icon: "💊",
    subCategories: [
      {
        id: "vitaminas",
        name: "Vitaminas",
        items: ["Vitamina C", "Vitamina D", "Vitamina B12", "Multivitamínicos"]
      },
      {
        id: "minerais",
        name: "Minerais",
        items: ["Cálcio", "Ferro", "Zinco", "Magnésio"]
      },
      {
        id: "omega",
        name: "Ômega",
        items: ["Ômega 3", "Ômega 6", "Ômega 9"]
      },
      {
        id: "proteinas",
        name: "Proteínas",
        items: ["Whey Protein", "Proteína Vegetal", "BCAA"]
      }
    ]
  },
  {
    id: "beleza",
    name: "Beleza",
    icon: "💄",
    subCategories: [
      {
        id: "maquiagem",
        name: "Maquiagem",
        items: ["Base", "Pó", "Batom", "Sombra", "Máscara"]
      },
      {
        id: "skincare",
        name: "Skincare",
        items: ["Limpeza", "Hidratação", "Proteção Solar", "Tratamento"]
      },
      {
        id: "perfumes",
        name: "Perfumes",
        items: ["Perfumes Femininos", "Perfumes Masculinos", "Desodorantes"]
      }
    ]
  },
  {
    id: "cosmeticos",
    name: "Cosméticos",
    icon: "🧴",
    subCategories: [
      {
        id: "cabelo",
        name: "Cabelo",
        items: ["Shampoo", "Condicionador", "Máscara", "Finalizador"]
      },
      {
        id: "corpo",
        name: "Corpo",
        items: ["Sabonete", "Hidratante", "Esfoliante", "Óleo"]
      },
      {
        id: "maos-pes",
        name: "Mãos e Pés",
        items: ["Creme para Mãos", "Esmalte", "Tratamento para Pés"]
      }
    ]
  },
  {
    id: "mae-bebe",
    name: "Mamãe & Bebê",
    icon: "👶",
    subCategories: [
      {
        id: "fraldas",
        name: "Fraldas",
        items: ["Fralda Descartável", "Fralda de Pano", "Lenços Umedecidos"]
      },
      {
        id: "alimentacao",
        name: "Alimentação",
        items: ["Leite em Pó", "Papinhas", "Sucos", "Biscoitos"]
      },
      {
        id: "higiene-bebe",
        name: "Higiene do Bebê",
        items: ["Shampoo Bebê", "Sabonete Bebê", "Creme para Assadura"]
      },
      {
        id: "acessorios",
        name: "Acessórios",
        items: ["Mamadeira", "Chupeta", "Babador", "Carrinho"]
      }
    ]
  },
  {
    id: "cuidados-diarios",
    name: "Cuidados Diários",
    icon: "🧴",
    subCategories: [
      {
        id: "higiene-bucal",
        name: "Higiene Bucal",
        items: ["Escova de Dentes", "Pasta de Dente", "Fio Dental", "Enxaguante"]
      },
      {
        id: "higiene-pessoal",
        name: "Higiene Pessoal",
        items: ["Sabonete", "Desodorante", "Papel Higiênico", "Absorvente"]
      },
      {
        id: "cuidados-corporais",
        name: "Cuidados Corporais",
        items: ["Hidratante", "Protetor Solar", "Desodorante", "Perfume"]
      }
    ]
  },
  {
    id: "pet",
    name: "Pet",
    icon: "🐕",
    subCategories: [
      {
        id: "alimentacao-pet",
        name: "Alimentação",
        items: ["Ração Cão", "Ração Gato", "Petiscos", "Suplementos"]
      },
      {
        id: "higiene-pet",
        name: "Higiene",
        items: ["Shampoo Pet", "Escova", "Cortador de Unha", "Antipulgas"]
      },
      {
        id: "acessorios-pet",
        name: "Acessórios",
        items: ["Coleira", "Brinquedos", "Cama", "Comedouro"]
      }
    ]
  }
];

interface CategoriesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoriesMenu({ isOpen, onClose }: CategoriesMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose} />
      
      {/* Menu */}
      <div 
        ref={menuRef}
        className="fixed top-24 left-0 w-full bg-white shadow-xl z-50 border-b border-gray-200 max-h-[70vh] overflow-y-auto"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex">
            {/* Categorias Principais */}
            <div className="w-1/4 pr-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3 font-newjune-extrabold">
                Categorias
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors font-newjune-regular text-sm ${
                      selectedCategory === category.id
                        ? 'bg-[#e41e3c] text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-base">{category.icon}</span>
                        <span>{category.name}</span>
                      </span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategorias */}
            <div className="w-3/4 pl-6 border-l border-gray-200">
              {selectedCategory ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <ChevronDown className="h-3 w-3 rotate-90" />
                    </button>
                    <h3 className="text-base font-semibold text-gray-900 font-newjune-extrabold">
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {categories
                      .find(c => c.id === selectedCategory)
                      ?.subCategories.map((subCategory) => (
                        <div key={subCategory.id} className="space-y-2">
                          <h4 className="font-semibold text-gray-900 font-newjune-extrabold text-sm">
                            {subCategory.name}
                          </h4>
                          <ul className="space-y-1">
                            {subCategory.items?.map((item, index) => (
                              <li key={index}>
                                <Link
                                  to={`/catalogo?categoria=${selectedCategory}&subcategoria=${subCategory.id}&produto=${item.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-gray-600 hover:text-[#e41e3c] font-newjune-regular block py-1 text-sm"
                                  onClick={onClose}
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <p className="text-gray-500 font-newjune-regular text-sm">
                    Selecione uma categoria para ver as subcategorias
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
