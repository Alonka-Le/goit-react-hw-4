import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchImg } from "../gallery-api";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1000);
  const [page, setPage] = useState(1);

  const onSubmit = (evt) => {
    setQuery(evt);
    setImages([]);
    setTotalPages(1000);
    setPage(1);
  };

  useEffect(() => {
    async function getImg() {
      if (!query) return;
      try {
        setLoading(true);
        setError(false);
        const { results, total_pages } = await fetchImg(query, page);
        setTotalPages(total_pages);
        setImages((prevArticles) => {
          [...prevArticles, ...results];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImg();
  }, [query, page]);
  console.log(images);

  return (
    <div>
      <h1>Image Gallery</h1>
      {page >= totalPages && <p>This is the end! Start a new search!</p>}
      <SearchBar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}

export default App;
