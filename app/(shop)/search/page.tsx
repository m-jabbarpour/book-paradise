import BooksContainer from "@/components/BooksContainer";
import NoBookFound from "@/components/NoBookFound";

import { SummarizedBookInfo } from "@/types";

async function getData(term: string) {
  const res = await fetch(`${process.env.BASE_URL}Books/GetList?q=${term}`);

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (res.status === 200) return res.json();

  return null;
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Search: React.FC<Props> = async ({ searchParams }) => {
  const { term } = searchParams;

  if (typeof term !== "string") return <NoBookFound />;

  const foundBooks: SummarizedBookInfo[] = await getData(term);

  return (
    <div className="container bg-2 mx-auto px-12">
      {foundBooks.length > 0 ? (
        <BooksContainer books={foundBooks} />
      ) : (
        <NoBookFound />
      )}
    </div>
  );
};

export default Search;
