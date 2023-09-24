"use client";

import { useState } from "react";

import { Bars3Icon } from "@heroicons/react/20/solid";

import Categories from "./Categories";

const MobileDrawer: React.FC = () => {
  const [isDrawerActive, setIsDrawerActive] = useState<boolean>(false);

  const showDrawer = () => {
    setIsDrawerActive(true);
  };
  const hideDrawer = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDrawerActive(false);
  };

  return (
    <>
      <Bars3Icon className="w-6" onClick={showDrawer} />
      <div
        className={`fixed top-0 right-0 w-full h-full z-10 ${
          isDrawerActive ? "visible bg-modal" : "invisible bg-transparent"
        } transition duration-300 ease-in-out`}
        onClick={hideDrawer}
      >
        <div
          className={`bg-white dark:bg-slate-700 h-full z-10 fixed top-0 ${
            isDrawerActive ? "right-0" : "right-[-100%]"
          } p-6  transition-[right] duration-300 ease-in-out`}
          onClick={(event) => event.stopPropagation()}
        >
          <h1 className="font-bold text-xl dark:text-slate-200 mb-6">
            دسته‌بندی
          </h1>
          {/* <Categories /> */}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
