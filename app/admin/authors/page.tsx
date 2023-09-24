"use client";

import { useMemo, useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { ColDef } from "ag-grid-community";

import Modal from "@/components/Modal";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import AddAndEditAuthorForm from "./AddAndEditAuthorForm";

import {
  useDeleteAuthorMutation,
  useGetAuthorsQuery,
} from "@/services/bookParadiseApi";

import { Author } from "@/types";

const Authors = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedAuthor, setSelectedAuthor] = useState<Author>();

  const { data: authors } = useGetAuthorsQuery();

  const [deleteAuthor, result] = useDeleteAuthorMutation();

  const columnDefs: ColDef<Author, unknown>[] = useMemo(
    () => [
      { field: "firstName", headerName: "نام" },
      { field: "lastName", headerName: "نام خانوادگی" },
      {
        cellRenderer: (params) => {
          return (
            <div className="ag-table-icon-container">
              <PencilIcon
                className="w-4 h-4"
                onClick={() => {
                  setSelectedAuthor(params.data);
                  setIsModalOpen(true);
                }}
              />
              <TrashIcon
                className="w-4 h-4"
                onClick={() => deleteAuthor({ id: params.data.id })}
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
          setSelectedAuthor(undefined);
        }}
      />
      <Table rowData={authors} columnDefs={columnDefs} />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={selectedAuthor ? "ویرایش نویسنده" : "افزودن نویسنده"}
      >
        <AddAndEditAuthorForm
          selectedAuthor={selectedAuthor}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default Authors;
