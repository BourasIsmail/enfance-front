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
import { useQuery } from "react-query";
import { api, getUser } from "@/api";
import { SideBar } from "@/components/SideBar";
import { BreadCrumb } from "@/components/BreadCrumb";
import { getAllProvinces } from "@/api/region";
import { Beneficiaire } from "@/type/Beneficiaire";
import { getBeneficiaire } from "@/api/beneficiaire";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Personnel from "@/components/Personnel";

export default function Home({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const router = useRouter();
  const [selectedValue, setselectedValue] = useState<Beneficiaire>();

  const { data: benef, isLoading } = useQuery({
    queryKey: ["benef", params.id],
    queryFn: () => getBeneficiaire(params.id),
    enabled: !!params.id,
    onSuccess: (data) => {
      setselectedValue(data);
    },
  });

  console.log(selectedValue);

  return (
    <>
      <SideBar />
      <main className="p-4 sm:mr-60">
        <BreadCrumb />
        <h1 className="text-2xl font-bold mb-4 py-2">تفاصيل الطلب</h1>
        <Tabs dir="rtl" defaultValue="personel" className="px-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personel">المعطيات الشخصية للمتدرب</TabsTrigger>
            <TabsTrigger value="academic">المعطيات الأكاديمية</TabsTrigger>
            <TabsTrigger value="formation">
              المعطيات الخاصة بالتدريب
            </TabsTrigger>
            <TabsTrigger value="file">المرفقات</TabsTrigger>
          </TabsList>
          <TabsContent value="personel">
            {benef && <Personnel beneficiaires={benef} />}
          </TabsContent>
          <TabsContent value="academic"></TabsContent>
          <TabsContent value="formation"></TabsContent>
          <TabsContent value="file"></TabsContent>
        </Tabs>
      </main>
    </>
  );
}
