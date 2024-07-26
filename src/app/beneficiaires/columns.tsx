"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import Link from "next/link";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { Beneficiaire } from "@/type/Beneficiaire";

export const columns: ColumnDef<Beneficiaire>[] = [
  {
    accessorKey: "nom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الاسم" />
    ),
  },
  {
    accessorKey: "prenom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="النسب" />
    ),
  },
  {
    accessorKey: "province.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الإقليم " />
    ),
  },
  {
    accessorKey: "province.region.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الجهة" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const benef = row.original;
      const queryClient = useQueryClient();

      const [open, setopen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-right" align="end">
              <DropdownMenuLabel>الوظائف</DropdownMenuLabel>
              <Link href={benef.id ? `/beneficiaires/${benef.id}` : `#`}>
                <DropdownMenuItem>تفاصيل المستفيد</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
