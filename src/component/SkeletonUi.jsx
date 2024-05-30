import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonUi = () => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <Skeleton className="h-32 w-32" key={item} count={2} />
      ))}
    </>
  );
};

export default SkeletonUi;
