"use client";

import { useState } from "react";
import { api } from "../api";
import { toast } from "@/components/ui/use-toast";
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
import { useRouter } from "next/navigation";
import { Beneficiaire } from "@/type/Beneficiaire";
import { Region } from "@/type/Region";
import { useQuery } from "react-query";
import { getALLRegions } from "@/api/region";
import { getProvinceByRegion } from "@/api/province";
import { getCentre } from "@/api/centre";

const Personnel = ({ beneficiaires }: { beneficiaires: Beneficiaire }) => {
  const [selectedValue, setselectedValue] =
    useState<Beneficiaire>(beneficiaires);
  const [open, setopen] = useState(false);

  const [selectedRegion1, setselectedRegion1] = useState<Region>();

  const { data: regions1 } = useQuery({
    queryKey: ["regions1"],
    queryFn: () => getALLRegions(),
  });

  const { data: provinces1 } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => getProvinceByRegion(selectedRegion1?.id as number),
    enabled: !!selectedRegion1?.id,
  });

  const { data: centre } = useQuery({
    queryKey: ["centre"],
    queryFn: () => getCentre(),
  });

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      console.log(selectedValue);
      const response = api
        .put(`/stagiaire/updatePersonnel/${selectedValue?.id}`, selectedValue)
        .then((res) => {
          console.log(response);
        });
      toast({
        description: "تم تحديث البيانات بنجاح",
        className: "bg-green-500 text-white",
        duration: 3000,
        title: "نجاح",
      });
    } catch (error) {
      toast({
        description: "اسم مستخدم أو كلمة مرور غير صحيحة",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
  };
  const router = useRouter();

  return (
    <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
      <section className="bg-white dark:bg-gray-900">
        <div className=" px-4 py-2 mx-auto lg:py-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  الإسم العائلي
                </label>
                <input
                  type="text"
                  name="nom"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.nom || ""}
                  placeholder="الإسم العائلي باللغة العربية"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      nom: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  الإسم الشخصي
                </label>
                <input
                  type="text"
                  name="prenom"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.prenom || ""}
                  placeholder="الإسم الشخصي باللغة العربية"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      prenom: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="relative z-0 w-full mb-5 group">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    الجهة
                  </label>
                  <select
                    name="region1"
                    onChange={(value) => {
                      setselectedRegion1({
                        ...selectedRegion1,
                        id: Number(value.target.value),
                        name: value.target.value.toString(),
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>
                      {selectedValue.province?.region.name}
                    </option>

                    {regions1?.map((region) => (
                      <option value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="relative z-0 w-full mb-5 group">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    الإقليم
                  </label>
                  <select
                    name="province1"
                    onChange={(e) =>
                      setselectedValue({
                        ...selectedValue,
                        province:
                          provinces1?.find(
                            (item) => item.id === Number(e.target.value)
                          ) || undefined,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>{selectedValue.province?.name}</option>

                    {provinces1?.map((province) => (
                      <option value={province.id}>{province.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="relative z-0 w-full mb-5 group">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    صنف المركز
                  </label>
                  <select
                    name="centre"
                    onChange={(e) =>
                      setselectedValue({
                        ...selectedValue,
                        centre:
                          centre?.find(
                            (item) => item.id === Number(e.target.value)
                          ) || undefined,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>{selectedValue.centre?.name}</option>

                    {centre?.map((c: any) => (
                      <option value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  الإسم الشخصي باللغة الفرنسية
                </label>
                <input
                  type="text"
                  name="prenomFr"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.prenomFr || ""}
                  placeholder="الإسم الشخصي باللغة الفرنسية"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      prenomFr: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  العنوان الشخصي
                </label>
                <input
                  type="text"
                  name="adresse"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.adresse || ""}
                  placeholder="العنوان الشخصي"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      adresse: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  تاريخ الازدياد
                </label>
                <input
                  type="date"
                  name="dateNaissance"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.dateNaissance || ""}
                  placeholder="تاريخ الازدياد"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      dateNaissance: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  الحالة العائلية
                </label>
                <input
                  type="text"
                  name="situationFamilial"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.situationFamilial || ""}
                  placeholder="الحالة العائلية"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      situationFamilial: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  رقم بطاقة الهوية الوطنية
                </label>
                <input
                  type="text"
                  name="cin"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.cin || ""}
                  placeholder="رقم بطاقة الهوية الوطنية"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      cin: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.email || ""}
                  placeholder="البريد الإلكتروني"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      email: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  الجنس
                </label>
                <div className="flex items-center me-4">
                  <input
                    id="red-radio"
                    type="radio"
                    value="homme"
                    checked={selectedValue?.sexe === "homme" ? true : false}
                    name="sexe"
                    onChange={(e) =>
                      setselectedValue({
                        ...selectedValue,
                        sexe: e.target.value || "",
                      })
                    }
                    className="w-4 h-4  bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    ذكر
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="green-radio"
                    type="radio"
                    value="femme"
                    checked={selectedValue?.sexe === "femme" ? true : false}
                    onChange={(e) =>
                      setselectedValue({
                        ...selectedValue,
                        sexe: e.target.value || "",
                      })
                    }
                    name="sexe"
                    className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    أنثى
                  </label>
                </div>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="telephone"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.telephone || ""}
                  placeholder="رقم الهاتف"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      telephone: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex justify-start items-end gap-3">
              <button
                type="submit"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                تحديث المعلومات
              </button>
              <button
                type="button"
                onClick={() => setopen(true)}
                className="text-green-600 inline-flex gap-2 items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                تأكيد الطلب
              </button>
              <div>
                <AlertDialog open={open} onOpenChange={setopen}>
                  <AlertDialogTrigger asChild></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                      <AlertDialogDescription>
                        ههذا الإجراء سيقوم بالموافقة على الطلب
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-8">
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSubmit}>
                        متابعة
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Personnel;
