"use client";

import { FaHome } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { BiSolidInstitution } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";
import { getCurrentUser, logout } from "../api";
import { IoDocumentTextSharp } from "react-icons/io5";
import { useState } from "react";
import { UserInfo } from "../type/UserInfo";
import { useQuery } from "react-query";

export function SideBar() {
  const [user, setUser] = useState<UserInfo>();

  useQuery("currentUser", getCurrentUser(), {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 right-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-purple-300 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaHome width={200} height={200} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  الصفحة الرئيسية
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/beneficiaires"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUserFriends width={200} height={200} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  لائحة المستفيدين
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/brochure"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoDocumentTextSharp width={200} height={200} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  كُتَيّب
                </span>
              </Link>
            </li>
            {user?.roles === "ADMIN_ROLES" && (
              <><li>
                <Link
                  href="/comptes"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaUserTie width={200} height={200} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    لائحة الحسابات
                  </span>
                </Link>
              </li><li>
                  <Link
                    href="/statistique"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FaUserTie width={200} height={200} />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                    إحصائيات المستخدمين
                    </span>
                  </Link>
                </li></>
            )}

            <li onClick={logout}>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <TbLogout width={200} height={200} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  تسجيل الخروج
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
