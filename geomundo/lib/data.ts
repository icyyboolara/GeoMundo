// ---------- Tipos ----------

export type IconKey =
  | "compass"
  | "globe"
  | "mountain"
  | "cloud-rain"
  | "trees"
  | "users"
  | "building"
  | "wheat"
  | "network"
  | "recycle"
  | "brazil"
  | "map"
  | "waves"
  | "droplets"

export type Question =
  | {
      id: string
      type: "multiple"
      prompt: string
      scenario?: string
      options: string[]
      correct: number
      explanation: string
      xp: number
    }
  | {
      id: string
      type: "truefalse"
      prompt: string
      correct: boolean
      explanation: string
      xp: number
    }
  | {
      id: string
      type: "association"
      prompt: string
      pairs: { left: string; right: string }[]
      explanation: string
      xp: number
    }
  | {
      id: string
      type: "order"
      prompt: string
      // já na ordem correta
      items: string[]
      explanation: string
      xp: number
    }

export type ContentStep = {
  descubra: string
  observe: string
  entenda: string
  voceSabia: string
  naVidaReal: string
}

export type Content = {
  slug: string
  territoryId: string
  years: number[]
  title: string
  icon: IconKey
  short: string
  steps: ContentStep
  quiz: Question[]
}

export type Territory = {
  id: string
  name: string
  icon: IconKey
  description: string
  color: "green" | "blue" | "sky" | "yellow"
}

export type SchoolYear = {
  year: number
  emoji: string
  title: string
  subtitle: string
  topics: string[]
  color: "green" | "blue" | "sky" | "yellow"
}

// ---------- Anos escolares ----------

export const years: SchoolYear[] = [
  {
    year: 6,
    emoji: "🌱",
    title: "Descobrindo o planeta",
    subtitle: "As bases da Geografia: como observar e representar o espaço.",
    topics: [
      "espaço geográfico",
      "paisagem",
      "cartografia",
      "orientação",
      "relevo",
      "clima",
      "hidrografia",
      "vegetação",
    ],
    color: "green",
  },
  {
    year: 7,
    emoji: "🌎",
    title: "Explorando o Brasil",
    subtitle: "O território brasileiro, sua gente, natureza e economia.",
    topics: [
      "território brasileiro",
      "regiões",
      "população",
      "urbanização",
      "economia",
      "indústria",
      "agricultura",
      "biomas",
    ],
    color: "blue",
  },
  {
    year: 8,
    emoji: "🌐",
    title: "Conectando o mundo",
    subtitle: "Continentes, população mundial e as conexões globais.",
    topics: [
      "população mundial",
      "migrações",
      "industrialização",
      "globalização",
      "economia",
      "continentes",
      "geopolítica",
    ],
    color: "sky",
  },
  {
    year: 9,
    emoji: "🚀",
    title: "Entendendo o mundo atual",
    subtitle: "Geopolítica, economia global e os grandes desafios do planeta.",
    topics: [
      "globalização",
      "geopolítica",
      "economia mundial",
      "organizações internacionais",
      "conflitos",
      "meio ambiente",
      "desenvolvimento sustentável",
    ],
    color: "yellow",
  },
]

// ---------- Territórios de conhecimento ----------

export const territories: Territory[] = [
  {
    id: "cartografia",
    name: "Cartografia",
    icon: "compass",
    description: "Mapas, coordenadas, escala e orientação.",
    color: "blue",
  },
  {
    id: "terra-relevo",
    name: "Terra e Relevo",
    icon: "mountain",
    description: "Estrutura da Terra, placas tectônicas, vulcões e relevo.",
    color: "green",
  },
  {
    id: "clima-hidrografia",
    name: "Clima e Hidrografia",
    icon: "cloud-rain",
    description: "Clima, tempo, rios, oceanos e o ciclo da água.",
    color: "sky",
  },
  {
    id: "biomas",
    name: "Biomas",
    icon: "trees",
    description: "Biomas, vegetação e ecossistemas.",
    color: "green",
  },
  {
    id: "populacao",
    name: "População",
    icon: "users",
    description: "População, migração e distribuição demográfica.",
    color: "blue",
  },
  {
    id: "urbanizacao",
    name: "Urbanização",
    icon: "building",
    description: "Cidades, urbanização e problemas urbanos.",
    color: "sky",
  },
  {
    id: "economia",
    name: "Economia",
    icon: "wheat",
    description: "Agricultura, pecuária, indústria e energia.",
    color: "yellow",
  },
  {
    id: "globalizacao",
    name: "Globalização",
    icon: "network",
    description: "Globalização, comércio e relações internacionais.",
    color: "blue",
  },
  {
    id: "brasil",
    name: "Geografia do Brasil",
    icon: "brazil",
    description: "Território, regiões, população, natureza e economia.",
    color: "green",
  },
  {
    id: "meio-ambiente",
    name: "Meio Ambiente",
    icon: "recycle",
    description: "Sustentabilidade, impactos ambientais e mudanças climáticas.",
    color: "green",
  },
]

