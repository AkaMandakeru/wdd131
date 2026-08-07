// ---------------------------------------------------------------------------
// MusicList — dados do site
// Objetos e arrays usados por todas as páginas. Carregado antes dos demais
// scripts, portanto as constantes ficam disponíveis para eles.
// As informações de título, artista e ano foram conferidas em fontes públicas
// citadas na página de referências.
// ---------------------------------------------------------------------------

const GENEROS = [
  {
    id: "pop",
    nome: "Pop",
    imagem: "imagens/generos/pop.svg",
    descricao:
      "Refrões fáceis de cantar junto e produção moderna. É o gênero que mais aparece nas paradas brasileiras.",
  },
  {
    id: "rock",
    nome: "Rock",
    imagem: "imagens/generos/rock.svg",
    descricao:
      "Guitarras em primeiro plano e letras que marcaram gerações do rock nacional dos anos 80 e 90.",
  },
  {
    id: "eletronica",
    nome: "Eletrônica",
    imagem: "imagens/generos/eletronica.svg",
    descricao:
      "Batidas construídas em estúdio, do deep house tranquilo às faixas feitas para a pista de dança.",
  },
  {
    id: "sertanejo",
    nome: "Sertanejo",
    imagem: "imagens/generos/sertanejo.svg",
    descricao:
      "Do romântico clássico das duplas ao sertanejo universitário que domina as rádios do país.",
  },
  {
    id: "internacional",
    nome: "Internacional",
    imagem: "imagens/generos/internacional.svg",
    descricao:
      "Grandes sucessos de fora do Brasil que fazem parte da trilha sonora do mundo inteiro.",
  },
];

const MUSICAS = [
  // ---------- Pop ----------
  {
    id: "envolver",
    titulo: "Envolver",
    artista: "Anitta",
    genero: "pop",
    ano: 2022,
    destaque: true,
    descricao:
      "Pop dançante com pegada latina que levou a cantora brasileira ao topo das paradas globais de streaming.",
  },
  {
    id: "cheguei",
    titulo: "Cheguei",
    artista: "Ludmilla",
    genero: "pop",
    ano: 2016,
    destaque: false,
    descricao:
      "Refrão grudento e batida animada, uma das faixas que consolidaram a artista no pop nacional.",
  },
  {
    id: "o-sol",
    titulo: "O Sol",
    artista: "Vitor Kley",
    genero: "pop",
    ano: 2017,
    destaque: false,
    descricao:
      "Pop leve e otimista, com violão marcante e uma letra sobre recomeços e dias melhores.",
  },
  {
    id: "trem-bala",
    titulo: "Trem-Bala",
    artista: "Ana Vilela",
    genero: "pop",
    ano: 2017,
    destaque: false,
    descricao:
      "Balada intimista sobre aproveitar o tempo e dar valor às pessoas que estão por perto.",
  },

  // ---------- Rock ----------
  {
    id: "tempo-perdido",
    titulo: "Tempo Perdido",
    artista: "Legião Urbana",
    genero: "rock",
    ano: 1986,
    destaque: true,
    descricao:
      "Clássico do rock brasileiro dos anos 80, com letra sobre juventude, tempo e escolhas.",
  },
  {
    id: "exagerado",
    titulo: "Exagerado",
    artista: "Cazuza",
    genero: "rock",
    ano: 1985,
    destaque: false,
    descricao:
      "Rock romântico e teatral que abriu a carreira solo de um dos maiores letristas do país.",
  },
  {
    id: "garota-nacional",
    titulo: "Garota Nacional",
    artista: "Skank",
    genero: "rock",
    ano: 1996,
    destaque: false,
    descricao:
      "Mistura de rock, reggae e MPB que definiu o som mineiro da metade dos anos 90.",
  },
  {
    id: "do-seu-lado",
    titulo: "Do Seu Lado",
    artista: "Jota Quest",
    genero: "rock",
    ano: 1999,
    destaque: false,
    descricao:
      "Rock pop com refrão fácil de cantar junto, presente em qualquer lista de sucessos nacionais.",
  },

  // ---------- Eletrônica ----------
  {
    id: "hear-me-now",
    titulo: "Hear Me Now",
    artista: "Alok, Bruno Martini e Zeeba",
    genero: "eletronica",
    ano: 2016,
    destaque: true,
    descricao:
      "Deep house brasileiro com vocal suave, um dos maiores sucessos da eletrônica nacional.",
  },
  {
    id: "ocean",
    titulo: "Ocean",
    artista: "Alok, Zeeba e IRO",
    genero: "eletronica",
    ano: 2016,
    destaque: false,
    descricao:
      "Batida tranquila e melodia envolvente, ideal para acompanhar uma sessão longa de estudo.",
  },
  {
    id: "big-jet-plane",
    titulo: "Big Jet Plane",
    artista: "Alok e Mathieu Koss",
    genero: "eletronica",
    ano: 2019,
    destaque: false,
    descricao:
      "Releitura eletrônica de uma balada folk, com clima leve de estrada e viagem.",
  },
  {
    id: "deep-down",
    titulo: "Deep Down",
    artista: "Alok, Ella Eyre e Kenny Dope",
    genero: "eletronica",
    ano: 2023,
    destaque: false,
    descricao:
      "House dançante com vocal potente e um sample clássico, feito para a pista e para o treino.",
  },

  // ---------- Sertanejo ----------
  {
    id: "evidencias",
    titulo: "Evidências",
    artista: "Chitãozinho & Xororó",
    genero: "sertanejo",
    ano: 1990,
    destaque: true,
    descricao:
      "Hino do sertanejo romântico, presente em karaokês e rodas de violão de todo o país.",
  },
  {
    id: "ai-se-eu-te-pego",
    titulo: "Ai Se Eu Te Pego",
    artista: "Michel Teló",
    genero: "sertanejo",
    ano: 2011,
    destaque: false,
    descricao:
      "Sertanejo universitário simples e contagiante que virou um fenômeno também fora do Brasil.",
  },
  {
    id: "infiel",
    titulo: "Infiel",
    artista: "Marília Mendonça",
    genero: "sertanejo",
    ano: 2016,
    destaque: false,
    descricao:
      "Sofrência em estado puro, com letra direta e uma interpretação que marcou o gênero.",
  },
  {
    id: "meteoro",
    titulo: "Meteoro",
    artista: "Luan Santana",
    genero: "sertanejo",
    ano: 2009,
    destaque: false,
    descricao:
      "Balada sertaneja romântica que apresentou o cantor ao grande público brasileiro.",
  },

  // ---------- Internacional ----------
  {
    id: "bohemian-rhapsody",
    titulo: "Bohemian Rhapsody",
    artista: "Queen",
    genero: "internacional",
    ano: 1975,
    destaque: true,
    descricao:
      "Suíte de rock que passeia por balada, ópera e hard rock dentro de uma única faixa.",
  },
  {
    id: "billie-jean",
    titulo: "Billie Jean",
    artista: "Michael Jackson",
    genero: "internacional",
    ano: 1982,
    destaque: false,
    descricao:
      "Linha de baixo inconfundível e produção impecável: um dos marcos do pop mundial.",
  },
  {
    id: "get-lucky",
    titulo: "Get Lucky",
    artista: "Daft Punk (part. Pharrell Williams)",
    genero: "internacional",
    ano: 2013,
    destaque: false,
    descricao:
      "Dance music com guitarra funk e clima de festa que atravessa a noite inteira.",
  },
  {
    id: "shape-of-you",
    titulo: "Shape of You",
    artista: "Ed Sheeran",
    genero: "internacional",
    ano: 2017,
    destaque: false,
    descricao:
      "Pop com batida tropical e melodia repetitiva, campeão de execuções nas plataformas digitais.",
  },
  {
    id: "blinding-lights",
    titulo: "Blinding Lights",
    artista: "The Weeknd",
    genero: "internacional",
    ano: 2019,
    destaque: true,
    descricao:
      "Synthpop com referências aos anos 80 e um andamento perfeito para corrida.",
  },
];

