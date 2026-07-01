import { useTasks } from 'features/taskList/model/useTasks';
import { TaskList } from 'features/taskList/ui/TaskList';
import styles from './TaskWidget.module.css';

export const TaskWidget = () => {
  const { tasks, filter, setFilter, removeTask } = useTasks();

  return (
    <div className={styles.widget}>
      <TaskList
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        removeTask={removeTask}
      />
    </div>
  );
};