"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getAllProvinces } from "@/api/province";
import { UserInfo } from "@/type/UserInfo";
import { api } from "@/api";

import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "react-query";
import Link from "next/link";
import { getUsers } from "@/api";
import { SideBar } from "@/components/SideBar";
import { BreadCrumb } from "@/components/BreadCrumb";
import { columns } from "./columns";
import { getBeneficiaires } from "@/api/beneficiaire";

export default function Home() {
  const { data: beneficiaires } = useQuery({
    queryKey: ["AllBeneficiaires"],
    queryFn: getBeneficiaires(),
  });
  return (
    <>
      <SideBar />
      <main className="p-4 sm:mr-60">
        <BreadCrumb />
        <Link href={"addBeneficiaire"}>
          <button
            type="button"
            className="focus:outline-none  text-white float-left bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            إضافة المستفيدين +
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 py-2">لائحة المستفيدين</h1>

        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <DataTable columns={columns} data={beneficiaires || []} />
        </div>
      </main>
    </>
  );
}
