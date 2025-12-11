
import { ActivityLog, Goal, Mission, Notification, UserStats, SkillNode, SkillLink, NodeType, NodeStatus, DojoResource, DojoQuiz, DojoProject, DojoHistoryItem, CalendarTask, LibraryResource, LeaderboardEntry, Guild, Challenge } from "./types";

export const MOCK_USER: UserStats = {
  name: "Silviu",
  level: 7,
  currentXp: 4320,
  nextLevelXp: 5000,
  streakDays: 12,
  gems: 320
};

export const MOCK_GOAL: Goal = {
  title: "Fullstack Junior en 6 meses",
  targetDate: "14 de junio 2026",
  progressPercent: 45,
  completedNodes: 27,
  totalNodes: 60,
  status: "AHEAD"
};

export const MOCK_MISSIONS: Mission[] = [
  {
    id: "m1",
    title: "Fundamentos de HTML",
    type: "LEARN",
    durationMin: 25,
    xpReward: 150,
    topic: "Programación",
    status: "PENDING",
    subTasks: [
      { id: "st1", title: "Ver vídeo 'HTML Básico'", durationMin: 15, completed: false },
      { id: "st2", title: "Hacer quiz de 10 preguntas", durationMin: 10, completed: false }
    ]
  },
  {
    id: "m2",
    title: "Repasar 30 tarjetas de JavaScript",
    type: "REVIEW",
    durationMin: 10,
    xpReward: 50,
    status: "PENDING"
  },
  {
    id: "m3",
    title: "Examen mini 'HTML + CSS básico'",
    type: "BOSS",
    durationMin: 20,
    xpReward: 500,
    status: "PENDING",
    topic: "Evaluación"
  }
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: "a1", message: "Has completado el nodo HTML básico", type: "COMPLETE", timestamp: "hace 2h" },
  { id: "a2", message: "Has aprobado el boss fight de POO", type: "ACHIEVEMENT", timestamp: "ayer" },
  { id: "a3", message: "Añadiste 'Clean Code' a recursos", type: "ADD", timestamp: "ayer" }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", text: "Boss fight disponible: CSS Grid", read: false, type: "SUCCESS" },
  { id: "n2", text: "Gremio 'React Devs' te ha invitado", read: false, type: "INFO" }
];

export const AI_SUGGESTION_PROMPT = `
Eres un mentor de programación experto. El usuario se llama Silviu y está estudiando para ser Fullstack JS.
Su nivel es 7. Está bloqueado o aburrido.
Dame una sugerencia muy breve (máximo 2 frases) de algo que pueda hacer ahora mismo que sea:
1. Un micro-aprendizaje (5 min).
2. O un reto divertido de código.
Responde en formato JSON: { "title": "...", "description": "..." }
`;

// --- SKILL TREE DATA ---

