import Image from "next/image";
import Link from "next/link";

import { SummarizedBookInfo } from "@/types";

import { BASE_URL } from "@/constants";

interface Props {
  book: SummarizedBookInfo;
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <Link href={`/book/${book.id}`}>
      <div className="group w-[92px] sm:w-[120px] lg:w-[150px] cursor-pointer ">
        <div className="relative w-[92px] h-[138px] sm:w-[120px] sm:h-[180px] lg:w-[150px] lg:h-[225px] mb-2 shadow-lg group-hover:shadow-[0_6px_6px_0px_#00000052] transition-all duration-300 rounded overflow-hidden">
          <Image
            src={BASE_URL + "Books/GetImage/" + book.id}
            alt={book.title}
            width={200}
            height={296}
          />
        </div>

        <h5 className="text-xs lg:text-base text-center truncate group-hover:text-primary dark:text-slate-200 group-hover:font-bold transition-all duration-300">
          {book.title}
        </h5>
        <h6 className="text-xs lg:text-base text-center text-gray-500 dark:text-slate-400">
          {book.authorsFullName.join("، ")}
        </h6>
      </div>
    </Link>
  );
};

export default BookCard;
