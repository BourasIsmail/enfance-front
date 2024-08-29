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
import { getAllProvinces } from "@/api/province";
import { UserInfo } from "@/type/UserInfo";
import { api } from "@/api";
import { SideBar } from "@/components/SideBar";
import { BreadCrumb } from "@/components/BreadCrumb";

export default function Home() {
  const router = useRouter();
  const [selectedValue, setselectedValue] = useState<UserInfo>();
  const [open, setopen] = useState(false);
  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      console.log(selectedValue);
      const response = api.post(`/auth/addUser`, selectedValue).then((res) => {
        console.log(response);
      });
      toast({
        description: "تم تحديث البيانات بنجاح",
        className: "bg-green-500 text-white",
        duration: 3000,
        title: "نجاح",
      });
      router.push("/comptes");
    } catch (error) {
      toast({
        description: "اسم مستخدم أو كلمة مرور غير صحيحة",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
  };
  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => getAllProvinces(),
  });

  return (
    <>
      <SideBar />
      <main className="p-4 sm:mr-60">
        <BreadCrumb />

        <h1 className="text-2xl font-bold mb-4 py-2">إضافة الحسابات</h1>

        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <section className="bg-white dark:bg-gray-900">
            <div className=" px-4 py-2 mx-auto lg:py-2">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      id=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="البريد الإلكتروني "
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
                      الإسم
                    </label>
                    <input
                      type="text"
                      name="name"
                      id=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="الإسم"
                      onChange={(e) =>
                        setselectedValue({
                          ...selectedValue,
                          name: e.target.value || "",
                        })
                      }
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      كلمة السر
                    </label>
                    <input
                      type="password"
                      name="password"
                      id=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="كلمة السر"
                      onChange={(e) =>
                        setselectedValue({
                          ...selectedValue,
                          password: e.target.value || "",
                        })
                      }
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      إقليم
                    </label>
                    <select
                      name="province"
                      onChange={(e) =>
                        setselectedValue({
                          ...selectedValue,
                          province:
                            provinces?.find(
                              (item) => item.id === Number(e.target.value)
                            ) || undefined,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {provinces?.map((pr) => (
                        <option value={pr.id}>{pr.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      نوع الحساب
                    </label>

                    <select
                      name="roles"
                      id=""
                      value={selectedValue?.roles ?? ""}
                      onChange={(e) =>
                        setselectedValue({
                          ...selectedValue,
                          roles: e.target.value || "",
                        })
                      }
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>إختر </option>
                      <option value="USER_ROLES">حساب للمندوبيات</option>
                      <option value="ADMIN_ROLES">
                        حساب للعاملين بالإدارة المركزية
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-start items-end gap-3">
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
                          <AlertDialogTitle>
                            هل أنت متأكد تمامًا؟
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            ههذا الإجراء سيقوم بالموافقة على الطلب
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-8">
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSubmit}>
                            <button type="submit">متابعة</button>
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
      </main>
    </>
  );
}
