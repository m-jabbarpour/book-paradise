"use client";

const categories = [
  {
    category: "روان‌شناسی و موفقیت",
    subCategories: ["توسعه فردی", "خانواده و ازدواج"],
  },
  {
    category: "داستان و رمان",
    subCategories: ["داستان ایرانی", "داستان خارجی"],
  },
];

interface Props {
  setIsDrawerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Categories: React.FC<Props> = ({ setIsDrawerActive }) => {
  const goToSubCategory = (subCategory: string) => {
    setIsDrawerActive(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {categories.map((item, i) => (
        <div key={i} className="flex flex-col gap-1">
          <h3 className="font-bold text-lg md:text-base dark:text-slate-200">
            {item.category}
          </h3>
          {item.subCategories.map((subCategory, j) => (
            <h4
              key={j}
              className="pr-4 cursor-pointer hover:text-primary dark:text-slate-300 dark:hover:text-primary"
              onClick={() => goToSubCategory(subCategory)}
            >
              {subCategory}
            </h4>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Categories;
