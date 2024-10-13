import { UserDto } from "@/app/api/auth/type";
import Avatar from "@/components/avatar";
import Filter from "@/components/filter";
import SelectSearchForm from "@/components/form/select-search";
import Table from "@/components/table";
import { fetchUtils } from "@/utils/api";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

import Count from "@/components/count";
import { filterItem, selectSearchItem, cell } from "./constants";

const UserListPage = async () => {
  const getUser = await fetchUtils.get<UserDto[]>({ url: "list/user" });

  return (
    <Flex m={"4"} direction={"column"} width={"100%"}>
      <Flex justify={"between"}>
        <Heading size="4">User List</Heading>
        <Avatar />
      </Flex>

      <Flex gap={"4"} mt={"8"}>
        <SelectSearchForm buttonName="Invite User" item={selectSearchItem} />
      </Flex>

      <Flex mt={"8"} mb={"1"}>
        <Count count={getUser.length} />
      </Flex>

      <Filter filterItem={filterItem} />

      <Flex my={"6"}>
        <Table rows={getUser} cell={cell} />
      </Flex>
    </Flex>
  );
};

export default UserListPage;