export const MOCK_SKILL_NODES: SkillNode[] = [
  // Cluster: Fundamentals
  { id: 'html-basics', x: 400, y: 300, title: 'HTML Básico', description: 'Estructura semántica y etiquetas básicas.', type: NodeType.LESSON, status: NodeStatus.COMPLETED, category: 'PROGRAMMING', level: 1, estimatedTime: '45m', xpReward: 100 },
  { id: 'css-basics', x: 600, y: 300, title: 'CSS Fundamentos', description: 'Selectores, colores y tipografía.', type: NodeType.LESSON, status: NodeStatus.COMPLETED, category: 'PROGRAMMING', level: 1, estimatedTime: '60m', xpReward: 120 },
  { id: 'git-init', x: 400, y: 450, title: 'Git & GitHub', description: 'Control de versiones básico.', type: NodeType.PROJECT, status: NodeStatus.COMPLETED, category: 'CS', level: 1, estimatedTime: '90m', xpReward: 200 },
  
  // Cluster: JS Logic
  { id: 'js-syntax', x: 800, y: 300, title: 'JS Sintaxis', description: 'Variables, loops y funciones.', type: NodeType.LESSON, status: NodeStatus.DECAYING, category: 'PROGRAMMING', level: 2, estimatedTime: '120m', xpReward: 150 },
  { id: 'dom-manipulation', x: 1000, y: 300, title: 'DOM API', description: 'Manipular el HTML desde JS.', type: NodeType.PROJECT, status: NodeStatus.IN_PROGRESS, category: 'PROGRAMMING', level: 2, estimatedTime: '3h', xpReward: 300 },
  { id: 'fetch-api', x: 1200, y: 300, title: 'Async & Fetch', description: 'Consumo de APIs y promesas.', type: NodeType.LESSON, status: NodeStatus.AVAILABLE, category: 'PROGRAMMING', level: 3, estimatedTime: '2h', xpReward: 250 },
  
  // Cluster: Frameworks
  { id: 'react-intro', x: 1400, y: 200, title: 'React Intro', description: 'Componentes y Props.', type: NodeType.LESSON, status: NodeStatus.LOCKED, category: 'PROGRAMMING', level: 3, estimatedTime: '2h', xpReward: 300 },
  { id: 'vue-intro', x: 1400, y: 400, title: 'Vue Intro', description: 'La alternativa progresiva.', type: NodeType.LESSON, status: NodeStatus.LOCKED, category: 'PROGRAMMING', level: 3, estimatedTime: '2h', xpReward: 300 },
  
  // Cluster: Backend
  { id: 'node-basics', x: 1000, y: 500, title: 'Node.js Básico', description: 'Runtime y módulos.', type: NodeType.LESSON, status: NodeStatus.AVAILABLE, category: 'PROGRAMMING', level: 2, estimatedTime: '1.5h', xpReward: 150 },
  { id: 'express-api', x: 1200, y: 500, title: 'Express API', description: 'Creación de servidores REST.', type: NodeType.BOSS, status: NodeStatus.LOCKED, category: 'PROGRAMMING', level: 3, estimatedTime: '4h', xpReward: 600 },

  // Cluster: Soft Skills
  { id: 'english-tech', x: 200, y: 600, title: 'Inglés Técnico', description: 'Vocabulario esencial.', type: NodeType.QUIZ, status: NodeStatus.COMPLETED, category: 'LANGUAGES', level: 1, estimatedTime: '30m', xpReward: 80 },
];

export const MOCK_SKILL_LINKS: SkillLink[] = [
  { source: 'html-basics', target: 'css-basics' },
  { source: 'css-basics', target: 'js-syntax' },
  { source: 'html-basics', target: 'git-init' },
  { source: 'js-syntax', target: 'dom-manipulation' },
  { source: 'dom-manipulation', target: 'fetch-api' },
  { source: 'fetch-api', target: 'react-intro' },
  { source: 'fetch-api', target: 'vue-intro' },
  { source: 'js-syntax', target: 'node-basics' },
  { source: 'node-basics', target: 'express-api' },
];

// --- DOJO CONTENT (MOCK FOR HTML BASICS) ---

export const MOCK_DOJO_RESOURCES: DojoResource[] = [
  { id: 'r1', title: 'HTML Crash Course', type: 'VIDEO', duration: '20 min', status: 'COMPLETED', isOfficial: true },
  { id: 'r2', title: 'Guía rápida de etiquetas', type: 'ARTICLE', duration: '10 min', status: 'IN_PROGRESS', isOfficial: true },
  { id: 'r3', title: 'MDN - Introducción a HTML', type: 'DOC', duration: '30 min', status: 'TODO', isOfficial: true },
  { id: 'r4', title: 'Trucos de SEO en HTML', type: 'VIDEO', duration: '15 min', status: 'TODO', isOfficial: false },
];

export const MOCK_DOJO_QUIZZES: DojoQuiz[] = [
  { id: 'q1', title: 'Quiz Inicial: Etiquetas', questionCount: 10, estimatedTime: '8 min', status: 'COMPLETED', bestScore: 80 },
  { id: 'q2', title: 'Quiz de Estructura Semántica', questionCount: 15, estimatedTime: '12 min', status: 'TODO' },
  { id: 'qb1', title: 'BOSS FIGHT: HTML Master', questionCount: 30, estimatedTime: '25 min', status: 'TODO', isBossFight: true },
];

export const MOCK_DOJO_PROJECTS: DojoProject[] = [
  { 
    id: 'p1', 
    title: 'Mi Primera Landing Page', 
    description: 'Crea una página simple para una cafetería ficticia. Debe incluir menú, horario y contacto.',
    status: 'TODO',
    checklist: [
      { id: 'c1', text: 'Uso de <h1> y <h2> correctamente', completed: false },
      { id: 'c2', text: 'Lista desordenada (<ul>) para el menú', completed: false },
      { id: 'c3', text: 'Formulario de contacto básico', completed: false },
      { id: 'c4', text: 'Imagen optimizada con alt text', completed: false },
    ]
  }
];

