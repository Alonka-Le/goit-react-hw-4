import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images }) {
  return (
    <ul className={css.list}>
      {images.map(({ id, urls, alt_description, onClick }) => (
        <li key={id} className={css.item}>
          <ImageCard image={{ urls, alt_description }} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
}
