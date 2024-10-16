import { UserDto } from "@/app/api/auth/type";
import { QUERY_KEY_USER_ROLE } from "@/app/api/admin/user-list/route";
import type { TFilterItem } from "@/components/filter";
import type { TCell } from "@/components/table";
import type { GenericItemType } from "@/types";

type GenericUserType = GenericItemType<keyof UserDto>[];

export const selectSearchItem: GenericUserType = [
  { label: "User Name", value: "username" },
  { label: "User Email", value: "useremail" },
  { label: "User Phone", value: "userphone" },
];

export const filterList: GenericItemType<UserDto["userRole"]>[] = [
  { value: "admin", label: "Admin" },
  { value: "primeuser", label: "Prime User" },
  { value: "regularuser", label: "Regular User" },
  { value: "viewer", label: "Viewer" },
];

export const filterItem: TFilterItem[] = [
  {
    title: "사용자권한",
    queryKey: QUERY_KEY_USER_ROLE,
    filter: {
      type: "checkbox",
      list: filterList,
    },
  },
];

export const cell: TCell<keyof UserDto>[] = [
  {
    value: "userName",
    label: "User Name",
  },
  {
    value: "userEmail",
    label: "User Email",
  },
  {
    value: "userRole",
    label: "User Role",
  },
  {
    value: "userPhone",
    label: "User Phone",
  },
  {
    value: "createdAt",
    label: "Created At",
  },
  {
    value: "lastLoggedInAt",
    label: "Last Logged In At",
  },
];
