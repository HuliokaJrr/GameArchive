
"use strict";

/* ==========================================
   GAME ARCHIVE 3.0 — THE EMPIRE UPDATE
========================================== */

const SAVE_KEY = "gameArchive_empire_v3";
const $ = id => document.getElementById(id);
const BI = value => BigInt(value);

let lang = "pt";
let state;
let investmentFilter = "all";
let audioContext = null;
let musicTimer = null;
let musicEnabled = false;
let lastTick = Date.now();

const text = {
  pt: {
    marketLive:"MERCADO ATIVO",welcome:"CENTRAL CORPORATIVA",headline:"Construa um império.",
    subtitle:"O mercado não espera. Sua próxima decisão pode mudar tudo.",
    balance:"CAPITAL DISPONÍVEL",available:"Disponível para investir",income:"RENDA POR SEGUNDO",
    passive:"Produção automática",clickValue:"VENDA MANUAL",perSale:"Por venda",
    lifetime:"VALOR DA EMPRESA",lifetimeSub:"Faturamento acumulado",store:"Loja",
    investments:"Investimentos",collection:"Coleção",expansion:"Expansão",research:"Pesquisa",
    market:"Mercado",objectives:"Objetivos",secrets:"Segredos",prestige:"Prestígio",
    dailyOps:"OPERAÇÃO DIÁRIA",sellGames:"Venda seus jogos",operating:"OPERANDO",
    sellDesc:"Cada venda gera receita e experiência para sua empresa.",
    makeSale:"REALIZAR VENDA",clickToEarn:"Clique para faturar",businessOverview:"VISÃO GERAL",
    companyStatus:"Sua empresa",storeLevel:"Nível",staff:"Funcionários",units:"Unidades",
    marketShare:"Participação",featured:"DESTAQUE",marketEvent:"Evento do mercado",
    nextGoal:"PRÓXIMO MARCO",quickActions:"AÇÕES RÁPIDAS",companyTools:"Ferramentas",
    viewMarket:"Acompanhar mercado",viewMissions:"Ver missões",viewCollection:"Abrir coleção",
    companyNews:"NOTÍCIAS DA EMPRESA",capitalAllocation:"ALOCAÇÃO DE CAPITAL",
    investmentTitle:"Invista no crescimento",investmentDesc:"Desenvolva cada departamento e construa uma operação cada vez maior.",
    all:"Tudo",inStore:"Loja",inStudio:"Estúdio",inMarketing:"Marketing",inTech:"Tecnologia",
    archive:"O ARQUIVO",collectionTitle:"Coleção da empresa",
    collectionDesc:"Adquira jogos, descubra personagens e construa um catálogo lendário.",
    gamesOwned:"Jogos adquiridos",charactersFound:"Personagens encontrados",
    gameLibrary:"Biblioteca de jogos",characterGallery:"Galeria de personagens",
    globalOperations:"OPERAÇÕES GLOBAIS",expansionTitle:"Expanda seu império",
    expansionDesc:"Abra novas unidades, conquiste regiões e leve sua marca para o mundo.",
    innovation:"INOVAÇÃO",researchTitle:"Centro de pesquisa",
    researchDesc:"Tecnologias especiais aumentam a eficiência da empresa.",
    globalMarket:"MERCADO GLOBAL",competitionTitle:"A concorrência nunca dorme.",
    competitionDesc:"Empresas rivais disputam consumidores, regiões e influência.",
    yourPosition:"SUA POSIÇÃO",marketMood:"CLIMA DO MERCADO",changesOverTime:"Muda ao longo do tempo",
    rivalCount:"CONCORRENTES",activeCompanies:"Empresas ativas",marketRanking:"Ranking de empresas",
    marketStrategies:"Estratégias de mercado",marketStrategiesDesc:"Invista em campanhas para fortalecer sua posição competitiva.",
    achievements:"PROGRESSO E RECOMPENSAS",objectivesTitle:"Objetivos da empresa",
    objectivesDesc:"Complete desafios, receba recompensas e registre sua história.",
    dailyMissions:"Missões rotativas",dailyDesc:"Metas que mudam periodicamente.",
    achievementsTitle:"Conquistas",achievementDesc:"Marcos permanentes da sua trajetória.",
    contracts:"Contratos especiais",restricted:"ACESSO RESTRITO",unknownArchive:"The Unknown Archive",
    secretDesc:"Nem tudo que existe no mercado aparece nos relatórios oficiais.",
    classified:"CLASSIFICADO",lockedArchive:"Arquivo desconhecido",
    secretLockedDesc:"Há registros que ainda não podem ser acessados.",
    hiddenTerminal:"TERMINAL OCULTO",terminalTitle:"Acesso por código",
    terminalDesc:"Algumas pistas podem estar escondidas no próprio jogo.",
    submitCode:"VALIDAR",beyondLimits:"ALÉM DOS LIMITES",
    prestigeTitle:"O próximo ciclo começa aqui.",
    prestigeDesc:"Reinicie sua empresa em troca de pontos permanentes.",
    availablePoints:"PONTOS DISPONÍVEIS",rebirth:"RENASCER O IMPÉRIO",
    permanentBenefits:"Benefícios permanentes",prestigePoints:"Pontos acumulados",
    prestigeBonus:"Bônus permanente",saveStatus:"● Salvamento automático",
    buy:"COMPRAR",owned:"ADQUIRIDO",cost:"Custo",level:"Nível",locked:"BLOQUEADO",
    unlockLevel:"Desbloqueia no nível",income:"Renda",bonus:"Bônus",
    open:"ABERTO",researchDone:"PESQUISADO",hire:"CONTRATAR",
    unlock:"DESBLOQUEAR",sales:"vendas",rank:"Posição",stable:"Estável",
    rising:"Em alta",volatile:"Volátil",declining:"Em queda",
    yourCompany:"Game Archive",you:"VOCÊ",marketShareText:"do mercado",
    strategyMarketing:"Campanha publicitária",strategyMarketingDesc:"Invista em marketing para atrair consumidores.",
    strategyPrice:"Promoção especial",strategyPriceDesc:"Uma campanha temporária de preços competitivos.",
    strategyBrand:"Fortalecer marca",strategyBrandDesc:"Aumente a influência e a reputação da empresa.",
    missionSales:"Realize vendas",missionIncome:"Acumule faturamento",missionPurchases:"Compre melhorias",
    missionMarket:"Invista em estratégias",claim:"RESGATAR",completed:"CONCLUÍDO",
    reward:"Recompensa",progress:"Progresso",secretFound:"SEGREDO DESCOBERTO!",
    secretCodeWrong:"Código não reconhecido.",secretCodeUsed:"Esse código já foi utilizado.",
    secretCodeSuccess:"Código aceito! Uma descoberta foi registrada.",
    needMore:"Você ainda não tem dinheiro suficiente.",
    levelRequired:"Nível necessário",missionReset:"As missões serão renovadas amanhã.",
    prestigeNeed:"Alcance o nível 25 para liberar o prestígio.",
    prestigeConfirm:"O prestígio reinicia seu progresso atual em troca de pontos permanentes. Continuar?",
    prestigeSuccess:"Novo ciclo iniciado! Seu império renasceu.",
    eventBoom:"Mercado aquecido",eventBoomDesc:"O interesse por jogos está em alta. Sua receita recebe um bônus.",
    eventExpo:"Feira internacional",eventExpoDesc:"O setor está movimentado. Suas vendas manuais recebem um bônus.",
    eventCrisis:"Recessão econômica",eventCrisisDesc:"O mercado desacelerou. A renda automática foi reduzida temporariamente.",
    eventConsole:"Nova geração",eventConsoleDesc:"Uma nova geração de tecnologia movimenta o setor.",
    eventQuiet:"Semana tranquila",eventQuietDesc:"O mercado segue em ritmo normal.",
    eventRemaining:"Próxima atualização em",
    newsStart:"A Game Archive iniciou suas operações.",
    newsUpgrade:"A empresa investiu em novos departamentos.",
    newsRival:"Uma concorrente anunciou uma nova expansão.",
    newsEvent:"O mercado registrou uma mudança de cenário.",
    noNews:"Aguardando novas notícias...",
    firstGoal:"Primeiras vendas",secondGoal:"Loja em crescimento",thirdGoal:"Pequeno império",
    fourthGoal:"Potência comercial",fifthGoal:"Domínio global",
    noCharacters:"Continue evoluindo para encontrar personagens.",
    noGames:"Novos jogos serão liberados conforme seu nível aumentar.",
    common:"COMUM",rare:"RARO",epic:"ÉPICO",legendary:"LENDÁRIO",
    discovered:"DESCOBERTO",unknown:"DESCONHECIDO",hidden:"OCULTO",
    secretProgress:"descoberto",companyValue:"Valor da empresa",
    musicOn:"Música ON",musicOff:"Música OFF",rankFirst:"Líder do mercado",
    marketFirst:"Você está no topo do mercado!",strategyUsed:"Estratégia ativada!",
    objectiveReward:"Objetivo concluído! Recompensa recebida.",
    contractDone:"Contrato concluído!",eventBonus:"Bônus do evento",
    prestigeBonusText:"Cada ponto de prestígio aumenta sua produção em 10%.",
    franchise:"Franquia",perSecond:"/s",million:"milhões"
  },
  en: {
    marketLive:"MARKET LIVE",welcome:"CORPORATE HEADQUARTERS",headline:"Build an empire.",
    subtitle:"The market never waits. Your next decision could change everything.",
    balance:"AVAILABLE CAPITAL",available:"Available to invest",income:"INCOME PER SECOND",
    passive:"Automatic production",clickValue:"MANUAL SALE",perSale:"Per sale",
    lifetime:"COMPANY VALUE",lifetimeSub:"Lifetime revenue",store:"Store",
    investments:"Investments",collection:"Collection",expansion:"Expansion",research:"Research",
    market:"Market",objectives:"Objectives",secrets:"Secrets",prestige:"Prestige",
    dailyOps:"DAILY OPERATIONS",sellGames:"Sell your games",operating:"OPERATING",
    sellDesc:"Every sale generates revenue and experience for your company.",
    makeSale:"MAKE A SALE",clickToEarn:"Click to earn",businessOverview:"OVERVIEW",
    companyStatus:"Your company",storeLevel:"Level",staff:"Employees",units:"Locations",
    marketShare:"Market share",featured:"FEATURED",marketEvent:"Market event",
    nextGoal:"NEXT MILESTONE",quickActions:"QUICK ACTIONS",companyTools:"Tools",
    viewMarket:"View the market",viewMissions:"View missions",viewCollection:"Open collection",
    companyNews:"COMPANY NEWS",capitalAllocation:"CAPITAL ALLOCATION",
    investmentTitle:"Invest in growth",investmentDesc:"Develop each department and build an ever-larger operation.",
    all:"All",inStore:"Store",inStudio:"Studio",inMarketing:"Marketing",inTech:"Technology",
    archive:"THE ARCHIVE",collectionTitle:"Company collection",
    collectionDesc:"Acquire games, discover characters and build a legendary catalog.",
    gamesOwned:"Games acquired",charactersFound:"Characters discovered",
    gameLibrary:"Game library",characterGallery:"Character gallery",
    globalOperations:"GLOBAL OPERATIONS",expansionTitle:"Expand your empire",
    expansionDesc:"Open new locations, conquer regions and take your brand worldwide.",
    innovation:"INNOVATION",researchTitle:"Research center",
    researchDesc:"Special technologies increase company efficiency.",
    globalMarket:"GLOBAL MARKET",competitionTitle:"Competition never sleeps.",
    competitionDesc:"Rival companies compete for customers, regions and influence.",
    yourPosition:"YOUR POSITION",marketMood:"MARKET MOOD",changesOverTime:"Changes over time",
    rivalCount:"COMPETITORS",activeCompanies:"Active companies",marketRanking:"Company rankings",
    marketStrategies:"Market strategies",marketStrategiesDesc:"Invest in campaigns to strengthen your competitive position.",
    achievements:"PROGRESS AND REWARDS",objectivesTitle:"Company objectives",
    objectivesDesc:"Complete challenges, earn rewards and record your history.",
    dailyMissions:"Rotating missions",dailyDesc:"Goals that change periodically.",
    achievementsTitle:"Achievements",achievementDesc:"Permanent milestones in your journey.",
    contracts:"Special contracts",restricted:"RESTRICTED ACCESS",unknownArchive:"The Unknown Archive",
    secretDesc:"Not everything in the market appears in official reports.",
    classified:"CLASSIFIED",lockedArchive:"Unknown archive",
    secretLockedDesc:"Some records cannot be accessed yet.",
    hiddenTerminal:"HIDDEN TERMINAL",terminalTitle:"Code access",
    terminalDesc:"Some clues may be hidden inside the game itself.",
    submitCode:"VALIDATE",beyondLimits:"BEYOND LIMITS",
    prestigeTitle:"The next cycle starts here.",
    prestigeDesc:"Restart your company in exchange for permanent points.",
    availablePoints:"AVAILABLE POINTS",rebirth:"REBIRTH THE EMPIRE",
    permanentBenefits:"Permanent benefits",prestigePoints:"Accumulated points",
    prestigeBonus:"Permanent bonus",saveStatus:"● Automatic saving",
    buy:"BUY",owned:"OWNED",cost:"Cost",level:"Level",locked:"LOCKED",
    unlockLevel:"Unlocks at level",income:"Income",bonus:"Bonus",
    open:"OPEN",researchDone:"RESEARCHED",hire:"HIRE",
    unlock:"UNLOCK",sales:"sales",rank:"Rank",stable:"Stable",
    rising:"Rising",volatile:"Volatile",declining:"Declining",
    yourCompany:"Game Archive",you:"YOU",marketShareText:"market share",
    strategyMarketing:"Advertising campaign",strategyMarketingDesc:"Invest in marketing to attract customers.",
    strategyPrice:"Special promotion",strategyPriceDesc:"A temporary competitive pricing campaign.",
    strategyBrand:"Strengthen brand",strategyBrandDesc:"Increase company influence and reputation.",
    missionSales:"Make sales",missionIncome:"Earn revenue",missionPurchases:"Buy upgrades",
    missionMarket:"Invest in strategies",claim:"CLAIM",completed:"COMPLETED",
    reward:"Reward",progress:"Progress",secretFound:"SECRET DISCOVERED!",
    secretCodeWrong:"Code not recognized.",secretCodeUsed:"This code has already been used.",
    secretCodeSuccess:"Code accepted! A discovery has been recorded.",
    needMore:"You don't have enough money yet.",
    levelRequired:"Required level",missionReset:"Missions will refresh tomorrow.",
    prestigeNeed:"Reach level 25 to unlock prestige.",
    prestigeConfirm:"Prestige resets your current progress in exchange for permanent points. Continue?",
    prestigeSuccess:"New cycle started! Your empire has been reborn.",
    eventBoom:"Market boom",eventBoomDesc:"Interest in games is rising. Your revenue receives a bonus.",
    eventExpo:"International expo",eventExpoDesc:"The industry is buzzing. Manual sales receive a bonus.",
    eventCrisis:"Economic recession",eventCrisisDesc:"The market has slowed. Automatic income is temporarily reduced.",
    eventConsole:"New generation",eventConsoleDesc:"A new generation of technology is moving the industry.",
    eventQuiet:"Quiet week",eventQuietDesc:"The market is operating at a normal pace.",
    eventRemaining:"Next update in",
    newsStart:"Game Archive has started operations.",
    newsUpgrade:"The company invested in new departments.",
    newsRival:"A competitor announced a new expansion.",
    newsEvent:"The market has recorded a change in conditions.",
    noNews:"Waiting for news...",
    firstGoal:"First sales",secondGoal:"Growing store",thirdGoal:"Small empire",
    fourthGoal:"Commercial powerhouse",fifthGoal:"Global dominance",
    noCharacters:"Keep progressing to discover characters.",
    noGames:"New games unlock as your level increases.",
    common:"COMMON",rare:"RARE",epic:"EPIC",legendary:"LEGENDARY",
    discovered:"DISCOVERED",unknown:"UNKNOWN",hidden:"HIDDEN",
    secretProgress:"discovered",companyValue:"Company value",
    musicOn:"Music ON",musicOff:"Music OFF",rankFirst:"Market leader",
    marketFirst:"You are at the top of the market!",strategyUsed:"Strategy activated!",
    objectiveReward:"Objective completed! Reward received.",
    contractDone:"Contract completed!",eventBonus:"Event bonus",
    prestigeBonusText:"Each prestige point increases production by 10%.",
    franchise:"Franchise",perSecond:"/s",million:"million"
  }
};

