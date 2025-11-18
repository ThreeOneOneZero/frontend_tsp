const functionalities = {
  title: "Funcionalidades",
  theme: "Tema claro/escuro (localStorage)",
  translation: "Tradução PT-BR / EN-US",
  reusableComponents: "Componentes reutilizáveis",
  customHooks: "Hooks customizados (useFetch, useLocalStorage)",
  typeScript: "Tipagem TypeScript completa",
};

const header = {
  title: "Meu App",
  toggleTheme: "Alternar tema",
  language: "Idioma",
};

const pages = {
  home: "Início",
  about: "Sobre",
  users: "Usuários",
};

const body = {
  body: "Estrutura React pronta para começar!",
};

const showcase = {
  title: "Showcase de Componentes",
  description: "Todos os componentes prontos para usar",
  buttons: "Botões",
  sizes: "Tamanhos",
  states: "Estados",
  theme: "Tema Atual",
  info: "Informações",
};

const products = {
  title: "Produtos",
  description: "Gerencie seu catálogo de produtos",
  list: {
    description: "Lista de produtos",
    title: "Lista de Produtos",
    id: "ID",
    name: "Nome",
    price: "Preço",
    stock: "Estoque",
    actions: "Ações",
  },
  tabs: {
    table: "Tabela",
    grid: "Grade",
    list: "Lista",
  },
  units: "unidades",
  pcs: "un.",
  un: "un.",
};

export const pt_BR = {
  common: {
    welcome: "Bem-vindo",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Deletar",
    edit: "Editar",
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
  },
  products: products,
  header: header,
  pages: pages,
  functionalities: functionalities,
  body: body,
  showcase: showcase,
  dashboard: {
    title: "Dashboard",
    welcome: "Bem-vindo de volta, acompanhe suas métricas",
    activeProjects: "Projetos Ativos",
    totalUsers: "Total de Usuários",
    documents: "Documentos",
    hoursWorked: "Horas Trabalhadas",
    volumeControl: "Controle de Volume",
    recentActivity: "Atividades Recentes",
    quickActions: "Ações Rápidas",
    create: "Criar",
    manage: "Gerenciar",
    newProject: "Novo Projeto",
    createNewProject: "Criar novo projeto",
    newDocument: "Novo Documento",
    createDocument: "Criar documento",
    addUser: "Adicionar Usuário",
    inviteNewMember: "Convidar novo membro",
    files: "Arquivos",
    manageFiles: "Gerenciar arquivos",
    team: "Equipe",
    manageMembers: "Gerenciar membros",
  },
  settings: {
    title: "Configurações",
    description: "Página de configurações do sistema",
    managePreferences: "Gerencie suas preferências",
    category: "Categoria de Configurações",
    general: {
      label: "Configurações Gerais",
      description: "Configure as opções básicas do sistema",
    },
    security: {
      label: "Segurança",
      description: "Gerencie senha, autenticação e acesso",
    },
    notifications: {
      label: "Notificações",
      description: "Controle alertas e mensagens",
    },
    privacy: {
      label: "Privacidade",
      description: "Gerencie suas configurações de privacidade",
    },
    appearance: {
      label: "Aparência",
      description: "Personalize a aparência do sistema",
    },
  },
  scrollArea: {
    item: (i: number) => `Item ${i}`,
  },
  switch: {
    label: "Ativar/Desativar",
  },
  accordion: {
    item: (i: number) => `Seção ${i}`,
    content: "Conteúdo da seção",
    anotherContent: "Mais conteúdo da seção",
    moreContent: "Conteúdo extra da seção",
  },
  radioGroup: {
    option1: "Opção 1",
    option2: "Opção 2",
    option3: "Opção 3",
    result: "Resultado",
  },
  tabs: {
    tab1: "Aba 1",
    tab2: "Aba 2",
    tab3: "Aba 3",
    content: {
      1: "Conteúdo da Aba 1",
      2: "Conteúdo da Aba 2",
      3: "Conteúdo da Aba 3",
    },
  },
  popover: {
    description: "Este é um popover de exemplo.",
    title: "Título do Popover",
  },
  dropdown: {
    settings: "Configurações",
    logout: "Sair",
  },
  tooltip: {
    description: "Este é um tooltip de exemplo.",
    title: "Título do Tooltip",
  },
  dialog: {
    title: "Título do Dialog",
    description: "Este é um dialog de exemplo.",
    cancel: "Cancelar",
    confirm: "Confirmar",
    open: "Abrir Dialog",
    close: "Fechar",
  },
  button: {
    primary: "Botão Primário",
    secondary: "Botão Secundário",
    danger: "Botão de Perigo",
    outline: "Botão Outline",
  },
  examples: {
    title: "Exemplos de Componentes",
    description: "Componentes Radix UI em ação",
    lighting: "Iluminação",
    lightingDesc: "Controle a intensidade da luz",
    icon: "Ícone Dinâmico",
    iconSize: "Tamanho do Ícone",
    theme: "Tema",
    language: "Idioma",
    portuguese: "Português",
    english: "English",
    lightOn: "Luz Ligada",
    lightOff: "Luz Desligada",
    intensity: "Intensidade",
    menu: "Menu",
    edit: "Editar",
    duplicate: "Duplicar",
    delete: "Deletar",
    profile: "Perfil",
    statistics: "Estatísticas",
    notifications: "Notificações",
    settings: "Configurações",
    logout: "Sair",
    information: "Informação",
    infoText:
      "Este é um componente Popover com informações adicionais sobre o elemento.",
    formValidation: "Validação de Formulário",
    createAccount: "Criar Conta",
    agreeTerms: "Concordo com os termos",
    username: "Nome de usuário",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    dialogs: "Diálogos",
    openDialog: "Abrir Diálogo",
    dialogTitle: "Confirmação",
    dialogMessage: "Você tem certeza que deseja continuar?",
    yes: "Sim",
    no: "Não",
  },
};

export default pt_BR;
