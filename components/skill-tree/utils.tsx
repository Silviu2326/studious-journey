import React from 'react';
import { 
  Skull, Zap, Layout, Terminal, Code2, Database, BookOpen 
} from 'lucide-react';
import { SkillNode, NodeType, NodeStatus } from '../../types';
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
