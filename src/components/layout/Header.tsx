import Link from "next/link";
import Container from "./Container";
import Logo from "../common/Logo";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="py-4 border-b">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo size="lg"/>
          </Link>
          <Nav/>
          <Sidebar/>
        </div>
      </Container>
    </header>
  );
}