import React from 'react';
import { 
  Skull, Zap, Layout, Terminal, Code2, Database, BookOpen 
} from 'lucide-react';
import { SkillNode, SkillLink, NodeType, NodeStatus } from '../../types';
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

export interface SkillTreeGenerationParams {
  topic: string;
  goal: string;
  level: string;
  timeCommitment: string;
}

export const generateSkillTree = (params: SkillTreeGenerationParams): { id: string; name: string; nodes: SkillNode[]; links: SkillLink[] } => {
  const { topic, level } = params;
  const id = topic.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
  const name = topic;

  // Basic layout logic to generate a simple tree structure based on the topic
  // This is a mock generator. In a real app, this might call an AI service.

  const nodes: SkillNode[] = [];
  const links: SkillLink[] = [];

  const createNode = (id: string, x: number, y: number, title: string, description: string, type: NodeType, level: number, status: NodeStatus = NodeStatus.LOCKED): SkillNode => ({
    id, x, y, title, description, type, status, category: 'PROGRAMMING', level, estimatedTime: '2h', xpReward: 100
  });

  // Root node
  const rootId = `${id}-basics`;
  nodes.push(createNode(rootId, 400, 300, `${topic} Basics`, `Fundamentos de ${topic}`, NodeType.LESSON, 1, NodeStatus.AVAILABLE));

  // Level 2 nodes
  const l2aId = `${id}-intermediate-1`;
  const l2bId = `${id}-intermediate-2`;
  nodes.push(createNode(l2aId, 600, 200, `Conceptos Intermedios A`, `Profundizando en ${topic}`, NodeType.LESSON, 2));
  nodes.push(createNode(l2bId, 600, 400, `Conceptos Intermedios B`, `Práctica de ${topic}`, NodeType.PROJECT, 2));

  links.push({ source: rootId, target: l2aId });
  links.push({ source: rootId, target: l2bId });

  // Level 3 nodes
  const l3Id = `${id}-advanced`;
  nodes.push(createNode(l3Id, 800, 300, `${topic} Avanzado`, `Dominio de ${topic}`, NodeType.BOSS, 3));

  links.push({ source: l2aId, target: l3Id });
  links.push({ source: l2bId, target: l3Id });

  if (level === 'Intermediate' || level === 'Advanced') {
      // Add more nodes for higher levels
      const l4Id = `${id}-expert`;
      nodes.push(createNode(l4Id, 1000, 300, `${topic} Experto`, `Maestría en ${topic}`, NodeType.BOSS, 4));
      links.push({ source: l3Id, target: l4Id });
  }

  return { id, name, nodes, links };
};
