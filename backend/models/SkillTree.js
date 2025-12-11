// Copied data from constants.ts

const FULLSTACK_NODES = [
  { id: 'html-basics', x: 400, y: 300, title: 'HTML Básico', description: 'Estructura semántica y etiquetas básicas.', type: 'LESSON', status: 'COMPLETED', category: 'PROGRAMMING', level: 1, estimatedTime: '45m', xpReward: 100 },
  { id: 'css-basics', x: 600, y: 300, title: 'CSS Fundamentos', description: 'Selectores, colores y tipografía.', type: 'LESSON', status: 'COMPLETED', category: 'PROGRAMMING', level: 1, estimatedTime: '60m', xpReward: 120 },
  { id: 'git-init', x: 400, y: 450, title: 'Git & GitHub', description: 'Control de versiones básico.', type: 'PROJECT', status: 'COMPLETED', category: 'CS', level: 1, estimatedTime: '90m', xpReward: 200 },
  { id: 'js-syntax', x: 800, y: 300, title: 'JS Sintaxis', description: 'Variables, loops y funciones.', type: 'LESSON', status: 'DECAYING', category: 'PROGRAMMING', level: 2, estimatedTime: '120m', xpReward: 150 },
  { id: 'dom-manipulation', x: 1000, y: 300, title: 'DOM API', description: 'Manipular el HTML desde JS.', type: 'PROJECT', status: 'IN_PROGRESS', category: 'PROGRAMMING', level: 2, estimatedTime: '3h', xpReward: 300 },
  { id: 'fetch-api', x: 1200, y: 300, title: 'Async & Fetch', description: 'Consumo de APIs y promesas.', type: 'LESSON', status: 'AVAILABLE', category: 'PROGRAMMING', level: 3, estimatedTime: '2h', xpReward: 250 },
  { id: 'react-intro', x: 1400, y: 200, title: 'React Intro', description: 'Componentes y Props.', type: 'LESSON', status: 'LOCKED', category: 'PROGRAMMING', level: 3, estimatedTime: '2h', xpReward: 300 },
  { id: 'vue-intro', x: 1400, y: 400, title: 'Vue Intro', description: 'La alternativa progresiva.', type: 'LESSON', status: 'LOCKED', category: 'PROGRAMMING', level: 3, estimatedTime: '2h', xpReward: 300 },
  { id: 'node-basics', x: 1000, y: 500, title: 'Node.js Básico', description: 'Runtime y módulos.', type: 'LESSON', status: 'AVAILABLE', category: 'PROGRAMMING', level: 2, estimatedTime: '1.5h', xpReward: 150 },
  { id: 'express-api', x: 1200, y: 500, title: 'Express API', description: 'Creación de servidores REST.', type: 'BOSS', status: 'LOCKED', category: 'PROGRAMMING', level: 3, estimatedTime: '4h', xpReward: 600 },
  { id: 'english-tech', x: 200, y: 600, title: 'Inglés Técnico', description: 'Vocabulario esencial.', type: 'QUIZ', status: 'COMPLETED', category: 'LANGUAGES', level: 1, estimatedTime: '30m', xpReward: 80 },
];

