import Link from "next/link";
import Container from "./Container";
import Logo from "../common/Logo";
import Nav from "./Nav";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="py-2 md:py-4 bg-white/90 fixed top-0 left-0 right-0 z-100">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="py-2 md:py-3 lg:py-4">
            <Logo size="lg"/>
          </Link>
          <Nav/>
          <Menu/>
        </div>
      </Container>
    </header>
  );
}