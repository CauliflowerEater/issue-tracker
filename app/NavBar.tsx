"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBugs } from "react-icons/fa6";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
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
          className={classNames({
            "text-zinc-900": item.href == currentPath,
            "text-zinc-400": item.href !== currentPath,
            "hover:text-zinc-800 transition-colors": true,
          })}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
