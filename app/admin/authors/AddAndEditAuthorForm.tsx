import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";

import {
  useAddAuthorMutation,
  useEditAuthorMutation,
} from "@/services/bookParadiseApi";

import { Author } from "@/types";

const authorSchema = z
  .object({
    firstName: z.string().trim().min(2, "وارد کردن نام الزامیست (حداقل 2 حرف)"),
    lastName: z
      .string()
      .trim()
      .min(2, "وارد کردن نام خانوادگی الزامیست (حداقل 2 حرف)"),
  })
  .required();

type AuthorSchema = z.infer<typeof authorSchema>;

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAuthor?: Author;
}

const AddAndEditAuthorForm: React.FC<Props> = ({
  setIsModalOpen,
  selectedAuthor,
}) => {
  const isInEditMode = Boolean(selectedAuthor);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorSchema>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      firstName: selectedAuthor?.firstName,
      lastName: selectedAuthor?.lastName,
    },
  });

  const [addAuthor, addAuthorResponse] = useAddAuthorMutation();

  const [editAuthor, editAuthorResponse] = useEditAuthorMutation();

  const onSubmit: SubmitHandler<AuthorSchema> = (inputData) => {
    if (isInEditMode) {
      editAuthor({ id: selectedAuthor?.id, ...inputData })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsModalOpen(false);
        })
        .then((error) => {
          console.log(error);
        });
    } else {
      addAuthor(inputData)
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
        <label htmlFor="firstName">نام:</label>
        <input
          id="firstName"
          className="input"
          type="text"
          {...register("firstName")}
        />
        <span className="input-error">{errors?.firstName?.message}</span>
        <label htmlFor="lastName">نام خانوادگی:</label>
        <input
          id="lastName"
          className="input"
          type="text"
          {...register("lastName")}
        />
        <span className="input-error">{errors?.lastName?.message}</span>
        <button
          type="submit"
          className="submit-button"
          disabled={addAuthorResponse.isLoading}
        >
          ثبت
        </button>
      </form>
    </>
  );
};

export default AddAndEditAuthorForm;
