"use client";

import Select from "@/components/select";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, TextField } from "@radix-ui/themes";
import React from "react";

import { useSelectSearch } from "./hooks";

const SelectSearchForm = () => {
  const { ref, onSubmit } = useSelectSearch();

  return (
    <Flex gap={"2"} asChild>
      <form onSubmit={onSubmit}>
        <Select />

        <TextField.Root ref={ref} name="password" placeholder="Search">
          <TextField.Slot side="right">
            <IconButton size="1" variant="ghost" color="gray" type="submit">
              <MagnifyingGlassIcon />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </form>
    </Flex>
  );
};

export default SelectSearchForm;
