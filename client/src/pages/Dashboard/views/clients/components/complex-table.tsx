import React, { useCallback,  useState } from "react";

import { Card } from "../../../../../components";
import CardMenu from "./card-menu";

import { FiEdit, FiTrash2 } from "react-icons/fi";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { api } from "../../../../../services/api";
import { useNavigate } from "react-router-dom";
import EditClientWidget from "../widget/edit-client.widget";

interface City {
  id: string;
  name: string;
  state: string;
}

type RowObj = {
  id: string;
  name: string;
  adress: string;
  phone: string;
  city: City;
  edit: string;
  delete: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable(props: { tableData: any }) {
  var { tableData } = props;

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEdit, setIsOpenEdit] = useState(false);
  let [clientSelected, setclientSelected] = useState("")

  const history = useNavigate()

  const [sorting, setSorting] = useState<SortingState>([]);
  let defaultData = tableData;

  const handleDeleteRow = useCallback(async (id: string) => {
    try {
      await api.delete(`/clients/${id}`)
      history(0);
    } catch (error) {
      alert(error)
    }
  }, [history])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModalEdit() {
    setIsOpenEdit(false)
    setclientSelected("");
  }

  function openModalEdit(id: string) {
    setIsOpenEdit(true)
    setclientSelected(id)
  }

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">id</p>
      ),
      cell: (id) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {id.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">name</p>
      ),
      cell: (name) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {name.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("adress", {
      id: "adress",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          adress
        </p>
      ),
      cell: (adress) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {adress.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          phone
        </p>
      ),
      cell: (phone) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {phone.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("city", {
      id: "city",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          city
        </p>
      ),
      cell: (props) => {
        const { row } = props;
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {row.original.city.name}
          </p>
        )
      },
    }),
    columnHelper.accessor("edit", {
      id: "edit",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          edit
        </p>
      ),
      cell: (props) => {
        const { row } = props;
        return (
          <button className="bg-orange-600 p-1 rounded hover:bg-orange-700" onClick={() => openModalEdit(row.original.id)}>
            <p className="flex cursor-pointer text-white">
              <FiEdit size={18} />
            </p>
          </button>
        )
      },
    }),
    columnHelper.accessor("delete", {
      id: "delete",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          delete
        </p>
      ),
      cell: (props) => {
        const { row } = props;
        return (
          <button className="bg-error p-1 rounded hover:bg-red-800" onClick={() => handleDeleteRow(row.original.id)}>
            <p className="flex cursor-pointer text-white">
              <FiTrash2 size={18} />
            </p>
          </button>
        )
      },
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });



  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Tabela de Clientes
        </div>
        <CardMenu
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
        />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <EditClientWidget id={clientSelected} isOpen={isOpenEdit} closeModal={closeModalEdit} />

    </Card>
  );
}
