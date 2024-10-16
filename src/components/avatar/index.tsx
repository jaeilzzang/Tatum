import { useAuth } from "@/hooks/use-auth";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";

const Avatar = () => {
  const user = useAuth();

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