const FULLSTACK_LINKS = [
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

const PYTHON_NODES = [
  { id: 'py-basics', x: 400, y: 300, title: 'Python Sintaxis', description: 'Tipos de datos, listas y loops.', type: 'LESSON', status: 'COMPLETED', category: 'PROGRAMMING', level: 1, estimatedTime: '2h', xpReward: 100 },
  { id: 'py-functions', x: 600, y: 300, title: 'Funciones', description: 'Args, kwargs y lambdas.', type: 'LESSON', status: 'IN_PROGRESS', category: 'PROGRAMMING', level: 1, estimatedTime: '1.5h', xpReward: 120 },
  { id: 'py-datastruct', x: 800, y: 300, title: 'Estructuras de Datos', description: 'Diccionarios, Sets y Tuplas.', type: 'LESSON', status: 'AVAILABLE', category: 'CS', level: 2, estimatedTime: '2h', xpReward: 150 },
  { id: 'numpy', x: 1000, y: 200, title: 'NumPy', description: 'Cálculo numérico y matrices.', type: 'PROJECT', status: 'LOCKED', category: 'PROGRAMMING', level: 2, estimatedTime: '3h', xpReward: 250 },
  { id: 'pandas', x: 1000, y: 400, title: 'Pandas', description: 'Manipulación de DataFrames.', type: 'LESSON', status: 'LOCKED', category: 'PROGRAMMING', level: 2, estimatedTime: '4h', xpReward: 250 },
  { id: 'matplotlib', x: 1200, y: 300, title: 'Matplotlib', description: 'Visualización de datos básica.', type: 'PROJECT', status: 'LOCKED', category: 'PROGRAMMING', level: 3, estimatedTime: '3h', xpReward: 300 },
];

const PYTHON_LINKS = [
  { source: 'py-basics', target: 'py-functions' },
  { source: 'py-functions', target: 'py-datastruct' },
  { source: 'py-datastruct', target: 'numpy' },
  { source: 'py-datastruct', target: 'pandas' },
  { source: 'numpy', target: 'matplotlib' },
  { source: 'pandas', target: 'matplotlib' },
];

const MOBILE_NODES = [
    { id: 'dart-basics', x: 400, y: 300, title: 'Dart Fundamentos', description: 'Lenguaje base para Flutter.', type: 'LESSON', status: 'COMPLETED', category: 'PROGRAMMING', level: 1, estimatedTime: '2h', xpReward: 100 },
    { id: 'flutter-widgets', x: 600, y: 300, title: 'Flutter Widgets', description: 'Stateless vs Stateful.', type: 'LESSON', status: 'IN_PROGRESS', category: 'PROGRAMMING', level: 1, estimatedTime: '3h', xpReward: 150 },
    { id: 'flutter-layout', x: 800, y: 300, title: 'Layouts', description: 'Flex, Row, Column, Stack.', type: 'PROJECT', status: 'AVAILABLE', category: 'PROGRAMMING', level: 2, estimatedTime: '4h', xpReward: 200 },
    { id: 'state-mgmt', x: 1000, y: 300, title: 'Gestión de Estado', description: 'Provider, Riverpod, Bloc.', type: 'BOSS', status: 'LOCKED', category: 'CS', level: 3, estimatedTime: '6h', xpReward: 500 },
];

const MOBILE_LINKS = [
    { source: 'dart-basics', target: 'flutter-widgets' },
    { source: 'flutter-widgets', target: 'flutter-layout' },
    { source: 'flutter-layout', target: 'state-mgmt' },
];

const SKILL_TREES_DATA = {
  'fullstack': { nodes: FULLSTACK_NODES, links: FULLSTACK_LINKS },
  'python-ds': { nodes: PYTHON_NODES, links: PYTHON_LINKS },
  'mobile': { nodes: MOBILE_NODES, links: MOBILE_LINKS },
};

const AVAILABLE_TREES = [
  { id: 'fullstack', name: 'Fullstack JS' },
  { id: 'python-ds', name: 'Python Data Science' },
  { id: 'mobile', name: 'Mobile Flutter' },
];

class SkillTreeModel {
  constructor() {
    this.trees = { ...SKILL_TREES_DATA };
    this.availableTrees = [...AVAILABLE_TREES];
  }

  getTree(treeId) {
    return this.trees[treeId] || this.trees['fullstack'];
  }

  getAvailableTrees() {
    return this.availableTrees;
  }

  getNode(treeId, nodeId) {
    const tree = this.getTree(treeId);
    return tree.nodes.find(n => n.id === nodeId);
  }

  updateNodeStatus(treeId, nodeId, status) {
    const tree = this.getTree(treeId);
    const nodeIndex = tree.nodes.findIndex(n => n.id === nodeId);
    if (nodeIndex !== -1) {
      tree.nodes[nodeIndex].status = status;
      return tree.nodes[nodeIndex];
    }
    return null;
  }
}

module.exports = new SkillTreeModel();
