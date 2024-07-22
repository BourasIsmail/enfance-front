"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";
import { api } from "../api";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const [email, setemail] = useState(""); // Provide initial value for email
  const [password, setpassword] = useState(""); // Provide initial value for password
  const { toast } = useToast();

  const login = async () => {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log(response.data);
      setCookie("token", response.data, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      toast({
        description: "تم تسجيل الدخول بنجاح",
        className: "bg-green-500 text-white",
        duration: 2000,
        title: "نجاح",
      });
      window.location.href = "";
    } catch (error) {
      toast({
        description: "اسم مستخدم أو كلمة مرور غير صحيحة",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    login();
  }

  return (
    <section className=" dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 my-7 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              مخصص لمستخدمين التعاون الوطني
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  البريد الالكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-purple-400 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
