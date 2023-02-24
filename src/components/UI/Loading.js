import styles from "./Loading.module.css";

export default function Loading(props) {
  return (
    <section className={styles.loading}>
      <p>{props.children}</p>
    </section>
  );
}
