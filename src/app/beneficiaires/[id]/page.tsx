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
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "react-query";
import { api } from "@/api";
import { SideBar } from "@/components/SideBar";
import { BreadCrumb } from "@/components/BreadCrumb";
import {
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
  getBeneficiaire,
} from "@/api/beneficiaire";
import {
  getAllProvinces,
  getProvinceByRegion,
  getProvinces,
} from "@/api/province";

import { Beneficiaire } from "@/type/Beneficiaire";

import { getCentre } from "@/api/centre";

export default function Home({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const [selectedValue, setselectedValue] = useState<Beneficiaire>();

  const [violence, setviolence] = useState(false);
  const [rue, setrue] = useState(false);
  const [mendicite, setmendicite] = useState(false);

  useEffect(() => {
    if (selectedValue?.violence?.agresseur) {
      setviolence(true);
    } else {
      setviolence(false);
    }

    if (selectedValue?.situationDeRue?.raisonSortieRue) {
      setrue(true);
    } else {
      setrue(false);
    }

    if (selectedValue?.mendicite?.lieuMendicite) {
      setmendicite(true);
    } else {
      setmendicite(false);
    }
  }, [selectedValue]);

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => getAllProvinces(),
  });

  const { data: centre } = useQuery({
    queryKey: ["centre"],
    queryFn: () => getCentre(),
  });
  const router = useRouter();

  const { data: benef, isLoading } = useQuery({
    queryKey: ["benef", params.id],
    queryFn: () => getBeneficiaire(params.id),
    enabled: !!params.id,
    onSuccess: (data) => {
      setselectedValue(data);
    },
  });

  function handleSubmit(e: any) {
    try {
      e.preventDefault();
      console.log(selectedValue);
      if (selectedValue?.situationMedical?.choix !== "أخرى") {
        if (selectedValue?.situationMedical) {
          selectedValue.situationMedical.autre = "";
        }
      }
      if (selectedValue?.classificationCas?.choix !== "آخر مع التحديد") {
        if (selectedValue?.classificationCas) {
          selectedValue.classificationCas.autre = "";
        }
      }
      if (selectedValue?.handicap?.choix !== "آخر مع التحديد") {
        if (selectedValue?.handicap) {
          selectedValue.handicap.autre = "";
        }
      }
      if (violence === false) {
        if (selectedValue?.violence) {
          selectedValue.violence.descViolance = "pas de violence";
        }
      }
      if (rue === false) {
        if (selectedValue?.situationDeRue) {
          selectedValue.situationDeRue.raisonSortieRue = "pas de cas";
        }
      }
      if (mendicite === false) {
        if (selectedValue?.mendicite) {
          selectedValue.mendicite.lieuMendicite = "pas de mendicite";
        }
      }
      if (
        selectedValue?.services?.entiteRefere !==
          "آخر (مع التحديد في خانة الإضافات)" &&
        selectedValue?.services?.entiteRefere !== "القضاء مع التحديد"
      ) {
        if (selectedValue?.services) {
          selectedValue.services.autreRefere = "";
        }
      }
      if (
        selectedValue?.services?.entiteReferente !==
        "آخر (مع التحديد في خانة الإضافات)"
      ) {
        if (selectedValue?.services) {
          selectedValue.services.autreReferente = "";
        }
      }
      if (selectedValue?.services?.etat !== "مغلق") {
        if (selectedValue?.services) {
          selectedValue.services.detailEtatFerme = "";
        }
      }
      if (selectedValue?.scolarite !== "غير منقطع عن الدراسة") {
        if (selectedValue?.niveauScolaire) {
          selectedValue.niveauScolaire = "";
        }
      }
      const response = api
        .put(`beneficiaires/update/${selectedValue?.id}`, selectedValue)
        .then((res) => {
          console.log(response);
        });
      toast({
        description: "تم تحديث البيانات بنجاح",
        className: "bg-green-500 text-white",
        duration: 3000,
        title: "نجاح",
      });
      //router.push("/beneficiaires");
    } catch (error) {
      toast({
        description: "اسم مستخدم أو كلمة مرور غير صحيحة",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
    console.log(selectedValue);
  }

  return (
    <>
      <SideBar />
      <main className="p-4 sm:mr-60">
        <BreadCrumb />
        <h1 className="text-2xl font-bold mb-4 py-2">تحديث مستفيد</h1>
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <section className="bg-white dark:bg-gray-900">
            <div className="px-4 py-2 mx-auto lg:py-2">
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                  <div className="w-full">
                    <div className="relative z-0 w-full mb-5 group">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        الإقليم
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
                        <option selected value={selectedValue?.province?.id}>
                          {selectedValue?.province?.name}
                        </option>
                        {provinces?.map((province) => (
                          <option value={province.id}>{province.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
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
                    <select
                      name="sexe"
                      value={selectedValue?.sexe || ""}
                      onChange={(e) =>
                        setselectedValue({
                          ...selectedValue,
                          sexe: e.target.value || "",
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        اختر الجنس
                      </option>
                      <option value="M">ذكر</option>
                      <option value="F">أنثى</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      الفئة العمرية
                    </label>
                    <select
                      name="groupeAge"
                      value={selectedValue?.groupeAge || ""}
                      onChange={(e) =>
                        setselectedValue({
                          ...selectedValue,
                          groupeAge: e.target.value || "",
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        اختر الفئة العمرية
                      </option>
                      <option value="<1">أقل من سنة</option>
                      <option value="2-6">من 2 إلى 6 سنوات</option>
                      <option value="7-11">من 7 إلى 11 سنة</option>
                      <option value="12-14">من 12 إلى 14 سنة</option>
                      <option value="15-18">من 15 إلى 18 سنة</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      الدراسة
                    </label>
                    <select
                      name="scolarite"
                      value={selectedValue?.scolarite || ""}
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          scolarite: e.target.value || "",
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        هل يدرس؟
                      </option>
                      <option value="غير منقطع عن الدراسة">
                        غير منقطع عن الدراسة
                      </option>
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
                          setselectedValue({
                            ...selectedValue,
                            niveauScolaire: e.target.value || "",
                          })
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
                        <option value="المستوى الابتدائي">
                          المستوى الابتدائي
                        </option>
                        <option value="المستوى الاعدادي">
                          المستوى الاعدادي
                        </option>
                        <option value="المستوى الثانوي">المستوى الثانوي</option>
                        <option value="التكوين المهني">التكوين المهني</option>
                        <option value="التكوين بالتدرج">التكوين بالتدرج</option>
                        <option value="التربية غير النظامية">
                          التربية غير النظامية
                        </option>
                        <option value="التربية الدامجة">التربية الدامجة</option>
                      </select>
                    </div>
                  )}
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      وسط الإقامة
                    </label>
                    <select
                      name="sejour"
                      value={selectedValue?.sejour || ""}
                      onChange={(e) =>
                        setselectedValue({
                          ...selectedValue,
                          sejour: e.target.value || "",
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        اختر وسط الإقامة
                      </option>
                      <option value="قروي">قروي</option>
                      <option value="حضري">حضري</option>
                      <option value="شبه حضري">شبه حضري</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      المجال الترابي
                    </label>
                    <input
                      type="text"
                      name="territoire"
                      placeholder="المجال الترابي"
                      value={selectedValue?.territoire || ""}
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          territoire: e.target.value || "",
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
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
                        <option selected disabled value="">
                          المركز
                        </option>

                        {centre?.map((c: any) => (
                          <option value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      وصف الحالة الاجتماعية (هام جدا)
                    </label>
                    <input
                      type="text"
                      name="situationSocial"
                      placeholder="الوضع الاجتماعي"
                      value={selectedValue?.situationSocial || ""}
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          situationSocial: e.target.value || "",
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      الوضعية الصحية
                    </label>
                    <select
                      name="situationMedical"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      value={selectedValue?.situationMedical?.choix || ""}
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          situationMedical: {
                            ...selectedValue?.situationMedical,
                            choix: e.target.value || "",
                          },
                        });
                      }}
                    >
                      <option value="" disabled>
                        اختر الوضعية الصحية
                      </option>
                      <option value="مريض مزمن">مريض مزمن</option>
                      <option value="مريض نفسي">مريض نفسي</option>
                      <option value="معاق">معاق</option>
                      <option value="مدمن">مدمن</option>
                      <option value="حامل">حامل</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  {selectedValue?.situationMedical?.choix === "أخرى" && (
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        الوضعية الصحية
                      </label>
                      <input
                        type="text"
                        name="autreSituationMedical"
                        value={selectedValue?.situationMedical?.autre || ""}
                        onChange={(e) =>
                          setselectedValue({
                            ...selectedValue,
                            situationMedical: {
                              ...selectedValue.situationMedical,
                              autre: e.target.value || "",
                            },
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      الوضعية العائلية
                    </label>
                    <select
                      name="situationFamiliale"
                      value={selectedValue?.situationFamilial?.choix || ""}
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          situationFamilial: {
                            ...selectedValue?.situationFamilial,
                            choix: e.target.value || "",
                          },
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        اختر الوضعية العائلية
                      </option>
                      <option value="" disabled>
                        اختر الوضع العائلي
                      </option>
                      <option value="مع والديه">مع والديه</option>
                      <option value="يتيم أحد الأبوين">يتيم أحد الأبوين</option>
                      <option value="من أم عازبة">من أم عازبة</option>
                      <option value="متخلى عنه">متخلى عنه</option>
                      <option value="أبوان مطلقان">أبوان مطلقان</option>
                      <option value="أبوان منفصلان">أبوان منفصلان</option>
                      <option value="مع الأقارب">مع الأقارب</option>
                      <option value="من أبوين مدمنين">من أبوين مدمنين</option>
                      <option value="طفل مكفول">طفل مكفول</option>
                      <option value="معلوم الأم مجهول الأب">
                        معلوم الأم مجهول الأب
                      </option>
                      <option value="معلوم الأب مجهول الأم">
                        معلوم الأب مجهول الأم
                      </option>
                      <option value="أحد الأبوين يقضي عقوبة">
                        أحد الأبوين يقضي عقوبة سجنية
                      </option>
                      <option value="أحد الأبوين منحرفين">
                        أحد الأبوين منحرفين
                      </option>
                      <option value="أحد الأبوين عديم الأهلية">
                        أحد الأبوين عديم الأهلية
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      الوضع المالي
                    </label>
                    <select
                      name="situationFinanciere"
                      value={selectedValue?.situationFinanciere?.choix || ""}
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          situationFinanciere: {
                            ...selectedValue?.situationFinanciere,
                            choix: e.target.value || "",
                          },
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        اختر الوضع المالي
                      </option>
                      <option value="موارد كافية">موارد كافية</option>
                      <option value="وضعية فقر">وضعية فقر</option>
                      <option value="في وضعية تشغيل">في وضعية تشغيل</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      تصنيف الحالة
                    </label>
                    <select
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
                      <option value="غير مسجل في الحالة المدنية">
                        غير مسجل في الحالة المدنية
                      </option>
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
                      <option value="في تماس مع القانون">
                        في تماس مع القانون
                      </option>
                      <option value="آخر مع التحديد">آخر مع التحديد</option>
                    </select>
                  </div>
                  {selectedValue?.classificationCas?.choix ===
                    "آخر مع التحديد" && (
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        تحديد التصنيف
                      </label>
                      <input
                        type="text"
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
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      الإعاقة
                    </label>
                    <select
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
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        تحديد الإعاقة
                      </label>
                      <input
                        type="text"
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
                        required
                      />
                    </div>
                  )}
                  <div className=" my-auto flex items-center w-full">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={violence}
                      onChange={(e) => setviolence(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      هل يعاني من العنف؟
                    </label>
                  </div>
                  {violence && (
                    <>
                      <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          نوع العنف
                        </label>
                        <select
                          name="violance"
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
                          <option value="استغلال اقتصادي/اهمال">
                            استغلال اقتصادي/اهمال
                          </option>
                          <option value="عنف مركب مع التحديد">
                            عنف مركب مع التحديد
                          </option>
                        </select>
                      </div>
                      <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          هوية المعتدي
                        </label>
                        <select
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
                          <option value="" disabled selected>
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          مكان العنف
                        </label>
                        <input
                          type="text"
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
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className=" my-auto flex items-center w-full">
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
                          value={
                            selectedValue?.situationDeRue?.raisonSortieRue || ""
                          }
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
                          <option value="الحالة الاجتماعية الهشة">
                            الحالة الاجتماعية الهشة
                          </option>
                          <option value="الرغبة في الهجرة">
                            الرغبة في الهجرة
                          </option>
                          <option value="بدون مأوى">بدون مأوى</option>
                          <option value="حالة يتم">حالة يتم</option>
                          <option value="مشاكل أسرية">مشاكل أسرية</option>
                        </select>
                      </div>

                      <div className="w-full mt-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          بلد الأصل بالنسبة للطفل الأجنبي أو مدينة الأصل بالنسبة
                          للطفل المغربي
                        </label>
                        <input
                          type="text"
                          name="origineEnfant"
                          value={
                            selectedValue?.situationDeRue?.origineEnfant || ""
                          }
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
                          value={
                            selectedValue?.situationDeRue?.durreDansRue || ""
                          }
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
                          <option value="من شهر إلى ستة أشهر">
                            من شهر إلى ستة أشهر
                          </option>
                          <option value="من ستة أشهر إلى سنة واحدة">
                            من ستة أشهر إلى سنة واحدة
                          </option>
                          <option value="أكثر من خمس سنوات">
                            أكثر من خمس سنوات
                          </option>
                          <option value="آخر مع التحديد">آخر مع التحديد</option>
                        </select>
                      </div>
                      {selectedValue?.situationDeRue?.durreDansRue ===
                        "آخر مع التحديد" && (
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            تحديد المدة
                          </label>
                          <input
                            type="text"
                            name="autreDurreDansRue"
                            value={
                              selectedValue?.situationDeRue?.autreDuree || ""
                            }
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
                          وتيرة التردد على الشارع{" "}
                        </label>
                        <select
                          name="frequenceRue"
                          value={
                            selectedValue?.situationDeRue?.frequenceRue || ""
                          }
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
                  <div className=" my-auto flex items-center w-full">
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
                          value={
                            selectedValue?.mendicite?.personneExploitante || ""
                          }
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
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          services: {
                            ...selectedValue?.services,
                            serviceName: e.target.value,
                          },
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        اختر الخدمة
                      </option>
                      <option value="وساطة أسرية">وساطة أسرية</option>
                      <option value="الادماج المهني">الادماج المهني</option>
                      <option value="المواكبة القانونية">
                        المواكبة القانونية
                      </option>
                      <option value="الاستقبال والاستماع">
                        الاستقبال والاستماع
                      </option>
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
                        setselectedValue({
                          ...selectedValue,
                          services: {
                            ...selectedValue?.services,
                            serviceDescription: e.target.value,
                          },
                        })
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
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          services: {
                            ...selectedValue?.services,
                            entiteReferente: e.target.value,
                          },
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled selected>
                        اختر الجهة المحيلة
                      </option>
                      <option value="استقبال مباشر">استقبال مباشر</option>
                      <option value="التبليغ عبر الهاتف">
                        التبليغ عبر الهاتف
                      </option>
                      <option value="التعاون الوطني">التعاون الوطني</option>
                      <option value="السلطة المحلية">السلطة المحلية</option>
                      <option value="الصحة">الصحة</option>
                      <option value="الأمن الوطني">الأمن الوطني</option>
                      <option value="الدرك الملكي">الدرك الملكي</option>
                      <option value="القضاء">القضاء</option>
                      <option value="مؤسسة الرعاية الاجتماعية">
                        مؤسسة الرعاية الاجتماعية
                      </option>
                      <option value="EMF">EMF</option>
                      <option value="COAPH">COAPH</option>
                      <option value="آخر (مع التحديد في خانة الإضافات)">
                        آخر (مع التحديد في خانة الإضافات)
                      </option>
                    </select>
                  </div>
                  {selectedValue?.services?.entiteReferente ===
                    "آخر (مع التحديد في خانة الإضافات)" && (
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        تحديد الجهة المحيلة
                      </label>
                      <input
                        type="text"
                        name="autreEntiteReferente"
                        value={selectedValue?.services?.autreReferente || ""}
                        onChange={(e) =>
                          setselectedValue({
                            ...selectedValue,
                            services: {
                              ...selectedValue?.services,
                              autreReferente: e.target.value,
                            },
                          })
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
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          services: {
                            ...selectedValue?.services,
                            entiteRefere: e.target.value,
                          },
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="" disabled>
                        اختر الجهة المحال عليها
                      </option>
                      <option value="السلطة المحلية">السلطة المحلية</option>
                      <option value="سوق الشغل">سوق الشغل</option>
                      <option value="مركز حماية الطفولة">
                        مركز حماية الطفولة
                      </option>
                      <option value="الصحة">الصحة</option>
                      <option value="الأمن الوطني">الأمن الوطني</option>
                      <option value="الدرك الملكي">الدرك الملكي</option>
                      <option value="القضاء مع التحديد">
                        القضاء مع التحديد
                      </option>
                      <option value="المجتمع المدني">المجتمع المدني</option>
                      <option value="مؤسسة تعليمية">مؤسسة تعليمية</option>
                      <option value="مؤسسة الرعاية الاجتماعية">
                        مؤسسة الرعاية الاجتماعية
                      </option>
                      <option value="EMF">EMF</option>
                      <option value="COAPH">COAPH</option>
                      <option value="آخر (مع التحديد في خانة الإضافات)">
                        آخر (مع التحديد في خانة الإضافات)
                      </option>
                    </select>
                  </div>
                  {(selectedValue?.services?.entiteRefere ===
                    "القضاء مع التحديد" ||
                    selectedValue?.services?.entiteRefere ===
                      "آخر (مع التحديد في خانة الإضافات)") && (
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        تحديد الجهة المحال عليها
                      </label>
                      <input
                        type="text"
                        name="autreEntiteRefere"
                        value={selectedValue?.services?.autreRefere || ""}
                        onChange={(e) =>
                          setselectedValue({
                            ...selectedValue,
                            services: {
                              ...selectedValue?.services,
                              autreRefere: e.target.value,
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
                      حالة الملف
                    </label>
                    <select
                      name="etat"
                      value={selectedValue?.services?.etat || ""}
                      onChange={(e) => {
                        setselectedValue({
                          ...selectedValue,
                          services: {
                            ...selectedValue?.services,
                            etat: e.target.value,
                          },
                        });
                      }}
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
                        المرجو تحديد إذا ما تم إنجاز الخدمة ام تعذر ذلك مع توضيح
                        السبب في خانة الإضافات
                      </label>
                      <input
                        type="text"
                        name="detailEtatFerme"
                        value={selectedValue?.services?.detailEtatFerme || ""}
                        onChange={(e) =>
                          setselectedValue({
                            ...selectedValue,
                            services: {
                              ...selectedValue?.services,
                              detailEtatFerme: e.target.value,
                            },
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white rounded-lg px-4 py-2.5 focus:ring-primary-500 focus:ring-2"
                    type="submit"
                  >
                    إضافة
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