function tr(key) {
  return text[lang][key] ?? key;
}

function newState() {
  return {
    cash:"25",
    lifetime:"0",
    income:"0",
    click:"1",
    xp:0,
    level:1,
    sales:0,
    prestige:0,
    upgrades:{},
    staff:0,
    units:1,
    investments:{},
    games:[],
    characters:[],
    expansions:[],
    research:[],
    strategies:0,
    share:10,
    competitors:[],
    event:0,
    eventEnds:Date.now()+60000,
    missions:{},
    missionDay:"",
    missionClaimed:[],
    achievements:[],
    contracts:[],
    secrets:[],
    codes:[],
    news:[],
    lastSave:Date.now(),
    totalPurchases:0,
    marketing:0
  };
}

state = newState();

const investments = [
  {id:"shelves",cat:"store",icon:"▤",name:["Prateleiras premium","Premium shelves"],desc:["Mais espaço para produtos e clientes.","More space for products and customers."],base:80n,growth:132n,effect:3n,type:"income",unlock:1},
  {id:"checkout",cat:"store",icon:"▣",name:["Caixas inteligentes","Smart checkout"],desc:["Atendimento mais rápido e eficiente.","Faster and more efficient service."],base:350n,growth:137n,effect:10n,type:"income",unlock:1},
  {id:"warehouse",cat:"store",icon:"▥",name:["Depósito logístico","Logistics warehouse"],desc:["Aumenta a capacidade operacional.","Increases operational capacity."],base:1800n,growth:142n,effect:45n,type:"income",unlock:3},
  {id:"showroom",cat:"store",icon:"◇",name:["Showroom exclusivo","Exclusive showroom"],desc:["Uma experiência premium para clientes.","A premium customer experience."],base:9500n,growth:146n,effect:180n,type:"income",unlock:6},
  {id:"devteam",cat:"studio",icon:"⌘",name:["Equipe de desenvolvimento","Development team"],desc:["Desenvolva projetos e tecnologias próprias.","Develop your own projects and technology."],base:1200n,growth:142n,effect:55n,type:"income",unlock:4},
  {id:"artteam",cat:"studio",icon:"✎",name:["Departamento de arte","Art department"],desc:["Crie experiências visuais de alto nível.","Create high-quality visual experiences."],base:6500n,growth:147n,effect:230n,type:"income",unlock:7},
  {id:"motion",cat:"studio",icon:"✧",name:["Laboratório de captura","Motion capture lab"],desc:["Eleve a qualidade das produções.","Improve production quality."],base:45000n,growth:151n,effect:1500n,type:"income",unlock:12},
  {id:"publisher",cat:"studio",icon:"▣",name:["Selo de publicação","Publishing label"],desc:["Distribua jogos em escala internacional.","Distribute games internationally."],base:350000n,growth:155n,effect:9000n,type:"income",unlock:18},
  {id:"ads",cat:"marketing",icon:"◎",name:["Agência de publicidade","Advertising agency"],desc:["Amplie o alcance da marca.","Expand brand reach."],base:700n,growth:140n,effect:1n,type:"marketing",unlock:2},
  {id:"influencers",cat:"marketing",icon:"◉",name:["Rede de criadores","Creator network"],desc:["Aproxime a marca da comunidade gamer.","Connect the brand with the gaming community."],base:5500n,growth:146n,effect:2n,type:"marketing",unlock:7},
  {id:"worldtour",cat:"marketing",icon:"✈",name:["Turnê mundial","World tour"],desc:["Leve sua marca aos maiores eventos.","Take your brand to major events."],base:80000n,growth:152n,effect:4n,type:"marketing",unlock:14},
  {id:"servers",cat:"tech",icon:"▦",name:["Servidores dedicados","Dedicated servers"],desc:["Infraestrutura para uma operação maior.","Infrastructure for a larger operation."],base:2500n,growth:144n,effect:1n,type:"tech",unlock:5},
  {id:"cloud",cat:"tech",icon:"☁",name:["Computação em nuvem","Cloud computing"],desc:["Processamento distribuído e eficiente.","Efficient distributed processing."],base:18000n,growth:150n,effect:2n,type:"tech",unlock:10},
  {id:"ai",cat:"tech",icon:"✧",name:["Inteligência artificial","Artificial intelligence"],desc:["Automatize decisões e processos.","Automate decisions and processes."],base:150000n,growth:155n,effect:4n,type:"tech",unlock:17},
  {id:"quantum",cat:"tech",icon:"◈",name:["Computação quântica","Quantum computing"],desc:["Tecnologia experimental de alto impacto.","High-impact experimental technology."],base:1800000n,growth:160n,effect:7n,type:"tech",unlock:27}
];

