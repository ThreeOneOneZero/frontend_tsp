const functionalities = {
  title: "Functionalities",
  theme: "Light/Dark theme (localStorage)",
  translation: "PT-BR / EN-US translation",
  reusableComponents: "Reusable components",
  customHooks: "Custom hooks (useFetch, useLocalStorage)",
  typeScript: "Full TypeScript typing",
};

const header = {
  title: "My App",
  toggleTheme: "Toggle theme",
  language: "Language",
};

const pages = {
  home: "Home",
  about: "About",
  users: "Users",
};

const body = {
  body: "React structure ready to start!",
};

const showcase = {
  title: "Component Showcase",
  description: "All components ready to use",
  buttons: "Buttons",
  sizes: "Sizes",
  states: "States",
  theme: "Current Theme",
  info: "Information",
};

const products = {
  title: "Products",
  description: "Manage your product catalog",
  list: {
    description: "Products List",
    title: "Products List",
    id: "ID",
    name: "Name",
    price: "Price",
    stock: "Stock",
    actions: "Actions",
  },
  tabs: {
    table: "Table",
    grid: "Grid",
    list: "List",
  },
  units: "units",
  pcs: "pcs",
  un: "un.",
};

export const en_US = {
  common: {
    welcome: "Welcome",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    loading: "Loading...",
    error: "Error",
    success: "Success",
  },
  header: header,
  pages: pages,
  functionalities: functionalities,
  products: products,
  body: body,
  showcase: showcase,
  dashboard: {
    title: "Dashboard",
    welcome: "Welcome back, track your metrics",
    activeProjects: "Active Projects",
    totalUsers: "Total Users",
    documents: "Documents",
    hoursWorked: "Hours Worked",
    volumeControl: "Volume Control",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",
    create: "Create",
    manage: "Manage",
    newProject: "New Project",
    createNewProject: "Create new project",
    newDocument: "New Document",
    createDocument: "Create document",
    addUser: "Add User",
    inviteNewMember: "Invite new member",
    files: "Files",
    manageFiles: "Manage files",
    team: "Team",
    manageMembers: "Manage members",
  },
  settings: {
    title: "Settings",
    description: "System settings page",
    managePreferences: "Manage your preferences",
    category: "Settings Category",
    general: {
      label: "General Settings",
      description: "Configure basic system settings",
    },
    security: {
      label: "Security",
      description: "Manage password, authentication and access",
    },
    notifications: {
      label: "Notifications",
      description: "Control alerts and messages",
    },
    privacy: {
      label: "Privacy",
      description: "Manage your privacy settings",
    },
    appearance: {
      label: "Appearance",
      description: "Customize the system appearance",
    },
  },
  scrollArea: {
    item: (i: number) => `Item ${i}`,
  },
  switch: {
    label: "Enable/Disable",
  },
  accordion: {
    item: (i: number) => `Section ${i}`,
    content: "Section content",
    anotherContent: "More section content",
    moreContent: "Extra section content",
  },
  radioGroup: {
    option1: "Option 1",
    option2: "Option 2",
    option3: "Option 3",
    result: "Result",
  },
  tabs: {
    tab1: "Tab 1",
    tab2: "Tab 2",
    tab3: "Tab 3",
    content: {
      1: "Content for Tab 1",
      2: "Content for Tab 2",
      3: "Content for Tab 3",
    },
  },
  popover: {
    description: "This is a popover example.",
    title: "Popover Title",
  },
  dropdown: {
    settings: "Settings",
    logout: "Logout",
  },
  tooltip: {
    description: "This is a tooltip example.",
    title: "Tooltip Title",
  },
  dialog: {
    title: "Dialog Title",
    description: "This is a dialog example.",
    confirm: "Confirm",
    cancel: "Cancel",
    close: "Close",
    open: "Open",
  },
  button: {
    primary: "Primary Button",
    secondary: "Secondary Button",
    danger: "Danger Button",
    outline: "Outline Button",
  },
  examples: {
    title: "Component Examples",
    description: "Radix UI components in action",
    lighting: "Lighting",
    lightingDesc: "Control the light intensity",
    icon: "Dynamic Icon",
    iconSize: "Icon Size",
    theme: "Theme",
    language: "Language",
    portuguese: "Português",
    english: "English",
    lightOn: "Light On",
    lightOff: "Light Off",
    intensity: "Intensity",
    menu: "Menu",
    edit: "Edit",
    duplicate: "Duplicate",
    delete: "Delete",
    profile: "Profile",
    statistics: "Statistics",
    notifications: "Notifications",
    settings: "Settings",
    logout: "Logout",
    information: "Information",
    infoText:
      "This is a Popover component with additional information about the element.",
    formValidation: "Form Validation",
    createAccount: "Create Account",
    agreeTerms: "I agree to the terms",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    dialogs: "Dialogs",
    openDialog: "Open Dialog",
    dialogTitle: "Confirmation",
    dialogMessage: "Are you sure you want to continue?",
    yes: "Yes",
    no: "No",
  },
};

export default en_US;