// ---------- Conteúdos ----------

export const contents: Content[] = [
  {
    slug: "coordenadas-geograficas",
    territoryId: "cartografia",
    years: [6],
    title: "Coordenadas Geográficas",
    icon: "compass",
    short: "Latitude e longitude: o endereço de qualquer ponto da Terra.",
    steps: {
      descubra:
        "Toda posição na Terra pode ser localizada com dois números: a latitude e a longitude. Juntos, eles formam as coordenadas geográficas, uma espécie de endereço do planeta.",
      observe:
        "Imagine a Terra coberta por uma grade: as linhas horizontais são os paralelos (medem a latitude a partir da Linha do Equador) e as verticais são os meridianos (medem a longitude a partir do Meridiano de Greenwich).",
      entenda:
        "A latitude varia de 0° (Equador) até 90° para o Norte ou para o Sul. A longitude varia de 0° (Greenwich) até 180° para Leste ou Oeste. Com esses dois valores é possível localizar exatamente qualquer lugar do mundo.",
      voceSabia:
        "O GPS do celular usa coordenadas geográficas o tempo todo! Ele calcula sua latitude e longitude conversando com satélites que giram ao redor da Terra.",
      naVidaReal:
        "Quando um aplicativo de mapas mostra onde você está, ele traduz coordenadas em um ponto na tela. Pilotos, navios e serviços de resgate dependem delas para não se perder.",
    },
    quiz: [
      {
        id: "coord-1",
        type: "multiple",
        prompt: "Qual linha imaginária divide a Terra em Hemisfério Norte e Hemisfério Sul?",
        options: ["Meridiano de Greenwich", "Linha do Equador", "Trópico de Câncer", "Círculo Polar Ártico"],
        correct: 1,
        explanation: "A Linha do Equador está na latitude 0° e separa os hemisférios Norte e Sul.",
        xp: 15,
      },
      {
        id: "coord-2",
        type: "truefalse",
        prompt: "A longitude é medida a partir do Meridiano de Greenwich.",
        correct: true,
        explanation: "Isso mesmo! Greenwich é o meridiano de referência (0°) para medir a longitude.",
        xp: 10,
      },
      {
        id: "coord-3",
        type: "association",
        prompt: "Associe cada conceito à sua definição.",
        pairs: [
          { left: "Latitude", right: "Distância em relação ao Equador" },
          { left: "Longitude", right: "Distância em relação a Greenwich" },
          { left: "Paralelos", right: "Linhas horizontais" },
          { left: "Meridianos", right: "Linhas verticais" },
        ],
        explanation: "Latitude usa paralelos; longitude usa meridianos. Assim localizamos qualquer ponto.",
        xp: 20,
      },
    ],
  },
  {
    slug: "escala-e-mapas",
    territoryId: "cartografia",
    years: [6],
    title: "Escala e Tipos de Mapas",
    icon: "map",
    short: "Como o mundo gigante cabe em uma folha de papel.",
    steps: {
      descubra:
        "A escala mostra quantas vezes a realidade foi reduzida para caber em um mapa. Sem ela, não saberíamos se um centímetro no papel vale 1 metro ou 100 quilômetros.",
      observe:
        "Uma escala de 1:100.000 significa que 1 cm no mapa equivale a 100.000 cm (ou 1 km) no mundo real. Mapas de cidades usam escalas grandes; mapas de países, escalas pequenas.",
      entenda:
        "Existem vários tipos de mapas: políticos (fronteiras e cidades), físicos (relevo e rios), climáticos, econômicos e temáticos. Cada um destaca uma informação diferente do mesmo território.",
      voceSabia:
        "Nenhum mapa plano é 100% fiel ao globo. As projeções cartográficas sempre deformam um pouco os tamanhos ou as formas dos continentes.",
      naVidaReal:
        "Ao planejar uma viagem, você escolhe o mapa certo: um de ruas para andar na cidade e um rodoviário para dirigir entre cidades.",
    },
    quiz: [
      {
        id: "escala-1",
        type: "multiple",
        prompt: "Em um mapa de escala 1:100.000, quanto vale 1 cm do mapa na realidade?",
        options: ["100 metros", "1 quilômetro", "10 quilômetros", "100 quilômetros"],
        correct: 1,
        explanation: "1 cm × 100.000 = 100.000 cm = 1.000 m = 1 km.",
        xp: 15,
      },
      {
        id: "escala-2",
        type: "multiple",
        prompt: "Você quer estudar o relevo e os rios de uma região. Qual mapa é o mais indicado?",
        scenario: "Um pesquisador precisa entender montanhas, vales e a rede de rios de um estado.",
        options: ["Mapa político", "Mapa físico", "Mapa econômico", "Mapa de fusos horários"],
        correct: 1,
        explanation: "O mapa físico destaca relevo, altitudes e hidrografia.",
        xp: 15,
      },
      {
        id: "escala-3",
        type: "truefalse",
        prompt: "Todo mapa plano representa os continentes com tamanho perfeitamente exato.",
        correct: false,
        explanation: "Nenhuma projeção é perfeita: representar uma esfera em um plano sempre gera distorções.",
        xp: 10,
      },
    ],
  },
  {
    slug: "placas-tectonicas",
    territoryId: "terra-relevo",
    years: [6],
    title: "Placas Tectônicas",
    icon: "mountain",
    short: "As gigantescas placas que formam a superfície da Terra.",
    steps: {
      descubra:
        "A camada externa da Terra é dividida em grandes blocos chamados placas tectônicas. Elas flutuam sobre o material quente do manto e se movem alguns centímetros por ano.",
      observe:
        "Imagine a superfície do planeta como um quebra-cabeça em movimento lento. As peças (placas) se afastam, se aproximam ou deslizam umas contra as outras.",
      entenda:
        "Quando duas placas se chocam, podem formar montanhas ou provocar terremotos. Quando se afastam, o magma sobe e cria novo relevo. É por isso que vulcões e terremotos se concentram nas bordas das placas.",
      voceSabia:
        "A Cordilheira dos Andes e o Himalaia se formaram pela colisão de placas — e continuam crescendo alguns milímetros a cada ano!",
      naVidaReal:
        "Países como o Japão e o Chile ficam sobre bordas de placas e por isso convivem com terremotos frequentes, investindo em construções antissísmicas.",
    },
    quiz: [
      {
        id: "placas-1",
        type: "multiple",
        prompt: "Por que terremotos e vulcões acontecem com mais frequência em certas regiões?",
        options: [
          "Porque ficam sempre no centro das placas",
          "Porque ficam nas bordas das placas tectônicas",
          "Porque têm muitos rios",
          "Porque têm clima quente",
        ],
        correct: 1,
        explanation: "As bordas das placas concentram os choques e movimentos que geram terremotos e vulcões.",
        xp: 15,
      },
      {
        id: "placas-2",
        type: "order",
        prompt: "Coloque em ordem o que acontece quando duas placas continentais colidem.",
        items: [
          "As placas se movem lentamente uma em direção à outra",
          "As bordas se chocam e a pressão aumenta",
          "As camadas de rocha se dobram e se elevam",
          "Formam-se cadeias de montanhas",
        ],
        explanation: "A colisão lenta dobra as rochas e ergue montanhas, como aconteceu no Himalaia.",
        xp: 20,
      },
      {
        id: "placas-3",
        type: "truefalse",
        prompt: "As placas tectônicas estão completamente paradas.",
        correct: false,
        explanation: "Elas se movem alguns centímetros por ano sobre o manto terrestre.",
        xp: 10,
      },
    ],
  },
  {
    slug: "fatores-climaticos",
    territoryId: "clima-hidrografia",
    years: [6, 7],
    title: "Fatores do Clima",
    icon: "cloud-rain",
    short: "O que faz uma região ser quente, fria, seca ou úmida.",
    steps: {
      descubra:
        "Tempo é a condição da atmosfera agora; clima é o padrão que se repete ao longo dos anos. Vários fatores explicam por que cada lugar tem seu clima característico.",
      observe:
        "Observe um mapa: quanto mais perto do Equador, mais quente; quanto mais alto (altitude), mais frio; regiões perto do mar costumam ter temperaturas mais amenas.",
      entenda:
        "Os principais fatores climáticos são: latitude, altitude, proximidade do oceano (maritimidade), vegetação e correntes marítimas. Eles agem juntos para definir temperatura e umidade.",
      voceSabia:
        "Duas cidades na mesma latitude podem ter climas diferentes: uma no litoral e outra no alto de uma montanha sentirão temperaturas bem distintas.",
      naVidaReal:
        "É por isso que uma cidade litorânea pode ser abafada e úmida, enquanto uma cidade serrana próxima é fresca — mesmo estando perto uma da outra.",
    },
    quiz: [
      {
        id: "clima-1",
        type: "multiple",
        prompt: "O que costuma acontecer com a temperatura conforme aumenta a altitude?",
        options: ["Aumenta", "Diminui", "Fica sempre igual", "Depende só da chuva"],
        correct: 1,
        explanation: "Quanto maior a altitude, mais fria tende a ser a temperatura.",
        xp: 15,
      },
      {
        id: "clima-2",
        type: "multiple",
        prompt: "Qual fator melhor explica por que o litoral costuma ter temperaturas mais amenas?",
        scenario: "Uma cidade fica bem à beira-mar e raramente registra calor extremo ou frio intenso.",
        options: ["A latitude", "A proximidade do oceano (maritimidade)", "A vegetação rasteira", "A ausência de rios"],
        correct: 1,
        explanation: "O oceano regula a temperatura, deixando o clima do litoral mais equilibrado.",
        xp: 15,
      },
      {
        id: "clima-3",
        type: "truefalse",
        prompt: "Tempo e clima são a mesma coisa.",
        correct: false,
        explanation: "Tempo é a condição momentânea; clima é o padrão observado por muitos anos.",
        xp: 10,
      },
    ],
  },
  {
    slug: "ciclo-da-agua",
    territoryId: "clima-hidrografia",
    years: [6],
    title: "Ciclo da Água e Bacias",
    icon: "droplets",
    short: "A água em movimento contínuo entre céu, terra e mar.",
    steps: {
      descubra:
        "A água do planeta nunca para: ela evapora, forma nuvens, cai como chuva, corre pelos rios e volta ao mar. Esse movimento é o ciclo da água (ou ciclo hidrológico).",
      observe:
        "Uma bacia hidrográfica é toda a área onde as águas da chuva escorrem para um mesmo rio principal e seus afluentes, como galhos de uma árvore que se unem.",
      entenda:
        "O ciclo tem etapas: evaporação, condensação, precipitação e escoamento. As bacias hidrográficas organizam para onde a água vai — e por isso são usadas para gerenciar o uso da água.",
      voceSabia:
        "A Bacia Amazônica é a maior bacia hidrográfica do mundo e despeja no oceano cerca de um quinto de toda a água doce dos rios do planeta.",
      naVidaReal:
        "Quando desmatamos ou poluímos uma parte da bacia, afetamos cidades inteiras rio abaixo, que dependem daquela mesma água.",
    },
    quiz: [
      {
        id: "agua-1",
        type: "order",
        prompt: "Ordene as etapas do ciclo da água.",
        items: ["Evaporação", "Condensação (formação das nuvens)", "Precipitação (chuva)", "Escoamento para os rios"],
        explanation: "A água evapora, condensa em nuvens, cai como chuva e escoa de volta para rios e mares.",
        xp: 20,
      },
      {
        id: "agua-2",
        type: "multiple",
        prompt: "O que é uma bacia hidrográfica?",
        options: [
          "Um único rio isolado",
          "A área que drena suas águas para um mesmo rio principal",
          "Um tipo de nuvem",
          "Um reservatório artificial",
        ],
        correct: 1,
        explanation: "É o conjunto de terras cujas águas se dirigem a um mesmo rio principal e afluentes.",
        xp: 15,
      },
      {
        id: "agua-3",
        type: "truefalse",
        prompt: "Poluir a nascente de um rio pode afetar cidades localizadas rio abaixo.",
        correct: true,
        explanation: "Sim! A água percorre toda a bacia, então a poluição desce junto com ela.",
        xp: 10,
      },
    ],
  },
  {
    slug: "biomas-brasileiros",
    territoryId: "biomas",
    years: [7],
    title: "Biomas Brasileiros",
    icon: "trees",
    short: "Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa.",
    steps: {
      descubra:
        "Um bioma é um grande conjunto de vida (vegetação e animais) adaptado a um mesmo tipo de clima e solo. O Brasil possui seis grandes biomas.",
      observe:
        "Amazônia (floresta úmida e densa), Cerrado (savana com árvores retorcidas), Caatinga (seca e espinhosa), Mata Atlântica (litorânea), Pantanal (áreas alagadas) e Pampa (campos do Sul).",
      entenda:
        "Cada bioma reflete seu clima: a Caatinga tem plantas que guardam água por causa da seca; a Amazônia é exuberante por causa do calor e da chuva constante. Clima e vegetação estão sempre ligados.",
      voceSabia:
        "O Cerrado é chamado de 'berço das águas' porque nele nascem rios que abastecem grande parte do Brasil.",
      naVidaReal:
        "O avanço das cidades e da agricultura reduz esses biomas. Proteger a Mata Atlântica, por exemplo, protege a água que abastece milhões de pessoas.",
    },
    quiz: [
      {
        id: "bioma-1",
        type: "association",
        prompt: "Associe cada bioma à sua característica marcante.",
        pairs: [
          { left: "Amazônia", right: "Floresta úmida e densa" },
          { left: "Caatinga", right: "Vegetação seca e espinhosa" },
          { left: "Pantanal", right: "Grandes áreas alagadas" },
          { left: "Pampa", right: "Campos do Sul do país" },
        ],
        explanation: "Cada bioma tem clima e vegetação próprios, resultado das condições naturais da região.",
        xp: 20,
      },
      {
        id: "bioma-2",
        type: "multiple",
        prompt: "Por que as plantas da Caatinga costumam guardar água e ter espinhos?",
        options: [
          "Porque o clima é muito frio",
          "Por causa da adaptação à seca",
          "Porque vivem embaixo d'água",
          "Porque recebem chuva o ano todo",
        ],
        correct: 1,
        explanation: "São adaptações ao clima semiárido, com longos períodos de seca.",
        xp: 15,
      },
      {
        id: "bioma-3",
        type: "truefalse",
        prompt: "Clima e vegetação de um bioma estão diretamente relacionados.",
        correct: true,
        explanation: "Exato! O tipo de vegetação é uma resposta ao clima e ao solo da região.",
        xp: 10,
      },
    ],
  },
  {
    slug: "urbanizacao-e-cidades",
    territoryId: "urbanizacao",
    years: [7, 8],
    title: "Urbanização e Problemas Urbanos",
    icon: "building",
    short: "O crescimento das cidades e seus desafios.",
    steps: {
      descubra:
        "Urbanização é o processo de crescimento das cidades e o aumento da população que vive nelas. No Brasil, esse processo foi muito rápido a partir do século XX.",
      observe:
        "Quando as cidades crescem sem planejamento, surgem ocupações em áreas de risco, trânsito intenso, poluição e falta de saneamento em algumas regiões.",
      entenda:
        "O êxodo rural (saída do campo para a cidade) acelerou a urbanização. Sem planejamento urbano, aumentam a desigualdade, os problemas ambientais e a vulnerabilidade a desastres.",
      voceSabia:
        "Mais de 80% da população brasileira vive em áreas urbanas — somos um dos países mais urbanizados da América Latina.",
      naVidaReal:
        "Bairros construídos em encostas sem drenagem sofrem com deslizamentos nas chuvas fortes. O planejamento urbano ajuda a evitar tragédias.",
    },
    quiz: [
      {
        id: "urb-1",
        type: "multiple",
        prompt:
          "Uma cidade cresce rapidamente em uma encosta e recebe grandes volumes de chuva. Sem planejamento urbano, qual problema é mais provável?",
        scenario: "Casas são construídas em uma ladeira íngreme, sem sistema de drenagem, e chove muito no verão.",
        options: [
          "Aumento do turismo",
          "Deslizamentos de terra e enchentes",
          "Redução da população",
          "Melhoria automática do transporte",
        ],
        correct: 1,
        explanation: "Encostas ocupadas sem drenagem e planejamento ficam vulneráveis a deslizamentos e enchentes.",
        xp: 20,
      },
      {
        id: "urb-2",
        type: "multiple",
        prompt: "O que é o êxodo rural?",
        options: [
          "A ida de moradores da cidade para o campo",
          "A saída de pessoas do campo para as cidades",
          "O crescimento da agricultura",
          "A criação de novas fronteiras",
        ],
        correct: 1,
        explanation: "Êxodo rural é a migração do campo para a cidade, que impulsionou a urbanização.",
        xp: 15,
      },
      {
        id: "urb-3",
        type: "truefalse",
        prompt: "O planejamento urbano pode reduzir os riscos de desastres nas cidades.",
        correct: true,
        explanation: "Sim! Planejar drenagem, moradia e ocupação do solo diminui a vulnerabilidade.",
        xp: 10,
      },
    ],
  },
  {
    slug: "populacao-distribuicao",
    territoryId: "populacao",
    years: [7, 8],
    title: "População e Distribuição",
    icon: "users",
    short: "Onde as pessoas vivem e por que se concentram em certos lugares.",
    steps: {
      descubra:
        "A população não se espalha de forma igual pelo planeta. Alguns lugares são cheios de gente (densamente povoados) e outros quase vazios.",
      observe:
        "A densidade demográfica mede quantas pessoas vivem em cada quilômetro quadrado. Litorais, planícies e regiões com água costumam concentrar mais gente.",
      entenda:
        "Clima muito extremo, relevo muito acidentado ou falta de água afastam a população. Já boas condições naturais e oportunidades de emprego atraem pessoas.",
      voceSabia:
        "Desertos, florestas fechadas e regiões polares estão entre as áreas menos povoadas do mundo.",
      naVidaReal:
        "No Brasil, a maior parte da população vive perto do litoral, herança da forma como o país foi ocupado historicamente.",
    },
    quiz: [
      {
        id: "pop-1",
        type: "multiple",
        prompt: "O que a densidade demográfica indica?",
        options: [
          "O número total de habitantes de um país",
          "Quantos habitantes há por quilômetro quadrado",
          "A quantidade de cidades",
          "O tamanho do território",
        ],
        correct: 1,
        explanation: "Densidade demográfica = habitantes ÷ área, em hab/km².",
        xp: 15,
      },
      {
        id: "pop-2",
        type: "multiple",
        prompt: "Qual região tende a ter baixa densidade populacional?",
        scenario: "Analise onde é mais difícil viver por causa das condições naturais.",
        options: ["Litoral de clima ameno", "Planície com rios", "Deserto muito seco", "Região com muitos empregos"],
        correct: 2,
        explanation: "Desertos oferecem condições difíceis (falta de água), o que afasta a população.",
        xp: 15,
      },
      {
        id: "pop-3",
        type: "truefalse",
        prompt: "A população se distribui igualmente por todo o planeta.",
        correct: false,
        explanation: "Não: fatores naturais e econômicos concentram pessoas em certas áreas.",
        xp: 10,
      },
    ],
  },
  {
    slug: "globalizacao",
    territoryId: "globalizacao",
    years: [8, 9],
    title: "Globalização e Comércio",
    icon: "network",
    short: "O mundo cada vez mais conectado por comércio, tecnologia e cultura.",
    steps: {
      descubra:
        "Globalização é a integração cada vez maior entre os países. Produtos, informações, dinheiro e ideias circulam rapidamente pelo mundo todo.",
      observe:
        "Um celular pode ter peças de vários países, ser montado em outro e vendido no mundo inteiro. Isso só é possível graças às redes globais de transporte e comunicação.",
      entenda:
        "A globalização é impulsionada pela tecnologia, pelos transportes e pelas empresas multinacionais. Ela aproxima mercados, mas também aumenta a competição e as desigualdades entre países.",
      voceSabia:
        "Blocos econômicos como o Mercosul e a União Europeia facilitam o comércio entre países-membros, reduzindo taxas e barreiras.",
      naVidaReal:
        "Quando você usa um produto fabricado do outro lado do mundo, está participando das cadeias globais criadas pela globalização.",
    },
    quiz: [
      {
        id: "glob-1",
        type: "multiple",
        prompt: "Um produto que você comprou foi fabricado em outro país. Isso é um exemplo de:",
        scenario: "Um tênis foi projetado nos EUA, produzido na Ásia e vendido no Brasil.",
        options: ["Êxodo rural", "Globalização", "Urbanização", "Desmatamento"],
        correct: 1,
        explanation: "A circulação global de produtos entre países é uma marca da globalização.",
        xp: 15,
      },
      {
        id: "glob-2",
        type: "multiple",
        prompt: "O que é um bloco econômico?",
        options: [
          "Um grupo de países que se unem para facilitar o comércio",
          "Uma cidade muito grande",
          "Um tipo de indústria",
          "Uma corrente marítima",
        ],
        correct: 0,
        explanation: "Blocos como Mercosul e União Europeia integram economias e reduzem barreiras comerciais.",
        xp: 15,
      },
      {
        id: "glob-3",
        type: "truefalse",
        prompt: "A globalização diminui as diferenças, tornando todos os países igualmente ricos.",
        correct: false,
        explanation: "Ela conecta o mundo, mas pode até aumentar desigualdades entre países e regiões.",
        xp: 10,
      },
    ],
  },
  {
    slug: "mudancas-climaticas",
    territoryId: "meio-ambiente",
    years: [8, 9],
    title: "Meio Ambiente e Mudanças Climáticas",
    icon: "recycle",
    short: "Impactos humanos no planeta e o caminho da sustentabilidade.",
    steps: {
      descubra:
        "As ações humanas — como queimar combustíveis e desmatar — liberam gases que aumentam a temperatura média da Terra. Isso é o aquecimento global.",
      observe:
        "Efeitos já visíveis: derretimento de geleiras, elevação do nível do mar, secas mais longas e chuvas mais intensas em algumas regiões.",
      entenda:
        "O desenvolvimento sustentável busca atender às necessidades de hoje sem comprometer o futuro. Envolve energia limpa, redução do desmatamento e consumo consciente.",
      voceSabia:
        "As florestas ajudam a regular o clima ao absorver gás carbônico — por isso o desmatamento agrava o aquecimento global.",
      naVidaReal:
        "Escolhas do dia a dia, como economizar energia, reduzir lixo e usar transporte coletivo, somadas às de milhões de pessoas, fazem diferença no clima.",
    },
    quiz: [
      {
        id: "amb-1",
        type: "multiple",
        prompt: "Por que o desmatamento agrava o aquecimento global?",
        options: [
          "Porque as árvores esfriam o solo",
          "Porque as florestas absorvem gás carbônico e, sem elas, ele se acumula",
          "Porque cria mais rios",
          "Porque aumenta a altitude",
        ],
        correct: 1,
        explanation: "As florestas capturam CO₂; ao removê-las, mais gases de efeito estufa ficam na atmosfera.",
        xp: 15,
      },
      {
        id: "amb-2",
        type: "multiple",
        prompt: "O que caracteriza o desenvolvimento sustentável?",
        options: [
          "Usar todos os recursos o mais rápido possível",
          "Atender às necessidades atuais sem comprometer as futuras gerações",
          "Proibir toda atividade econômica",
          "Concentrar a indústria em um só lugar",
        ],
        correct: 1,
        explanation: "Sustentabilidade equilibra economia, sociedade e meio ambiente pensando no futuro.",
        xp: 15,
      },
      {
        id: "amb-3",
        type: "order",
        prompt: "Ordene a cadeia de causas e efeitos do aquecimento global.",
        items: [
          "Queima de combustíveis e desmatamento",
          "Aumento dos gases de efeito estufa",
          "Elevação da temperatura média",
          "Derretimento de geleiras e eventos climáticos extremos",
        ],
        explanation: "As ações humanas liberam gases que aquecem o planeta e provocam impactos em cadeia.",
        xp: 20,
      },
    ],
  },
]

