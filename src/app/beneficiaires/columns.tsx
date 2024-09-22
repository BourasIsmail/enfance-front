"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
    accessorKey: "sexe",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الجنس" />
    ),
  },
  {
    accessorKey: "groupeAge",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الفئة العمرية" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const benef = row.original;
      const queryClient = useQueryClient();

      const handleDelete = async () => {
        const confirmed = window.confirm("هل أنت متأكد من حذف هذا المستفيد؟");
        if (confirmed && benef.id) {
          try {
            await deleteBeneficiaire(benef.id);
            queryClient.invalidateQueries('beneficiaires');
          } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression du bénéficiaire");
          }
        }
      };

      return (
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              حذف المستفيد
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const deleteBeneficiaire = async (id: number) => {
  const response = await fetch(`/api/beneficiaires/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Récupérer le message d'erreur
    console.error("Erreur de l'API:", errorMessage); // Afficher l'erreur dans la console
    throw new Error('Erreur lors de la suppression du bénéficiaire');
  }
};
