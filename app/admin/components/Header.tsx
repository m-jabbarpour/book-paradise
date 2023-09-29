import Image from "next/image";
import Link from "next/link";

import ThemeToggleButton from "@/components/ThemeToggleButton";
import UserLogin from "@/components/UserLogin";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 shadow-md shadow-slate-500 bg-1 dark:text-slate-300">
      <div className="container py-2 rounded-lg flex justify-between">
        <div className="flex gap-x-4 items-center">
          <Link href="/">
            <Image
              src="/assets/logos/logo.svg"
              width={32}
              height={32}
              alt="فروشگاه کتاب"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex gap-x-4 items-center">
          <UserLogin />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
