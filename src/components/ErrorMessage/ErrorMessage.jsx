import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <div>Error! Reload the thread</div>
    </div>
  );
}
