"use client";

import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBugs } from "react-icons/fa6";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];

  return (
    <nav className="flex space-x-6 ml-6 border-b h-14 items-center">
      <Link href="/">
        <FaBugs size={40} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={classNames({
                "text-zinc-900": item.href == currentPath,
                "text-zinc-400": item.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Sign Out</Link>
        )}
      </Box>
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}> Sign In</Link>
      )}
    </nav>
  );
};

export default NavBar;
