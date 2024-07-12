import css from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  const { urls, alt_description } = image;
  return (
    <div className={css.container}>
      <img
        src={urls.small}
        alt={alt_description}
        onClick={onClick}
        className={css.img}
      />
    </div>
  );
}
