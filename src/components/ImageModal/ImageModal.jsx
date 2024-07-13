import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  closeModal,
  url,
  alt_description,
  likes,
  description,
}) {
  return (
    <Modal isOpen={isOpen} onClick={closeModal} className={css.container}>
      <div className={css.content}>
        <button onClick={() => closeModal()} className={css.btn}>
          <IoIosCloseCircle className={css.svg} />
        </button>
        <img src={url} alt={alt_description} className={css.img} />
        <div className={css.overlay}>
          <p className={css.text}>{description}</p>
          <p className={css.text}> Likes: {likes}</p>
        </div>
      </div>
    </Modal>
  );
}
