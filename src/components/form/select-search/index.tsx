"use client";

import Select from "@/components/select";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, TextField } from "@radix-ui/themes";
import React, { ComponentProps } from "react";

import styles from "./select-search.module.css";

type SelectProps = ComponentProps<typeof Select>;

interface Props extends SelectProps {
  buttonName: string;
}

const SelectSearchForm = ({ item, buttonName }: Props) => {
  return (
    <>
      <Flex gap={"2"}>
        <Select item={item} />

        <TextField.Root name="password" placeholder="Search">
          <TextField.Slot side="right">
            <IconButton size="1" variant="ghost" color="gray">
              <MagnifyingGlassIcon />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Button className={styles.button}>{buttonName}</Button>
    </>
  );
};

export default SelectSearchForm;
