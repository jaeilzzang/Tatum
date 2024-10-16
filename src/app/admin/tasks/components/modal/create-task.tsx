"use client";

import { AvatarIcon } from "@radix-ui/react-icons";
import Dialog from "@/components/dialog";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Flex } from "@radix-ui/themes";
import Button from "@/components/button";
import TextField from "@/components/text-field";
import { Select, SelectRoot } from "@/components/select";
import { TSelectItem } from "@/components/select/provider";
import { useAuth } from "@/hooks/use-auth";
import { UserDto, UserRole } from "@/app/api/auth/type";
import { fetchUtils } from "@/utils/api";
import { API_ROUTE } from "@/app/api/route";

type FieldName =
  | "reporter"
  | "taskname"
  | "assignee"
  | "taskType"
  | "product"
  | "recipientPhone"
  | "recipientAddress"
  | "dueDate";

type FieldType = {
  type: "text" | "select";
  label: string;
  name: FieldName;
  placeholder?: string;
  disabled?: boolean;
  options?: { label: string; value: string }[]; // select 필드의 옵션
};

type FieldState = {
  value: string;
  errorMessage: string;
};

type FormState = {
  [key in FieldName]: FieldState;
};

const CreateTaskModal = () => {
  const user = useAuth();

  const [userList, setUserList] = useState<UserDto[]>([]);

  const meAuth: TSelectItem[] = [
    {
      label: userList[0]?.userName,
      value: userList[0]?.userName,
    },
  ];

  const primeAuth: TSelectItem[] = userList
    ?.filter((e) => {
      return e.userRole === "RegularUser" || e.userRole === "Viewer";
    })
    .map((e) => {
      return {
        label: e.userName,
        value: e.userName,
      };
    });

  const allAuth: TSelectItem[] = userList?.map((e) => {
    return {
      label: e.userName,
      value: e.userName,
    };
  });

  const authSelectType = (role?: UserRole): TSelectItem[] => {
    if (!role) {
      return [];
    }

    switch (role) {
      case "Admin":
        return allAuth;
      case "PrimeUser":
        return primeAuth;
      case "RegularUser":
        return meAuth;
      default:
        return [];
    }
  };

  const fields: FieldType[] = [
    {
      type: "text",
      label: "생성자",
      name: "reporter",
      disabled: true,
      placeholder: "",
    },
    {
      type: "text",
      label: "Tasks Name",
      name: "taskname",
      placeholder: "Task Name을 입력하세요",
    },
    {
      type: "select",
      label: "담당자",
      name: "assignee",
      options: authSelectType(user?.userRole),
      disabled: user?.userRole === "Viewer",
    },
    {
      type: "select",
      label: "Task Type",
      name: "taskType",
      options: [
        { label: "택배요청", value: "택배요청" },
        { label: "물품구매", value: "물품구매" },
      ],
    },
    {
      type: "text",
      label: "물품명",
      name: "product",
      placeholder: "물품을 입력하세요",
    },
    {
      type: "text",
      label: "수신자 전화번호",
      name: "recipientPhone",
      placeholder: "수신자 전화번호를 입력하세요",
    },
    {
      type: "text",
      label: "수신자 주소",
      name: "recipientAddress",
      placeholder: "수신자 주소를 입력하세요",
    },
    {
      type: "text",
      label: "Due Date",
      name: "dueDate",
      placeholder: "기간을 입력하세요",
    },
  ];

  const createInitialState = (fields: FieldType[]): FormState => {
    return fields.reduce((acc, field) => {
      if (field.name === "reporter") {
        acc[field.name] = {
          value: user?.userName || "",
          errorMessage: "",
        };
      }
      acc[field.name] = { value: "", errorMessage: "" };
      return acc;
    }, {} as FormState);
  };

  const [inputValue, setInputValue] = useState<FormState>(
    createInitialState(fields)
  );

  const handleChange = (name: FieldName, value: string) => {
    setInputValue((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        errorMessage: "error test", // error style test
        value,
      },
    }));
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  const getUser = async () => {
    const data = await fetchUtils.get<UserDto[]>({
      url: API_ROUTE.ADMIN.USER_LIST,
      options: {
        headers: {
          // token 대신
          user: JSON.stringify(user),
        },
      },
    });
    setUserList(data);
  };

  useEffect(() => {
    if (!user) return;

    setInputValue(createInitialState(fields));
  }, [user]);

  return (
    <Dialog>
      <Dialog.Open>
        <Button onClick={getUser}>Create Tasks</Button>
      </Dialog.Open>

      <Dialog.Content>
        <Dialog.Title title="Task 생성" Icons={<AvatarIcon color="white" />} />
        <form onSubmit={handleSubmit}>
          <Flex my="5" direction="column" gap="5">
            {fields.map((field) => {
              if (field.type === "text") {
                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={
                      field.name === "reporter"
                        ? user?.userName
                        : inputValue[field.name].value
                    }
                    errorMessage={inputValue[field.name].errorMessage}
                    disabled={field.disabled}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                );
              }

              if (field.type === "select") {
                return (
                  <SelectRoot key={field.name} label={field.label}>
                    <Select
                      item={field.options}
                      disabled={field.disabled}
                      onChange={(e) => handleChange(field.name, e)}
                    />
                  </SelectRoot>
                );
              }

              return null;
            })}
            <Dialog.Footer label="Create" />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreateTaskModal;
