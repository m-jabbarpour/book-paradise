import BookCard from "./BookCard";

import { SummarizedBookInfo } from "@/types";

interface Props {
  books: SummarizedBookInfo[];
}

const BooksContainer: React.FC<Props> = ({ books }) => {
  return (
    <main className="flex flex-col justify-between pt-4 pb-6 sm:pt-8 sm:pb-12 mx-auto">
      <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-16 lg:gap-7 xl:gap-8 2xl:gap-11">
        {books.map((book) => (
          <div className="flex justify-center}" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BooksContainer;