const games = [
  {id:"void",name:"Void Runner",genre:"Sci-fi / Ação",symbol:"◉",cover:"cover-void",price:500n,level:1},
  {id:"ember",name:"Emberfall",genre:"Fantasia / RPG",symbol:"♨",cover:"cover-ember",price:2500n,level:3},
  {id:"neon",name:"Neon District",genre:"Cyberpunk",symbol:"⌁",cover:"cover-neon",price:12000n,level:5},
  {id:"kingdom",name:"Last Kingdom",genre:"Estratégia",symbol:"♜",cover:"cover-kingdom",price:65000n,level:8},
  {id:"orbit",name:"Orbit Zero",genre:"Exploração espacial",symbol:"✧",cover:"cover-orbit",price:350000n,level:12},
  {id:"shadow",name:"Shadow Protocol",genre:"Stealth / Ação",symbol:"◈",cover:"cover-shadow",price:2000000n,level:17},
  {id:"bloom",name:"Bloom",genre:"Aventura",symbol:"✿",cover:"cover-bloom",price:15000000n,level:23},
  {id:"echo",name:"Echoes of Earth",genre:"Sobrevivência",symbol:"❖",cover:"cover-echo",price:100000000n,level:30},
  {id:"legacy",name:"Legacy of Kings",genre:"RPG / Fantasia",symbol:"♛",cover:"cover-legacy",price:800000000n,level:40},
  {id:"apex",name:"Apex Horizon",genre:"Corrida",symbol:"△",cover:"cover-apex",price:7500000000n,level:55}
];

const characters = [
  {id:"mira",name:"Mira",emoji:"🧙",rarity:"common",level:3,desc:"Aprendiz de magia"},
  {id:"kai",name:"Kai",emoji:"🧑‍🚀",rarity:"common",level:6,desc:"Explorador das estrelas"},
  {id:"nyx",name:"Nyx",emoji:"🥷",rarity:"rare",level:10,desc:"Uma sombra silenciosa"},
  {id:"sol",name:"Sol",emoji:"🦸",rarity:"rare",level:15,desc:"Defensor da última cidade"},
  {id:"astra",name:"Astra",emoji:"🧝",rarity:"epic",level:21,desc:"Guardiã das constelações"},
  {id:"riven",name:"Riven",emoji:"⚔️",rarity:"epic",level:28,desc:"O guerreiro sem reino"},
  {id:"elyra",name:"Elyra",emoji:"👸",rarity:"legendary",level:36,desc:"Soberana do horizonte"},
  {id:"zero",name:"ZERO",emoji:"🤖",rarity:"legendary",level:45,desc:"Uma inteligência esquecida"}
];

