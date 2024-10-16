"use client";

import React from "react";
import Checkbox from "./checkbox";
import { GenericItemType } from "@/types";
import useCheckboxGroup from "./hooks/use-checkbox-group";

export interface Props {
  item: GenericItemType[];

  queryKey: string;
}

const CheckboxGroup = (props: Props) => {
  const { filterItem, handleCheckedChange, isAll, checkParams } =
    useCheckboxGroup(props);

  if (!filterItem.length) return null;

  return filterItem.map(({ label, value }) => {
    return (
      <Checkbox
        color="teal"
        key={value}
        id={value}
        label={label}
        checked={isAll ? true : checkParams.includes(value)}
        onCheckedChange={() => handleCheckedChange(value)}
      />
    );
  });
};

export default CheckboxGroup;
