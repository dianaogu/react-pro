import { TaskWidget } from 'widgets/task/ui/TaskWidget';
import styles from "./TaskPage.module.css";

export function TaskPage() {

 return (

   <div>

     <h1 className={styles.header}>Мои задачи</h1>

     <TaskWidget />

   </div>

 );

}