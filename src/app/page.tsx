"use client";

import Dialog from "@/components/dialog";
import { Flex, Button, IconButton, Text, TextField } from "@radix-ui/themes";
import { AvatarIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { FormEventHandler } from "react";

import { fetchUtils } from "@/utils/api";
import { AuthLoginDto, UserDto } from "./api/auth/type";
import { useInput, useToggle } from "@/hooks";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/route";

type InputType = "email" | "password";

export default function Home() {
  const route = useRouter();

  const { toggle, handleToggle } = useToggle();

  // 각 입력 필드의 유효성을 체크 할 객체
  const validation = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^.{5,}$/,
  };

  const initState = {
    email: "",
    password: "",
  };

  const { handleValidation, handleChange, inputValue } = useInput<InputType>(
    initState,
    validation
  );

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!handleValidation()) {
      console.error("error");
    }

    const { email, password } = inputValue;

    const userData = await fetchUtils.post<UserDto, AuthLoginDto>({
      url: "auth/login",
      body: {
        userEmail: email,
        password: password,
      },
    });

    if (userData) {
      // 인증 완료 시 유저 데이터 저장
      localStorage.setItem("user", JSON.stringify(userData));
      const href =
        userData.userRole === "Viewer" ? ROUTE.ADMIN.TASKS : ROUTE.ADMIN.USERS;
      route.push(href);
    }
  };

  return (
    <Dialog>
      <Dialog.Open>
        <Flex
          display={"flex"}
          justify={"center"}
          align={"center"}
          height={"100vh"}
        >
          <Button variant="solid" color="gray">
            간단한 사용자 로그인 화면
          </Button>
        </Flex>
      </Dialog.Open>

      <Dialog.Content>
        <Dialog.Title title="로그인" Icons={<AvatarIcon color="white" />} />
        <form onSubmit={handleSubmit}>
          <Flex my="5" direction="column" gap="5">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                이메일
              </Text>
              <TextField.Root
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="이메일 주소를 입력해주세요"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                비밀번호
              </Text>
              <TextField.Root
                onChange={handleChange}
                name="password"
                type={toggle ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
              >
                <TextField.Slot side="right">
                  <IconButton
                    size="1"
                    variant="ghost"
                    color="gray"
                    onClick={handleToggle}
                  >
                    <EyeOpenIcon />
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </label>
            <Dialog.Footer disabled={!handleValidation()} label="Log-In" />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
