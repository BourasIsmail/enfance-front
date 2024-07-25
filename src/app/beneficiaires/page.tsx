"use client";

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

        <h1 className="text-2xl font-bold mb-4 py-2">لائحة المستفيدين</h1>

        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <DataTable columns={columns} data={beneficiaires || []} />
        </div>
      </main>
    </>
  );
}
