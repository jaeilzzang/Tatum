"use client";

import { UserDto } from "@/app/api/auth/type";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React from "react";

const Avatar = () => {
  if (typeof window === "undefined") return null;

  const getUserJson = localStorage.getItem("user");

  if (!getUserJson) {
    redirect("/");
  }

  const { user }: { user: UserDto } = JSON.parse(getUserJson);

  const { userName, userRole } = user;

  return (
    <Flex gap={"4"} align={"center"}>
      <Flex gap={"2"}>
        <Text color="blue">{userName}</Text>
        <Text color="blue">{userRole}</Text>
      </Flex>

      <AvatarIcon />
    </Flex>
  );
};

export default Avatar;
