"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  title,
  children,
}) => {
  return (
    isModalOpen && (
      <div className="w-full h-[100%] fixed z-10 right-0 top-0 flex items-center bg-[#00000077]">
        <div className="w-96 max-h-[80vh] mx-auto rounded-lg p-5 bg-neutral-200 dark:bg-slate-700">
          <div className="flex justify-center pb-3">
            <h1 className="font-bold text-lg">{title}</h1>
            <XMarkIcon
              className="w-6 cursor-pointer justify-self-end mr-auto"
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
