import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";

import {
  useAddPublisherMutation,
  useEditPublisherMutation,
} from "@/services/bookParadiseApi";

import { Publisher } from "@/types";

const publisherSchema = z
  .object({
    title: z.string().trim().min(3, "وارد کردن عنوان الزامیست (حداقل 3 حرف)"),
  })
  .required();

type PublisherSchema = z.infer<typeof publisherSchema>;

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPublisher?: Publisher;
}

const AddAndEditPublisherForm: React.FC<Props> = ({
  setIsModalOpen,
  selectedPublisher,
}) => {
  const isInEditMode = Boolean(selectedPublisher);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PublisherSchema>({
    resolver: zodResolver(publisherSchema),
    defaultValues: {
      title: selectedPublisher?.title,
    },
  });

  const [addPublisher, addPublisherResponse] = useAddPublisherMutation();

  const [editPublisher, editPublisherResponse] = useEditPublisherMutation();

  const onSubmit: SubmitHandler<PublisherSchema> = (inputData) => {
    if (isInEditMode) {
      editPublisher({ id: selectedPublisher?.id, ...inputData })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsModalOpen(false);
        })
        .then((error) => {
          console.log(error);
        });
    } else {
      addPublisher(inputData)
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
        <button
          type="submit"
          className="submit-button"
          disabled={addPublisherResponse.isLoading}
        >
          ثبت
        </button>
      </form>
    </>
  );
};

export default AddAndEditPublisherForm;
