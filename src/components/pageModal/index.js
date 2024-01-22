import styles from "./index.module.css";

export const PageModal = (props) => {
  return (
    <>
      <div className={styles.shadow} onClick={props.hide} />
      <span className={styles.message}>Clique fora do popup para fechá-lo</span>
      <div className={styles.container}>{props.content}</div>
    </>
  );
};