const expansions = [
  {id:"mall",icon:"▦",name:"Quiosque no shopping",desc:"Sua primeira unidade fora da loja principal.",cost:5000n,level:5},
  {id:"city",icon:"⌂",name:"Loja no centro",desc:"Uma nova unidade em uma região movimentada.",cost:85000n,level:10},
  {id:"warehouse",icon:"▤",name:"Centro de distribuição",desc:"Aumenta a capacidade de toda a rede.",cost:1200000n,level:18},
  {id:"studio",icon:"⌘",name:"Estúdio próprio",desc:"Comece a desenvolver seus próprios jogos.",cost:25000000n,level:27},
  {id:"international",icon:"◎",name:"Sede internacional",desc:"Leve sua marca para outros países.",cost:800000000n,level:40},
  {id:"global",icon:"✧",name:"Rede global",desc:"Uma operação presente no mundo inteiro.",cost:25000000000n,level:60}
];

const research = [
  {id:"analytics",icon:"⌁",name:"Análise de mercado",desc:"Aumenta a eficiência geral em 12%.",cost:12000n,level:8},
  {id:"cloudlab",icon:"☁",name:"Infraestrutura avançada",desc:"Aumenta a eficiência geral em 15%.",cost:250000n,level:15},
  {id:"neural",icon:"✧",name:"Rede neural",desc:"Aumenta a eficiência geral em 20%.",cost:5000000n,level:25},
  {id:"quantumlab",icon:"◈",name:"Computação quântica",desc:"Aumenta a eficiência geral em 25%.",cost:100000000n,level:38},
  {id:"singularity",icon:"✦",name:"Singularidade digital",desc:"Aumenta a eficiência geral em 35%.",cost:5000000000n,level:55}
];

const rivalSeed = [
  {id:"nexus",name:"Nexus Interactive",power:180,rate:1.2},
  {id:"pixel",name:"PixelForge",power:140,rate:1.05},
  {id:"nova",name:"NovaPlay",power:100,rate:1.35},
  {id:"red",name:"Red Circuit",power:75,rate:1.5},
  {id:"atlas",name:"Atlas Digital",power:55,rate:1.1}
];

const events = [
  {id:"boom",icon:"↗",name:"eventBoom",desc:"eventBoomDesc",bonus:125},
  {id:"expo",icon:"✦",name:"eventExpo",desc:"eventExpoDesc",bonus:150},
  {id:"crisis",icon:"↘",name:"eventCrisis",desc:"eventCrisisDesc",bonus:75},
  {id:"console",icon:"▣",name:"eventConsole",desc:"eventConsoleDesc",bonus:115},
  {id:"quiet",icon:"◌",name:"eventQuiet",desc:"eventQuietDesc",bonus:100}
];

const achievementData = [
  {id:"sales1",name:["Primeiro cliente","First customer"],desc:["Realize sua primeira venda.","Make your first sale."],check:s=>s.sales>=1,reward:100n},
  {id:"sales100",name:["Loja movimentada","Busy store"],desc:["Realize 100 vendas.","Make 100 sales."],check:s=>s.sales>=100,reward:10000n},
  {id:"level10",name:["Em ascensão","On the rise"],desc:["Alcance o nível 10.","Reach level 10."],check:s=>s.level>=10,reward:25000n},
  {id:"games5",name:["Colecionador","Collector"],desc:["Adquira cinco jogos.","Acquire five games."],check:s=>s.games.length>=5,reward:100000n},
  {id:"staff10",name:["Grande equipe","Big team"],desc:["Tenha dez funcionários.","Hire ten employees."],check:s=>s.staff>=10,reward:150000n},
  {id:"share25",name:["Nome conhecido","Recognized name"],desc:["Alcance 25% do mercado.","Reach 25% market share."],check:s=>getMarketShare()>=25,reward:500000n},
  {id:"lifetime1m",name:["Milionário","Millionaire"],desc:["Fature um milhão.","Earn one million."],check:s=>BI(s.lifetime)>=1000000n,reward:100000n},
  {id:"level50",name:["Titã empresarial","Business titan"],desc:["Alcance o nível 50.","Reach level 50."],check:s=>s.level>=50,reward:BI("100000000")}
];

const secretsData = [
  {id:"lostgame",name:"The Lost Build",hint:"Um projeto que nunca chegou às prateleiras.",level:30,condition:s=>s.level>=30,desc:"Uma versão esquecida de um jogo foi encontrada nos arquivos."},
  {id:"blackroom",name:"Black Room",hint:"A empresa precisa alcançar uma escala incomum.",level:50,condition:s=>s.level>=50&&s.prestige>=1,desc:"Uma sala de servidores que não consta nas plantas."},
  {id:"ghostcompany",name:"Company Zero",hint:"O ranking não mostra todas as empresas.",level:70,condition:s=>s.level>=70&&getMarketShare()>=30,desc:"Uma empresa desconhecida enviou uma mensagem."},
  {id:"deeparchive",name:"Deep Archive",hint:"O arquivo tem mais camadas do que parece.",level:100,condition:s=>s.level>=100&&s.prestige>=3,desc:"Um catálogo anterior à fundação da própria empresa."},
  {id:"singularitysecret",name:"The Singularity",hint:"Nem mesmo o mercado parece compreender o que vem depois.",level:150,condition:s=>s.level>=150&&s.prestige>=5,desc:"Uma descoberta que muda a lógica da economia."}
];

const secretCodes = {
  ARCHIVE:{id:"archivecode",reward:100000n},
  "404":{id:"error404",reward:500000n},
  BEYOND:{id:"beyondcode",reward:5000000n}
};

const missionTemplates = [
  {id:"sales",type:"sales",target:25,reward:500n,name:"missionSales"},
  {id:"income",type:"income",target:5000,reward:2500n,name:"missionIncome"},
  {id:"purchases",type:"purchases",target:3,reward:1800n,name:"missionPurchases"},
  {id:"market",type:"market",target:1,reward:2200n,name:"missionMarket"}
];

const contractsData = [
  {id:"contract1",name:"Expansão regional",desc:"Adquira duas unidades de expansão.",target:2,type:"expansions",reward:25000n},
  {id:"contract2",name:"Catálogo crescente",desc:"Adquira quatro jogos diferentes.",target:4,type:"games",reward:50000n},
  {id:"contract3",name:"Equipe de elite",desc:"Contrate dez funcionários.",target:10,type:"staff",reward:100000n}
];

/* ==========================================
   ECONOMY
========================================== */

function format(value) {
  let n;
  try {
    n = BI(value);
  } catch {
    n = 0n;
  }

  if (n < 0n) return "-" + format(-n);

  const raw = n.toString();
  if (raw.length <= 3) return "$" + raw;

  const group = Math.floor((raw.length - 1) / 3);
  const suffix = [
    "","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No",
    "Dc","Ud","Dd","Td","Qad","Qid","Sxd","Spd","Ocd",
    "Nod","Vg","Uvg","Dvg","Tvg","Qavg","Qivg","Sxvg",
    "Spvg","Ocvg","Novg","Tg"
  ];

  const head = raw.slice(0, raw.length - group * 3);
  const decimal = raw.slice(head.length, head.length + 2);

  return suffix[group]
    ? "$" + head + (decimal ? "." + decimal : "") + suffix[group]
    : "$" + raw[0] + "." + raw.slice(1, 4) + "e" + (raw.length - 1);
}

function tval(array) {
  return array[lang === "pt" ? 0 : 1];
}

function canAfford(cost) {
  return BI(state.cash) >= BI(cost);
}

function spend(cost) {
  cost = BI(cost);

  if (!canAfford(cost)) {
    toast(tr("needMore"));
    return false;
  }

  state.cash = (BI(state.cash) - cost).toString();
  return true;
}

