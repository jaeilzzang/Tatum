import { UserDto } from "@/app/api/auth/type";
import { QUERY_KEY_USER_ROLE } from "@/app/api/list/user/route";
import { TFilterItem } from "@/components/filter";
import { TSelectItem } from "@/components/select";
import { TCell } from "@/components/table";

export const selectSearchItem: TSelectItem[] = [
  { label: "User Name", value: "name" },
  { label: "User Email", value: "email" },
  { label: "User Phone", value: "phone" },
];

export const filterItem: TFilterItem[] = [
  {
    title: "사용자권한",
    queryKey: QUERY_KEY_USER_ROLE,
    filter: {
      type: "checkbox",
      list: [
        { id: "admin", name: "Admin" },
        { id: "primeuser", name: "Prime User" },
        { id: "regularuser", name: "Regular User" },
        { id: "viewer", name: "Viewer" },
      ],
    },
  },
];

export const cell: TCell<keyof UserDto>[] = [
  {
    key: "userName",
    label: "User Name",
  },
  {
    key: "userEmail",
    label: "User Email",
  },
  {
    key: "userRole",
    label: "User Role",
  },
  {
    key: "userPhone",
    label: "User Phone",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
  {
    key: "lastLoggedInAt",
    label: "Last Logged In At",
  },
];
