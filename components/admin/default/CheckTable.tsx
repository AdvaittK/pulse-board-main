import React from 'react';
import { motion } from "framer-motion";
import CardMenu from '@/components/card/CardMenu';
import Checkbox from '@/components/checkbox';
import Card from '@/components/card';
import { cn } from "@/lib/utils";
import { MdListAlt, MdTrendingUp, MdAccessTime, MdOutlineInventory2 } from "react-icons/md";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

type RowObj = {
  name: [string, boolean];
  progress: string;
  quantity: number;
  date: string;
};

function CheckTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columnHelper = createColumnHelper<RowObj>();

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <Checkbox
            defaultChecked={info.getValue()[1]}
            color="indigo"
            me="10px"
          />
          <p className="ml-3 text-sm font-bold text-slate-700 dark:text-white">
            {info.getValue()[0]}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('progress', {
      id: 'progress',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PROGRESS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-slate-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          QUANTITY
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-slate-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-slate-700 dark:text-white">
          {info.getValue()}
        </p>
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
          'w-full h-full px-4 pb-4 sm:overflow-x-auto rounded-2xl border-none',
          'shadow-md hover:shadow-lg transition-all duration-300',
          'bg-gradient-to-br from-white to-blue-50/40',
          'dark:from-slate-800 dark:to-slate-700/90'
        )}
      >
        <div className="relative flex items-center justify-between pt-6">
          <div className="flex items-center">
            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <MdListAlt className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                Check Table
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Products management
              </p>
            </div>
          </div>
          <CardMenu />
        </div>

        {/* Key Stats - Added to utilize space */}
        <div className="grid grid-cols-3 gap-3 mt-4 mb-5">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-900/20 rounded-md">
                <MdTrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Revenue</span>
            </div>
            <p className="text-lg font-bold mt-1 text-slate-800 dark:text-white">$12,426</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                <MdOutlineInventory2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Inventory</span>
            </div>
            <p className="text-lg font-bold mt-1 text-slate-800 dark:text-white">1,253 units</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/20 rounded-md">
                <MdAccessTime className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg. Time</span>
            </div>
            <p className="text-lg font-bold mt-1 text-slate-800 dark:text-white">2.4 days</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <table className="w-full table-fixed">
              <thead className="bg-slate-100/80 dark:bg-slate-800/80">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-slate-700">
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          onClick={header.column.getToggleSortingHandler()}
                          className="cursor-pointer px-3 py-3 text-start transition-colors hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                        >
                          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <span className="ml-2">
                              {{
                                asc: '↑',
                                desc: '↓',
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
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        className="border-b border-gray-200 dark:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className="min-w-[100px] px-3 py-2.5"
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

export default CheckTable;