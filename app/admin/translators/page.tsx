"use client";

import { useMemo, useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { ColDef, ICellRendererParams } from "ag-grid-community";

import Modal from "@/components/Modal";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import AddAndEditTranslatorForm from "./AddAndEditTranslatorForm";

import {
  useDeleteTranslatorMutation,
  useGetTranslatorsQuery,
} from "@/services/bookParadiseApi";

import { Translator } from "@/types";

const Translators = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTranslator, setSelectedTranslator] = useState<Translator>();

  const { data: translators } = useGetTranslatorsQuery();

  const [deleteTranslator, deleteTranslatorResponse] =
    useDeleteTranslatorMutation();

  const columnDefs: ColDef<Translator, unknown>[] = useMemo(
    () => [
      { field: "firstName", headerName: "نام" },
      { field: "lastName", headerName: "نام خانوادگی" },
      {
        cellRenderer: (
          params: ICellRendererParams<Translator, React.ReactNode, any>
        ) => {
          return (
            <div className="ag-table-icon-container">
              <PencilIcon
                className="w-4 h-4"
                onClick={() => {
                  setSelectedTranslator(params.data);
                  setIsModalOpen(true);
                }}
              />
              <TrashIcon
                className="w-4 h-4"
                onClick={() => deleteTranslator({ id: params.data?.id })}
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
          setSelectedTranslator(undefined);
        }}
      />
      <Table rowData={translators} columnDefs={columnDefs} />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="افزودن مترجم"
      >
        <AddAndEditTranslatorForm
          selectedTranslator={selectedTranslator}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default Translators;
