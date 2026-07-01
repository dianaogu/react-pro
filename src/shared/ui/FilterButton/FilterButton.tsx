import styles from "./FilterButton.module.css";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
};

export const FilterButton = ({
  children,
  active = false,
  onClick,
}: Props) => {
  return (
    <button
      className={active ? styles.activeFilter : styles.filter}
      onClick={onClick}
    >
      {children}
    </button>
  );
};