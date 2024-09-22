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
import { getCentre } from "@/api/centre";
import { getALLRegions } from "@/api/region";
import { getProvinceByRegion } from "@/api/province";import {
  getAllCenters,
  getAllClassifications,
  getAllHandicaps,
  getAllMendicites,
  getAllServices,
  getAllSituationsDeRue,
  getAllSituationsFamiliales,
  getAllSituationsFinancieres,
  getAllSituationsMedicales,
  getAllViolences,
} from "@/api/beneficiaire";

const Personnel = ({ beneficiaires }: { beneficiaires: Beneficiaire }) => {
  const [selectedValue, setselectedValue] =
    useState<Beneficiaire>(beneficiaires);
  const [open, setopen] = useState(false);
  const [violence, setviolence] = useState(false);
  const [rue, setrue] = useState(false);
  const [mendicite, setmendicite] = useState(false);

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
      router.push('/beneficiaires');
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
                      {selectedValue.province?.region?.name}
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  الفئة العمرية
                </label>
                <input
                  type="text"
                  name="groupeAge"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.groupeAge || ""}
                  placeholder="الفئة العمرية"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      groupeAge: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    الدراسة
  </label>
  <select
    name="scolarite"
    value={selectedValue?.scolarite || ""}
    onChange={(e) => {
      setselectedValue((prev) => ({
        ...prev,
        scolarite: e.target.value || "",
      }));
    }}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  >
    <option value="" disabled>
      هل يدرس؟
    </option>
    <option value="غير منقطع عن الدراسة">غير منقطع عن الدراسة</option>
    <option value="منقطع عن الدراسة">منقطع عن الدراسة</option>
  </select>
</div>

{selectedValue?.scolarite === "غير منقطع عن الدراسة" && (
  <div className="w-full">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      المستوى الدراسي
    </label>
    <select
      name="niveauScolaire"
      value={selectedValue?.niveauScolaire || ""}
      onChange={(e) =>
        setselectedValue((prev) => ({
          ...prev,
          niveauScolaire: e.target.value || "",
        }))
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      required
    >
      <option value="" disabled>
        اختر المستوى الدراسي
      </option>
      <option value="لم يبلغ بعد سن التمدرس">
        لم يبلغ بعد سن التمدرس
      </option>
      <option value="لم يسبق له أن تمدرس">
        لم يسبق له أن تمدرس
      </option>
      <option value="التعليم الأولي">التعليم الأولي</option>
      <option value="المستوى الابتدائي">المستوى الابتدائي</option>
      <option value="المستوى الاعدادي">المستوى الاعدادي</option>
      <option value="المستوى الثانوي">المستوى الثانوي</option>
      <option value="التكوين المهني">التكوين المهني</option>
      <option value="التكوين بالتدرج">التكوين بالتدرج</option>
      <option value="التربية غير النظامية">التربية غير النظامية</option>
      <option value="التربية الدامجة">التربية الدامجة</option>
    </select>
  </div>
)}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  وسط الإقامة
                </label>
                <input
                  type="text"
                  name="sejour"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.sejour || ""}
                  placeholder="وسط الإقامة"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      sejour: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  المجال الترابي
                  </label>
                <input
                  type="text"
                  name="territoire"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.territoire || ""}
                  placeholder="المجال الترابي"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      territoire: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  وصف الحالة الاجتماعية (هام جدا)
                </label>
                <input
                  type="situationSocial"
                  name="text"
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedValue?.situationSocial || ""}
                  placeholder="وصف الحالة 
الاجتماعية
(هام جدا)"
                  onChange={(e) =>
                    setselectedValue({
                      ...selectedValue,
                      situationSocial: e.target.value || "",
                    })
                  }
                  required
                />
              </div>
              
              <div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    الوضع الاجتماعي
  </label>
  <input
    type="text"
    name="situationSocial"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    value={selectedValue?.situationSocial || ""}
    onChange={(e) =>
      setselectedValue({
        ...selectedValue,
        situationSocial: e.target.value || "",
      })
    }
  />
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
    الوضعية الصحية
  </label>
  <input
    type="text"
    name="situationMedical"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    value={selectedValue?.situationMedical?.choix || ""}
    onChange={(e) =>
      setselectedValue({
        ...selectedValue,
        situationMedical: { ...selectedValue.situationMedical!, choix: e.target.value },
      })
    }
  />
</div>

