// Common types for the frontend application

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  projectId: number;
  createdById: number;
  assignedToId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  status: string;
  message: string;
  stack?: string;
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

export interface TaskFilter {
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  projectId?: number;
  assignedToId?: number;
  search?: string;
  sort?: 'createdAt' | 'dueDate' | 'priority' | 'title';
}
