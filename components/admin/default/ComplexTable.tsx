import React from "react";
import { motion } from "framer-motion";
import CardMenu from "@/components/card/CardMenu";
import Card from "@/components/card";
import Progress from "@/components/progress";
import { MdCancel, MdCheckCircle, MdOutlineError, MdTableChart } from "react-icons/md";
import { cn } from "@/lib/utils";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type RowObj = {
  name: string;
  status: string;
  date: string;
  progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-slate-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <div className={cn(
            "flex items-center px-2 py-1 rounded-full w-fit",
            status === "Approved" ? "bg-green-100/70 dark:bg-green-900/30" : 
            status === "Disable" ? "bg-red-100/70 dark:bg-red-900/30" : 
            "bg-amber-100/70 dark:bg-amber-900/30"
          )}>
            {status === "Approved" ? (
              <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
            ) : status === "Disable" ? (
              <MdCancel className="text-red-500 me-1 dark:text-red-300" />
            ) : status === "Error" ? (
              <MdOutlineError className="text-amber-500 me-1 dark:text-amber-300" />
            ) : null}
            <p className={cn(
              "text-sm font-bold",
              status === "Approved" ? "text-green-700 dark:text-green-300" : 
              status === "Disable" ? "text-red-700 dark:text-red-300" : 
              "text-amber-700 dark:text-amber-300"
            )}>
              {status}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-slate-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("progress", {
      id: "progress",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PROGRESS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <Progress width="w-[108px]" value={info.getValue()} />
          <p className="ml-2 text-xs font-medium text-slate-700 dark:text-white">{info.getValue()}%</p>
        </div>
      ),
    }),
  ];
  
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
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full h-full"
    >
      <Card 
        extra={cn(
          "w-full h-full px-6 pb-6 sm:overflow-x-auto rounded-2xl border-none",
          "shadow-md hover:shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-white to-blue-50",
          "dark:from-slate-900 dark:to-blue-950/30"
        )}
      >
        <div className="relative flex items-center justify-between pt-4">
          <div className="flex items-center">
            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <MdTableChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                Complex Table
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Status and progress tracking
              </p>
            </div>
          </div>
          <CardMenu />
        </div>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <div className="rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-100/80 dark:bg-slate-800/80">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-slate-700">
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          onClick={header.column.getToggleSortingHandler()}
                          className="cursor-pointer px-4 py-4 text-start transition-colors hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                        >
                          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <span className="ml-2">
                              {{
                                asc: "↑",
                                desc: "↓",
                              }[header.column.getIsSorted() as string] ?? null}
                            </span>
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
                  .map((row, index) => {
                    return (
                      <motion.tr 
                        key={row.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="border-b border-gray-200 dark:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className="min-w-[150px] px-4 py-3"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}