"use client";

import React, { ComponentProps } from "react";

import styles from "./filter.module.css";
import { Flex, Text } from "@radix-ui/themes";

import CheckboxGroup from "./checkbox-group";
import { GenericItemType } from "@/types";

type CheckboxGroupProps = ComponentProps<typeof CheckboxGroup>;

export type TFilterType = "checkbox";

export type TFilter = {
  type: TFilterType;
  list: GenericItemType[];
};

export type TFilterItem = {
  title: string;
  filter: TFilter;
} & Omit<CheckboxGroupProps, "item">;

interface Props {
  filterItem: TFilterItem[];
}

const Filter = ({ filterItem }: Props) => {
  return (
    <Flex className={styles.container}>
      {filterItem.map(({ filter, title, queryKey }) => {
        const { list, type } = filter;
        return (
          <Flex className={styles.filter_container} key={title}>
            <Text className={styles.title}>{title}</Text>

            <Flex gap={"4"} align={"center"}>
              {type === "checkbox" && (
                <CheckboxGroup item={list} queryKey={queryKey} />
              )}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Filter;
