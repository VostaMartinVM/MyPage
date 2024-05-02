import {FC, useEffect, useState} from "react";

type props = {
  pictures: string[] | undefined;
  styling: string;
};

const SLIDE_DURATION = 3000;

const ImageSliderPopup: FC<props> = ({pictures, styling}) => {
  const [currentImg, setCurrentImg] = useState<string | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentImg(pictures && pictures[currentIndex]);
  }, [currentIndex, pictures]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex =
      isFirstSlide && pictures ? pictures.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    if (pictures) {
      const isLastSlide = currentIndex === pictures.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={styling}>
      <div className="arrowContainer">
        <div
          onClick={goToPrevious}
          className="leftArrowStyles"
        >
          ❰
        </div>
        <div
          onClick={goToNext}
          className="rightArrowStyles"
        >
          ❱
        </div>
      </div>
      <div className="sliderStyles">
        <img
          className="sliderImage"
          src={currentImg}
        ></img>
      </div>
      <div className="dotContainerStyle">
        {pictures &&
          pictures.slice(0, 9).map((slide, slideIndex) => (
            <div
              className={currentIndex === slideIndex ? "activeDot" : "dotStyle"}
              key={slideIndex}
              onClick={() => {
                goToSlide(slideIndex);
              }}
            >
              ●
            </div>
          ))}
        {!currentImg && <div>Image not found</div>}
      </div>
    </div>
  );
};

export default ImageSliderPopup;