function costFor(base, level, growth = 135n) {
  let cost = BI(base);

  for (let i = 0; i < level; i++) {
    cost = cost * growth / 100n + 1n;
  }

  return cost;
}

function multiplier() {
  return 100
    + state.prestige * 10
    + state.expansions.length * 15
    + state.research.length * 12
    + state.games.length * 3
    + state.characters.length * 2
    + state.strategies * 4;
}

function eventMultiplier() {
  return events[state.event]?.bonus || 100;
}

function getIncome() {
  let amount = BI(state.income) * BI(multiplier()) / 100n;
  amount = amount * BI(eventMultiplier()) / 100n;
  return amount;
}

function getClick() {
  let amount = BI(state.click) * BI(multiplier()) / 100n;

  if (events[state.event]?.id === "expo") {
    amount = amount * 150n / 100n;
  }

  return amount;
}

function getPlayerPower() {
  return 100
    + state.level * 2
    + state.units * 15
    + state.marketing * 8
    + state.expansions.length * 22
    + state.games.length * 3
    + state.strategies * 5;
}

function getMarketShare() {
  const playerPower = getPlayerPower();
  const rivalPower = state.competitors.reduce(
    (sum, rival) => sum + rival.power,
    0
  );

  return Math.max(
    1,
    Math.min(95, Math.round(playerPower / (playerPower + rivalPower) * 100))
  );
}

function revenue(amount) {
  amount = BI(amount);

  if (amount <= 0n) return;

  state.cash = (BI(state.cash) + amount).toString();
  state.lifetime = (BI(state.lifetime) + amount).toString();

  if (state.missions) {
    state.missions.incomeProgress = (
      BI(state.missions.incomeProgress || "0") + amount
    ).toString();
  }

  addXP(Math.max(1, Math.min(500, amount.toString().length * 2)));
}

function addXP(amount) {
  state.xp += amount;

  let levelled = false;

  while (state.xp >= xpNeeded()) {
    state.xp -= xpNeeded();
    state.level++;
    levelled = true;
    unlockCharacters();
  }

  if (levelled) {
    toast("LEVEL UP! " + state.level);
    addNews("Nível " + state.level + " alcançado.");
  }
}

function xpNeeded() {
  return Math.floor(100 * Math.pow(1.19, state.level - 1));
}

function sell() {
  revenue(getClick());
  state.sales++;
  state.missions.sales = (state.missions.sales || 0) + 1;

  checkAchievements();
  render();
  save();
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;

  $("toastContainer").appendChild(el);

  setTimeout(() => el.remove(), 3000);
}

function addNews(message) {
  state.news.unshift({
    message,
    time:Date.now()
  });

  state.news = state.news.slice(0, 5);
}

function unlockCharacters() {
  characters.forEach(character => {
    if (
      state.level >= character.level &&
      !state.characters.includes(character.id)
    ) {
      state.characters.push(character.id);
      toast(tr("secretFound") + " " + character.name);
    }
  });
}

/* ==========================================
   INVESTMENTS
========================================== */

function buyInvestment(id) {
  const item = investments.find(x => x.id === id);
  if (!item) return;

  const level = state.investments[id] || 0;

  if (state.level < item.unlock) return;

  const cost = costFor(item.base, level, item.growth);

  if (!spend(cost)) return;

  state.investments[id] = level + 1;
  state.totalPurchases++;

  state.missions.purchases =
    (state.missions.purchases || 0) + 1;

  if (item.type === "income") {
    state.income = (BI(state.income) + item.effect).toString();
  }

  if (item.type === "marketing") {
    state.marketing += 1;
  }

  if (item.type === "tech") {
    state.income = (BI(state.income) + item.effect * 10n).toString();
  }

  addXP(8);
  addNews(tr("newsUpgrade"));

  checkAchievements();
  render();
  save();
}

function buyExpansion(id) {
  const item = expansions.find(x => x.id === id);

  if (
    !item ||
    state.expansions.includes(id) ||
    state.level < item.level
  ) return;

  if (!spend(item.cost)) return;

  state.expansions.push(id);
  state.units++;

  state.income = (
    BI(state.income) + item.cost / 100n
  ).toString();

  addXP(35);
  addNews(item.name + " acquired.");

  toast(item.name + " — " + tr("open"));

  checkAchievements();
  render();
  save();
}

function buyResearch(id) {
  const item = research.find(x => x.id === id);

  if (
    !item ||
    state.research.includes(id) ||
    state.level < item.level
  ) return;

  if (!spend(item.cost)) return;

  state.research.push(id);
  addXP(50);

  toast(item.name + " — " + tr("researchDone"));

  render();
  save();
}

function buyGame(id) {
  const game = games.find(x => x.id === id);

  if (
    !game ||
    state.games.includes(id) ||
    state.level < game.level
  ) return;

  if (!spend(game.price)) return;

  state.games.push(id);
  addXP(20);

  toast(game.name + " — " + tr("owned"));

  checkAchievements();
  render();
  save();
}

/* ==========================================
   COMPETITION
========================================== */

function initializeCompetitors() {
  if (!Array.isArray(state.competitors) || !state.competitors.length) {
    state.competitors = rivalSeed.map(rival => ({...rival}));
  }
}

function updateCompetitors() {
  initializeCompetitors();

  state.competitors.forEach(rival => {
    const growth = 1 + Math.random() * 0.025;
    rival.power = Math.max(8, Math.floor(rival.power * growth));
  });

  if (Math.random() < 0.16) {
    const rival = state.competitors[
      Math.floor(Math.random() * state.competitors.length)
    ];

    addNews(rival.name + " está investindo em uma nova estratégia.");
  }
}

function marketMood() {
  const moods = ["stable","rising","volatile","declining"];
  return tr(moods[Math.floor((Date.now() / 90000) % moods.length)]);
}

function investStrategy(type) {
  const strategies = {
    marketing:{cost:5000n,bonus:2},
    price:{cost:12000n,bonus:1},
    brand:{cost:50000n,bonus:3}
  };

  const strategy = strategies[type];

  if (!strategy || !spend(strategy.cost)) return;

  state.strategies += strategy.bonus;
  state.marketing += strategy.bonus;

  state.missions.market =
    (state.missions.market || 0) + 1;

  addXP(15);

  toast(tr("strategyUsed"));

  checkAchievements();
  render();
  save();
}

/* ==========================================
   MARKET EVENTS
========================================== */

function rotateEvent() {
  let next = Math.floor(Math.random() * events.length);

  if (next === state.event) {
    next = (next + 1) % events.length;
  }

  state.event = next;
  state.eventEnds = Date.now() + 120000;

  addNews(tr(events[next].name));
  render();
}

function renderEvent() {
  const event = events[state.event] || events[4];

  $("eventIcon").textContent = event.icon;
  $("eventName").textContent = tr(event.name);
  $("eventDescription").textContent = tr(event.desc);

  $("eventTimer").textContent =
    tr("eventRemaining") + " " +
    Math.max(0, Math.ceil((state.eventEnds - Date.now()) / 1000)) + "s";

  $("eventTag").textContent = event.bonus + "%";
}

/* ==========================================
   MISSIONS
========================================== */

function todayKey() {
  const date = new Date();

  return date.getFullYear() + "-" +
    (date.getMonth() + 1) + "-" +
    date.getDate();
}

function ensureMissions() {
  if (state.missionDay !== todayKey()) {
    state.missionDay = todayKey();

    state.missions = {
      sales:0,
      incomeProgress:"0",
      purchases:0,
      market:0
    };

    state.missionClaimed = [];
  }

  state.missions = {
    sales:state.missions.sales || 0,
    incomeProgress:state.missions.incomeProgress || "0",
    purchases:state.missions.purchases || 0,
    market:state.missions.market || 0
  };
}

