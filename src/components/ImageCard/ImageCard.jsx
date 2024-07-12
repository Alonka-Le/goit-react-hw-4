import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt, onClick }) {
  return (
    <div className={css.container}>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
}
