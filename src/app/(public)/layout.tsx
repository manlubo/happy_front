import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import BottomBar from "@/components/layout/BottomBar";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
      <BottomBar />
    </>
  );
}