// ---------- Desafio rápido (Home) ----------

export const quickChallenges: Question[] = [
  {
    id: "quick-1",
    type: "multiple",
    prompt: "Qual fator pode influenciar diretamente a temperatura de uma região?",
    options: ["A cor das casas", "A altitude", "O número de escolas", "A idade das pessoas"],
    correct: 1,
    explanation: "Quanto maior a altitude, mais fria costuma ser a temperatura.",
    xp: 10,
  },
  {
    id: "quick-2",
    type: "truefalse",
    prompt: "A Linha do Equador divide a Terra em Hemisfério Leste e Oeste.",
    correct: false,
    explanation: "O Equador divide em Norte e Sul. Quem divide Leste e Oeste é o Meridiano de Greenwich.",
    xp: 10,
  },
  {
    id: "quick-3",
    type: "multiple",
    prompt: "Uma cidade cresceu muito sem planejamento. Qual problema pode surgir?",
    options: ["Menos poluição", "Trânsito e ocupação de áreas de risco", "Mais áreas verdes", "Menos habitantes"],
    correct: 1,
    explanation: "O crescimento desordenado gera trânsito, poluição e ocupação de áreas perigosas.",
    xp: 10,
  },
  {
    id: "quick-4",
    type: "multiple",
    prompt: "O que a escala de um mapa indica?",
    options: [
      "A cor dos continentes",
      "Quantas vezes a realidade foi reduzida",
      "O número de países",
      "A temperatura do local",
    ],
    correct: 1,
    explanation: "A escala mostra a relação entre a distância no mapa e a distância real.",
    xp: 10,
  },
  {
    id: "quick-5",
    type: "truefalse",
    prompt: "O Cerrado é conhecido como 'berço das águas' do Brasil.",
    correct: true,
    explanation: "Muitos rios importantes nascem no Cerrado, abastecendo grande parte do país.",
    xp: 10,
  },
]

