"use client";

import { Select as RadixSelect, Text } from "@radix-ui/themes";

import React, { ComponentProps, PropsWithChildren } from "react";
import useSelect from "./hooks";
import styles from "./select.module.css";
import SelectProvider, { TSelectItem } from "./provider";

interface Props {
  item?: TSelectItem[];
  onChange?: (id: string) => void;
  disabled?: boolean;
  value?: string;
}

export const Select = ({
  disabled,
  item: propsItem,
  value,
  onChange,
}: Props) => {
  const { onValueChange, selectList, notSelectList, selectVal, item, label } =
    useSelect();

  let selectLists = selectList;
  let notSelectLists = notSelectList;
  let selectValue = selectVal;

  if (!item && propsItem) {
    selectLists = propsItem?.filter((e) => e.value === value) || [];
    notSelectLists = propsItem?.filter((e) => e.value !== value) || [];
    selectValue = propsItem[0]?.value;
  }

  return (
    <RadixSelect.Root
      defaultValue={selectValue}
      onValueChange={(id) => {
        if (onChange) {
          onChange(id);
        }
        onValueChange(id);
      }}
      disabled={disabled}
    >
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>
        <RadixSelect.Trigger className={styles.select_box} />
        <RadixSelect.Content>
          <RadixSelect.Group>
            {selectLists.map(({ value, label }) => {
              return (
                <RadixSelect.Item key={label} value={value} disabled>
                  {label}
                </RadixSelect.Item>
              );
            })}
          </RadixSelect.Group>
          <RadixSelect.Separator />
          <RadixSelect.Group>
            {notSelectLists.map(({ value, label }) => {
              return (
                <RadixSelect.Item key={label} value={value}>
                  {label}
                </RadixSelect.Item>
              );
            })}
          </RadixSelect.Group>
        </RadixSelect.Content>
      </label>
    </RadixSelect.Root>
  );
};

export const SelectRoot = (
  props: PropsWithChildren<ComponentProps<typeof SelectProvider>>
) => {
  return <SelectProvider {...props}>{props.children}</SelectProvider>;
};
