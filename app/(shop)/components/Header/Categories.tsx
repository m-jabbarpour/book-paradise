import { CategoryWithParent } from "@/types";

interface Props {
  categories: CategoryWithParent[];
  setIsDrawerActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Categories: React.FC<Props> = ({ categories, setIsDrawerActive }) => {
  const goToSubCategory = (subCategory: CategoryWithParent) => {
    if (setIsDrawerActive) setIsDrawerActive(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {categories
        .filter((c) => c.parentId === null)
        .map((parent) => (
          <div key={parent.id} className="flex flex-col gap-1">
            <h3 className="font-bold text-lg md:text-base dark:text-slate-200">
              {parent.title}
            </h3>
            {categories
              .filter((c) => c.parentId === parent.id)
              .map((child) => (
                <h4
                  key={child.id}
                  className="pr-4 cursor-pointer hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                  onClick={() => goToSubCategory(child)}
                >
                  {child.title}
                </h4>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Categories;
