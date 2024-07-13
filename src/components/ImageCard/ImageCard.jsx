import css from "./ImageCard.module.css";

export default function ImageCard({ image, openModal }) {
  const {
    urls: { small, regular },
    alt_description,
    description,
    likes,
  } = image;
  return (
    <div className={css.container}>
      <img
        src={small}
        alt={alt_description}
        onClick={() =>
          openModal({ regular, alt_description, likes, description })
        }
        className={css.img}
      />
    </div>
  );
}
