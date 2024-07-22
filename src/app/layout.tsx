import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });
const font = Rubik({
  subsets: ["arabic"],
});
export const metadata: Metadata = {
  title: "Enfance",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="ar" dir="rtl">
        <body className={font.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
