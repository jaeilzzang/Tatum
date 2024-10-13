"use client";

import React from "react";
import styles from "./sidebar.module.css";

import { Flex, Box, IconButton } from "@radix-ui/themes";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  AvatarIcon,
  FileIcon,
} from "@radix-ui/react-icons";
import { useToggle } from "@/hooks";
import { clsx } from "clsx";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTE } from "@/constants/route";

export type TSidebarMenu = {
  name: string;
  href: string;
  icon: ReactNode;
};

const sidebarWidth = "200px";

const Sidebar = () => {
  const pathname = usePathname();

  const { toggle, handleToggle } = useToggle();

  const sidebarMenu: TSidebarMenu[] = [
    {
      name: "Users",
      icon: <AvatarIcon />,
      href: ROUTE.ADMIN.USERS,
    },
    {
      name: "Tasks",
      icon: <FileIcon />,
      href: ROUTE.ADMIN.TASKS,
    },
  ];

  return (
    <Flex position={"relative"} mr={"2rem"}>
      <IconButton className={styles.toggle} onClick={handleToggle}>
        {!toggle ? (
          <ArrowLeftIcon color="white" />
        ) : (
          <ArrowRightIcon color="white" />
        )}
      </IconButton>
      <Box
        className={clsx(styles.sidebar, {
          [styles.open]: !toggle,
        })}
      >
        <Flex width={sidebarWidth} height={"100vh"} justify={"center"} mt={"9"}>
          <Box className={styles.nav_container}>
            {sidebarMenu.map(({ href, icon, name }) => {
              return (
                <IconButton
                  asChild
                  className={clsx(styles.nav, {
                    [styles.active]: pathname === href,
                    [styles.nav_close]: toggle,
                  })}
                >
                  <Link href={href}>
                    {icon}
                    {!toggle ? name : ""}
                  </Link>
                </IconButton>
              );
            })}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Sidebar;