function missionValue(mission) {
  if (mission.type === "sales") {
    return state.missions.sales || 0;
  }

  if (mission.type === "income") {
    const value = BI(state.missions.incomeProgress || "0");

    return Number(
      value > 1000000000n ? 1000000000n : value
    );
  }

  if (mission.type === "purchases") {
    return state.missions.purchases || 0;
  }

  if (mission.type === "market") {
    return state.missions.market || 0;
  }

  return 0;
}

function claimMission(id) {
  const mission = missionTemplates.find(m => m.id === id);

  if (
    !mission ||
    state.missionClaimed.includes(id) ||
    missionValue(mission) < mission.target
  ) return;

  state.missionClaimed.push(id);

  revenue(mission.reward);

  toast(tr("objectiveReward"));

  render();
  save();
}

/* ==========================================
   ACHIEVEMENTS
========================================== */

function checkAchievements() {
  achievementData.forEach(achievement => {
    if (
      !state.achievements.includes(achievement.id) &&
      achievement.check(state)
    ) {
      state.achievements.push(achievement.id);

      revenue(achievement.reward);

      toast("🏆 " + tval(achievement.name));

      addNews("Achievement unlocked: " + tval(achievement.name));
    }
  });
}

/* ==========================================
   CONTRACTS
========================================== */

function contractProgress(contract) {
  if (contract.type === "expansions") return state.expansions.length;
  if (contract.type === "games") return state.games.length;
  if (contract.type === "staff") return state.staff;

  return 0;
}

function claimContract(id) {
  const contract = contractsData.find(x => x.id === id);

  if (
    !contract ||
    state.contracts.includes(id) ||
    contractProgress(contract) < contract.target
  ) return;

  state.contracts.push(id);

  revenue(contract.reward);

  toast(tr("contractDone"));

  render();
  save();
}

/* ==========================================
   SECRETS
========================================== */

function checkSecrets() {
  secretsData.forEach(secret => {
    if (
      !state.secrets.includes(secret.id) &&
      secret.condition(state)
    ) {
      state.secrets.push(secret.id);

      toast(tr("secretFound") + " " + secret.name);

      addNews("Registro classificado encontrado: " + secret.name);

      revenue(BI(state.level) * 1000n);
    }
  });
}

function redeemSecretCode() {
  const code = $("secretCode").value.trim().toUpperCase();
  const reward = secretCodes[code];

  if (!reward) {
    $("codeFeedback").textContent = tr("secretCodeWrong");
    return;
  }

  if (state.codes.includes(code)) {
    $("codeFeedback").textContent = tr("secretCodeUsed");
    return;
  }

  state.codes.push(code);
  state.secrets.push(reward.id);

  revenue(reward.reward);

  $("codeFeedback").textContent = tr("secretCodeSuccess");
  $("secretCode").value = "";

  toast(tr("secretFound"));

  render();
  save();
}

/* ==========================================
   PRESTIGE
========================================== */

function prestigeReward() {
  return state.level < 25 ? 0 : Math.floor(state.level / 25);
}

function performPrestige() {
  const reward = prestigeReward();

  if (!reward) return;

  if (!confirm(tr("prestigeConfirm"))) return;

  const total = state.prestige + reward;
  const codes = [...state.codes];
  const secrets = [...state.secrets];

  state = newState();

  state.prestige = total;
  state.codes = codes;
  state.secrets = secrets;

  initializeCompetitors();

  addNews(tr("prestigeSuccess"));

  save();
  render();
  showPage("store");

  toast(tr("prestigeSuccess"));
}

/* ==========================================
   RENDER: DASHBOARD
========================================== */

function renderStats() {
  $("moneyDisplay").textContent = format(state.cash);
  $("incomeDisplay").textContent = format(getIncome()) + "/s";
  $("clickDisplay").textContent = format(getClick());
  $("lifetimeDisplay").textContent = format(state.lifetime);
  $("sellValue").textContent = "+" + format(getClick());

  $("saleCount").textContent =
    state.sales + " " + tr("sales");

  $("levelLabel").textContent =
    (lang === "pt" ? "NÍVEL " : "LEVEL ") + state.level;

  $("xpLabel").textContent =
    Math.floor(state.xp) + " / " + xpNeeded() + " XP";

  $("xpBar").style.width =
    Math.min(100, state.xp / xpNeeded() * 100) + "%";

  $("prestigeLabel").textContent =
    state.prestige + " " + tr("prestigePoints");

  $("summaryLevel").textContent = state.level;
  $("summaryStaff").textContent = state.staff;
  $("summaryUnits").textContent = state.units;
  $("summaryShare").textContent = getMarketShare() + "%";

  $("gamesCount").textContent =
    state.games.length + "/" + games.length;

  $("charactersCount").textContent =
    state.characters.length + "/" + characters.length;

  $("prestigeReward").textContent = prestigeReward();
  $("prestigeTotal").textContent = state.prestige;

  $("prestigeBonus").textContent =
    "+" + (state.prestige * 10) + "%";

  $("prestigeRequirement").textContent =
    state.level < 25
      ? tr("prestigeNeed")
      : tr("prestigeBonusText");

  $("prestigeButton").disabled = prestigeReward() < 1;
}

function renderMilestone() {
  const goals = [
    {v:100n,k:"firstGoal"},
    {v:10000n,k:"secondGoal"},
    {v:1000000n,k:"thirdGoal"},
    {v:100000000n,k:"fourthGoal"},
    {v:10000000000n,k:"fifthGoal"}
  ];

  const total = BI(state.lifetime);

  const goal = goals.find(g => total < g.v) ||
    {v:total * 2n,k:"fifthGoal"};

  const index = goals.indexOf(goal);
  const previous = index > 0 ? goals[index - 1].v : 0n;

  const pct = Number(
    (total - previous) * 100n / (goal.v - previous)
  );

  $("milestoneName").textContent = tr(goal.k);
  $("milestoneBar").style.width =
    Math.max(0, Math.min(100, pct)) + "%";

  $("milestoneProgress").textContent =
    format(total) + " / " + format(goal.v);
}

/* ==========================================
   RENDER: INVESTMENTS
========================================== */

function renderInvestments() {
  $("investmentList").innerHTML = investments
    .filter(item =>
      investmentFilter === "all" ||
      item.cat === investmentFilter
    )
    .map(item => {
      const level = state.investments[item.id] || 0;
      const cost = costFor(item.base, level, item.growth);
      const unlocked = state.level >= item.unlock;

      const effect = item.type === "income"
        ? format(item.effect) + "/s"
        : item.type === "tech"
          ? "+" + item.effect * 10 + " produção"
          : "+" + item.effect + " influência";

      return `
        <article class="investment-card">
          <div class="investment-icon">${item.icon}</div>
          <h3>${tval(item.name)}</h3>
          <p>${tval(item.desc)}</p>

          <div class="card-meta">
            <span>${tr("level")} ${level}</span>
            <strong>${effect}</strong>
          </div>

          ${
            unlocked
              ? `<button class="buy-button"
                  data-action="investment"
                  data-id="${item.id}"
                  ${canAfford(cost) ? "" : "disabled"}>
                  ${tr("buy")} · ${format(cost)}
                </button>`
              : `<small class="muted">${tr("unlockLevel")} ${item.unlock}</small>`
          }
        </article>
      `;
    }).join("");
}

/* ==========================================
   RENDER: COLLECTION
========================================== */

function renderGames() {
  $("gamesGrid").innerHTML = games.map(game => {
    const owned = state.games.includes(game.id);
    const unlocked = state.level >= game.level;

    return `
      <article class="game-card ${owned ? "owned" : ""}">
        <div class="game-cover ${game.cover}">
          <span>${game.symbol}</span>
          <strong>${game.name.toUpperCase()}</strong>
          <small>GAME ARCHIVE ORIGINAL</small>
        </div>

        <div class="game-content">
          <h3>${game.name}</h3>
          <p>${game.genre}</p>

          ${
            owned
              ? `<span class="owned-label">✓ ${tr("owned")}</span>`
              : unlocked
                ? `<button class="buy-button"
                    data-action="game"
                    data-id="${game.id}"
                    ${canAfford(game.price) ? "" : "disabled"}>
                    ${tr("buy")} · ${format(game.price)}
                  </button>`
                : `<small class="muted">${tr("unlockLevel")} ${game.level}</small>`
          }
        </div>
      </article>
    `;
  }).join("");
}

