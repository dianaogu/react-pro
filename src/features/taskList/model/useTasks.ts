import type { TaskType } from 'entities/task/model/types';
import { useState } from 'react';
import type { Filter } from './types';

const initialData: TaskType[] = [
  { id: '1', title: 'Провести аналитику', completed: false },
  { id: '2', title: 'Разработать функионал на бэке', completed: true },
  { id: '3', title: 'Разработать функионал на фронте', completed: false },
];

export function useTasks() {
  const [tasks, setTasks] = useState<TaskType[]>(initialData);
  const [filter, setFilter] = useState<Filter>('all');

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => String(t.id) !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
  };
}