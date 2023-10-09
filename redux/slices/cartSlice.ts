import { BookInCart, Cart } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Cart = {
  addedBooks: [],
  subTotal: 0,
  discountCode: "",
  discountPercentage: 0,
  discount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementBook: (state, action: PayloadAction<BookInCart>) => {
      const requiredBookDetails = action.payload;
      const foundBook = state.addedBooks.find(
        (addedBook) => addedBook.id === requiredBookDetails.id
      );
      if (foundBook) {
        state.addedBooks = state.addedBooks.map((addedBook) =>
          addedBook.id === requiredBookDetails.id
            ? { ...addedBook, number: addedBook.number! + 1 }
            : addedBook
        );
      } else {
        const newBook = { ...requiredBookDetails, number: 1 };
        state.addedBooks.push(newBook);
      }
    },
    decrementBook: (state, action: PayloadAction<BookInCart>) => {
      const requiredBookDetails = action.payload;
      const foundBook = state.addedBooks.find(
        (addedBook) => addedBook.id === requiredBookDetails.id
      );
      if (foundBook!.number! > 1) {
        state.addedBooks = state.addedBooks.map((addedBook) =>
          addedBook.id === requiredBookDetails.id
            ? { ...addedBook, number: addedBook.number! - 1 }
            : addedBook
        );
      } else {
        state.addedBooks = state.addedBooks.filter(
          (addedBook) => addedBook.id !== requiredBookDetails.id
        );
      }
    },
    updateCartValues: (state) => {
      state.subTotal = state.addedBooks.reduce(
        (accumulator, addedBook) =>
          accumulator + addedBook.price * addedBook.number!,
        0
      );
      state.discount = (state.subTotal * state.discountPercentage) / 100;
      state.total = state.subTotal - state.discount;
    },
    setDiscountCode: (state, action) => {
      state.discountCode = action.payload;
    },
    checkDiscountCode: (state) => {
      switch (state.discountCode) {
        case "Golden":
          state.discountPercentage = 30;
          break;
        case "Silver":
          state.discountPercentage = 20;
          break;
        case "Bronze":
          state.discountPercentage = 10;
          break;
        default:
          state.discountPercentage = 0;
          break;
      }
    },
    emptyCart: (state) => {
      state.addedBooks = [];
    },
  },
});

export const {
  incrementBook,
  decrementBook,
  updateCartValues,
  setDiscountCode,
  checkDiscountCode,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
