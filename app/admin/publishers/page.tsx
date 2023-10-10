"use client";

import { useState, useMemo } from "react";

import Modal from "@/components/Modal";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import {
  useDeletePublisherMutation,
  useGetPublishersQuery,
} from "@/services/bookParadiseApi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Publisher } from "@/types";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import AddAndEditPublisherForm from "./AddAndEditPublisherForm";

const Publishers = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher>();

  const { data: publishers } = useGetPublishersQuery();

  const [deletePublisher, deletePublisherResponse] =
    useDeletePublisherMutation();

  const columnDefs: ColDef<Publisher, unknown>[] = useMemo(
    () => [
      { field: "title", headerName: "عنوان" },
      {
        cellRenderer: (
          params: ICellRendererParams<Publisher, React.ReactNode, any>
        ) => {
          return (
            <div className="ag-table-icon-container">
              <PencilIcon
                className="w-4 h-4"
                onClick={() => {
                  setSelectedPublisher(params.data);
                  setIsModalOpen(true);
                }}
              />
              <TrashIcon
                className="w-4 h-4"
                onClick={() => deletePublisher({ id: params.data?.id })}
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
          setSelectedPublisher(undefined);
        }}
      />
      <Table rowData={publishers} columnDefs={columnDefs} />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={selectedPublisher ? "ویرایش انتشارات" : "افزودن انتشارات"}
      >
        <AddAndEditPublisherForm
          selectedPublisher={selectedPublisher}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default Publishers;
