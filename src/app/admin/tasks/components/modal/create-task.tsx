"use client";

import { AvatarIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Dialog from "@/components/dialog";
import React from "react";
import { Flex, TextField, IconButton, Text } from "@radix-ui/themes";
import Button from "@/components/button";

const CreateTaskModal = () => {
  return (
    <Dialog>
      <Dialog.Open>
        <Button>Create Tasks</Button>
      </Dialog.Open>

      <Dialog.Content>
        <Dialog.Title title="Task 생성" Icons={<AvatarIcon color="white" />} />
        {/* <form onSubmit={handleSubmit}> */}
        <Flex my="5" direction="column" gap="5">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              이메일
            </Text>
            <TextField.Root
              // onChange={handleChange}
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
              // onChange={handleChange}
              name="password"
              // type={toggle ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
            >
              <TextField.Slot side="right">
                <IconButton
                  size="1"
                  variant="ghost"
                  color="gray"
                  // onClick={handleToggle}
                >
                  <EyeOpenIcon />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          </label>
          <Dialog.Footer label="Create" />
        </Flex>
        {/* </form> */}
      </Dialog.Content>
    </Dialog>
  );
};

export default CreateTaskModal;
