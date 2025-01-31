import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import styled from "styled-components";
import type { Swiper as SwiperType } from "swiper";

const mock = [
  {
    year: "2016",
    text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
  },
  {
    year: "2017",
    text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
  },
  {
    year: "2018",
    text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
  },
  {
    year: "2019",
    text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
  },
  {
    year: "2020",
    text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
  },
  {
    year: "2021",
    text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
  },
];

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
`;

const SliderWrapper = styled.div`
  width: 92%;
  overflow: hidden;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
`;

const StyledSlide = styled(SwiperSlide)`
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  font-family: "PT Sans", sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.875rem;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #42567a;

  h2 {
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.5rem;
    color: #3877ee;
  }
`;

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: 50%; /* Если нужна круглая кнопка */
  box-shadow: 0px 0px 1rem 0px #3877ee1a;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0;
    cursor: auto;
  }

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.375rem;
    height: 0.625rem;
  }
`;

const Icon = styled.svg<{ mirrored?: boolean }>`
  ${({ mirrored }) => mirrored && "transform: scaleX(-1);"}
`;

export default function Slider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <Container>
      <Button
        disabled={isBeginning}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <Icon
          mirrored
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L1 11"
            stroke="#3877EE"
            strokeWidth="2"
            transform="translate(1,0)"
          />
        </Icon>
      </Button>
      <SliderWrapper>
        <StyledSwiper
          onSwiper={(swiper) => (swiperRef.current = swiper)} // не используем swiper.swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={80}
          onSlideChange={handleSlideChange}
        >
          {mock.map((item) => (
            <StyledSlide>
              <h2>{item.year}</h2>
              <p>{item.text}</p>
            </StyledSlide>
          ))}
        </StyledSwiper>
      </SliderWrapper>

      <Button disabled={isEnd} onClick={() => swiperRef.current?.slideNext()}>
        <Icon viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1L6 6L1 11"
            stroke="#3877EE"
            strokeWidth="2"
            transform="translate(1,0)"
          />
        </Icon>
      </Button>
    </Container>
  );
}
