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
import { getAllProvinces } from "@/api/province";
import { UserInfo } from "@/type/UserInfo";

export default function Home({
  params,
}: {
  params: {
    id: number;
  };
})
 {
  const router = useRouter();
  const [selectedValue, setselectedValue] = useState<UserInfo>();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => getUser(params.id),
    enabled: !!params.id,
    onSuccess: (data) => {
      setselectedValue(data);
    },
  });
  const [open, setopen] = useState(false);
  const getProvinces = async () => {
    const response = await api.get('/province');  
    return response.data;
};
  const handleSubmit = (e : any) => {
    try {
      e.preventDefault();
      console.log(selectedValue);
      const response = api
        .put(`/auth/updateUser/${selectedValue?.id}`, selectedValue)
        .then((res) => {
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

        <h1 className="text-2xl font-bold mb-4 py-2">تفاصيل الحساب</h1>

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
                      value={selectedValue?.email || ""}
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
                      value={selectedValue?.name || ""}
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
                      value={selectedValue?.password || ""}
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
                                        الإقليم
                                        </label>
                                        <select
                                        name="province"
                                        value={selectedValue?.province?.id || ""}
                                        onChange={(e) => setselectedValue({
                                            ...selectedValue,
                                            province: { 
                                                id: parseInt(e.target.value), 
                                                name: e.target.options[e.target.selectedIndex].text,
                                                region: selectedValue?.province?.region || null,
                                            },
                                        })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                        >
                                        <option value="" disabled>الإقليم</option>
                                        <option value="9">أكادير</option>
                                        <option value="6">عين السبع الحي المحمدي</option>
                                        <option value="1">الحسيمة</option>
                                        <option value="5">أزيلال</option>
                                        <option value="6">بن مسيك سيدي عثمان</option>
                                        <option value="5">بني ملال</option>
                                        <option value="6">بنسليمان</option>
                                        <option value="3">بولمان</option>
                                        <option value="6">الدار البيضاء أنفا</option>
                                        <option value="1">شفشاون</option>
                                        <option value="7">شيشاوة</option>
                                        <option value="12">الداخلة</option>
                                        <option value="3">الحاجب</option>
                                        <option value="7">الحوز</option>
                                        <option value="6">الجديدة</option>
                                        <option value="7">قلعة السراغنة</option>
                                        <option value="8">الراشيدية</option>
                                        <option value="7">الصويرة</option>
                                        <option value="3">فاس</option>
                                        <option value="2">فكيك</option>
                                        <option value="10">كلميم</option>
                                        <option value="3">إفران</option>
                                        <option value="4">القنيطرة</option>
                                        <option value="4">الخميسات</option>
                                        <option value="5">خنيفرة</option>
                                        <option value="5">خريبكة</option>
                                        <option value="11">العيون</option>
                                        <option value="1">العرائش</option>
                                        <option value="7">مراكش</option>
                                        <option value="3">مكناس</option>
                                        <option value="6">المحمدية</option>
                                        <option value="2">الناظور</option>
                                        <option value="8">ورززات</option>
                                        <option value="2">وجدة</option>
                                        <option value="4">الرباط</option>
                                        <option value="7">آسفي</option>
                                        <option value="4">سلا</option>
                                        <option value="6">سطات</option>
                                        <option value="9">إنزكان أيت ملول</option>
                                        <option value="4">سيدي قاسم</option>
                                        <option value="10">طانطان</option>
                                        <option value="1">طنجة</option>
                                        <option value="3">تاونات</option>
                                        <option value="9">تارودانت</option>
                                        <option value="9">طاطا</option>
                                        <option value="3">تازة</option>
                                        <option value="4">تمارة</option>
                                        <option value="1">تطوان</option>
                                        <option value="9">تزنيت</option>
                                        <option value="10">آسا الزاك</option>
                                        <option value="11">السمارة</option>
                                        <option value="11">بوجدور</option>
                                        <option value="2">جرادة</option>
                                        <option value="2">تاوريرت</option>
                                        <option value="9">شتوكة أيت باها</option>
                                        <option value="8">زاكورة</option>
                                        <option value="1">الفحص أنجرة</option>
                                        <option value="6">عين الشق</option>
                                        <option value="3">مولاي يعقوب</option>
                                        <option value="3">صفرو</option>
                                        <option value="1">المضيق فنيدق</option>
                                        <option value="2">بركان</option>
                                        <option value="6">سيدي البرنوصي</option>
                                        <option value="6">مديونة</option>
                                        <option value="6">مولاي رشيد</option>
                                        <option value="6">مرس السلطان</option>
                                        <option value="6">الحي الحسني</option>
                                        <option value="6">النواصر</option>
                                        <option value="2">كرسيف</option>
                                        <option value="12">أوسرد</option>
                                        <option value="6">سيدي بنور</option>
                                        <option value="7">الرحامنة</option>
                                        <option value="4">سيدي سليمان</option>
                                        <option value="8">ميدلت</option>
                                        <option value="5">الفقيه بنصالح</option>
                                        <option value="11">طرفاية</option>
                                        <option value="2">الدريوش</option>
                                        <option value="8">تنغير</option>
                                        <option value="7">اليوسفية</option>
                                        <option value="6">برشيد</option>
                                        <option value="1">وزان</option>
                                        <option value="10">سيدي إفني</option>
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