// ---------- "Você está aqui" ----------

export const youAreHere = [
  {
    emoji: "🌧️",
    title: "Choveu muito hoje.",
    question: "Por que algumas regiões sofrem mais com enchentes?",
    answer:
      "Cidades com pouco planejamento, solo impermeável (asfalto e concreto) e ocupação de áreas baixas ou de encostas têm mais dificuldade para escoar a água da chuva.",
  },
  {
    emoji: "🥵",
    title: "Está muito quente.",
    question: "Quais fatores podem influenciar a temperatura?",
    answer:
      "Latitude, altitude, proximidade do oceano, correntes marítimas e a vegetação agem juntos para definir se um lugar é mais quente ou mais frio.",
  },
  {
    emoji: "🚛",
    title: "Um produto veio de outro país.",
    question: "Como isso está relacionado à globalização?",
    answer:
      "A globalização conecta os mercados: produtos são fabricados em um país e vendidos em outros, circulando por redes globais de transporte e comércio.",
  },
  {
    emoji: "🏙️",
    title: "A cidade cresceu.",
    question: "Quais problemas podem surgir com o crescimento urbano?",
    answer:
      "Sem planejamento, o crescimento traz trânsito, poluição, falta de saneamento e ocupação de áreas de risco, aumentando a vulnerabilidade da população.",
  },
]

