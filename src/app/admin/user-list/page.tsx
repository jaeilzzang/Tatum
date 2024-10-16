import React from "react";

import { UserDto } from "@/app/api/auth/type";
import { fetchUtils } from "@/utils/api";

import { filterItem, cell, selectSearchItem } from "./constants";

import { createQueryString } from "@/utils/query-string";
import { API_ROUTE } from "@/app/api/route";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTE } from "@/constants/route";

import { SelectRoot } from "@/components/select/provider";
import ListPageTemplate from "@/components/template/list-page";
import Button from "@/components/button";

interface Props {
  searchParams: Record<string, string>;
}

const UserListPage = async ({ searchParams }: Props) => {
  const userCookie = cookies().get("user");

  // 비로그인 유저
  if (!userCookie) {
    redirect(ROUTE.HOME);
  }

  const user: UserDto = JSON.parse(userCookie.value);

  // viewer 유저
  if (user.userRole === "Viewer") {
    redirect(ROUTE.ADMIN.TASKS);
  }

  const getUserList = await fetchUtils.get<UserDto[]>({
    url: `${API_ROUTE.ADMIN.USER_LIST}?${createQueryString(searchParams)}`,
    options: {
      headers: {
        // token 대신
        user: JSON.stringify(user),
      },
    },
  });

  return (
    <SelectRoot item={selectSearchItem}>
      <ListPageTemplate
        title="User List"
        cell={cell}
        rows={getUserList}
        filterItem={filterItem}
        disabled={user.userRole !== "Admin"}
        buttonEl={<Button>Invite User</Button>}
      />
    </SelectRoot>
  );
};

export default UserListPage;