<div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    الوضعية العائلية
  </label>
  <input
    type="text"
    name="situationFamilial"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    value={selectedValue?.situationFamilial?.choix || ""}
    onChange={(e) =>
      setselectedValue({
        ...selectedValue,
        situationFamilial: { ...selectedValue.situationFamilial!, choix: e.target.value },
      })
    }
  />
</div>

<div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    الوضع المالي
  </label>
  <input
    type="text"
    name="situationFinanciere"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    value={selectedValue?.situationFinanciere?.choix || ""}
    onChange={(e) =>
      setselectedValue({
        ...selectedValue,
        situationFinanciere: { ...selectedValue.situationFinanciere!, choix: e.target.value },
      })
    }
  />
</div>
<div className="w-full">
  <label htmlFor="classificationCas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    تصنيف الحالة
  </label>
  <select
    id="classificationCas"
    name="classificationCas"
    value={selectedValue?.classificationCas?.choix || ""}
    onChange={(e) => {
      setselectedValue({
        ...selectedValue,
        classificationCas: {
          ...selectedValue?.classificationCas,
          choix: e.target.value || "",
        },
      });
    }}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  >
    <option value="" disabled>
      اختر التصنيف
    </option>
    <option value="غير مسجل في الحالة المدنية">غير مسجل في الحالة المدنية</option>
    <option value="في وضعية الشارع">في وضعية الشارع</option>
    <option value="في وضعية إعاقة">في وضعية إعاقة</option>
    <option value="في وضعية تشغيل">في وضعية تشغيل</option>
    <option value="في وضعية تسول">في وضعية تسول</option>
    <option value="ضحية عنف">ضحية عنف</option>
    <option value="حالة إدمان">حالة إدمان</option>
    <option value="مشاكل أسرية">مشاكل أسرية</option>
    <option value="الهدر المدرسي">الهدر المدرسي</option>
    <option value="مهمش">مهمش</option>
    <option value="مهاجر">مهاجر</option>
    <option value="لاجئ">لاجئ</option>
    <option value="في تماس مع القانون">في تماس مع القانون</option>
    <option value="آخر مع التحديد">آخر مع التحديد</option>
  </select>
</div>