// ---------- Central de Mapas ----------

export const mapCategories = [
  { id: "politicos", emoji: "🗺️", name: "Mapas políticos", description: "Fronteiras, países, estados e capitais." },
  { id: "fisicos", emoji: "🏔️", name: "Mapas físicos", description: "Relevo, montanhas, planícies e altitudes." },
  { id: "climaticos", emoji: "🌦️", name: "Mapas climáticos", description: "Tipos de clima e regimes de chuva." },
  { id: "populacionais", emoji: "👥", name: "Mapas populacionais", description: "Densidade e distribuição da população." },
  { id: "vegetacao", emoji: "🌳", name: "Mapas de vegetação", description: "Biomas, florestas e coberturas vegetais." },
  { id: "economicos", emoji: "🏭", name: "Mapas econômicos", description: "Indústria, agricultura e recursos." },
  { id: "brasil", emoji: "🇧🇷", name: "Mapas do Brasil", description: "Regiões, estados e territórios do país." },
  { id: "mundiais", emoji: "🌍", name: "Mapas mundiais", description: "Continentes, oceanos e o planeta inteiro." },
]

// Atividades de interpretação cartográfica
export const mapActivities: Question[] = [
  {
    id: "map-1",
    type: "multiple",
    prompt: "Em um mapa, uma seta aponta para cima com a letra N. O que isso indica?",
    scenario: "Você abriu um mapa e viu uma rosa dos ventos com uma seta e a letra N.",
    options: ["A direção do Norte", "O nome do país", "A escala do mapa", "A quantidade de chuva"],
    correct: 0,
    explanation: "A letra N na rosa dos ventos indica o Norte, ajudando na orientação.",
    xp: 10,
  },
  {
    id: "map-2",
    type: "multiple",
    prompt: "Em um mapa de relevo, tons de marrom escuro geralmente representam:",
    options: ["Áreas de baixa altitude", "Grandes altitudes (montanhas)", "Oceanos profundos", "Áreas urbanas"],
    correct: 1,
    explanation: "Em mapas físicos, tons de marrom mais escuros costumam indicar altitudes mais elevadas.",
    xp: 10,
  },
  {
    id: "map-3",
    type: "truefalse",
    prompt: "A legenda de um mapa explica o significado das cores e símbolos usados.",
    correct: true,
    explanation: "Sim! A legenda é essencial para interpretar corretamente qualquer mapa.",
    xp: 10,
  },
]

