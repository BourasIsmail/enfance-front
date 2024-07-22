import { SideBar } from "@/components/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <SideBar />
      <main className="p-4 sm:mr-60">
        <h1 className="text-3xl font-bold ">الصفحة الرئيسية</h1>
        <div className="p-4 border-2 my-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Image
            className="w-full"
            alt="definition"
            src={"/def.jpg"}
            width={2000}
            height={100}
          />
        </div>
      </main>
    </div>
  );
}
