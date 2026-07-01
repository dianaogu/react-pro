export interface TaskType {

 id: string;

 title: string;

 completed: boolean;

}

export type TaskStatus = "completed" | "inprocess" | "todo" ;

export type Task = {
  id: string | number;
  title: string;
  completed: boolean;
};

export type TaskProps = {
  task: Task
};