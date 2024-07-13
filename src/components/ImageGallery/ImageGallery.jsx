import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={css.list}>
      {images.map(({ id, urls, alt_description, description, likes }) => (
        <li key={id} className={css.item}>
          <ImageCard
            image={{ urls, alt_description, description, likes }}
            openModal={onClick}
          />
        </li>
      ))}
    </ul>
  );
}
