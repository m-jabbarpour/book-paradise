import BookDescription from "./components/BookDescription";
import BookDetails from "./components/BookDetails";
import Navigation from "./components/Navigation";
import RecommendedBooks from "./components/RecommendedBooks";

import { FullBookInfo } from "@/types";

async function getData(bookId: string) {
  const res = await fetch(process.env.BASE_URL + "Books/" + bookId);

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (res.status === 200) return res.json();

  return null;
}

export default async function Page({ params }: { params: { id: string } }) {
  const book: FullBookInfo = await getData(params.id);

  return (
    book && (
      <>
        <Navigation title={book.title} category={book.category.title} />
        <BookDetails book={book} />
        <BookDescription
          title={book.title}
          description={book.description}
          summary={book.summary}
        />
        {/* <RecommendedBooks
          queryValue={JSON.stringify(book.authors.map((a) => a.id))}
          queryKey="authorId"
        /> */}
        <RecommendedBooks
          queryValue={String(book.publisherId)}
          queryKey="publisherId"
          title={book.publisher.title}
        />
        <RecommendedBooks
          queryValue={String(book.categoryId)}
          queryKey="categoryId"
          title={book.category.title}
        />
      </>
    )
  );
}
