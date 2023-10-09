import BookSwiper from "@/components/BookSwiper";

import { SummarizedBookInfo } from "@/types";

type QueryKey = "categoryId" | "publisherId" | "authorId";

interface Props {
  queryKey: QueryKey;
  queryValue: string;
  title: string;
}

async function getData(queryKey: QueryKey, queryValue: string) {
  const res = await fetch(
    `${process.env.BASE_URL}Books/GetList?${queryKey}=${queryValue}`
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (res.status === 200) return res.json();

  return null;
}

const RecommendedBooks: React.FC<Props> = async ({
  queryValue,
  queryKey,
  title,
}) => {
  const books: SummarizedBookInfo[] = await getData(queryKey, queryValue);

  return (
    <div className="bg-2">
      <div className="container pt-4 pb-6 sm:pt-8 sm:pb-12">
        <div className="flex justify-between mb-6">
          <h2 className="text-sm sm:text-lg font-bold dark:text-slate-200">{`سایر کتاب‌های ${title}`}</h2>
        </div>
        <BookSwiper books={books} />
      </div>
    </div>
  );
};

export default RecommendedBooks;
