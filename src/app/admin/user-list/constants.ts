import { UserDto } from "@/app/api/auth/type";
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
    filter: {
      type: "checkbox",
      list: [
        { id: "admin", name: "Admin" },
        { id: "prime", name: "Prime User" },
        { id: "regular", name: "Regular User" },
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
