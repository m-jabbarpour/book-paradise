import BookSwiper from "../../../../components/BookSwiper";

import { SummarizedBookInfo } from "@/types";

async function getData(categoryId: number) {
  const res = await fetch(
    process.env.BASE_URL + "User/Books/GetList?categoryId=" + categoryId
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Props {
  categoryId: number;
  categoryTitle: string;
}

const BookCategory: React.FC<Props> = async ({ categoryId, categoryTitle }) => {
  const books: SummarizedBookInfo[] = await getData(categoryId);

  return (
    <div className="bg-2">
      <div className="container pt-4 pb-4 sm:pt-8 sm:pb-12 ">
        <div className="flex justify-between mb-6">
          <h2 className="text-sm sm:text-lg font-bold dark:text-slate-200">
            {categoryTitle}
          </h2>
          <span className="text-xs sm:text-base hover:text-primary text-gray-500 dark:text-slate-300 dark:hover:text-primary cursor-pointer">
            مشاهده همه
          </span>
        </div>
        <BookSwiper books={books} />
      </div>
    </div>
  );
};

export default BookCategory;
