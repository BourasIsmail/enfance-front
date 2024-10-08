"use client";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";

export const BreadCrumb = () => {
  const paths = usePathname();
  const pathArray = paths.split("/").filter((path) => path !== "");

  const translatedPath = (path: string) => {
    switch (path) {
      case "/":
        return "الصفحة الرئيسية";
      case "apprenants":
        return "لائحة الطلبات";
      case "stagiaires":
        return "لائحة المتدربين";
      case "comptes":
        return "لائحة الحسابات";
      case "addCompte":
        return "إضافة الحسابات";
      case "beneficiaires":
        return "لائحة المستفيدين";
      default:
        return path;
    }
  };
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">الصفحة الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <span>/</span>
          </BreadcrumbSeparator>
          {pathArray.map((path, index) => {
            const basePath = index > 0 ? `/${pathArray[index - 1]}` : "";
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbLink asChild>
                  <Link href={`${basePath}/${path}`}>
                    <BreadcrumbPage>{translatedPath(path)}</BreadcrumbPage>
                  </Link>
                </BreadcrumbLink>
                {index < pathArray.length - 1 && (
                  <BreadcrumbSeparator>
                    <span>/</span>
                  </BreadcrumbSeparator>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
