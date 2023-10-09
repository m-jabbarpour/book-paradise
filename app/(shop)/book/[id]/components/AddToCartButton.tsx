"use client";

import { useEffect, useState } from "react";

import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

import { useTypedDispatch, useTypedSelector } from "@/redux/store";

import { Book } from "@/types";

interface Props {
  currentBook: Book;
}

const AddToCartButton: React.FC<Props> = ({ currentBook }) => {
  const addedBooks = useTypedSelector((store) => store.cart.addedBooks);
  const dispatch = useTypedDispatch();
  const [number, setNumber] = useState<number>(0);

  // const requiredBookDetails = {
  //   id: currentBook.id,
  //   title: currentBook.title,
  //   image: currentBook.image,
  //   price: currentBook.price,
  // };

  // useEffect(() => {
  //   const foundBook = addedBooks.find(
  //     (addedBook) => addedBook.id === currentBook.id
  //   );
  //   if (foundBook) setNumber(foundBook.number || 0);
  // }, [addedBooks, currentBook.id]);

  // const handlePlus = () => {
  //   setNumber((prev) => prev + 1);
  //   dispatch(incrementBook(requiredBookDetails));
  //   dispatch(updateCartValues());
  // };
  // const handleMinus = () => {
  //   setNumber((prev) => prev - 1);
  //   dispatch(decrementBook(requiredBookDetails));
  //   dispatch(updateCartValues());
  // };

  return (
    <div className="w-full sm:w-[250px]">
      {number === 0 ? (
        <button
          className="w-full text-center text-white font-bold bg-primary rounded-lg py-2 cursor-pointer"
          // onClick={handlePlus}
        >
          افزودن به سبد خرید
        </button>
      ) : (
        <div className="w-fit mx-auto flex items-center overflow-hidden rounded-lg">
          <div
            className="p-2 cursor-pointer bg-primary"
            // onClick={handlePlus}
          >
            <PlusIcon className="w-6 text-white " />
          </div>
          <div className="w-[44px] text-center font-bold bg-neutral-200 dark:bg-slate-700 h-full p-2">
            <span>{number}</span>
          </div>
          <div
            className="p-2 cursor-pointer bg-primary"
            // onClick={handleMinus}
          >
            <MinusIcon className="w-6 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
