import styles from "./Error.module.css";

export default function Error(props) {
  return (
    <section className={styles.error}>
      <p>{props.children}</p>
    </section>
  );
}
