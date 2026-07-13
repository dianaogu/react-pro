import type { TaskType } from 'entities/task/model/types';
import { useCallback, useMemo, useState } from 'react';
import type { Filter } from './types';

const initialData: TaskType[] = [
    { id: '1', title: 'Провести аналитику', completed: false },
    { id: '2', title: 'Разработать функионал на бэке', completed: true },
    { id: '3', title: 'Разработать функионал на фронте', completed: false },
];

export function useTasks() {
    const [tasks, setTasks] = useState<TaskType[]>(initialData);
    const [filter, setFilter] = useState<Filter>('all');

    const removeTask = useCallback((id: string) => {
        setTasks(prev => prev.filter(t => String(t.id) !== id));
    }, []);

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed);

            case 'incomplete':
                return tasks.filter(task => !task.completed);

            default:
                return tasks;
        }
    }, [filter, tasks]);


    return {
        tasks: filteredTasks,
        filter,
        setFilter,
        removeTask,
    };
}