"use client";
import { useRouter } from "next/navigation";
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

export default function EditBeneficiary({ beneficiary }: { beneficiary: Beneficiaire }) {
    const router = useRouter();
    const [selectedValue, setselectedValue] = useState<Beneficiaire>(beneficiary);
    const [open, setopen] = useState(false);
    const [step, setStep] = useState(1);

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        try {
            const response = await api.put(`/beneficiaire/${selectedValue.id}`, selectedValue);
            toast({
                description: "Les données ont été mises à jour avec succès",
                className: "bg-green-500 text-white",
                duration: 3000,
                title: "Succès",
            });
            router.push("/beneficiaires");
        } catch (error) {
            toast({
                description: "Une erreur est survenue lors de la mise à jour des données",
                variant: "destructive",
                duration: 3000,
                title: "Erreur",
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
                <h1 className="text-2xl font-bold mb-4 py-2">Modifier un bénéficiaire</h1>
                <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="px-4 py-2 mx-auto lg:py-2">
                            <form onSubmit={handleUpdate}>
                                {step === 1 && (
                                    <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                        <div className="w-full">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                name="nom"
                                                value={selectedValue.nom || ""}
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
                                                Prénom
                                            </label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                value={selectedValue.prenom || ""}
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
                                                Sexe
                                            </label>
                                            <select
                                                name="sexe"
                                                value={selectedValue.sexe || ""}
                                                onChange={(e) =>
                                                    setselectedValue({
                                                        ...selectedValue,
                                                        sexe: e.target.value || "",
                                                    })
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                                <option value="">Sélectionner le sexe</option>
                                                <option value="male">Homme</option>
                                                <option value="female">Femme</option>
                                            </select>
                                        </div>
                                        {/* Ajoutez d'autres champs de formulaire ici */}
                                    </div>
                                )}
                                {/* Ajoutez d'autres étapes de formulaire ici */}
                                <div className="flex justify-end">
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={previousStep}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Précédent
                                        </button>
                                    )}
                                    {step < 3 && (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Suivant
                                        </button>
                                    )}
                                    {step === 3 && (
                                        <button
                                            type="submit"
                                            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Mettre à jour
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}