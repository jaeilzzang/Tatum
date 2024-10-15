"use client";

import { Select as RadixSelect } from "@radix-ui/themes";
import React, { useState } from "react";

export type TSelectItem = {
  value: string;
  label: string;
} & RadixSelect.ItemProps;

interface Props {
  item: TSelectItem[];
}

const Select = ({ item }: Props) => {
  const [selectVal, setSelectVal] = useState<TSelectItem["value"]>(
    item[0].value
  );

  const selectValue = item.filter((e) => e.value === selectVal);
  const notSelectValue = item.filter((e) => e.value !== selectVal);

  return (
    <RadixSelect.Root
      defaultValue={item[0].value}
      onValueChange={(e) => setSelectVal(e)}
    >
      <RadixSelect.Trigger />
      <RadixSelect.Content>
        <RadixSelect.Group>
          {selectValue.map(({ value, label }) => {
            return (
              <RadixSelect.Item key={label} value={value} disabled>
                {label}
              </RadixSelect.Item>
            );
          })}
        </RadixSelect.Group>
        <RadixSelect.Separator />
        <RadixSelect.Group>
          {notSelectValue.map(({ value, label }) => {
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
