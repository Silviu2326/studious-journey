
export enum NodeType {
  LESSON = 'LESSON',
  PROJECT = 'PROJECT',
  QUIZ = 'QUIZ',
  BOSS = 'BOSS'
}

export enum NodeStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DECAYING = 'DECAYING' // Oxidándose
}

export type PageView = 'DASHBOARD' | 'SKILL_TREE' | 'DOJO' | 'PLANNER' | 'COMMUNITY' | 'SETTINGS' | 'REVIEW' | 'LIBRARY';

export interface SubTask {
  id: string;
  title: string;
  durationMin: number;
  completed: boolean;
}

export interface Mission {
  id: string;
  title: string;
  type: 'LEARN' | 'REVIEW' | 'BOSS' | 'PROJECT';
  durationMin: number;
  xpReward: number;
  subTasks?: SubTask[];
  status: 'PENDING' | 'COMPLETED';
  nodeId?: string;
  topic?: string;
}

export interface UserStats {
  name: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  gems: number;
}

export interface Goal {
  title: string;
  targetDate: string;
  progressPercent: number;
  completedNodes: number;
  totalNodes: number;
  status: 'AHEAD' | 'BEHIND' | 'ON_TRACK';
}

export interface ActivityLog {
  id: string;
  message: string;
  type: 'COMPLETE' | 'ACHIEVEMENT' | 'ADD' | 'REVIEW';
  timestamp: string; // relative string for UI
}

export interface Notification {
  id: string;
  text: string;
  read: boolean;
  type: 'INFO' | 'WARNING' | 'SUCCESS';
}

// --- SKILL TREE TYPES ---

export interface SkillNode {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  type: NodeType;
  status: NodeStatus;
  category: 'PROGRAMMING' | 'LANGUAGES' | 'CS' | 'SOFT_SKILLS';
  level: number;
  estimatedTime: string;
  xpReward: number;
}

export interface SkillLink {
  source: string;
  target: string;
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
}

// --- DOJO TYPES ---

export interface DojoResource {
  id: string;
  title: string;
  type: 'VIDEO' | 'ARTICLE' | 'DOC' | 'BOOK';
  duration: string;
  status: 'LOCKED' | 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  isOfficial: boolean;
  url?: string;
}

export interface DojoQuiz {
  id: string;
  title: string;
  questionCount: number;
  estimatedTime: string;
  bestScore?: number;
  status: 'TODO' | 'COMPLETED';
  isBossFight?: boolean;
}

export interface DojoProject {
  id: string;
  title: string;
  description: string;
  checklist: { id: string; text: string; completed: boolean }[];
  status: 'TODO' | 'SUBMITTED' | 'COMPLETED';
}

export interface DojoHistoryItem {
  id: string;
  action: string;
  timestamp: string;
}

export interface DojoNote {
  content: string;
}

// --- PLANNER TYPES ---

export interface CalendarTask {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'LESSON' | 'QUIZ' | 'REVIEW' | 'PROJECT';
  durationMin: number;
  status: 'PENDING' | 'COMPLETED' | 'OVERDUE';
  nodeId?: string;
  nodeTitle?: string;
}

export interface PlannerSettings {
  dailyMinutes: number;
  studyDays: number[]; // 0 = Sunday, 1 = Monday, etc.
}

// --- REVIEW / FLASHCARD TYPES ---

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  nodeId: string;
  nodeTitle: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  nextReview: string;
  type: 'TEXT' | 'CODE';
}

// --- LIBRARY TYPES ---

export interface LibraryResource {
  id: string;
  title: string;
  type: 'VIDEO' | 'ARTICLE' | 'DOC' | 'BOOK' | 'COURSE' | 'REPO';
  url?: string;
  duration: string;
  nodeId: string;
  nodeTitle: string;
  cluster: string; // e.g., 'PROGRAMMING', 'CS'
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  progressPercent?: number;
  isFavorite: boolean;
  lastAccessed?: string;
  aiSummary?: string;
}

// --- COMMUNITY / GUILD TYPES ---

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatarInitials: string;
  guild?: string;
  xp: number;
  streak: number;
  isCurrentUser: boolean;
}

export interface GuildMember {
  id: string;
  name: string;
  role: 'LEADER' | 'MEMBER';
  xpContribution: number;
}

export interface GuildPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
  userIsMember: boolean;
  members?: GuildMember[];
  activityFeed?: string[];
  posts?: GuildPost[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'SOLO' | 'GUILD';
  currentProgress: number;
  target: number;
  unit: string; // 'XP' | 'NODES' | 'DAYS'
  reward: string;
  daysLeft: number;
  completed: boolean;
}
