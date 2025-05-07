// import "modern-normalize";
// import { useState } from "react";
// import "./App.css";
// import { Toaster } from "react-hot-toast";
// import SearchBar from "./components/SearchBar/SearchBar";
// import ImageGallery from "./components/ImageGallery/ImageGallery";
// import Loader from "./components/Loader/Loader";
// import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
// import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
// import { fetchImages } from "../src/images-api";
// import ImageModal from "./components/ImageModal/ImageModal";

// function App() {
//   const [images, setImages] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [query, setQuery] = useState("");

//   const [page, setPage] = useState(1);

//   const [isModalOpen, setIsModalOpen] = useState("");

//   const [error, setError] = useState(false);

//   const openModal = (imageUrl) => {
//     setIsModalOpen(imageUrl);
//   };

//   const closeModal = () => {
//     setIsModalOpen(null);
//   };

//   const handleSearch = async (newQuery) => {
//     try {
//       setQuery(newQuery);
//       setPage(1);
//       setImages([]);
//       setError(false);
//       setLoading(true);
//       const data = await fetchImages(newQuery, 1);
//       setImages(data);
//     } catch (error) {
//       console.log(error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMore = async () => {
//     try {
//       const nextPage = page + 1;
//       setLoading(true);

//       const newImages = await fetchImages(query, nextPage);

//       setImages((prev) => [...prev, ...newImages]);
//       setPage(nextPage);
//     } catch (error) {
//       console.log(error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="wrapper">
//       <SearchBar onSubmit={handleSearch} />
//       {images.length === 0 && <p className="title">Welcome!</p>}
//       {images.length > 0 && <ImageGallery items={images} onClick={openModal} />}
//       {loading && <Loader />}
//       {images.length > 0 && <LoadMoreBtn onClick={loadMore} />}
//       {isModalOpen && <ImageModal image={isModalOpen} onClose={closeModal} />}
//       {error && <ErrorMessage />}
//       <Toaster
//         position="bottom-right"
//         duration={4000}
//         toastOptions={{
//           style: {
//             padding: "18px",
//             color: "rgb(26, 30, 32)",
//             fontSize: "18px",
//           },
//         }}
//       />
//     </section>
//   );
// }

// export default App;

import "modern-normalize";
import { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../src/images-api";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchImages(query, page);
        if (page === 1) {
          setImages(data);
        } else {
          setImages((prev) => [...prev, ...data]);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setIsModalOpen(imageUrl);
  };

  const closeModal = () => {
    setIsModalOpen(null);
  };

  return (
    <section className="wrapper">
      <SearchBar onSubmit={handleSearch} />
      {images.length === 0 && !loading && <p className="title">Welcome!</p>}
      {images.length > 0 && <ImageGallery items={images} onClick={openModal} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}
      {isModalOpen && <ImageModal image={isModalOpen} onClose={closeModal} />}
      {error && <ErrorMessage />}
      <Toaster
        position="bottom-right"
        duration={4000}
        toastOptions={{
          style: {
            padding: "18px",
            color: "rgb(26, 30, 32)",
            fontSize: "18px",
          },
        }}
      />
    </section>
  );
}

export default App;