function renderCharacters() {
  $("charactersGrid").innerHTML = characters.map(character => {
    const owned = state.characters.includes(character.id);

    return `
      <article class="character-card rarity-${character.rarity}">
        <div class="portrait">${owned ? character.emoji : "?"}</div>
        <h3>${owned ? character.name : "???"}</h3>
        <p>${owned ? character.desc : tr("unlockLevel") + " " + character.level}</p>
        <span class="rarity-label">
          ${owned ? tr(character.rarity) : tr("unknown")}
        </span>
      </article>
    `;
  }).join("");
}

/* ==========================================
   RENDER: EXPANSIONS AND RESEARCH
========================================== */

function renderExpansions() {
  $("expansionList").innerHTML = expansions.map(item => {
    const owned = state.expansions.includes(item.id);
    const unlocked = state.level >= item.level;

    return `
      <article class="expansion-card">
        <div class="investment-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>

        <div class="card-meta">
          <span>${tr("bonus")}</span>
          <strong>+15%</strong>
        </div>

        ${
          owned
            ? `<span class="owned-label">✓ ${tr("open")}</span>`
            : unlocked
              ? `<button class="buy-button"
                  data-action="expansion"
                  data-id="${item.id}"
                  ${canAfford(item.cost) ? "" : "disabled"}>
                  ${tr("buy")} · ${format(item.cost)}
                </button>`
              : `<small class="muted">${tr("unlockLevel")} ${item.level}</small>`
        }
      </article>
    `;
  }).join("");
}

function renderResearch() {
  $("researchList").innerHTML = research.map(item => {
    const owned = state.research.includes(item.id);
    const unlocked = state.level >= item.level;

    return `
      <article class="research-card">
        <div class="investment-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>

        <div class="card-meta">
          <span>${tr("bonus")}</span>
          <strong>+12%</strong>
        </div>

        ${
          owned
            ? `<span class="owned-label">✓ ${tr("researchDone")}</span>`
            : unlocked
              ? `<button class="buy-button"
                  data-action="research"
                  data-id="${item.id}"
                  ${canAfford(item.cost) ? "" : "disabled"}>
                  ${tr("buy")} · ${format(item.cost)}
                </button>`
              : `<small class="muted">${tr("unlockLevel")} ${item.level}</small>`
        }
      </article>
    `;
  }).join("");
}

/* ==========================================
   RENDER: MARKET
========================================== */

function renderMarket() {
  const companies = [
    {
      name:"Game Archive",
      power:getPlayerPower(),
      player:true
    },
    ...state.competitors.map(rival => ({
      name:rival.name,
      power:rival.power,
      player:false
    }))
  ];

  const total = companies.reduce(
    (sum, company) => sum + company.power,
    0
  );

  companies.forEach(company => {
    company.share = Math.round(company.power / total * 100);
  });

  companies.sort((a, b) => b.power - a.power);

  const rank = companies.findIndex(company => company.player) + 1;

  $("marketRank").textContent = "#" + rank;
  $("marketShareText").textContent =
    getMarketShare() + "% " + tr("marketShareText");

  $("marketMood").textContent = marketMood();

  $("competitorList").innerHTML = companies.map((company, index) => `
    <div class="competitor-row">
      <div class="company-name">
        <span class="company-rank">#${index + 1}</span>
        ${company.name}${company.player ? " · " + tr("you") : ""}
      </div>

      <div class="bar-track">
        <div class="${company.player ? "player-bar" : ""}"
          style="width:${company.share}%"></div>
      </div>

      <div class="company-share">${company.share}%</div>
    </div>
  `).join("");

  const strategies = [
    {
      id:"marketing",
      icon:"◎",
      name:tr("strategyMarketing"),
      desc:tr("strategyMarketingDesc"),
      cost:5000n
    },
    {
      id:"price",
      icon:"↘",
      name:tr("strategyPrice"),
      desc:tr("strategyPriceDesc"),
      cost:12000n
    },
    {
      id:"brand",
      icon:"✦",
      name:tr("strategyBrand"),
      desc:tr("strategyBrandDesc"),
      cost:50000n
    }
  ];

  $("strategyList").innerHTML = strategies.map(strategy => `
    <div class="strategy-card">
      <strong>${strategy.icon} ${strategy.name}</strong>
      <p>${strategy.desc}</p>

      <button class="buy-button"
        data-action="strategy"
        data-id="${strategy.id}"
        ${canAfford(strategy.cost) ? "" : "disabled"}>
        ${tr("buy")} · ${format(strategy.cost)}
      </button>
    </div>
  `).join("");
}

/* ==========================================
   RENDER: OBJECTIVES
========================================== */

function renderObjectives() {
  $("missionsList").innerHTML = missionTemplates.map(mission => {
    const value = missionValue(mission);
    const done = value >= mission.target;
    const claimed = state.missionClaimed.includes(mission.id);

    return `
      <div class="mission-row">
        <div class="objective-top">
          <strong class="objective-row-title">${tr(mission.name)}</strong>
          <span>${format(mission.reward)}</span>
        </div>

        <small class="objective-desc">
          ${tr("progress")}: ${Math.min(value, mission.target)} / ${mission.target}
        </small>

        <div class="progress">
          <div style="width:${Math.min(100, value / mission.target * 100)}%"></div>
        </div>

        ${
          claimed
            ? `<span class="owned-label">${tr("completed")}</span>`
            : done
              ? `<button class="buy-button"
                  data-action="mission"
                  data-id="${mission.id}">
                  ${tr("claim")}
                </button>`
              : ""
        }
      </div>
    `;
  }).join("");

  $("achievementsList").innerHTML = achievementData.map(achievement => {
    const done = state.achievements.includes(achievement.id);

    return `
      <div class="achievement-row">
        <div class="objective-top">
          <strong class="objective-row-title">
            ${done ? "🏆" : "◇"} ${tval(achievement.name)}
          </strong>
          <span>${done ? tr("completed") : format(achievement.reward)}</span>
        </div>

        <small class="objective-desc">${tval(achievement.desc)}</small>
      </div>
    `;
  }).join("");

  $("contractsList").innerHTML = contractsData.map(contract => {
    const value = contractProgress(contract);
    const done = value >= contract.target;
    const claimed = state.contracts.includes(contract.id);

    return `
      <div class="contract-row">
        <div class="objective-top">
          <strong>${contract.name}</strong>
          <span>${format(contract.reward)}</span>
        </div>

        <small class="objective-desc">
          ${contract.desc} · ${Math.min(value, contract.target)}/${contract.target}
        </small>

        <div class="progress">
          <div style="width:${Math.min(100, value / contract.target * 100)}%"></div>
        </div>

        ${
          claimed
            ? `<span class="owned-label">${tr("completed")}</span>`
            : done
              ? `<button class="buy-button"
                  data-action="contract"
                  data-id="${contract.id}">
                  ${tr("claim")}
                </button>`
              : ""
        }
      </div>
    `;
  }).join("");
}

/* ==========================================
   RENDER: SECRETS
========================================== */

function renderSecrets() {
  const unlocked = secretsData.filter(secret =>
    state.secrets.includes(secret.id)
  );

  const percentage = Math.round(
    unlocked.length / secretsData.length * 100
  );

  $("secretBar").style.width = percentage + "%";

  $("secretProgressText").textContent =
    percentage + "% " + tr("secretProgress");

  const latest = unlocked[unlocked.length - 1];

  $("secretTitle").textContent =
    latest ? latest.name : tr("lockedArchive");

  $("secretDescription").textContent =
    latest ? latest.desc : tr("secretLockedDesc");

  $("secretList").innerHTML = secretsData.map(secret => {
    const found = state.secrets.includes(secret.id);

    return `
      <article class="secret-card">
        <div class="secret-lock">${found ? "✧" : "▧"}</div>

        <strong>${found ? secret.name : tr("unknown")}</strong>

        <p>${found ? secret.desc : secret.hint}</p>

        <small class="muted">
          ${found
            ? tr("discovered")
            : tr("hidden") + " · " + tr("level") + " " + secret.level}
        </small>
      </article>
    `;
  }).join("");
}

