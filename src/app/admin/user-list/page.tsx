import Avatar from "@/components/avatar";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

const UserListPage = () => {
  return (
    <Flex m={"4"} direction={"column"} width={"100%"}>
      <Flex justify={"between"}>
        <Heading size="4">User List</Heading>
        <Avatar />
      </Flex>
    </Flex>
  );
};

export default UserListPage;
