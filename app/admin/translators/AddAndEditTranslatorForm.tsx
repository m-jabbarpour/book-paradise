import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";

import {
  useAddTranslatorMutation,
  useEditTranslatorMutation,
} from "@/services/bookParadiseApi";

import { Translator } from "@/types";

const translatorSchema = z
  .object({
    firstName: z.string().trim().min(3, "وارد کردن نام الزامیست (حداقل 3 حرف)"),
    lastName: z
      .string()
      .trim()
      .min(3, "وارد کردن نام خانوادگی الزامیست (حداقل 3 حرف)"),
  })
  .required();

type TranslatorSchema = z.infer<typeof translatorSchema>;

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTranslator?: Translator;
}

const AddAndEditTranslatorForm: React.FC<Props> = ({
  setIsModalOpen,
  selectedTranslator,
}) => {
  const isInEditMode = Boolean(selectedTranslator);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TranslatorSchema>({
    resolver: zodResolver(translatorSchema),
    defaultValues: {
      firstName: selectedTranslator?.firstName,
      lastName: selectedTranslator?.lastName,
    },
  });

  const [addTranslator, addTranslatorResponse] = useAddTranslatorMutation();

  const [editTranslator, editTranslatorResponse] = useEditTranslatorMutation();

  const onSubmit: SubmitHandler<TranslatorSchema> = (inputData) => {
    if (isInEditMode) {
      editTranslator({ id: selectedTranslator?.id, ...inputData })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsModalOpen(false);
        })
        .then((error) => {
          console.log(error);
        });
    } else {
      addTranslator(inputData)
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
          disabled={addTranslatorResponse.isLoading}
        >
          ثبت
        </button>
      </form>
    </>
  );
};

export default AddAndEditTranslatorForm;
