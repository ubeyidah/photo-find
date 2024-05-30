import { Button } from "flowbite-react";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ImageCard = ({ data }) => {
  const [loding, setLoding] = React.useState(true);
  const download = (e) => {
    fetch(data.urls.full, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", data.slug + ".png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="relative align-top border border-slate-100 rounded-md overflow-hidden p-3">
      <img
        onLoad={() => setLoding((prevLoding) => !prevLoding)}
        className="max-w-[340px] rounded-sm"
        src={data.urls.full}
        alt={data.alt_description}
      />
      <div>
        <p className="py-2 font-semibold capitalize text-lg text-wrap max-w-[340px]">
          {data.alt_description}
        </p>
        <Button
          onClick={download}
          className="flex items-center justify-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download
        </Button>
      </div>
      {loding ? (
        <Skeleton className="absolute top-0 left-0 w-full h-full" count={2} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageCard;
