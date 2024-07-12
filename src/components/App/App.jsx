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

  const onSubmit = (newSerch) => {
    setQuery(newSerch);
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

        setImages((prevImages) => [...prevImages, ...results]);
        setTotalPages(total_pages);
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
      {page >= totalPages && <p>This is the end! Start a new search!</p>}
      <SearchBar onSubmit={onSubmit} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} />
          {loading && <Loader />}
          {/* {hasMore && !isLoading && <LoadMoreBtn onClick={loadMoreImages} />} */}
        </>
      )}
    </div>
  );
}

export default App;
