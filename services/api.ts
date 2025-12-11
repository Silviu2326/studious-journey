import { UserStats, Mission, Goal, ActivityLog, SkillNode, SkillLink } from '../types';

const API_URL = 'http://localhost:3000/api';

export const fetchDashboardData = async () => {
  const response = await fetch(`${API_URL}/dashboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

export const fetchSkillTree = async (treeId: string) => {
  const response = await fetch(`${API_URL}/skill-tree/${treeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch skill tree');
  }
  return response.json();
};

export const fetchAvailableTrees = async () => {
  const response = await fetch(`${API_URL}/skill-tree/available`);
  if (!response.ok) {
    throw new Error('Failed to fetch available trees');
  }
  return response.json();
};
