import LoginForm from "@/components/loginForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-3 relative h-[710px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">
            منصة تتبع المستفيدين من البرامج الخاصة بحماية الأطفال
          </h1>
          <LoginForm />
        </div>
        <div className="relative h-full w-full col-span-2">
          <div className="absolute inset-0  bg-[url('/couverture.jpg')] bg-cover bg-no-repeat" />

          <div className="relative z-20 flex items-center text-lg font-medium"></div>
          <div className="relative z-20 mt-auto"></div>
        </div>
      </main>
    </>
  );
}
