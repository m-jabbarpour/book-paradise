import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";

import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "@/services/bookParadiseApi";

import { Category } from "@/types";

const categorySchema = z
  .object({
    title: z.string().trim().min(3, "وارد کردن عنوان الزامیست (حداقل 3 حرف)"),
    parentId: z.string().nullable(),
  })
  .required();

type CategorySchema = z.infer<typeof categorySchema>;

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory?: Category;
}

const AddAndEditCategoryForm: React.FC<Props> = ({
  setIsModalOpen,
  selectedCategory,
}) => {
  const isInEditMode = Boolean(selectedCategory);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: selectedCategory?.title,
    },
  });

  const { data: categories } = useGetCategoriesQuery();

  const [addCategory, addCategoryResponse] = useAddCategoryMutation();

  const [editCategory, editCategoryResponse] = useEditCategoryMutation();

  const onSubmit: SubmitHandler<CategorySchema> = (inputData) => {
    let modifiedData = { ...inputData };

    if (Number(inputData.parentId) === 0) modifiedData.parentId = null;

    if (isInEditMode) {
      editCategory({ id: selectedCategory?.id, ...modifiedData })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsModalOpen(false);
        })
        .then((error) => {
          console.log(error);
        });
    } else {
      addCategory(modifiedData)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsModalOpen(false);
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <form
        className="flex flex-col overflow-y-auto max-h-[60vh] px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="title">عنوان:</label>
        <input
          id="title"
          className="input"
          type="text"
          {...register("title")}
        />
        <span className="input-error">{errors?.title?.message}</span>

        <label htmlFor="parentId">دسته‌بندی والد:</label>
        <select id="parentId" className="input" {...register("parentId")}>
          <option disabled selected value={0}>
            -- جهت انتخاب کلیک کنید --
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <span className="input-error">{errors?.parentId?.message}</span>

        <button
          type="submit"
          className="submit-button"
          disabled={addCategoryResponse.isLoading}
        >
          ثبت
        </button>
      </form>
    </>
  );
};

export default AddAndEditCategoryForm;
