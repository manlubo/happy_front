import type { Metadata } from "next";
import "@/styles/globals.css";
import { pretendard } from "@/fonts/font";
import { Providers } from "./providers";
import GlobalModal from "@/components/ui/GlobalModal";
import SideBar from "@/components/layout/SideBar";


export const metadata: Metadata = {
  title: {
    default: "기쁨을 기부하다, HappyGivers",
    template: "%s | HappyGivers",
  },
  description: "기쁨을 기부하다, HappyGivers",
  keywords: ["기부", "후원", "HappyGivers"],
  icons: {
    icon: "/favicon.ico", // public 폴더에 있는 favicon.ico 파일
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <Providers>
          <GlobalModal />
          <SideBar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
