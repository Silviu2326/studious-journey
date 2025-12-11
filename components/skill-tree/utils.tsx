import React from 'react';
import { 
  Skull, Zap, Layout, Terminal, Code2, Database, BookOpen 
} from 'lucide-react';
import { SkillNode, NodeType, NodeStatus, SkillLink } from '../../types';
import { ThemeType } from './types';

export const getNodeIcon = (node: SkillNode, theme: ThemeType) => {
  if (theme === 'PIRATE' && node.status === NodeStatus.LOCKED) return <Skull size={20} />;
  
  if (node.type === NodeType.BOSS) return <Zap size={24} />;
  if (node.type === NodeType.PROJECT) return <Layout size={20} />;
  if (node.type === NodeType.QUIZ) return <Terminal size={20} />;
  
  switch (node.category) {
    case 'PROGRAMMING': return <Code2 size={20} />;
    case 'CS': return <Database size={20} />;
    case 'LANGUAGES': return <BookOpen size={20} />;
    default: return <BookOpen size={20} />;
  }
};

export const generateSkillTree = (
    topic: string,
    level: string,
    goal: string
): { nodes: SkillNode[]; links: SkillLink[] } => {
    const nodes: SkillNode[] = [];
    const links: SkillLink[] = [];
    const sanitizedTopic = topic.trim();
    const prefix = sanitizedTopic.toLowerCase().replace(/\s+/g, '-');

    // Helper to create node
    const createNode = (
        id: string,
        title: string,
        desc: string,
        x: number,
        y: number,
        type: NodeType,
        lvl: number,
        time: string
    ): SkillNode => ({
        id: `${prefix}-${id}`,
        title,
        description: desc,
        x,
        y,
        type,
        status: NodeStatus.LOCKED,
        category: 'PROGRAMMING',
        level: lvl,
        estimatedTime: time,
        xpReward: 100 * lvl
    });

    // Structure:
    // 1. Fundamentals (L1) -> 2. Core Concepts (L1) -> 3. Practice (Project) (L2)
    // -> 4. Advanced (L2) -> 5. Boss Fight (L3)

    // Node 1: Intro
    nodes.push(createNode(
        'intro',
        `Intro a ${sanitizedTopic}`,
        `Conceptos básicos y configuración de entorno para ${sanitizedTopic}.`,
        400, 300,
        NodeType.LESSON,
        1,
        '1h'
    ));

    // Node 2: Core
    nodes.push(createNode(
        'core',
        `${sanitizedTopic} Core`,
        `Sintaxis y estructuras principales de ${sanitizedTopic}.`,
        600, 300,
        NodeType.LESSON,
        1,
        '2h'
    ));

    // Node 3: Project
    nodes.push(createNode(
        'project',
        `Proyecto Inicial`,
        `Aplicar ${sanitizedTopic} en un caso de uso real simple.`,
        800, 300,
        NodeType.PROJECT,
        2,
        '3h'
    ));

    // Node 4: Advanced
    nodes.push(createNode(
        'advanced',
        `${sanitizedTopic} Avanzado`,
        `Técnicas profesionales y optimización en ${sanitizedTopic}.`,
        1000, 300,
        NodeType.LESSON,
        2,
        '4h'
    ));

    // Node 5: Boss
    nodes.push(createNode(
        'boss',
        `Dominio de ${sanitizedTopic}`,
        `Demuestra que eres un experto en ${sanitizedTopic}.`,
        1200, 300,
        NodeType.BOSS,
        3,
        '5h'
    ));

    // Branching for specific goals
    if (goal.toLowerCase().includes('job') || goal.toLowerCase().includes('trabajo')) {
         nodes.push(createNode(
            'interview',
            'Entrevista Técnica',
            `Preguntas comunes de entrevista sobre ${sanitizedTopic}.`,
            1000, 500,
            NodeType.QUIZ,
            3,
            '2h'
        ));
        links.push({ source: `${prefix}-project`, target: `${prefix}-interview` });
    } else {
        nodes.push(createNode(
            'hobby',
            'Proyecto Personal',
            `Construye algo divertido con ${sanitizedTopic}.`,
            1000, 500,
            NodeType.PROJECT,
            2,
            '4h'
        ));
        links.push({ source: `${prefix}-project`, target: `${prefix}-hobby` });
    }

    // Links
    links.push({ source: `${prefix}-intro`, target: `${prefix}-core` });
    links.push({ source: `${prefix}-core`, target: `${prefix}-project` });
    links.push({ source: `${prefix}-project`, target: `${prefix}-advanced` });
    links.push({ source: `${prefix}-advanced`, target: `${prefix}-boss` });


    // Adjust status based on level
    if (level === 'intermediate' || level === 'advanced') {
        nodes[0].status = NodeStatus.COMPLETED;
        nodes[1].status = NodeStatus.COMPLETED;
        nodes[2].status = NodeStatus.IN_PROGRESS;
    } else {
        nodes[0].status = NodeStatus.AVAILABLE;
    }

    if (level === 'advanced') {
         nodes[2].status = NodeStatus.COMPLETED;
         nodes[3].status = NodeStatus.IN_PROGRESS;
    }

    return { nodes, links };
};
