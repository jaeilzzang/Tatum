"use client";

import Dialog from "@/components/dialog";
import { Flex, Button, IconButton, Text, TextField } from "@radix-ui/themes";
import { AvatarIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { ChangeEventHandler, FormEventHandler, useMemo, useState } from "react";

export default function Home() {
  const [pwdVisible, setPwdVisible] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    console.log("나야 서브밋");
  };

  const isValueCheck = useMemo(() => {
    return Object.values(inputValue).filter((e) => !e.trim().length);
  }, [inputValue]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
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
        <Dialog.Title title="Task 생성" Icons={<AvatarIcon color="white" />} />
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
                type={pwdVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
              >
                <TextField.Slot side="right">
                  <IconButton
                    size="1"
                    variant="ghost"
                    color="gray"
                    onClick={() => setPwdVisible(!pwdVisible)}
                  >
                    <EyeOpenIcon />
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </label>
            <Dialog.Footer disabled={!!isValueCheck.length} label="Log-In" />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
