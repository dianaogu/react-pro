import type { TaskType } from 'entities/task/model/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Filter } from './types';
import { useGetTasksQuery } from 'entities/task/api/tasksApi';

export function useTasks() {
    const { data: initialData = [] } = useGetTasksQuery();
    const [filter, setFilter] = useState<Filter>('all');
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTasks(initialData);

    }, [initialData]);

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