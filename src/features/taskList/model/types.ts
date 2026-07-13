export type Filter = 'all' | 'completed' | 'incomplete';
export type Task = {
  id: string | number;
  title: string;
  completed: boolean;
};