import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchImg } from "../gallery-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { animateScroll as scroll } from "react-scroll";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1000);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAlt, setModalAlt] = useState("");
  const [modalLikes, setModalLikes] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const onSubmit = (newSearch) => {
    setQuery(newSearch);
    setImages([]);
    setTotalPages(1000);
    setPage(1);
  };

  function openModal({ regular, alt_description, description, likes }) {
    setModalIsOpen(true);
    setModalImage(regular);
    setModalAlt(alt_description);
    setModalDescription(description);
    setModalLikes(likes);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const loadMoreImg = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    async function getImg() {
      if (!query) return;
      try {
        setLoading(true);
        setError(false);
        const { results, total_pages } = await fetchImg(query, page);
        setImages((prevImages) => [...prevImages, ...results]);
        setTotalPages(total_pages);
        setLoadMore(page < total_pages);
        if (page > 1) {
          scroll.scrollToBottom();
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getImg();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {totalPages === 0 && <p>Not found! Start a new search!</p>}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onClick={openModal} />
          {loading && <Loader />}
          {loadMore && !loading && images.length > 0 && (
            <LoadMoreBtn onClick={loadMoreImg} />
          )}
          {modalImage && (
            <ImageModal
              isOpen={modalIsOpen}
              closeModal={closeModal}
              url={modalImage}
              alt_description={modalAlt}
              likes={modalLikes}
              description={modalDescription}
            ></ImageModal>
          )}
        </>
      )}
    </div>
  );
}

export default App;
