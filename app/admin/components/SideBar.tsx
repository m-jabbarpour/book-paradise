"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpenIcon,
  BuildingLibraryIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const items = [
  {
    title: "کتاب‌ها",
    route: "/admin/books",
    icon: <BookOpenIcon className="w-6" />,
  },
  {
    title: "انتشارات",
    route: "/admin/publishers",
    icon: <BuildingLibraryIcon className="w-6" />,
  },
  {
    title: "نویسندگان",
    route: "/admin/authors",
    icon: <UserGroupIcon className="w-6" />,
  },
  {
    title: "مترجمان",
    route: "/admin/translators",
    icon: <UserGroupIcon className="w-6" />,
  },
  {
    title: "دسته‌بندی‌ها",
    route: "/admin/categories",
    icon: <TagIcon className="w-6" />,
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="min-h-[calc(100vh-48px)] w-48 p-2 bg-2 ">
      <ul>
        {items.map((item, index) => (
          <Link key={index} href={item.route}>
            <li
              className={`flex gap-3 rounded p-2 hover:bg-2 cursor-pointer ${
                pathname === item.route ? "text-primary font-bold" : ""
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