// ---------- Níveis ----------

export type Level = { level: number; name: string; emoji: string; minXp: number }

export const levels: Level[] = [
  { level: 1, name: "Curioso", emoji: "🌱", minXp: 0 },
  { level: 2, name: "Explorador", emoji: "🧭", minXp: 60 },
  { level: 3, name: "Descobridor", emoji: "🗺️", minXp: 150 },
  { level: 4, name: "Cartógrafo", emoji: "🌎", minXp: 280 },
  { level: 5, name: "Geógrafo Júnior", emoji: "🏆", minXp: 450 },
]

export function getLevel(xp: number): Level {
  let current = levels[0]
  for (const lv of levels) {
    if (xp >= lv.minXp) current = lv
  }
  return current
}

export function getNextLevel(xp: number): Level | null {
  for (const lv of levels) {
    if (xp < lv.minXp) return lv
  }
  return null
}

// ---------- Conquistas ----------

export type Badge = {
  id: string
  name: string
  emoji: string
  description: string
  condition: string
}

export const badges: Badge[] = [
  {
    id: "cartografia",
    name: "Mestre da Cartografia",
    emoji: "🧭",
    description: "Domine mapas, escalas e coordenadas.",
    condition: "Conclua todos os conteúdos de Cartografia.",
  },
  {
    id: "biomas",
    name: "Guardião dos Biomas",
    emoji: "🌳",
    description: "Proteja e conheça os biomas.",
    condition: "Conclua o conteúdo de Biomas.",
  },
  {
    id: "clima",
    name: "Especialista em Clima",
    emoji: "🌦️",
    description: "Entenda o clima e a hidrografia.",
    condition: "Conclua os conteúdos de Clima e Hidrografia.",
  },
  {
    id: "brasil",
    name: "Explorador do Brasil",
    emoji: "🇧🇷",
    description: "Explore o território brasileiro.",
    condition: "Conclua um conteúdo do 7º ano.",
  },
  {
    id: "mapas",
    name: "Mestre dos Mapas",
    emoji: "🗺️",
    description: "Interprete mapas com facilidade.",
    condition: "Acerte 3 atividades na Central de Mapas.",
  },
  {
    id: "planeta",
    name: "Guardião do Planeta",
    emoji: "🌍",
    description: "Cuide do meio ambiente.",
    condition: "Conclua o conteúdo de Meio Ambiente.",
  },
  {
    id: "geografo",
    name: "Geógrafo Júnior",
    emoji: "🏆",
    description: "Alcance o nível máximo de exploração.",
    condition: "Chegue ao nível 5 (450 XP).",
  },
]

// ---------- Helpers ----------

export function contentsByTerritory(territoryId: string) {
  return contents.filter((c) => c.territoryId === territoryId)
}

export function contentsByYear(year: number) {
  return contents.filter((c) => c.years.includes(year))
}

export function getContent(slug: string) {
  return contents.find((c) => c.slug === slug)
}

export function getTerritory(id: string) {
  return territories.find((t) => t.id === id)
}

export function totalXpForQuiz(q: Question[]) {
  return q.reduce((sum, item) => sum + item.xp, 0)
}