/* ==========================================
   RENDER: NEWS
========================================== */

function renderNews() {
  $("newsFeed").innerHTML = state.news.length
    ? state.news.map(item => `
        <div class="news-item">
          <strong>${item.message}</strong>
          <small>
            ${new Date(item.time).toLocaleTimeString(
              lang === "pt" ? "pt-BR" : "en-US",
              {hour:"2-digit",minute:"2-digit"}
            )}
          </small>
        </div>
      `).join("")
    : `<small class="muted">${tr("noNews")}</small>`;
}

/* ==========================================
   GLOBAL RENDER
========================================== */

function render() {
  renderStats();
  renderMilestone();
  renderEvent();
  renderInvestments();
  renderGames();
  renderCharacters();
  renderExpansions();
  renderResearch();
  renderMarket();
  renderObjectives();
  renderSecrets();
  renderNews();
}

/* ==========================================
   NAVIGATION AND LANGUAGE
========================================== */

function showPage(id) {
  document.querySelectorAll(".nav-button").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === id);
  });

  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === "page-" + id);
  });
}

function applyLanguage() {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = tr(element.dataset.i18n);
  });

  $("musicLabel").textContent =
    musicEnabled ? tr("musicOn") : tr("musicOff");

  render();
}

/* ==========================================
   SAVE AND LOAD
========================================== */

function save() {
  state.lastSave = Date.now();

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    $("saveStatus").textContent = tr("saveStatus");
  } catch (error) {
    console.warn("Save error", error);
  }
}

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);

    if (!raw) return;

    const saved = JSON.parse(raw);
    const fresh = newState();

    state = {
      ...fresh,
      ...saved,

      investments:{...(saved.investments || {})},
      missions:{...(saved.missions || {})},

      games:Array.isArray(saved.games) ? saved.games : [],
      characters:Array.isArray(saved.characters) ? saved.characters : [],
      expansions:Array.isArray(saved.expansions) ? saved.expansions : [],
      research:Array.isArray(saved.research) ? saved.research : [],
      secrets:Array.isArray(saved.secrets) ? saved.secrets : [],
      codes:Array.isArray(saved.codes) ? saved.codes : [],
      achievements:Array.isArray(saved.achievements) ? saved.achievements : [],
      contracts:Array.isArray(saved.contracts) ? saved.contracts : [],
      news:Array.isArray(saved.news) ? saved.news : [],
      competitors:Array.isArray(saved.competitors) ? saved.competitors : []
    };

    initializeCompetitors();

    const away = Math.max(
      0,
      Math.min(
        8 * 60 * 60,
        (Date.now() - (state.lastSave || Date.now())) / 1000
      )
    );

    const earned = getIncome() * BI(Math.floor(away));

    if (earned > 0n) {
      revenue(earned);

      setTimeout(() => {
        toast("+" + format(earned) + " · Offline earnings");
      }, 700);
    }

  } catch (error) {
    console.warn("Save could not be loaded", error);
    state = newState();
  }
}

/* ==========================================
   AMBIENT MUSIC
========================================== */

function startMusic() {
  const AudioClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioClass) return;

  if (!audioContext) {
    audioContext = new AudioClass();
  }

  audioContext.resume();

  musicEnabled = true;
  $("musicLabel").textContent = tr("musicOn");

  if (musicTimer) return;

  const master = audioContext.createGain();
  master.gain.value = 0.045;
  master.connect(audioContext.destination);
  audioContext.master = master;

  const chords = [
    [130.81,164.81,196,261.63],
    [110,146.83,174.61,220],
    [98,130.81,164.81,196],
    [116.54,146.83,174.61,233.08]
  ];

  let index = 0;

  function play() {
    if (!musicEnabled) return;

    const now = audioContext.currentTime;

    chords[index % chords.length].forEach((frequency, i) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = i === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.11 / (i + 1), now + 1.5);
      gain.gain.setValueAtTime(0.11 / (i + 1), now + 5);
      gain.gain.linearRampToValueAtTime(0, now + 7.5);

      oscillator.connect(gain);
      gain.connect(audioContext.master);

      oscillator.start(now);
      oscillator.stop(now + 8);
    });

    index++;
  }

  play();
  musicTimer = setInterval(play, 7500);
}

function stopMusic() {
  musicEnabled = false;

  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }

  if (audioContext?.master) {
    audioContext.master.gain.setTargetAtTime(
      0,
      audioContext.currentTime,
      0.2
    );
  }

  $("musicLabel").textContent = tr("musicOff");
}

function toggleMusic() {
  if (musicEnabled) {
    stopMusic();
  } else {
    startMusic();
  }

  $("musicLabel").textContent =
    musicEnabled ? tr("musicOn") : tr("musicOff");
}

/* ==========================================
   GAME LOOP
========================================== */

function tick() {
  const now = Date.now();

  const elapsed = Math.min(
    5,
    Math.max(0, (now - lastTick) / 1000)
  );

  lastTick = now;

  if (getIncome() > 0n && elapsed > 0) {
    const earned =
      getIncome() * BI(Math.floor(elapsed * 10)) / 10n;

    revenue(earned);
  }

  if (now >= state.eventEnds) {
    rotateEvent();
  }

  // Atualização gradual e independente das concorrentes.
  if (Math.random() < 0.035) {
    updateCompetitors();
  }

  ensureMissions();
  checkAchievements();
  checkSecrets();

  render();
}

/* ==========================================
   EVENT HANDLERS
========================================== */

$("sellButton").addEventListener("click", sell);

$("musicButton").addEventListener("click", toggleMusic);

$("prestigeButton").addEventListener("click", performPrestige);

$("languageSelect").addEventListener("change", event => {
  lang = event.target.value;
  applyLanguage();
});

$("redeemCode").addEventListener("click", redeemSecretCode);

$("secretCode").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    redeemSecretCode();
  }
});

document.addEventListener("click", event => {
  const tab = event.target.closest("[data-tab]");

  if (tab) {
    showPage(tab.dataset.tab);
    return;
  }

  const goto = event.target.closest("[data-goto]");

  if (goto) {
    showPage(goto.dataset.goto);
    return;
  }

  const category = event.target.closest("[data-category]");

  if (category) {
    investmentFilter = category.dataset.category;

    document.querySelectorAll(".category-button").forEach(button => {
      button.classList.toggle("active", button === category);
    });

    renderInvestments();
    return;
  }

  const action = event.target.closest("[data-action]");

  if (!action) return;

  const id = action.dataset.id;

  if (action.dataset.action === "investment") {
    buyInvestment(id);
  }

  if (action.dataset.action === "game") {
    buyGame(id);
  }

  if (action.dataset.action === "expansion") {
    buyExpansion(id);
  }

  if (action.dataset.action === "research") {
    buyResearch(id);
  }

  if (action.dataset.action === "strategy") {
    investStrategy(id);
  }

  if (action.dataset.action === "mission") {
    claimMission(id);
  }

  if (action.dataset.action === "contract") {
    claimContract(id);
  }
});

/* ==========================================
   INITIALIZATION
========================================== */

load();
initializeCompetitors();
ensureMissions();

if (!state.news.length) {
  addNews(tr("newsStart"));
}

if (!state.eventEnds || state.eventEnds < Date.now()) {
  state.event = Math.floor(Math.random() * events.length);
  state.eventEnds = Date.now() + 120000;
}

applyLanguage();
render();

setInterval(tick, 1000);
setInterval(save, 10000);

window.addEventListener("beforeunload", save);
