import type { TaskType } from 'entities/task/model/types';
import { TaskCard } from 'entities/task/ui/TaskCard';
import styles from './TaskList.module.css';
import type { Filter } from '../model/types';
import { DeleteIcon } from 'shared/ui/icons';
import { FilterButton } from 'shared/ui/FilterButton/FilterButton';

type Props = {
  tasks: TaskType[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  removeTask: (id: string) => void;
};

const filters = [
  { value: "all" as const, label: "All" },
  { value: "completed" as const, label: "Completed" },
  { value: "incomplete" as const, label: "Incomplete" },
];

export const TaskList = ({
  tasks,
  filter,
  setFilter,
  removeTask,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {filters.map(({ value, label }) => (
          <FilterButton
            key={value}
            active={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </FilterButton>
        ))}
      </div>

      <div className={styles.list}>
        {tasks.map(task => (
          <div key={task.id} className={styles.item}>
            <TaskCard task={task} />

            <button
              className={styles.delete}
              onClick={() => removeTask(String(task.id))}
            >
              <img src={DeleteIcon} alt="удалить" width={"16px"} height={"16px"} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};