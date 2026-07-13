import styles from "./TaskCard.module.css";
import type { TaskProps } from "../model/types";
import { CompletedIcon, UncompletedIcon } from "shared/ui/icons";
import React from "react";

const statusIcons = {
    completed: <img src={CompletedIcon} alt="completed"/>,
    uncompleted: <img src={UncompletedIcon} alt="completed"/>,
};

export const TaskCard = React.memo(({ task }: TaskProps) => {
    return (
        <div className={styles.task}>
            <span className={styles.icon}>
                {task.completed ? statusIcons.completed : statusIcons.uncompleted}
            </span>

            <span
                className={styles.title}>
                {task.title}
            </span>
        </div>
    );
});

TaskCard.displayName = "TaskCard"

