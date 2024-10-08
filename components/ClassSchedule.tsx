"use client";
import { Class } from "@/lib/types/appwrite.types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteClassDialog from "./dialogs/DeleteClassDialog";
import ClassDialog from "./dialogs/ClassDialog";
import { DayOfWeekOptions } from "@/lib/constants";

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "className",
    header: "Name",
  },
  {
    accessorKey: "classType",
    header: "Type",
  },
  {
    accessorKey: "roomNumber",
    header: "Room number",
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "dayOfWeek",
    header: "Day of Week",
    cell: ({ getValue }) => {
      const dayOfWeek = getValue<number>();
      return DayOfWeekOptions[dayOfWeek];
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  {
    accessorKey: "actions",
    header: "",
    size: 200,
    minSize: 200,
    cell: ({ row }) => {
      return (
        <div className="grid grid-cols-2 gap-3">
          <DeleteClassDialog classId={row.original.$id} />
          <ClassDialog classId={row.original.$id} />
        </div>
      );
    },
  },
];

interface ClassScheduleProps<Class> {
  // columns: ColumnDef<Class>[];
  data: Class[];
}

const ClassSchedule = ({ data }: ClassScheduleProps<Class>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClassSchedule;
