import NavLink from "../ui/NavLink";

export default function Nav() {
    return (
        <nav className="hidden lg:flex gap-12">
          <NavLink href="/">기부</NavLink>
          <NavLink href="/">피드</NavLink>
          <NavLink href="/">공지사항</NavLink>
          <NavLink href="/">자주묻는질문</NavLink>
        </nav>
    );
}