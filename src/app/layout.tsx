import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";


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

const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
