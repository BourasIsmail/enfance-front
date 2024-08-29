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
} from "@/api/beneficiaire";
import { getProvinces } from '@/api/province';  

import { Beneficiaire } from "@/type/Beneficiaire";
import { Violance } from '@/type/Violance';
import { Centre } from "@/type/Centre";
import { ClassificationCas } from "@/type/ClassificationCas";
import { Handicap } from "@/type/Handicap";
import { Mendicite } from "@/type/Mendicite";
import { Province } from "@/type/Province";
import { Region } from "@/type/Region";
import { Service } from "@/type/Service";
import { SituationDeRue } from "@/type/SituationDeRue";
import { SituationFamilial } from "@/type/SituationFamilial";
import { SituationFinanciere } from "@/type/SituationFinanciere";
import { SituationMedical } from "@/type/SituationMedical";

import axios from "axios";

export default function AddBeneficiary() {
    const router = useRouter();
    const [open, setopen] = useState(false);
    const [step, setStep] = useState(1);
    const [isScolariteSelected, setIsScolariteSelected] = useState(false);
    const [selectedValue, setselectedValue] = useState<Beneficiaire>({
        hasViolence: false,
        violance: {
          id: 0,
          descViolance: '',
          agresseur: '',
          lieuViolance: ''
        },
        etat: '', 
        etatDetails: '' ,
      });
    
      const handleFamilialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedChoix = e.target.value;
        
        // Supposons que vous récupérez l'objet `SituationFamilial` à partir d'une liste
        const selectedSituation: SituationFamilial = {
            id: 0, // Vous devez définir l'ID de manière appropriée
            choix: selectedChoix,
            autre: "" // Si le champ `autre` est utilisé pour quelque chose de spécifique, définissez-le
        };
    
        setselectedValue({
            ...selectedValue,
            situationFamilial: selectedSituation
        });
    };
    

    const handleFinanciereChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedChoix = e.target.value;
    
        const selectedSituationFinanciere: SituationFinanciere = {
            id: 0, // Assignez l'ID de manière appropriée
            choix: selectedChoix,
            autre: "" // Si le champ `autre` est utilisé pour quelque chose de spécifique, définissez-le
        };
    
        setselectedValue({
            ...selectedValue,
            situationFinanciere: selectedSituationFinanciere
        });
    };
    
    const handleMedicaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedChoix = e.target.value;
    
        const selectedSituationMedicale: SituationMedical = {
            id: 0, // Assignez l'ID de manière appropriée
            choix: selectedChoix,
            autre: "" // Si le champ `autre` est utilisé pour quelque chose de spécifique, définissez-le
        };
    
        setselectedValue({
            ...selectedValue,
            situationMedical: selectedSituationMedicale
        });
    };
    

    
    const handleScolariteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === 'true';
        setIsScolariteSelected(value);
        setselectedValue({
            ...selectedValue,
            scolarite: e.target.value === "true", 
        });
    };
    const handleEntiteReferenteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEntite = e.target.value;
        setselectedValue({
            ...selectedValue,
            service: {
                ...selectedValue.service,
                serviceName: selectedValue.service?.serviceName || "", // Assurez-vous que serviceName est défini
                entiteReferente: selectedEntite,
                autreEntiteReferente: selectedEntite === "آخر (مع التحديد في خانة الإضافات)" ? "" : undefined,
                id: selectedValue.service?.id || 0, // Assurez-vous que id est défini
            },
        });
    };
    
    const handleAutreEntiteReferenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setselectedValue({
            ...selectedValue,
            service: {
                ...selectedValue.service,
                serviceName: selectedValue.service?.serviceName || "", // Assurez-vous que serviceName est défini
                autreEntiteReferente: e.target.value,
                id: selectedValue.service?.id || 0, // Assurez-vous que id est défini
            },
        });
    };
    
    const handleEntiteRefereChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEntite = e.target.value;
        setselectedValue({
            ...selectedValue,
            service: {
                ...selectedValue.service,
                serviceName: selectedValue.service?.serviceName || "", // Assurez-vous que serviceName est défini
                entiteRefere: selectedEntite,
                autreEntiteRefere: selectedEntite === "آخر (مع التحديد في خانة الإضافات)" ? "" : undefined,
                id: selectedValue.service?.id || 0, // Assurez-vous que id est défini
            },
        });
    };
    
    const handleAutreEntiteRefereChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setselectedValue({
            ...selectedValue,
            service: {
                ...selectedValue.service,
                serviceName: selectedValue.service?.serviceName || "", // Assurez-vous que serviceName est défini
                autreEntiteRefere: e.target.value,
                id: selectedValue.service?.id || 0, // Assurez-vous que id est défini
            },
        });
    };
    
    const handleEtatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEtat = e.target.value;
        setselectedValue({
            ...selectedValue,
            service: {
                ...selectedValue.service,
                serviceName: selectedValue.service?.serviceName || "", // Assurez-vous que serviceName est défini
                etat: selectedEtat,
                etatDetails: selectedEtat === "ملف مغلق" ? "" : undefined,
                id: selectedValue.service?.id || 0, // Assurez-vous que id est défini
            },
        });
    };
    
    const handleEtatDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setselectedValue({
            ...selectedValue,
            service: {
                ...selectedValue.service,
                serviceName: selectedValue.service?.serviceName || "", // Assurez-vous que serviceName est défini
                etatDetails: e.target.value,
                id: selectedValue.service?.id || 0, // Assurez-vous que id est défini
            },
        });
    };
    
    
    const getProvinces = async () => {
        const response = await api.get('/province');  
        return response.data;
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await api.post(`/beneficiaire/add`, selectedValue);
            toast({
                description: "تم إضافة البيانات بنجاح",
                className: "bg-green-500 text-white",
                duration: 3000,
                title: "نجاح",
            });
            router.push("/beneficiaires");
        } catch (error) {
            toast({
                description: "حدث خطأ أثناء إضافة البيانات",
                variant: "destructive",
                duration: 3000,
                title: "خطأ",
            });
        }
    };
  
    const { data: centers } = useQuery("centers", getAllCenters);
    const { data: classifications } = useQuery("classifications", getAllClassifications);
    const { data: handicaps } = useQuery("handicaps", getAllHandicaps);
    const { data: mendicites } = useQuery("mendicites", getAllMendicites);
    const { data: services } = useQuery("services", getAllServices);
    const { data: situationsDeRue } = useQuery("situationsDeRue", getAllSituationsDeRue);
    const { data: situationsFamiliales } = useQuery("situationsFamiliales", getAllSituationsFamiliales);
    const { data: situationsFinancieres } = useQuery("situationsFinancieres", getAllSituationsFinancieres);
    const { data: situationsMedicales } = useQuery("situationsMedicales", getAllSituationsMedicales);
    const { data: violences } = useQuery("violences", getAllViolences);
    const { data: provinces } = useQuery("provinces", getProvinces);


    const nextStep = () => {
        setStep(step + 1);
    };

    const previousStep = () => {
        setStep(step - 1);
    };
    
    return (
        <>
            <SideBar />
            <main className="p-4 sm:mr-60">
                <BreadCrumb />
                <h1 className="text-2xl font-bold mb-4 py-2">إضافة مستفيد</h1>
                <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="px-4 py-2 mx-auto lg:py-2">
                            <form onSubmit={handleSubmit}>
                                {step === 1 && (
                                    <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                        <div className="w-full">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                الإسم
                                            </label>
                                            <input
                                                type="text"
                                                name="nom"
                                                value={selectedValue?.nom || ""}
                                                onChange={(e) =>
                                                    setselectedValue({
                                                        ...selectedValue,
                                                        nom: e.target.value || "",
                                                    })
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                اللقب
                                            </label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                value={selectedValue?.prenom || ""}
                                                onChange={(e) =>
                                                    setselectedValue({
                                                        ...selectedValue,
                                                        prenom: e.target.value || "",
                                                    })
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                                            <div className="flex space-x-4">
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    الدراسة
                                                </label>
                                                <select
                                                    name="scolarite"
                                                    value={selectedValue?.scolarite ? "true" : "false"}
                                                    onChange={(e) => {
                                                        const value = e.target.value === "true";
                                                        setselectedValue({
                                                            ...selectedValue,
                                                            scolarite: value,
                                                        });
                                                        setIsScolariteSelected(value); // Met à jour l'état pour afficher le champ
                                                    }}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        هل يدرس؟
                                                    </option>
                                                    <option value="true">نعم</option>
                                                    <option value="false">لا</option>
                                                </select>
                                            </div>

                                            {isScolariteSelected && (
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
                                                        <option value="لم يبلغ بعد سن التمدرس">لم يبلغ بعد سن التمدرس</option>
                                                        <option value="لم يسبق له أن تمدرس">لم يسبق له أن تمدرس</option>
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
                                        </div>
                                        <div className="flex justify-between w-full col-span-2">
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                            >
                                                التالي
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                <div>
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
                                            <option value="قروي">قروي</option>
                                            <option value="حضري">حضري</option>
                                            <option value="شبه حضري">شبه حضري</option>
                                        </select>
                                    </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        المجال الترابي
                                    </label>
                                    <select
                                        name="territoire"
                                        value={selectedValue?.territoire || ""}
                                        onChange={(e) => {
                                        const selectedTerritoire = e.target.value;
                                        setselectedValue({
                                            ...selectedValue,
                                            territoire: selectedTerritoire,
                                            province: selectedTerritoire === "خارج الإقليم مع التحديد" ? selectedValue.province : undefined,
                                            region: selectedTerritoire === "خارج الجهة مع التحديد" ? selectedValue.region : undefined,
                                        });
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        <option value="" disabled>المجال الترابي</option>
                                        <option value="خارج الإقليم مع التحديد">خارج الإقليم مع التحديد</option>
                                        <option value="خارج الجهة مع التحديد">خارج الجهة مع التحديد</option>
                                    </select>
                                    </div>

                                    {selectedValue?.territoire === "خارج الإقليم مع التحديد" && (
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
                                    )}

                                    {selectedValue?.territoire === "خارج الجهة مع التحديد" && (
                                    <div className="w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        الجهة
                                        </label>
                                        <select
                                        name="region"
                                        value={selectedValue?.region?.id || ""}
                                        onChange={(e) =>
                                            setselectedValue({
                                            ...selectedValue,
                                            region: {
                                                id: parseInt(e.target.value),
                                                name: e.target.options[e.target.selectedIndex].text,
                                            },
                                            })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                        >
                                       <option value="" disabled>الجهة</option>
                                        <option value="طنجة تطوان الحسيمة">طنجة تطوان الحسيمة</option>
                                        <option value="الجهة الشرقية">الجهة الشرقية</option>
                                        <option value="فاس مكناس">فاس مكناس</option>
                                        <option value="الرباط سلا القنيطرة">الرباط سلا القنيطرة</option>
                                        <option value="بني ملال خنيفرة">بني ملال خنيفرة</option>
                                        <option value="الدار البيضاء سطات">الدار البيضاء سطات</option>
                                        <option value="مراكش آسفي">مراكش آسفي</option>
                                        <option value="درعة تافيلالت">درعة تافيلالت</option>
                                        <option value="سوس ماسة">سوس ماسة</option>
                                        <option value="كلميم واد نون">كلميم واد نون</option>
                                        <option value="العيون الساقية الحمراء">العيون الساقية الحمراء</option>
                                        <option value="الداخلة وادي الذهب">الداخلة وادي الذهب</option>
                                        </select>
                                    </div>
                                    )}

                                  
                               <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    هل تعرض للعنف؟
                                </label>
                                <select
                                    name="hasViolence"
                                    value={selectedValue?.hasViolence ? 'true' : 'false'}
                                    onChange={(e) => {
                                    const hasViolence = e.target.value === 'true';
                                    setselectedValue({
                                        ...selectedValue,
                                        hasViolence: hasViolence,
                                        violance: hasViolence ? selectedValue.violance || {} : undefined,
                                    });
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                >
                                    <option value="" disabled>Choisissez une option</option>
                                    <option value="true">نعم</option>
                                    <option value="false">لا</option>
                                </select>
                                </div>
                                {selectedValue && selectedValue.hasViolence && (
                                <>
                                    <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        نوع العنف
                                    </label>
                                    <select
                                        name="violenceType"
                                        value={selectedValue.violance?.descViolance || ""}
                                        onChange={(e) =>
                                        setselectedValue({
                                            ...selectedValue,
                                            violance: {
                                            ...selectedValue.violance,
                                            descViolance: e.target.value,
                                            },
                                        })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        <option value="" disabled>اختر نوع العنف
                                        </option>
                                        <option value="عنف جسدي">عنف جسدي</option>
                                        <option value="عنف جنسي">عنف جنسي</option>
                                        <option value="عنف نفسي">عنف نفسي</option>
                                        <option value="استغلال اقتصادي/اهمال">استغلال اقتصادي/اهمال</option>
                                        <option value="عنف مركب مع التحديد">عنف مركب مع التحديد</option>
                                    </select>
                                    </div>

                                    <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        هوية المعتدي
                                    </label>
                                    <select
                                        name="agresseur"
                                        value={selectedValue.violance?.agresseur || ""}
                                        onChange={(e) =>
                                        setselectedValue({
                                            ...selectedValue,
                                            violance: {
                                            ...selectedValue.violance,
                                            agresseur: e.target.value,
                                            },
                                        })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        <option value="" disabled>اختر هوية المهاجم
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
                                        value={selectedValue.violance?.lieuViolance || ""}
                                        onChange={(e) =>
                                        setselectedValue({
                                            ...selectedValue,
                                            violance: {
                                            ...selectedValue.violance,
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
                                   <div className="flex justify-between w-full col-span-2">
                                    <button
                                        type="button"
                                        onClick={previousStep}
                                        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                    >
                                        السابق
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                    >
                                        التالي
                                    </button>
                                    </div>
                                </div>
                                )}
                                {step === 3 && (
                                    <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                  <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    تصنيف الحالة
                                </label>
                                <select
                                    name="classificationcas"
                                    value={selectedValue?.classificationCas?.id || ""}
                                    onChange={(e) => {
                                    const selectedOptionText = e.target.options[e.target.selectedIndex].text;
                                    setselectedValue({
                                        ...selectedValue,
                                        classificationCas: {
                                        id: Number(e.target.value), // Assurez-vous que l'ID est toujours défini
                                        choix: selectedOptionText,
                                        autre: selectedOptionText === "آخر مع التحديد" ? selectedValue.classificationCas?.autre || "" : "",
                                        } as ClassificationCas,
                                    });
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                >
                                    <option value="" disabled>اختر التصنيف</option>
                                    <option value="1">غير مسجل في الحالة المدنية</option>
                                    <option value="2">في وضعية الشارع</option>
                                    <option value="3">في وضعية إعاقة</option>
                                    <option value="4">في وضعية تشغيل</option>
                                    <option value="5">في وضعية تسول</option>
                                    <option value="6">ضحية عنف</option>
                                    <option value="7">حالة إدمان</option>
                                    <option value="8">مشاكل أسرية</option>
                                    <option value="9">الهدر المدرسي</option>
                                    <option value="10">مهمش</option>
                                    <option value="11">مهاجر</option>
                                    <option value="12">لاجئ</option>
                                    <option value="13">في تماس مع القانون</option>
                                    <option value="14">آخر مع التحديد</option>
                                </select>
                                </div>

                                {selectedValue?.classificationCas?.choix === "آخر مع التحديد" && (
                                <div className="w-full mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    التحديد
                                    </label>
                                    <input
                                    type="text"
                                    name="autre"
                                    value={selectedValue?.classificationCas?.autre || ""}
                                    onChange={(e) =>
                                        setselectedValue({
                                        ...selectedValue,
                                        classificationCas: {
                                            ...selectedValue.classificationCas,
                                            autre: e.target.value,
                                        } as ClassificationCas,
                                        })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                    />
                                </div>
                                )}

                                <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    الإعاقة
                                </label>
                                <select
                                    name="handicap"
                                    value={selectedValue?.handicap?.id || ""}
                                    onChange={(e) => {
                                    const selectedOption = e.target.options[e.target.selectedIndex].text;
                                    setselectedValue({
                                        ...selectedValue,
                                        handicap: {
                                        ...selectedValue.handicap,
                                        id: Number(e.target.value),
                                        choix: selectedOption || "", // Assurez-vous que `choix` ne soit pas `undefined`
                                        autre: selectedOption === "آخر مع التحديد" ? "" : undefined,
                                        },
                                    });
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                >
                                    <option value="" disabled>اختر نوع الإعاقة</option>
                                    <option value="1">إعاقة حركية</option>
                                    <option value="2">إعاقة ذهنية</option>
                                    <option value="3">إعاقة حسية</option>
                                    <option value="4">توحد</option>
                                    <option value="5">إعاقة مركبة</option>
                                    <option value="6">آخر مع التحديد</option>
                                </select>
                                </div>

                                {selectedValue?.handicap?.choix === "آخر مع التحديد" && (
                                <div className="w-full mt-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    حدد الإعاقة
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
                                            autre: e.target.value,
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
                                            في حالة وضعية التسول؟
                                            </label>
                                            <select
                                                name="hasMendicite"
                                                value={selectedValue?.hasMendicite ? "true" : "false"}
                                                onChange={(e) =>
                                                setselectedValue({
                                                    ...selectedValue,
                                                    hasMendicite: e.target.value === "true",
                                                    mendicite: e.target.value === "true" ? selectedValue.mendicite : undefined,
                                                })
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required
                                            >
                                                <option value="false">لا</option>
                                                <option value="true">نعم</option>
                                            </select>
                                            </div>

                                            {selectedValue?.hasMendicite && (
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
                                                        ...selectedValue.mendicite,
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
                                                        ...selectedValue.mendicite,
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
                                    في حالة الشارع
                                    </label>
                                    <select
                                        name="hasSituationDeRue"
                                        value={selectedValue?.hasSituationDeRue ? "true" : "false"}
                                        onChange={(e) =>
                                        setselectedValue({
                                            ...selectedValue,
                                            hasSituationDeRue: e.target.value === "true",
                                            situationDeRue: e.target.value === "true" ? selectedValue.situationDeRue : undefined,
                                        })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        <option value="false">لا</option>
                                        <option value="true">نعم</option>
                                    </select>
                                    </div>

                                    {selectedValue?.hasSituationDeRue && (
                                    <>
                                        <div className="w-full mt-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        سبب الخروج إلى الشارع
                                        </label>
                                        <select
                                            name="situationDeRue"
                                            value={selectedValue?.situationDeRue?.id || ""}
                                            onChange={(e) => {
                                            const selectedOption = situationsDeRue?.find((item: { id: number; }) => item.id === Number(e.target.value));
                                            setselectedValue({
                                                ...selectedValue,
                                                situationDeRue: selectedOption || undefined,
                                            });
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            required
                                        >
                                            <option value="" disabled>اختر حالة الشارع
                                            </option>
                                            <option value="1">الإدمان</option>
                                            <option value="2">التخلي</option>
                                            <option value="3">الحالة الاجتماعية الهشة</option>
                                            <option value="4">الرغبة في الهجرة</option>
                                            <option value="5">بدون مأوى</option>
                                            <option value="6">حالة يتم</option>
                                            <option value="7">مشاكل أسرية</option>
                                        </select>
                                        </div>

                                        <div className="w-full mt-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        بلد الأصل
                                    بالنسبة للطفل الأجنبي
                                    أو مدينة الأصل
                                    بالنسبة للطفل المغربي      </label>
                                        <input
                                            type="text"
                                            name="origineEnfant"
                                            value={selectedValue?.situationDeRue?.origineEnfant || ""}
                                            onChange={(e) =>
                                            setselectedValue({
                                                ...selectedValue,
                                                situationDeRue: {
                                                ...selectedValue.situationDeRue,
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
                                        المدة المقضاة بالشارع      </label>
                                        <select
                                            name="durreDansRue"
                                            value={selectedValue?.situationDeRue?.durreDansRue || ""}
                                            onChange={(e) =>
                                            setselectedValue({
                                                ...selectedValue,
                                                situationDeRue: {
                                                ...selectedValue.situationDeRue,
                                                durreDansRue: Number(e.target.value),
                                                },
                                            })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            required
                                        >
                                            <option value="" disabled>اختر المدة في الشارع
                                            </option>
                                            <option value="1">أقل من شهر</option>
                                            <option value="2">من شهر إلى ستة أشهر</option>
                                            <option value="3">من ستة أشهر إلى سنة واحدة</option>
                                            <option value="4">أكثر من خمس سنوات</option>
                                            <option value="5">آخر مع التحديد</option>
                                        </select>
                                        </div>

                                        <div className="w-full mt-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        وتيرة التردد على الشارع       </label>
                                        <select
                                            name="frequenceRue"
                                            value={selectedValue?.situationDeRue?.frequenceRue || ""}
                                            onChange={(e) =>
                                            setselectedValue({
                                                ...selectedValue,
                                                situationDeRue: {
                                                ...selectedValue.situationDeRue,
                                                frequenceRue: e.target.value,
                                                },
                                            })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            required
                                        >
                                            <option value="" disabled>اختر وتيرة التردد</option>
                                            <option value="بشكل دائم">بشكل دائم</option>
                                            <option value="من فترة لأخرى">من فترة لأخرى</option>
                                        </select>
                                        </div>
                                    </>
                                    )}

                                        <div className="flex justify-between w-full col-span-2">
                                            <button
                                                type="button"
                                                onClick={previousStep}
                                                className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                            >
                                                السابق
                                            </button>
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                            >
                                                التالي
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 4 &&
                                    (
                                        <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                           <div className="w-full">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                اسم الخدمة
                                            </label>
                                            <select
                                                name="serviceName"
                                                value={selectedValue?.service?.serviceName || ""}
                                                onChange={(e) => {
                                                    const selectedService = e.target.value;
                                                    setselectedValue({
                                                        ...selectedValue,
                                                        service: {
                                                            id: selectedValue?.service?.id || 0,
                                                            serviceName: selectedService,
                                                            autreServiceName: selectedService === "آخر (مع التحديد في خانة الإضافات)" ? "" : undefined,
                                                        }
                                                    });
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required
                                            >
                                                <option value="" disabled>اختر الخدمة</option>
                                                <option value="وساطة أسرية">وساطة أسرية</option>
                                                <option value="الادماج المهني">الادماج المهني</option>
                                                <option value="المواكبة القانونية">المواكبة القانونية</option>
                                                <option value="الاستقبال والاستماع">الاستقبال والاستماع</option>
                                                <option value="التوجيه النفسي">التوجيه النفسي</option>
                                                <option value="التوجيه الطبي">التوجيه الطبي</option>
                                                <option value="التكفل الإداري">التكفل الإداري</option>
                                                <option value="آخر (مع التحديد في خانة الإضافات)">آخر (مع التحديد في خانة الإضافات)</option>
                                            </select>
                                        </div>

                                        {selectedValue?.service?.serviceName === "آخر (مع التحديد في خانة الإضافات)" && (
                                            <div className="w-full mt-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    حدد الخدمة
                                                </label>
                                                <input
                                                        type="text"
                                                        name="autreServiceName"
                                                        value={selectedValue?.service?.autreServiceName || ""}
                                                        onChange={(e) =>
                                                            setselectedValue({
                                                                ...selectedValue,
                                                                service: {
                                                                    ...selectedValue.service, 
                                                                    id: selectedValue?.service?.id || 0,
                                                                    serviceName: selectedValue?.service?.serviceName || "", // Garder le serviceName
                                                                    autreServiceName: e.target.value,
                                                                }
                                                            })
                                                        }
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        required
                                                    />
                                            </div>
                                        )}

                                        <div className="w-full">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                وصف الخدمة
                                            </label>
                                            <input
                                            type="text"
                                            name="serviceDescription"
                                            value={selectedValue?.service?.serviceDescription || ""}
                                            onChange={(e) =>
                                                setselectedValue({
                                                    ...selectedValue,
                                                    service: {
                                                        ...selectedValue.service,
                                                        id: selectedValue?.service?.id || 0, // Assurez-vous que 'id' a toujours une valeur
                                                        serviceName: selectedValue?.service?.serviceName || "", // Assurez-vous que 'serviceName' a toujours une valeur
                                                        serviceDescription: e.target.value,
                                                    }
                                                })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            required
                                        />


                                        <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                الجهة المحيلة
                                                </label>
                                                <select
                                                name="entiteReferente"
                                                value={selectedValue?.service?.entiteReferente || ''}
                                                onChange={handleEntiteReferenteChange}
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
                                                {selectedValue?.service?.entiteReferente === 'آخر (مع التحديد في خانة الإضافات)' && (
                                                <div className="w-full mt-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    حدد الجهة المحيلة
                                                    </label>
                                                    <input
                                                    type="text"
                                                    name="autreEntiteReferente"
                                                    value={selectedValue?.service?.autreEntiteReferente || ''}
                                                    onChange={handleAutreEntiteReferenteChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                    />
                                                </div>
                                                )}
                                            </div>

                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                الجهة المحال عليها
                                                </label>
                                                <select
                                                name="entiteRefere"
                                                value={selectedValue?.service?.entiteRefere || ''}
                                                onChange={handleEntiteRefereChange}
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
                                                <option value="آخر (مع التحديد في خانة الإضافات)">
                                                    آخر (مع التحديد في خانة الإضافات)
                                                </option>
                                                </select>
                                                {selectedValue?.service?.entiteRefere === 'آخر (مع التحديد في خانة الإضافات)' && (
                                                <div className="w-full mt-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    حدد الجهة المحال عليها
                                                    </label>
                                                    <input
                                                    type="text"
                                                    name="autreEntiteRefere"
                                                    value={selectedValue?.service?.autreEntiteRefere || ''}
                                                    onChange={handleAutreEntiteRefereChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                    />
                                                </div>
                                                )}
                                            </div>
                                        {selectedValue?.etat === "ملف مغلق" && (
                                            <div className="w-full mt-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    تفاصيل حالة الخدمة (ملف مغلق)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="etatDetails"
                                                    value={selectedValue?.etatDetails || ""}
                                                    onChange={(e) =>
                                                        setselectedValue({
                                                            ...selectedValue,
                                                            etatDetails: e.target.value,
                                                        })
                                                    }
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                />
                                            </div>
                                        )}


                                        {selectedValue?.service?.serviceName === "آخر (مع التحديد في خانة الإضافات)" && (
                                        <div className="w-full mt-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            حدد الخدمة المقدمة
                                            </label>
                                            <input
                                            type="text"
                                            name="autreServiceName"
                                            value={selectedValue?.service?.serviceName || ""}
                                            onChange={(e) =>
                                                setselectedValue({
                                                    ...selectedValue,
                                                    service: {
                                                        ...selectedValue.service,
                                                        id: selectedValue?.service?.id || 0, // Assurez-vous que 'id' a une valeur définie
                                                        serviceName: e.target.value,
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
                                            الحالة
                                        </label>
                                        <select
                                        name="etat"
                                        value={selectedValue?.service?.etat || ""}
                                        onChange={(e) => {
                                            const selectedEtat = e.target.value;
                                            setselectedValue({
                                            ...selectedValue,
                                            service: {
                                                ...selectedValue.service,
                                                id: selectedValue?.service?.id || 0, // Assurez-vous que 'id' a une valeur définie
                                                etat: selectedEtat,
                                                serviceName: selectedValue?.service?.serviceName || "", // Assurez-vous que 'serviceName' a une valeur définie
                                            },
                                            });
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                        >

                                            <option value="" disabled>اختر الحالة</option>
                                            <option value="ملف جديد">ملف جديد</option>
                                            <option value="ملف مفتوح من قبل">ملف مفتوح من قبل</option>
                                            <option value="ملف مغلق">ملف مغلق</option>
                                        </select>
                                        </div>

                                        {selectedValue?.service?.etat === "ملف مغلق" && (
                                        <div className="w-full mt-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            يرجى توضيح إذا ما تم إنجاز الخدمة أم تعذر ذلك
                                            </label>
                                            <input
                                            type="text"
                                            name="etatDetails"
                                            value={selectedValue?.service?.etatDetails || ""}
                                            onChange={(e) =>
                                                setselectedValue({
                                                ...selectedValue,
                                                service: {
                                                    ...selectedValue.service,           
                                                    id: selectedValue?.service?.id || 0, 
                                                    serviceName: selectedValue?.service?.serviceName || "", 
                                                    etatDetails: e.target.value,
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
                                    الوضع العائلي
                                </label>
                                <select
                                    name="situationfamiliale"
                                    value={selectedValue?.situationFamilial?.choix || ""}
                                    onChange={(e) => {
                                        const selectedChoix = e.target.value;
                                        const selectedSituationFamilial = situationsFamiliales?.find(
                                            (situation: SituationFamilial) => situation.choix === selectedChoix
                                        );
                                        if (selectedSituationFamilial) {
                                            setselectedValue({
                                                ...selectedValue,
                                                situationFamilial: selectedSituationFamilial,
                                            });
                                        } else {
                                            // Gérez le cas où aucune situation n'est trouvée ou où situationsFamiliales est undefined
                                            console.error("Situations familiales est indéfinie ou aucun résultat trouvé");
                                        }
                                    }}
                                    
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                >
                                    <option value="" disabled>اختر الوضع العائلي</option>
                                    <option value="مع والديه">مع والديه</option>
                                    <option value="يتيم أحد الأبوين">يتيم أحد الأبوين</option>
                                    <option value="من أم عازبة">من أم عازبة</option>
                                    <option value="متخلى عنه">متخلى عنه</option>
                                    <option value="أبوان مطلقان">أبوان مطلقان</option>
                                    <option value="أبوان منفصلان">أبوان منفصلان</option>
                                    <option value="مع الأقارب">مع الأقارب</option>
                                    <option value="من أبوين مدمنين">من أبوين مدمنين</option>
                                    <option value="طفل مكفول">طفل مكفول</option>
                                    <option value="معلوم الأم مجهول الأب">معلوم الأم مجهول الأب</option>
                                    <option value="معلوم الأب مجهول الأم">معلوم الأب مجهول الأم</option>
                                    <option value="أحد الأبوين يقضي عقوبة">أحد الأبوين يقضي عقوبة سجنية</option>
                                    <option value="أحد الأبوين منحرفين">أحد الأبوين منحرفين</option>
                                    <option value="أحد الأبوين عديم الأهلية">أحد الأبوين عديم الأهلية</option>
                                </select>
                                </div>

                                <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    الوضع المالي  
                                </label>
                                <select
                                    name="situationfinanciere"
                                    value={selectedValue?.situationFinanciere?.choix || ""}
                                    onChange={(e) => {
                                        const selectedChoix = e.target.value;
                                        const selectedSituationFinanciere = situationsFinancieres?.find(
                                            (situation: SituationFinanciere) => situation.choix === selectedChoix
                                        );
                                        if (selectedSituationFinanciere) {
                                            setselectedValue({
                                                ...selectedValue,
                                                situationFinanciere: selectedSituationFinanciere,
                                            });
                                        } else {
                                            console.error("Situations financières est indéfinie ou aucun résultat trouvé");
                                        }
                                    }}
                                    
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                >
                                    <option value="" disabled>اختر الوضع المالي </option>
                                    <option value="موارد كافية">موارد كافية</option>
                                    <option value="وضعية فقر">وضعية فقر</option>
                                    <option value="في وضعية تشغيل">في وضعية تشغيل</option>
                                </select>
                                </div>

                                <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    الوضع الطبي
                                </label>
                                <select
                                    name="situationmedical"
                                    value={selectedValue?.situationMedical?.choix || ""}
                                    onChange={(e) => {
                                        const selectedChoix = e.target.value;
                                        const selectedSituationMedicale = situationsMedicales?.find(
                                            (situation: SituationMedical) => situation.choix === selectedChoix
                                        );
                                        if (selectedSituationMedicale) {
                                            setselectedValue({
                                                ...selectedValue,
                                                situationMedical: selectedSituationMedicale,
                                            });
                                        } else {
                                            console.error("Situations médicales est indéfinie ou aucun résultat trouvé");
                                        }
                                    }}
                                    
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                >
                                    <option value="" disabled>اختر الوضع الطبي</option>
                                    <option value="اضطراب نفسي">اضطراب نفسي</option>
                                    <option value="عادية">عادية</option>
                                    <option value="حالة مرض">حالة مرض</option>
                                    <option value="في وضعية إعاقة">في وضعية إعاقة</option>
                                    <option value="آخر مع التحديد">آخر مع التحديد</option>
                                </select>
                                </div>
                                            <div className="flex justify-between w-full col-span-2">
                                                <button
                                                    type="button"
                                                    onClick={previousStep}
                                                    className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                                >
                                                    السابق
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                                                >
                                                    إضافة
                                                </button>
                                            </div>

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
                                      </div>                     
                                    )}
                            </form>                        
                        </div>                     
                    </section>
                </div>
            </main>
        </>
    );
}