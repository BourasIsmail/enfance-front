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
import { UserInfo } from "@/type/UserInfo";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="البريد الإلكتروني" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الاسم" />
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
      const user = row.original;
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
              <Link href={user.id ? `/comptes/${user.id}` : `#`}>
                <DropdownMenuItem>تفاصيل الحساب</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
