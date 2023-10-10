"use client";

import Image from "next/image";
import Link from "next/link";

import { UserCircleIcon } from "@heroicons/react/20/solid";

import { useGetCategoriesQuery } from "@/services/bookParadiseApi";

import CartIcon from "./CartIcon";
import DropDownMenu from "./DropDownMenu";
import MobileDrawer from "./MobileDrawer";
import SearchBarMd from "./SearchBarMd";
import SearchBarSm from "./SearchBarXs";

import ThemeToggleButton from "@/components/ThemeToggleButton";
import UserLogin from "@/components/UserLogin";

const Header: React.FC = () => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <>
      <header className="md:hidden h-[5rem] shadow-md shadow-slate-500 bg-1 dark:text-slate-300">
        <div className="container py-4 rounded-lg flex justify-between">
          <div className="flex gap-x-4 items-center">
            {categories && <MobileDrawer categories={categories} />}
            <SearchBarSm />
          </div>
          <Link href="/">
            <Image
              src="/assets/logos/logo.svg"
              width={48}
              height={48}
              alt="فروشگاه کتاب"
            />
          </Link>
          <div className="flex gap-x-4 items-center">
            <UserCircleIcon className="w-6" />
            <CartIcon />
            <ThemeToggleButton />
          </div>
        </div>
      </header>

      <header className="hidden md:block sticky top-0 z-20 shadow-md shadow-slate-500 bg-1 dark:text-slate-300">
        <div className="container py-4 rounded-lg flex justify-between">
          <div className="flex gap-x-4 items-center">
            <Link href="/">
              <Image
                src="/assets/logos/logo.svg"
                width={48}
                height={48}
                alt="فروشگاه کتاب"
                className="cursor-pointer"
              />
            </Link>
            {categories && <DropDownMenu categories={categories} />}

            <SearchBarMd />
          </div>
          <div className="flex gap-x-4 items-center">
            <UserLogin />
            <CartIcon />
            <ThemeToggleButton />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