{selectedValue?.classificationCas?.choix === "آخر مع التحديد" && (
  <div className="w-full">
    <label htmlFor="autreClassificationCas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      تحديد التصنيف
    </label>
    <input
      type="text"
      id="autreClassificationCas"
      name="autreClassificationCas"
      value={selectedValue?.classificationCas?.autre || ""}
      onChange={(e) =>
        setselectedValue({
          ...selectedValue,
          classificationCas: {
            ...selectedValue.classificationCas,
            autre: e.target.value || "",
          },
        })
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      placeholder="أدخل تصنيف آخر"
    />
  </div>
)}
<div className="w-full">
  <label htmlFor="handicap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    الإعاقة
  </label>
  <select
    id="handicap"
    name="handicap"
    value={selectedValue?.handicap?.choix || ""}
    onChange={(e) => {
      setselectedValue({
        ...selectedValue,
        handicap: {
          ...selectedValue?.handicap,
          choix: e.target.value || "",
        },
      });
    }}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  >
    <option value="" disabled>
      اختر نوع الإعاقة
    </option>
    <option value="إعاقة حركية">إعاقة حركية</option>
    <option value="إعاقة ذهنية">إعاقة ذهنية</option>
    <option value="إعاقة حسية">إعاقة حسية</option>
    <option value="توحد">توحد</option>
    <option value="إعاقة مركبة">إعاقة مركبة</option>
    <option value="آخر مع التحديد">آخر مع التحديد</option>
  </select>
</div>

{selectedValue?.handicap?.choix === "آخر مع التحديد" && (
  <div className="w-full">
    <label htmlFor="autreHandicap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      تحديد الإعاقة
    </label>
    <input
      type="text"
      id="autreHandicap"
      name="autreHandicap"
      value={selectedValue?.handicap?.autre || ""}
      onChange={(e) =>
        setselectedValue({
          ...selectedValue,
          handicap: {
            ...selectedValue.handicap,
            autre: e.target.value || "",
          },
        })
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      placeholder="أدخل نوع الإعاقة"
      required
    />
  </div>
)}
<div className="my-auto flex items-center w-full">
  <input
    id="violence-checkbox"
    type="checkbox"
    checked={violence}
    onChange={(e) => setviolence(e.target.checked)}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label htmlFor="violence-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
    هل يعاني من العنف؟
  </label>
</div>

{violence && (
  <>
    <div className="w-full">
      <label htmlFor="violence-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        نوع العنف
      </label>
      <select
        id="violence-type"
        name="violence"
        value={selectedValue?.violence?.descViolance || ""}
        onChange={(e) => {
          setselectedValue({
            ...selectedValue,
            violence: {
              ...selectedValue?.violence,
              descViolance: e.target.value || "",
            },
          });
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      >
        <option value="" disabled>
          اختر نوع العنف
        </option>
        <option value="عنف جسدي">عنف جسدي</option>
        <option value="عنف جنسي">عنف جنسي</option>
        <option value="عنف نفسي">عنف نفسي</option>
        <option value="استغلال اقتصادي/اهمال">استغلال اقتصادي/اهمال</option>
        <option value="عنف مركب مع التحديد">عنف مركب مع التحديد</option>
      </select>
    </div>

    <div className="w-full">
      <label htmlFor="aggressor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        هوية المعتدي
      </label>
      <select
        id="aggressor"
        name="agresseur"
        value={selectedValue?.violence?.agresseur || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            violence: {
              ...selectedValue?.violence,
              agresseur: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      >
        <option value="" disabled>
          اختر هوية المهاجم
        </option>
        <option value="الأسرة">الأسرة</option>
        <option value="الأقارب">الأقارب</option>
        <option value="الجيران">الجيران</option>
        <option value="غيرمعلوم">غيرمعلوم</option>
        <option value="المشغل">المشغل</option>
        <option value="إمام المسجد">إمام المسجد</option>
        <option value="الأقران">الأقران</option>
      </select>
    </div>

    <div className="w-full">
      <label htmlFor="violence-location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        مكان العنف
      </label>
      <input
        type="text"
        id="violence-location"
        name="lieuViolance"
        value={selectedValue?.violence?.lieuViolance || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            violence: {
              ...selectedValue?.violence,
              lieuViolance: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="أدخل مكان العنف"
        required
      />
    </div>
  </>
)}


<div className="my-auto flex items-center w-full">
  <input
    id="default-checkbox"
    type="checkbox"
    checked={rue}
    onChange={(e) => setrue(e.target.checked)}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
    في حالة وضعية الشارع
  </label>
</div>
{rue && (
  <>
    <div className="w-full mt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        سبب الخروج إلى الشارع
      </label>
      <select
        name="situationDeRue"
        value={selectedValue?.situationDeRue?.raisonSortieRue || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            situationDeRue: {
              ...selectedValue?.situationDeRue,
              raisonSortieRue: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      >
        <option value="" disabled>
          اختر حالة الشارع
        </option>
        <option value="الإدمان">الإدمان</option>
        <option value="التخلي">التخلي</option>
        <option value="الحالة الاجتماعية الهشة">الحالة الاجتماعية الهشة</option>
        <option value="الرغبة في الهجرة">الرغبة في الهجرة</option>
        <option value="بدون مأوى">بدون مأوى</option>
        <option value="حالة يتم">حالة يتم</option>
        <option value="مشاكل أسرية">مشاكل أسرية</option>
      </select>
    </div>

    <div className="w-full mt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        بلد الأصل بالنسبة للطفل الأجنبي أو مدينة الأصل بالنسبة للطفل المغربي
      </label>
      <input
        type="text"
        name="origineEnfant"
        value={selectedValue?.situationDeRue?.origineEnfant || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            situationDeRue: {
              ...selectedValue?.situationDeRue,
              origineEnfant: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      />
    </div>

    <div className="w-full mt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        المدة المقضاة بالشارع
      </label>
      <select
        name="durreDansRue"
        value={selectedValue?.situationDeRue?.durreDansRue || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            situationDeRue: {
              ...selectedValue?.situationDeRue,
              durreDansRue: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      >
        <option value="" disabled>
          اختر المدة في الشارع
        </option>
        <option value="أقل من شهر">أقل من شهر</option>
        <option value="من شهر إلى ستة أشهر">من شهر إلى ستة أشهر</option>
        <option value="من ستة أشهر إلى سنة واحدة">من ستة أشهر إلى سنة واحدة</option>
        <option value="أكثر من خمس سنوات">أكثر من خمس سنوات</option>
        <option value="آخر مع التحديد">آخر مع التحديد</option>
      </select>
    </div>

    {selectedValue?.situationDeRue?.durreDansRue === "آخر مع التحديد" && (
      <div className="w-full mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          تحديد المدة
        </label>
        <input
          type="text"
          name="autreDurreDansRue"
          value={selectedValue?.situationDeRue?.autreDuree || ""}
          onChange={(e) =>
            setselectedValue({
              ...selectedValue,
              situationDeRue: {
                ...selectedValue.situationDeRue,
                autreDuree: e.target.value || "",
              },
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          required
        />
      </div>
    )}

    <div className="w-full mt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        وتيرة التردد على الشارع
      </label>
      <select
        name="frequenceRue"
        value={selectedValue?.situationDeRue?.frequenceRue || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            situationDeRue: {
              ...selectedValue?.situationDeRue,
              frequenceRue: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      >
        <option value="" disabled>
          اختر وتيرة التردد
        </option>
        <option value="بشكل دائم">بشكل دائم</option>
        <option value="من فترة لأخرى">من فترة لأخرى</option>
      </select>
    </div>
  </>
)}
<div className="my-auto flex items-center w-full">
  <input
    id="default-checkbox"
    type="checkbox"
    checked={mendicite}
    onChange={(e) => setmendicite(e.target.checked)}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
    في حالة وضعية التسول؟
  </label>
</div>
{mendicite && (
  <>
    <div className="w-full mt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        مكان التسول
      </label>
      <input
        type="text"
        name="lieuMendicite"
        value={selectedValue?.mendicite?.lieuMendicite || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            mendicite: {
              ...selectedValue?.mendicite,
              lieuMendicite: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      />
    </div>

    <div className="w-full mt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        الشخص المستغل
      </label>
      <input
        type="text"
        name="personneExploitante"
        value={selectedValue?.mendicite?.personneExploitante || ""}
        onChange={(e) =>
          setselectedValue({
            ...selectedValue,
            mendicite: {
              ...selectedValue?.mendicite,
              personneExploitante: e.target.value,
            },
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required
      />
    </div>
  </>
)}
<div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    اسم الخدمة
  </label>
  <select
    name="servicesName"
    value={selectedValue?.services?.serviceName || ""}
    onChange={(e) =>
      setselectedValue((prev) => ({
        ...prev,
        services: {
          ...prev?.services,
          serviceName: e.target.value,
        },
      }))
    }
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  >
    <option value="" disabled>
      اختر الخدمة
    </option>
    <option value="وساطة أسرية">وساطة أسرية</option>
    <option value="الادماج المهني">الادماج المهني</option>
    <option value="المواكبة القانونية">المواكبة القانونية</option>
    <option value="الاستقبال والاستماع">الاستقبال والاستماع</option>
    <option value="التوجيه النفسي">التوجيه النفسي</option>
    <option value="التوجيه الطبي">التوجيه الطبي</option>
    <option value="التكفل الإداري">التكفل الإداري</option>
    <option value="آخر (مع التحديد في خانة الإضافات)">
      آخر (مع التحديد في خانة الإضافات)
    </option>
  </select>
</div>

<div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    وصف الخدمة
  </label>
  <input
    type="text"
    name="serviceDescription"
    value={selectedValue?.services?.serviceDescription || ""}
    onChange={(e) =>
      setselectedValue((prev) => ({
        ...prev,
        services: {
          ...prev?.services,
          serviceDescription: e.target.value,
        },
      }))
    }
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  />
</div>
<div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    الجهة المحيلة
  </label>
  <select
    name="entiteReferente"
    value={selectedValue?.services?.entiteReferente || ""}
    onChange={(e) =>
      setselectedValue((prev) => ({
        ...prev,
        services: {
          ...prev?.services,
          entiteReferente: e.target.value,
        },
      }))
    }
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  >
    <option value="" disabled>
      اختر الجهة المحيلة
    </option>
    <option value="استقبال مباشر">استقبال مباشر</option>
    <option value="التبليغ عبر الهاتف">التبليغ عبر الهاتف</option>
    <option value="التعاون الوطني">التعاون الوطني</option>
    <option value="السلطة المحلية">السلطة المحلية</option>
    <option value="الصحة">الصحة</option>
    <option value="الأمن الوطني">الأمن الوطني</option>
    <option value="الدرك الملكي">الدرك الملكي</option>
    <option value="القضاء">القضاء</option>
    <option value="مؤسسة الرعاية الاجتماعية">مؤسسة الرعاية الاجتماعية</option>
    <option value="EMF">EMF</option>
    <option value="COAPH">COAPH</option>
    <option value="آخر (مع التحديد في خانة الإضافات)">
      آخر (مع التحديد في خانة الإضافات)
    </option>
  </select>
</div>

{selectedValue?.services?.entiteReferente === "آخر (مع التحديد في خانة الإضافات)" && (
  <div className="w-full">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      تحديد الجهة المحيلة
    </label>
    <input
      type="text"
      name="autreEntiteReferente"
      value={selectedValue?.services?.autreReferente || ""}
      onChange={(e) =>
        setselectedValue((prev) => ({
          ...prev,
          services: {
            ...prev?.services,
            autreReferente: e.target.value,
          },
        }))
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      required
    />
  </div>
)}
<div className="w-full">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    الجهة المحال عليها
  </label>
  <select
    name="entiteRefere"
    value={selectedValue?.services?.entiteRefere || ""}
    onChange={(e) =>
      setselectedValue((prev) => ({
        ...prev,
        services: {
          ...prev?.services,
          entiteRefere: e.target.value,
        },
      }))
    }
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  >
    <option value="" disabled>
      اختر الجهة المحال عليها
    </option>
    <option value="السلطة المحلية">السلطة المحلية</option>
    <option value="سوق الشغل">سوق الشغل</option>
    <option value="مركز حماية الطفولة">مركز حماية الطفولة</option>
    <option value="الصحة">الصحة</option>
    <option value="الأمن الوطني">الأمن الوطني</option>
    <option value="الدرك الملكي">الدرك الملكي</option>
    <option value="القضاء مع التحديد">القضاء مع التحديد</option>
    <option value="المجتمع المدني">المجتمع المدني</option>
    <option value="مؤسسة تعليمية">مؤسسة تعليمية</option>
    <option value="مؤسسة الرعاية الاجتماعية">مؤسسة الرعاية الاجتماعية</option>
    <option value="EMF">EMF</option>
    <option value="COAPH">COAPH</option>
    <option value="آخر (مع التحديد في خانة الإضافات)">آخر (مع التحديد في خانة الإضافات)</option>
  </select>
</div>

{(selectedValue?.services?.entiteRefere === "القضاء مع التحديد" || selectedValue?.services?.entiteRefere === "آخر (مع التحديد في خانة الإضافات)") && (
  <div className="w-full">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      تحديد الجهة المحال عليها
    </label>
    <input
      type="text"
      name="autreEntiteRefere"
      value={selectedValue?.services?.autreRefere || ""}
      onChange={(e) =>
        setselectedValue((prev) => ({
          ...prev,
          services: {
            ...prev?.services,
            autreRefere: e.target.value,
          },
        }))
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      required
    />
  </div>
)}
<div className="w-full mt-2">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    حالة الملف
  </label>
  <select
    name="etat"
    value={selectedValue?.services?.etat || ""}
    onChange={(e) =>
      setselectedValue((prev) => ({
        ...prev,
        services: {
          ...prev?.services,
          etat: e.target.value,
        },
      }))
    }
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    required
  >
    <option value="" disabled>
      اختر الحالة
    </option>
    <option value="ملف جديد">ملف جديد</option>
    <option value="ملف مفتوح من قبل">ملف مفتوح من قبل</option>
    <option value="ملف مغلق">ملف مغلق</option>
  </select>
</div>

{selectedValue?.services?.etat === "ملف مغلق" && (
  <div className="w-full">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      المرجو تحديد إذا ما تم إنجاز الخدمة ام تعذر ذلك مع توضيح السبب في خانة الإضافات
    </label>
    <input
      type="text"
      name="detailEtatFerme"
      value={selectedValue?.services?.detailEtatFerme || ""}
      onChange={(e) =>
        setselectedValue((prev) => ({
          ...prev,
          services: {
            ...prev?.services,
            detailEtatFerme: e.target.value,
          },
        }))
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      required
    />
  </div>
)}


            </div>
            <div className="flex justify-start items-end gap-3">
  <button
    type="button"
    onClick={() => setopen(true)} // Ouvre la boîte de dialogue de confirmation
    className="text-green-600 inline-flex gap-2 items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
  >
    تأكيد وتحديث المعلومات
  </button>
  <div>
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
          <AlertDialogDescription>
            هذا الإجراء سيقوم بالموافقة على الطلب وتحديث المعلومات
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
