import styles from "./Button.module.css";

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className={styles.botao}>
      {children}
    </button>
  );
}