const PLAYLISTS = [
  {
    id: "foco-total",
    nome: "Foco Total",
    ocasiao: "Para estudar",
    imagem: "imagens/ocasioes/estudar.svg",
    descricao:
      "Faixas de andamento constante e vocais discretos, escolhidas para acompanhar leitura, revisão e programação sem roubar a atenção.",
    musicas: ["ocean", "hear-me-now", "trem-bala", "o-sol", "big-jet-plane"],
  },
  {
    id: "energia-no-treino",
    nome: "Energia no Treino",
    ocasiao: "Para treinar",
    imagem: "imagens/ocasioes/treinar.svg",
    descricao:
      "Batidas rápidas e refrões animados para manter o ritmo do começo ao fim do treino, seja na academia ou na corrida.",
    musicas: ["blinding-lights", "deep-down", "ai-se-eu-te-pego", "billie-jean", "cheguei"],
  },
  {
    id: "fim-de-tarde",
    nome: "Fim de Tarde",
    ocasiao: "Para relaxar",
    imagem: "imagens/ocasioes/relaxar.svg",
    descricao:
      "Melodias calmas e letras afetivas para desacelerar depois do trabalho, com um pé no pop e outro na nostalgia.",
    musicas: ["trem-bala", "garota-nacional", "evidencias", "o-sol", "infiel"],
  },
  {
    id: "estrada-aberta",
    nome: "Estrada Aberta",
    ocasiao: "Para viajar",
    imagem: "imagens/ocasioes/viajar.svg",
    descricao:
      "Clássicos que todo mundo sabe cantar, pensados para as horas de estrada e para a companhia no carro.",
    musicas: ["bohemian-rhapsody", "do-seu-lado", "get-lucky", "meteoro", "tempo-perdido", "exagerado"],
  },
];
