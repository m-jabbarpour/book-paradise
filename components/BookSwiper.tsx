"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import BookCard from "@/components/BookCard";

import { SummarizedBookInfo } from "@/types";

interface Props {
  books: SummarizedBookInfo[];
}

const BookSwiper: React.FC<Props> = ({ books }) => {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BookSwiper;
