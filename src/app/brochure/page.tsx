import React from 'react';
import { SideBar } from '@/components/SideBar';
import { BreadCrumb } from '@/components/BreadCrumb';
import { IoDocumentTextSharp } from 'react-icons/io5';

export default function Brochure() {
    return (
      <>
        <SideBar />
        <main className="p-4 sm:mr-60">
          <BreadCrumb />
          <h1 className="text-2xl font-bold mb-4 py-2">المكتبة الرقمية</h1>
          <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
            <section className="bg-white dark:bg-gray-900">
              <div className="px-4 py-2 mx-auto lg:py-2">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span>حصيلة التعاون الوطني في أرقام 2022</span>
                    <a
                      href="https://www.entraide.ma/ar/attachements/65968b3c0a66f5002482121e-StatEN2022.pdf"
                      download="حصيلة التعاون الوطني في أرقام 2022.pdf"
                      className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      <IoDocumentTextSharp className="mr-2" />
                      تحميل
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>حصيلة التعاون الوطني في أرقام 2021</span>
                    <a
                      href="https://www.entraide.ma/ar/attachements/6437e4b7b46f5b002430bc20-bilanEN2019-2020.pdf"
                      download="حصيلة التعاون الوطني في أرقام 2021.pdf"
                      className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      <IoDocumentTextSharp className="mr-2" />
                      تحميل
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>حصيلة التعاون الوطني في أرقام 2015</span>
                    <a
                      href="https://www.entraide.ma/ar/attachements/63d0fe6dbed544002348c8d7-Rapport_Entraide_2015_Arabe.pdf"
                      download="حصيلة التعاون الوطني في أرقام 2015.pdf"
                      className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      <IoDocumentTextSharp className="mr-2" />
                      تحميل
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>كتاب الخمسينية مؤسسة التعاون الوطني</span>
                    <a
                      href="https://www.entraide.ma/ar/attachements/64020381fa576e00245676ff-%D9%83%D8%AA%D8%A7%D8%A8%20%D8%A7%D9%84%D8%AE%D9%85%D8%B3%D9%8A%D9%86%D9%8A%D8%A9.pdf"
                      download="كتاب الخمسينية مؤسسة التعاون الوطني.pdf"
                      className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      <IoDocumentTextSharp className="mr-2" />
                      تحميل
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }