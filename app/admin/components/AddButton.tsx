import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddButton = ({ ...props }) => {
  return (
    <button
      {...props}
      className="flex gap-2 bg-primary font-bold text-white rounded px-4 py-2 cursor-pointer shadow mb-4"
    >
      <span>افزودن</span>
      <PlusCircleIcon className="w-6" />
    </button>
  );
};

export default AddButton;
