"use client";

import { Select as RadixSelect } from "@radix-ui/themes";
import React from "react";
import useSelect from "./hooks";

const Select = () => {
  const { notSelectList, onValueChange, selectList, selectVal } = useSelect();

  return (
    <RadixSelect.Root defaultValue={selectVal} onValueChange={onValueChange}>
      <RadixSelect.Trigger />
      <RadixSelect.Content>
        <RadixSelect.Group>
          {selectList.map(({ value, label }) => {
            return (
              <RadixSelect.Item key={label} value={value} disabled>
                {label}
              </RadixSelect.Item>
            );
          })}
        </RadixSelect.Group>
        <RadixSelect.Separator />
        <RadixSelect.Group>
          {notSelectList.map(({ value, label }) => {
            return (
              <RadixSelect.Item key={label} value={value}>
                {label}
              </RadixSelect.Item>
            );
          })}
        </RadixSelect.Group>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};

export default Select;
