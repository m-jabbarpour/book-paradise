import { CategoryWithParent } from "@/types";

import Categories from "./Categories";

interface Props {
  categories: CategoryWithParent[];
}

const DropDownMenu: React.FC<Props> = ({ categories }) => {
  return (
    <div className="group relative">
      <button className="group-hover:text-primary">دسته‌بندی</button>
      <div className="hidden group-hover:block absolute z-10 w-max">
        <div className="h-8"></div>
        <div className="bg-1 px-6 py-4 rounded shadow  dark:shadow-slate-400 ">
          <Categories categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
