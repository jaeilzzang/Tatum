import React from "react";

import { UserDto } from "@/app/api/auth/type";
import { fetchUtils } from "@/utils/api";

import { filterItem, selectSearchItem, cell } from "./constants";
import ListPageTemplate from "@/components/template/list-page";

import { createQueryString } from "@/utils/query-string";

interface Props {
  params: {};
  searchParams: Record<string, string>;
}

const UserListPage = async ({ searchParams }: Props) => {
  const getUser = await fetchUtils.get<UserDto[]>({
    url: `list/user?${createQueryString(searchParams)}`,
  });

  return (
    <ListPageTemplate
      buttonName="Invite User"
      cell={cell}
      rows={getUser}
      item={selectSearchItem}
      filterItem={filterItem}
      title="User List"
    />
  );
};

export default UserListPage;
