export interface Product {
    id: string
    name: string
    subtitle?: string
    price: number
    imageUrl: string
  category: string
  description?: string
  inStock: boolean
  discount?: number
  originalPrice?: number
  // Informações obrigatórias para medicamentos
  activeSubstance?: string
  anvisaRegistration?: string
  therapeuticIndication?: string
  isMedication?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "medicamentos",
    name: "Medicamentos",
    description: "Medicamentos controlados e de venda livre",
    icon: "💊",
    productCount: 45
  },
  {
    id: "cosmeticos",
    name: "Cosméticos",
    description: "Produtos de beleza e cuidados pessoais",
    icon: "💄",
    productCount: 32
  },
  {
    id: "higiene",
    name: "Higiene Pessoal",
    description: "Produtos de higiene e limpeza",
    icon: "🧴",
    productCount: 28
  },
  {
    id: "vitaminas",
    name: "Vitaminas e Suplementos",
    description: "Vitaminas, minerais e suplementos alimentares",
    icon: "💊",
    productCount: 25
  },
  {
    id: "bebes",
    name: "Produtos para Bebês",
    description: "Fraldas, leites e produtos infantis",
    icon: "👶",
    productCount: 18
  },
  {
    id: "ortopedia",
    name: "Ortopedia",
    description: "Produtos ortopédicos e de mobilidade",
    icon: "🦴",
    productCount: 15
  },
  {
    id: "diabeticos",
    name: "Produtos para Diabéticos",
    description: "Produtos específicos para diabéticos",
    icon: "🩸",
    productCount: 12
  },
  {
    id: "primeiros-socorros",
    name: "Primeiros Socorros",
    description: "Curativos, antissépticos e produtos de emergência",
    icon: "🩹",
    productCount: 20
  }
]
  
  export const products: Product[] = [
  // Medicamentos
  {
    id: "1",
    name: "Paracetamol 500mg",
    subtitle: "Analgésico e antitérmico",
    price: 8.90,
    originalPrice: 12.90,
    discount: 31,
    imageUrl: "/images/produtos/paracetamol.jpg",
    category: "medicamentos",
    description: "Alivia dores e febre. Tomar 1 comprimido a cada 6 horas.",
    inStock: true,
    isMedication: true,
    activeSubstance: "Paracetamol",
    anvisaRegistration: "Medicamento de notificação simplificada RDC Anvisa nº 138/2003. AFE nº: 1.00.000-1",
    therapeuticIndication: "Analgésico e antitérmico para o alívio de dores leves a moderadas e redução da febre."
  },
  {
    id: "2",
    name: "Ibuprofeno 600mg",
    subtitle: "Anti-inflamatório e analgésico",
    price: 15.50,
    imageUrl: "/images/produtos/ibuprofeno.jpg",
    category: "medicamentos",
    description: "Trata inflamações e dores. Tomar 1 comprimido a cada 8 horas.",
    inStock: true,
    isMedication: true,
    activeSubstance: "Ibuprofeno",
    anvisaRegistration: "Medicamento de notificação simplificada RDC Anvisa nº 138/2003. AFE nº: 1.00.000-2",
    therapeuticIndication: "Anti-inflamatório não esteroidal para o tratamento de processos inflamatórios e alívio da dor."
  },
  {
    id: "3",
      name: "Dipirona 500mg",
    subtitle: "Analgésico e antiespasmódico",
    price: 6.80,
    imageUrl: "/images/produtos/dipirona.jpg",
    category: "medicamentos",
    description: "Alivia dores e cólicas. Tomar 1 comprimido a cada 6 horas.",
    inStock: true,
    isMedication: true,
    activeSubstance: "Dipirona Sódica",
    anvisaRegistration: "Medicamento de notificação simplificada RDC Anvisa nº 138/2003. AFE nº: 1.00.000-3",
    therapeuticIndication: "Analgésico e antiespasmódico para o alívio de dores e cólicas."
  },
  {
    id: "4",
    name: "Omeprazol 20mg",
    subtitle: "Protetor gástrico",
    price: 25.90,
    imageUrl: "/images/produtos/omeprazol.jpg",
    category: "medicamentos",
    description: "Protege o estômago. Tomar 1 cápsula pela manhã.",
    inStock: true,
    isMedication: true,
    activeSubstance: "Omeprazol",
    anvisaRegistration: "Medicamento de notificação simplificada RDC Anvisa nº 138/2003. AFE nº: 1.00.000-4",
    therapeuticIndication: "Inibidor da bomba de prótons para o tratamento de úlceras e refluxo gastroesofágico."
  },
  {
    id: "5",
    name: "Loratadina 10mg",
    subtitle: "Antialérgico",
    price: 18.70,
    imageUrl: "/images/produtos/loratadina.jpg",
    category: "medicamentos",
    description: "Alivia sintomas de alergia. Tomar 1 comprimido por dia.",
    inStock: true,
    isMedication: true,
    activeSubstance: "Loratadina",
    anvisaRegistration: "Medicamento de notificação simplificada RDC Anvisa nº 138/2003. AFE nº: 1.00.000-5",
    therapeuticIndication: "Antialérgico para o alívio dos sintomas de rinite alérgica e urticária."
  },

  // Cosméticos
  {
    id: "6",
    name: "Protetor Solar FPS 50",
    subtitle: "Proteção solar facial",
    price: 45.90,
    originalPrice: 59.90,
    discount: 23,
    imageUrl: "/images/produtos/protetor-solar.jpg",
    category: "cosmeticos",
    description: "Proteção solar de alta performance para o rosto.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Óxido de Zinco, Octinoxato",
    anvisaRegistration: "Produto cosmético registrado na Anvisa. AFE nº: 2.00.000-1",
    therapeuticIndication: "Proteção solar para prevenção de danos causados pelos raios UV."
  },
  {
    id: "7",
    name: "Hidratante Facial",
    subtitle: "Hidratação 24h",
    price: 32.50,
    imageUrl: "/images/produtos/hidratante-facial.jpg",
    category: "cosmeticos",
    description: "Hidratante facial com efeito 24 horas.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Ácido Hialurônico, Glicerina",
    anvisaRegistration: "Produto cosmético registrado na Anvisa. AFE nº: 2.00.000-2",
    therapeuticIndication: "Hidratação facial para manutenção da barreira cutânea e prevenção do ressecamento."
  },
  {
    id: "8",
    name: "Shampoo Anticaspa",
    subtitle: "Controle da caspa",
    price: 28.90,
    imageUrl: "/images/produtos/shampoo-anticaspa.jpg",
    category: "cosmeticos",
    description: "Shampoo específico para controle da caspa.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Piroctona Olamina, Zinco Piritiona",
    anvisaRegistration: "Produto cosmético registrado na Anvisa. AFE nº: 2.00.000-3",
    therapeuticIndication: "Controle da caspa e seborreia do couro cabeludo."
  },
  {
    id: "9",
    name: "Desodorante Roll-on",
    subtitle: "Proteção 48h",
    price: 12.80,
    imageUrl: "/images/produtos/desodorante.jpg",
    category: "cosmeticos",
    description: "Desodorante com proteção de 48 horas.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Cloridrato de Alumínio, Fragrância",
    anvisaRegistration: "Produto cosmético registrado na Anvisa. AFE nº: 2.00.000-4",
    therapeuticIndication: "Controle da transpiração e neutralização de odores."
  },
  {
    id: "10",
    name: "Creme para Mãos",
    subtitle: "Hidratação intensiva",
    price: 15.60,
    imageUrl: "/images/produtos/creme-maos.jpg",
    category: "cosmeticos",
    description: "Creme hidratante para mãos com hidratação intensiva.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Ureia, Manteiga de Karité",
    anvisaRegistration: "Produto cosmético registrado na Anvisa. AFE nº: 2.00.000-5",
    therapeuticIndication: "Hidratação e proteção das mãos contra ressecamento."
  },

  // Higiene Pessoal
  {
    id: "11",
    name: "Escova de Dentes",
    subtitle: "Cerdas macias",
    price: 8.50,
    imageUrl: "/images/produtos/escova-dentes.jpg",
    category: "higiene",
    description: "Escova de dentes com cerdas macias.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto de higiene",
    anvisaRegistration: "Produto de higiene pessoal registrado na Anvisa. AFE nº: 3.00.000-1",
    therapeuticIndication: "Higiene bucal para remoção de placa bacteriana e prevenção de cáries."
  },
  {
    id: "12",
    name: "Pasta de Dente",
    subtitle: "Proteção total",
    price: 6.90,
    imageUrl: "/images/produtos/pasta-dente.jpg",
    category: "higiene",
    description: "Pasta de dente com proteção total.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Fluoreto de Sódio, Triclosan",
    anvisaRegistration: "Produto de higiene pessoal registrado na Anvisa. AFE nº: 3.00.000-2",
    therapeuticIndication: "Higiene bucal com proteção contra cáries e gengivite."
  },
  {
    id: "13",
    name: "Fio Dental",
    subtitle: "Limpeza completa",
    price: 4.80,
    imageUrl: "/images/produtos/fio-dental.jpg",
    category: "higiene",
    description: "Fio dental para limpeza completa entre os dentes.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto de higiene",
    anvisaRegistration: "Produto de higiene pessoal registrado na Anvisa. AFE nº: 3.00.000-3",
    therapeuticIndication: "Limpeza interdental para remoção de resíduos alimentares."
  },
  {
    id: "14",
    name: "Sabonete Líquido",
    subtitle: "Hidratação natural",
    price: 18.90,
    imageUrl: "/images/produtos/sabonete-liquido.jpg",
    category: "higiene",
    description: "Sabonete líquido com hidratação natural.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Glicerina, Extrato de Aloe Vera",
    anvisaRegistration: "Produto de higiene pessoal registrado na Anvisa. AFE nº: 3.00.000-4",
    therapeuticIndication: "Higiene corporal com hidratação e proteção da pele."
  },
  {
    id: "15",
    name: "Papel Higiênico",
    subtitle: "Folha dupla",
    price: 12.50,
    imageUrl: "/images/produtos/papel-higienico.jpg",
    category: "higiene",
    description: "Papel higiênico folha dupla, 30m.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto de higiene",
    anvisaRegistration: "Produto de higiene pessoal registrado na Anvisa. AFE nº: 3.00.000-5",
    therapeuticIndication: "Higiene pessoal para limpeza e conforto."
  },

  // Vitaminas e Suplementos
  {
    id: "16",
    name: "Vitamina C 1000mg",
    subtitle: "Imunidade e energia",
    price: 35.90,
    imageUrl: "/images/produtos/vitamina-c.jpg",
    category: "vitaminas",
    description: "Vitamina C 1000mg para imunidade e energia.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Ácido Ascórbico (Vitamina C)",
    anvisaRegistration: "Suplemento alimentar registrado na Anvisa. AFE nº: 4.00.000-1",
    therapeuticIndication: "Suplementação de vitamina C para fortalecimento do sistema imunológico."
  },
  {
    id: "17",
    name: "Vitamina D3",
    subtitle: "Saúde óssea",
    price: 42.80,
    imageUrl: "/images/produtos/vitamina-d.jpg",
    category: "vitaminas",
    description: "Vitamina D3 para saúde óssea e imunidade.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Colecalciferol (Vitamina D3)",
    anvisaRegistration: "Suplemento alimentar registrado na Anvisa. AFE nº: 4.00.000-2",
    therapeuticIndication: "Suplementação de vitamina D para saúde óssea e sistema imunológico."
  },
  {
    id: "18",
    name: "Ômega 3",
    subtitle: "Saúde cardiovascular",
    price: 58.90,
    imageUrl: "/images/produtos/omega-3.jpg",
    category: "vitaminas",
    description: "Ômega 3 para saúde cardiovascular.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Ácido Eicosapentaenoico (EPA), Ácido Docosahexaenoico (DHA)",
    anvisaRegistration: "Suplemento alimentar registrado na Anvisa. AFE nº: 4.00.000-3",
    therapeuticIndication: "Suplementação de ômega 3 para saúde cardiovascular e cerebral."
  },
  {
    id: "19",
    name: "Proteína Whey",
    subtitle: "Suplemento proteico",
    price: 89.90,
    originalPrice: 120.00,
    discount: 25,
    imageUrl: "/images/produtos/whey-protein.jpg",
    category: "vitaminas",
    description: "Proteína Whey para ganho de massa muscular.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Proteína do Soro do Leite",
    anvisaRegistration: "Suplemento alimentar registrado na Anvisa. AFE nº: 4.00.000-4",
    therapeuticIndication: "Suplementação proteica para ganho de massa muscular e recuperação."
  },
  {
    id: "20",
    name: "Multivitamínico",
    subtitle: "Complexo completo",
    price: 45.60,
    imageUrl: "/images/produtos/multivitaminico.jpg",
    category: "vitaminas",
    description: "Multivitamínico com complexo completo de vitaminas.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Complexo de Vitaminas A, B, C, D, E e Minerais",
    anvisaRegistration: "Suplemento alimentar registrado na Anvisa. AFE nº: 4.00.000-5",
    therapeuticIndication: "Suplementação completa de vitaminas e minerais para saúde geral."
  },

  // Produtos para Bebês
  {
    id: "21",
    name: "Fralda Pampers",
    subtitle: "Tamanho P",
    price: 45.90,
    imageUrl: "/images/produtos/fralda-bebe.jpg",
    category: "bebes",
    description: "Fralda Pampers tamanho P, 30 unidades.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto para bebês",
    anvisaRegistration: "Produto para bebês registrado na Anvisa. AFE nº: 5.00.000-1",
    therapeuticIndication: "Proteção e conforto para bebês, prevenção de assaduras."
  },
  {
    id: "22",
    name: "Leite em Pó",
    subtitle: "Fórmula infantil",
    price: 28.50,
    imageUrl: "/images/produtos/leite-po.jpg",
    category: "bebes",
    description: "Leite em pó fórmula infantil.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Proteínas do Leite, Vitaminas e Minerais",
    anvisaRegistration: "Fórmula infantil registrada na Anvisa. AFE nº: 5.00.000-2",
    therapeuticIndication: "Nutrição infantil para crescimento e desenvolvimento saudável."
  },
  {
    id: "23",
    name: "Shampoo Bebê",
    subtitle: "Hipoaergênico",
    price: 15.80,
    imageUrl: "/images/produtos/shampoo-bebe.jpg",
    category: "bebes",
    description: "Shampoo para bebês hipoalergênico.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Glicerina, Extrato de Camomila",
    anvisaRegistration: "Produto para bebês registrado na Anvisa. AFE nº: 5.00.000-3",
    therapeuticIndication: "Higiene capilar suave para bebês, prevenção de irritações."
  },
  {
    id: "24",
    name: "Creme para Assadura",
    subtitle: "Proteção 12h",
    price: 22.90,
    imageUrl: "/images/produtos/creme-assadura.jpg",
    category: "bebes",
    description: "Creme para assadura com proteção de 12 horas.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Óxido de Zinco, Vitamina E",
    anvisaRegistration: "Produto para bebês registrado na Anvisa. AFE nº: 5.00.000-4",
    therapeuticIndication: "Proteção e tratamento de assaduras em bebês."
  },
  {
    id: "25",
    name: "Mamadeira",
    subtitle: "150ml com bico",
    price: 18.50,
    imageUrl: "/images/produtos/mamadeira.jpg",
    category: "bebes",
    description: "Mamadeira 150ml com bico anatômico.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto para bebês",
    anvisaRegistration: "Produto para bebês registrado na Anvisa. AFE nº: 5.00.000-5",
    therapeuticIndication: "Alimentação infantil segura e confortável."
  },

  // Ortopedia
  {
    id: "26",
    name: "Joelheira Elástica",
    subtitle: "Suporte articular",
    price: 35.90,
    imageUrl: "/images/produtos/joelheira.jpg",
    category: "ortopedia",
    description: "Joelheira elástica para suporte articular.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto ortopédico",
    anvisaRegistration: "Produto ortopédico registrado na Anvisa. AFE nº: 6.00.000-1",
    therapeuticIndication: "Suporte articular para estabilização e prevenção de lesões no joelho."
  },
  {
    id: "27",
    name: "Bengala Ajustável",
    subtitle: "Suporte para caminhada",
    price: 42.80,
    imageUrl: "/images/produtos/bengala.jpg",
    category: "ortopedia",
    description: "Bengala ajustável para suporte na caminhada.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto ortopédico",
    anvisaRegistration: "Produto ortopédico registrado na Anvisa. AFE nº: 6.00.000-2",
    therapeuticIndication: "Suporte para locomoção e estabilidade durante a caminhada."
  },
  {
    id: "28",
    name: "Cinta Lombar",
    subtitle: "Suporte lombar",
    price: 58.90,
    imageUrl: "/images/produtos/cinta-lombar.jpg",
    category: "ortopedia",
    description: "Cinta lombar para suporte e alívio de dores.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto ortopédico",
    anvisaRegistration: "Produto ortopédico registrado na Anvisa. AFE nº: 6.00.000-3",
    therapeuticIndication: "Suporte lombar para alívio de dores e estabilização da coluna."
  },
  {
    id: "29",
    name: "Tornozeleira",
    subtitle: "Estabilização articular",
    price: 28.50,
    imageUrl: "/images/produtos/tornozeleira.jpg",
    category: "ortopedia",
    description: "Tornozeleira para estabilização articular.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto ortopédico",
    anvisaRegistration: "Produto ortopédico registrado na Anvisa. AFE nº: 6.00.000-4",
    therapeuticIndication: "Estabilização articular do tornozelo para prevenção de lesões."
  },
  {
    id: "30",
    name: "Colar Cervical",
    subtitle: "Suporte cervical",
    price: 45.60,
    imageUrl: "/images/produtos/colar-cervical.jpg",
    category: "ortopedia",
    description: "Colar cervical para suporte e alívio de dores.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto ortopédico",
    anvisaRegistration: "Produto ortopédico registrado na Anvisa. AFE nº: 6.00.000-5",
    therapeuticIndication: "Suporte cervical para estabilização e alívio de dores no pescoço."
  },

  // Produtos para Diabéticos
  {
    id: "31",
    name: "Glicosímetro",
    subtitle: "Medidor de glicose",
    price: 89.90,
    imageUrl: "/images/produtos/glicosimetro.jpg",
    category: "diabeticos",
    description: "Glicosímetro para medição de glicose no sangue.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Equipamento médico",
    anvisaRegistration: "Equipamento médico registrado na Anvisa. AFE nº: 7.00.000-1",
    therapeuticIndication: "Monitoramento de glicose sanguínea para controle do diabetes."
  },
  {
    id: "32",
    name: "Tiras de Glicose",
    subtitle: "50 tiras",
    price: 45.80,
    imageUrl: "/images/produtos/tiras-glicose.jpg",
    category: "diabeticos",
    description: "Tiras de glicose, 50 unidades.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Enzima Glicose Oxidase",
    anvisaRegistration: "Equipamento médico registrado na Anvisa. AFE nº: 7.00.000-2",
    therapeuticIndication: "Tiras para medição de glicose sanguínea em glicosímetros."
  },
  {
    id: "33",
    name: "Lancetas",
    subtitle: "100 unidades",
    price: 18.90,
    imageUrl: "/images/produtos/lancetas.jpg",
    category: "diabeticos",
    description: "Lancetas para glicosímetro, 100 unidades.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Equipamento médico",
    anvisaRegistration: "Equipamento médico registrado na Anvisa. AFE nº: 7.00.000-3",
    therapeuticIndication: "Lancetas para coleta de sangue em glicosímetros."
  },
  {
    id: "34",
    name: "Adoçante Stevia",
    subtitle: "Natural sem calorias",
    price: 12.50,
    imageUrl: "/images/produtos/adocante.jpg",
    category: "diabeticos",
    description: "Adoçante Stevia natural sem calorias.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Glicosídeos de Esteviol",
    anvisaRegistration: "Aditivo alimentar registrado na Anvisa. AFE nº: 7.00.000-4",
    therapeuticIndication: "Adoçante natural para substituição do açúcar em dietas especiais."
  },
  {
    id: "35",
    name: "Chocolate Diet",
    subtitle: "Sem açúcar",
    price: 8.90,
    imageUrl: "/images/produtos/chocolate-diet.jpg",
    category: "diabeticos",
    description: "Chocolate diet sem açúcar.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Cacau, Maltitol",
    anvisaRegistration: "Alimento dietético registrado na Anvisa. AFE nº: 7.00.000-5",
    therapeuticIndication: "Chocolate dietético para consumo em dietas especiais."
  },

  // Primeiros Socorros
  {
    id: "36",
    name: "Band-aid",
    subtitle: "Curativos adesivos",
    price: 6.80,
    imageUrl: "/images/produtos/band-aid.jpg",
    category: "primeiros-socorros",
    description: "Band-aid curativos adesivos, 20 unidades.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto médico",
    anvisaRegistration: "Produto médico registrado na Anvisa. AFE nº: 8.00.000-1",
    therapeuticIndication: "Proteção e cobertura de pequenos ferimentos e cortes."
  },
  {
    id: "37",
    name: "Álcool 70%",
    subtitle: "Antisséptico",
    price: 8.50,
    imageUrl: "/images/produtos/alcool.jpg",
    category: "primeiros-socorros",
    description: "Álcool 70% antisséptico, 500ml.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Etanol 70%",
    anvisaRegistration: "Produto médico registrado na Anvisa. AFE nº: 8.00.000-2",
    therapeuticIndication: "Antisséptico para desinfecção de pele e superfícies."
  },
  {
    id: "38",
    name: "Soro Fisiológico",
    subtitle: "500ml",
    price: 4.90,
    imageUrl: "/images/produtos/soro-fisiologico.jpg",
    category: "primeiros-socorros",
    description: "Soro fisiológico 500ml.",
    inStock: true,
    isMedication: false,
    activeSubstance: "Cloreto de Sódio 0,9%",
    anvisaRegistration: "Produto médico registrado na Anvisa. AFE nº: 8.00.000-3",
    therapeuticIndication: "Solução salina para limpeza de ferimentos e hidratação."
  },
  {
    id: "39",
    name: "Gaze Estéril",
    subtitle: "10x10cm",
    price: 12.80,
    imageUrl: "/images/produtos/gaze.jpg",
    category: "primeiros-socorros",
    description: "Gaze estéril 10x10cm, 10 unidades.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto médico",
    anvisaRegistration: "Produto médico registrado na Anvisa. AFE nº: 8.00.000-4",
    therapeuticIndication: "Curativo estéril para cobertura e proteção de ferimentos."
  },
  {
    id: "40",
    name: "Atadura Elástica",
    subtitle: "Suporte e compressão",
    price: 15.60,
    imageUrl: "/images/produtos/atadura.jpg",
    category: "primeiros-socorros",
    description: "Atadura elástica para suporte e compressão.",
    inStock: true,
    isMedication: false,
    activeSubstance: "N/A - Produto médico",
    anvisaRegistration: "Produto médico registrado na Anvisa. AFE nº: 8.00.000-5",
    therapeuticIndication: "Suporte e compressão para estabilização de articulações e ferimentos."
  }
  ]
  