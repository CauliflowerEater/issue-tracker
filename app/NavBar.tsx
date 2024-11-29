"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBugs } from "react-icons/fa6";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between" align="center">
          <NavList />
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavList = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];
  return (
    <Flex align="center">
      <Link href="/">
        <FaBugs size={40} />
      </Link>
      <ul className="flex space-x-6 ml-6">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={classNames({
                "nav-link": true,
                "!text-zinc-900": item.href == currentPath,
              })}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Flex>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"}>
        <Text className="nav-link">Sign In</Text>
      </Link>
    );

  if (status === "authenticated")
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback={"?"}
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="5">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Sign Out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    );
};
export default NavBar;