export const MOCK_DOJO_HISTORY: DojoHistoryItem[] = [
  { id: 'h1', action: 'Viste 15 min del vídeo "HTML Crash Course"', timestamp: '14:23' },
  { id: 'h2', action: 'Aprobaste el Quiz Inicial con 80%', timestamp: '14:55' },
  { id: 'h3', action: 'Añadiste el recurso "MDN - Guía HTML"', timestamp: 'Ayer' },
  { id: 'h4', action: 'Sesión de repaso SRS (12 tarjetas)', timestamp: 'Hace 3 días' },
];

export const MOCK_DOJO_NOTES = `# Mis Notas de HTML

## Etiquetas Importantes
- <h1> es el título principal, solo uno por página.
- <img src="" alt=""> siempre necesita alt.
- <a> para enlaces, target="_blank" abre nueva pestaña.

## Dudas
- ¿Cuándo usar <section> vs <div>?
  - Section tiene significado semántico, div es genérico.
`;

// --- LIBRARY DATA ---

export const MOCK_LIBRARY_RESOURCES: LibraryResource[] = [
  { 
    id: 'lib1', 
    title: 'HTML Crash Course', 
    type: 'VIDEO', 
    duration: '20 min', 
    nodeId: 'html-basics', 
    nodeTitle: 'HTML Básico', 
    cluster: 'PROGRAMMING', 
    status: 'COMPLETED', 
    isFavorite: true,
    progressPercent: 100,
    lastAccessed: 'Hace 2 días',
    aiSummary: 'Cubre estructura básica, etiquetas comunes, listas y atributos esenciales. Ritmo rápido y claro.'
  },
  { 
    id: 'lib2', 
    title: 'Guía Completa de Flexbox', 
    type: 'ARTICLE', 
    duration: '15 min', 
    nodeId: 'css-basics', 
    nodeTitle: 'CSS Fundamentos', 
    cluster: 'PROGRAMMING', 
    status: 'IN_PROGRESS', 
    isFavorite: true,
    progressPercent: 45,
    lastAccessed: 'Hace 1 hora'
  },
  { 
    id: 'lib3', 
    title: 'Clean Code - Libro Digital', 
    type: 'BOOK', 
    duration: '6h', 
    nodeId: 'js-syntax', 
    nodeTitle: 'JS Sintaxis', 
    cluster: 'CS', 
    status: 'TODO', 
    isFavorite: false,
    progressPercent: 0,
    aiSummary: 'Clásico de la ingeniería de software. Recomendado leer capítulo 1 y 2 para mejorar nombres de variables.'
  },
  { 
    id: 'lib4', 
    title: 'React Documentation', 
    type: 'DOC', 
    duration: 'N/A', 
    nodeId: 'react-intro', 
    nodeTitle: 'React Intro', 
    cluster: 'PROGRAMMING', 
    status: 'TODO', 
    isFavorite: false,
    progressPercent: 0
  },
  { 
    id: 'lib5', 
    title: 'Vocabulario Técnico Básico', 
    type: 'DOC', 
    duration: '10 min', 
    nodeId: 'english-tech', 
    nodeTitle: 'Inglés Técnico', 
    cluster: 'LANGUAGES', 
    status: 'COMPLETED', 
    isFavorite: false,
    progressPercent: 100
  },
   { 
    id: 'lib6', 
    title: 'Repo: Ejercicios de Algoritmos', 
    type: 'REPO', 
    duration: '2h', 
    nodeId: 'js-syntax', 
    nodeTitle: 'JS Sintaxis', 
    cluster: 'CS', 
    status: 'IN_PROGRESS', 
    isFavorite: true,
    progressPercent: 20
  }
];

// --- PLANNER DATA ---

export const getTodayStr = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

export const getFutureDateStr = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
}

