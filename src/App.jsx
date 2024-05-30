import React, { useEffect, useState } from "react";
import ImageCard from "./component/ImageCard";
import SkeletonUi from "./component/SkeletonUi";
import { Button, Spinner } from "flowbite-react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState(null);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const fetchImages = async (query) => {
    setLoding(true);
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setImages(data.results);
      setLoding(false);
    }
  };

  useEffect(() => {
    fetchImages("digital");
  }, []);

  const handleBtn = () => {
    fetchImages(searchTerm);
  };
  console.log(page);
  return (
    <main className="px-5 pt-52">
      <header className="flex items-center justify-center flex-col pt-10 gap-6 fixed top-0 left-0 right-0 bg-slate-100 border-b p-3 pb-6 z-50">
        <div className="max-w-[600px] flex flex-col gap-5">
          <div>
            <h1 className="text-slate-950 text-3xl font-semibold font-mono text-center">
              Your Ultimate <span className="text-pink-700"> PhotoFind</span>{" "}
              Companion
            </h1>
          </div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:bg-pink-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
              placeholder="Search for images"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              onClick={handleBtn}
              className="text-white absolute end-2.5 bottom-2.5 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              {loding ? (
                <>
                  <Spinner
                    aria-label="Medium sized spinner example"
                    size="sm"
                  />{" "}
                  Loding...
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap justify-center w-full gap-2">
        {images ? (
          images.map((image) => (
            <ImageCard key={image.created_at} data={image} />
          ))
        ) : (
          <SkeletonUi />
        )}
      </div>
      {images && (
        <div className="flex items-center justify-center my-6">
          <Button
            outline
            gradientDuoTone="cyanToBlue"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Lode more
          </Button>
        </div>
      )}
    </main>
  );
};

export default App;
