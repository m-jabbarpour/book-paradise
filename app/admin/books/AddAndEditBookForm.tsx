import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";

import {
  useAddBookMutation,
  useGetAuthorsQuery,
  useGetCategoriesQuery,
  useGetPublishersQuery,
  useGetTranslatorsQuery,
} from "@/services/bookParadiseApi";

import { Book } from "@/types";

const bookSchema = z.object({
  title: z.string().trim().min(2, "وارد کردن عنوان الزامیست (حداقل 2 حرف)"),
  description: z
    .string()
    .trim()
    .min(10, "وارد کردن شرح الزامیست (حداقل 10 حرف)"),
  summary: z
    .string()
    .trim()
    .min(10, "وارد کردن خلاصه کتاب الزامیست (حداقل 10 حرف)"),
  price: z.string().trim().min(1, "وارد کردن قیمت الزامیست (حداقل 0)"),
  inventory: z.string().trim().min(1, "وارد کردن موجودی الزامیست (حداقل 0)"),
  // bookImage: z.custom(fileValidator, "بارگذاری تصویر الزامیست"),
  bookImage: z.instanceof(File, { message: "بارگذاری تصویر الزامیست" }),
  categoryId: z.string().trim().min(1, "انتخاب دسته‌بندی الزامیست"),
  publisherId: z.string().trim().min(1, "انتخاب انتشارات الزامیست"),
  authorIds: z.string().array().nonempty("انتخاب حداقل یک نویسنده الزامیست"),
  translatorIds: z.string().array(),
});

type BookSchema = z.infer<typeof bookSchema>;

const createFormData = (inputData: BookSchema) => {
  const formdata = new FormData();

  Object.entries(inputData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formdata.append(key, item);
      });
    } else if (value instanceof File) {
      formdata.append(key, value, value.name);
    } else {
      formdata.append(key, value);
    }
  });

  return formdata;
};

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBook?: Book;
}

const AddAndEditBookForm: React.FC<Props> = ({
  setIsModalOpen,
  selectedBook,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {},
  });

  const { data: categories } = useGetCategoriesQuery();
  const { data: authors } = useGetAuthorsQuery();
  const { data: translators } = useGetTranslatorsQuery();
  const { data: publishers } = useGetPublishersQuery();

  const [addBook, addBookResponse] = useAddBookMutation();

  const onSubmit: SubmitHandler<BookSchema> = (inputData) => {
    addBook(createFormData(inputData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsModalOpen(false);
        console.log(res.message);
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col overflow-y-auto max-h-[60vh] px-4"
    >
      <label htmlFor="title">عنوان:</label>
      <input id="title" className="input" type="text" {...register("title")} />
      <span className="input-error">{errors?.title?.message}</span>
      <div className="flex flex-col">
        <label htmlFor="description">شرح:</label>
        <textarea
          id="description"
          className="input"
          {...register("description")}
        />
        <span className="input-error">{errors?.description?.message}</span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="summary">خلاصه:</label>
        <textarea id="summary" className="input" {...register("summary")} />
        <span className="input-error">{errors?.summary?.message}</span>
      </div>
      <label htmlFor="price">قیمت:</label>
      <input
        id="price"
        className="input"
        type="number"
        {...register("price")}
      />
      <span className="input-error">{errors?.price?.message}</span>
      <label htmlFor="inventory">موجودی:</label>
      <input
        id="inventory"
        className="input"
        type="number"
        {...register("inventory")}
      />
      <span className="input-error">{errors?.inventory?.message}</span>

      <label htmlFor="publisherId">انتشارات:</label>
      <select id="publisherId" className="input" {...register("publisherId")}>
        <option value="" disabled selected>
          برای انتخاب کلیک کنید
        </option>
        {publishers?.map((publisher) => (
          <option key={publisher.id} value={Number(publisher.id)}>
            {publisher.title}
          </option>
        ))}
      </select>
      <span className="input-error">{errors?.publisherId?.message}</span>
      <label htmlFor="categoryId">دسته:</label>
      <select id="categoryId" className="input" {...register("categoryId")}>
        <option value="" disabled selected>
          برای انتخاب کلیک کنید
        </option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
      <span className="input-error">{errors?.categoryId?.message}</span>
      <div className="flex flex-col">
        <label htmlFor="authorIds">نویسنده:</label>
        <select
          multiple
          size={3}
          id="authorIds"
          className="input"
          {...register("authorIds")}
        >
          {authors?.map((author) => (
            <option key={author.id} value={author.id}>
              {author.firstName + " " + author.lastName}
            </option>
          ))}
        </select>
        <span className="input-error">{errors?.authorIds?.message}</span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="translatorIds">مترجم:</label>
        <select
          multiple
          size={3}
          id="translatorIds"
          className="input"
          {...register("translatorIds")}
        >
          {translators?.map((translator) => (
            <option key={translator.id} value={translator.id}>
              {translator.firstName + " " + translator.lastName}
            </option>
          ))}
        </select>
        <span className="input-error">{errors?.translatorIds?.message}</span>
      </div>

      <div className="flex flex-col">
        <label htmlFor="bookImage">تصویر:</label>

        <Controller
          control={control}
          name="bookImage"
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <input
                {...field}
                className="pt-2 mb-2"
                onChange={(event) => {
                  const files = event?.target?.files;
                  if (files && files.length > 0) {
                    onChange(files[0]);
                  }
                }}
                type="file"
                id="bookImage"
              />
            );
          }}
        />
        <span className="input-error mt-2">{errors?.bookImage?.message}</span>
      </div>

      <button type="submit" className="submit-button">
        ثبت
      </button>
    </form>
  );
};

export default AddAndEditBookForm;