export const MOCK_CALENDAR_TASKS: CalendarTask[] = [
    // Today
    { id: 'ct1', date: getTodayStr(), type: 'LESSON', title: 'Vídeo: HTML Básico', durationMin: 15, status: 'PENDING', nodeId: 'html-basics' },
    { id: 'ct2', date: getTodayStr(), type: 'QUIZ', title: 'Quiz: Etiquetas HTML', durationMin: 10, status: 'PENDING', nodeId: 'html-basics' },
    { id: 'ct3', date: getTodayStr(), type: 'REVIEW', title: 'SRS: JavaScript (30 cartas)', durationMin: 15, status: 'PENDING' },
    
    // Tomorrow
    { id: 'ct4', date: getFutureDateStr(1), type: 'LESSON', title: 'MDN: Intro a CSS', durationMin: 20, status: 'PENDING', nodeId: 'css-basics' },
    { id: 'ct5', date: getFutureDateStr(1), type: 'PROJECT', title: 'Proyecto Git: Init', durationMin: 45, status: 'PENDING', nodeId: 'git-init' },
    
    // Day + 2
    { id: 'ct6', date: getFutureDateStr(2), type: 'LESSON', title: 'Vídeo: CSS Selectores', durationMin: 25, status: 'PENDING', nodeId: 'css-basics' },
    { id: 'ct7', date: getFutureDateStr(2), type: 'REVIEW', title: 'SRS: HTML Semántico', durationMin: 10, status: 'PENDING' },

    // Overdue
    { id: 'ct_old1', date: getFutureDateStr(-2), type: 'LESSON', title: 'Intro a la Web', durationMin: 15, status: 'OVERDUE', nodeId: 'intro-web' },
];

// --- COMMUNITY / GUILD DATA ---

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'u1', rank: 1, name: 'CodeLuis', avatarInitials: 'CL', guild: 'Frontend Ninjas', xp: 2340, streak: 45, isCurrentUser: false },
  { id: 'u2', rank: 2, name: 'Sarah_Dev', avatarInitials: 'SD', guild: 'React Warriors', xp: 2100, streak: 30, isCurrentUser: false },
  { id: 'u3', rank: 3, name: 'MikeTs', avatarInitials: 'MT', guild: 'TypeScript Pros', xp: 1980, streak: 12, isCurrentUser: false },
  { id: 'u4', rank: 4, name: 'AnaCode', avatarInitials: 'AC', guild: 'Frontend Ninjas', xp: 1850, streak: 20, isCurrentUser: false },
  { id: 'u17', rank: 17, name: 'Silviu', avatarInitials: 'S', guild: 'Fullstack JS', xp: 1240, streak: 12, isCurrentUser: true }, // Current User
];

export const MOCK_GUILDS: Guild[] = [
  {
    id: 'g1',
    name: 'Fullstack JS Warriors',
    description: 'Grupo para programadores que quieren llegar a Fullstack en 2025. Nos enfocamos en el stack MERN.',
    memberCount: 12,
    isPrivate: true,
    userIsMember: true,
    members: [
      { id: 'm1', name: 'DevMaster', role: 'LEADER', xpContribution: 5000 },
      { id: 'm2', name: 'Silviu', role: 'MEMBER', xpContribution: 1240 },
      { id: 'm3', name: 'NewbieJS', role: 'MEMBER', xpContribution: 800 },
    ],
    activityFeed: [
      "@Ana ha dominado 'Algoritmos básicos'",
      "@Pepe ha hecho 120 tarjetas de repaso hoy",
      "El gremio ha superado el reto semanal de 10.000 XP"
    ],
    posts: [
      { id: 'post1', author: 'DevMaster', content: '¡Chicos! He encontrado un recurso genial para React Hooks.', timestamp: 'Hace 2h', likes: 5 },
      { id: 'post2', author: 'Silviu', content: '¿Alguien para estudiar juntos mañana a las 18:00?', timestamp: 'Hace 4h', likes: 2 },
    ]
  },
  {
    id: 'g2',
    name: 'English Grinders',
    description: 'Daily English practice for tech professionals. No excuses!',
    memberCount: 45,
    isPrivate: false,
    userIsMember: false
  },
  {
    id: 'g3',
    name: 'Pythonistas',
    description: 'Data Science y Backend con Python. Retos semanales.',
    memberCount: 28,
    isPrivate: false,
    userIsMember: false
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'ch1', title: 'Semana Imparable', description: 'Gana 500 XP esta semana sin romper la racha.',
    type: 'SOLO', currentProgress: 320, target: 500, unit: 'XP', reward: '50 Gemas', daysLeft: 3, completed: false
  },
  {
    id: 'ch2', title: 'Explorador de Nodos', description: 'Completa 3 nodos nuevos este mes.',
    type: 'SOLO', currentProgress: 1, target: 3, unit: 'NODES', reward: 'Insignia Explorador', daysLeft: 12, completed: false
  },
  {
    id: 'ch3', title: 'Dominio Colectivo', description: 'Como gremio, completad 10 boss fights.',
    type: 'GUILD', currentProgress: 7, target: 10, unit: 'BOSSES', reward: 'Bonus XP Gremio', daysLeft: 5, completed: false
  }
];
