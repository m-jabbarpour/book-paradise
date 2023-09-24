import Categories from "./Categories";

const DropDownMenu: React.FC = () => {
  return (
    <div className="group relative">
      <button className="group-hover:text-primary">دسته‌بندی</button>
      <div className="hidden group-hover:block absolute z-10 w-max">
        <div className="h-8"></div>
        <div className="bg-white px-6 py-4 rounded shadow dark:bg-slate-900 dark:shadow-slate-400 ">
          {/* <Categories /> */}
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
