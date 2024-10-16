import React from "react";

import { UserDto } from "@/app/api/auth/type";
import { fetchUtils } from "@/utils/api";

import { filterItem, selectSearchItem, cell } from "./constants";
import ListPageTemplate from "@/components/template/list-page";

import { createQueryString } from "@/utils/query-string";
import { SelectRoot } from "@/components/select/provider";
import { API_ROUTE } from "@/app/api/route";

interface Props {
  searchParams: Record<string, string>;
}

const UserListPage = async ({ searchParams }: Props) => {
  const getUser = await fetchUtils.get<UserDto[]>({
    url: `${API_ROUTE.ADMIN.USER_LIST}?${createQueryString(searchParams)}`,
  });

  return (
    <SelectRoot item={selectSearchItem}>
      <ListPageTemplate
        buttonName="Invite User"
        cell={cell}
        rows={getUser}
        filterItem={filterItem}
        title="User List"
      />
    </SelectRoot>
  );
};

export default UserListPage;
