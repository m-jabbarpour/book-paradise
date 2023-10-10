"use client";

import { useMemo, useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { ColDef, ICellRendererParams } from "ag-grid-community";

import Modal from "@/components/Modal";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import AddAndEditBookForm from "./AddAndEditBookForm";

import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/services/bookParadiseApi";

import { Book } from "@/types";

const Books = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedBook, setSelectedBook] = useState<Book>();

  const { data: books } = useGetBooksQuery();

  const [deleteBook, result] = useDeleteBookMutation();

  const columnDefs: ColDef<Book, unknown>[] = useMemo(
    () => [
      { field: "title", headerName: "عنوان" },
      {
        headerName: "دسته",
        cellRenderer: (
          params: ICellRendererParams<Book, React.ReactNode, any>
        ) => params.data?.category.title,
      },
      {
        headerName: "انتشارات",
        cellRenderer: (
          params: ICellRendererParams<Book, React.ReactNode, any>
        ) => params.data?.publisher.title,
      },
      { field: "price", headerName: "قیمت" },
      { field: "inventory", headerName: "موجودی" },
      {
        cellRenderer: (
          params: ICellRendererParams<Book, React.ReactNode, any>
        ) => {
          return (
            <div className="ag-table-icon-container">
              <PencilIcon
                className="w-4 h-4"
                onClick={() => {
                  setSelectedBook(params.data);
                  setIsModalOpen(true);
                }}
              />
              <TrashIcon
                className="w-4 h-4"
                onClick={() => deleteBook({ id: params.data?.id })}
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
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="افزودن کتاب"
      >
        <AddAndEditBookForm
          setIsModalOpen={setIsModalOpen}
          selectedBook={selectedBook}
        />
      </Modal>

      <AddButton onClick={() => setIsModalOpen(true)} />
      <Table rowData={books} columnDefs={columnDefs} />
    </>
  );
};

export default Books;
