import React, { useState } from "react";

import InfiniteCarouselPage from "./pages/InfiniteCarouselPage";
import InfiniteListPage from "./pages/InfiniteListPage";
import Button from "./ui/kit/button/Button";

export function App() {
  const [isCarousel, setIsCarousel] = useState(true);

  const headerLabel = `Infinite ${
    isCarousel ? "horizontal carousel" : "vertical list"
  }`;

  const handlePagesToggle = () => {
    setIsCarousel((prev) => !prev);
  };

  return (
    <>
      <div style={{ margin: "16px" }}>
        <h1 style={{ marginBottom: "8px" }}>{headerLabel}</h1>
        <Button onClick={handlePagesToggle}>Toggle pages</Button>
      </div>
      {isCarousel ? <InfiniteCarouselPage /> : <InfiniteListPage />}
    </>
  );
}
