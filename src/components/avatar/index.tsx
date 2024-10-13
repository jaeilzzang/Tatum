"use client";

import { UserDto } from "@/app/api/auth/type";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Avatar = () => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getUserJson = localStorage.getItem("user");

      if (!getUserJson) {
        redirect("/");
      }

      const { user } = JSON.parse(getUserJson);
      setUser(user);
    }
  }, []);

  if (!user) {
    return null;
  }

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
