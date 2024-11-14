import Link from "next/link";
import { FaBugs } from "react-icons/fa6";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex space-x-6 ml-6 border-b h-14 items-center">
      <Link href="/">
        <FaBugs size={40} />
      </Link>
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-zinc-400 hover:text-zinc-800 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
