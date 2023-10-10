"use client";

import { useMemo, useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { ColDef, ICellRendererParams } from "ag-grid-community";

import Modal from "@/components/Modal";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import AddAndEditCategoryForm from "./AddAndEditCategoryForm";

import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/services/bookParadiseApi";

import { Category, CategoryWithParent } from "@/types";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const { data: categories } = useGetCategoriesQuery();

  const [deleteCategory, deleteCategoryResponse] = useDeleteCategoryMutation();

  const columnDefs: ColDef[] = useMemo(
    () => [
      { field: "title", headerName: "عنوان" },
      {
        field: "parent",
        headerName: "دسته‌بندی والد",
        cellRenderer: (
          params: ICellRendererParams<CategoryWithParent, React.ReactNode, any>
        ) => params.data?.parent?.title || "-",
      },
      {
        cellRenderer: (
          params: ICellRendererParams<CategoryWithParent, React.ReactNode, any>
        ) => {
          return (
            <div className="ag-table-icon-container">
              <PencilIcon
                className="w-4 h-4"
                onClick={() => {
                  setSelectedCategory(params.data);
                  setIsModalOpen(true);
                }}
              />
              <TrashIcon
                className="w-4 h-4"
                onClick={() => deleteCategory({ id: params.data?.id })}
              />
            </div>
          );
        },
        maxWidth: 100,
      },
    ],
    []
  );

  return (
    <>
      <AddButton
        onClick={() => {
          setIsModalOpen(true);
          setSelectedCategory(undefined);
        }}
      />
      <Table rowData={categories} columnDefs={columnDefs} />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="افزودن دسته‌بندی"
      >
        <AddAndEditCategoryForm
          selectedCategory={selectedCategory}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default Categories;
