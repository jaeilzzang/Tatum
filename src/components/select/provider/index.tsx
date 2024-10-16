"use client";

import { Select } from "@radix-ui/themes";
import React, { createContext, PropsWithChildren, useState } from "react";

export type TSelectItem = {
  value: string;
  label: string;
} & Select.ItemProps;

export interface TSelectContext {
  selectList: TSelectItem[];
  notSelectList: TSelectItem[];
  selectVal: string;
  setSelectVal: React.Dispatch<React.SetStateAction<TSelectItem["value"]>>;
  onValueChange: (id: string) => void;
  item?: TSelectItem[];
  label?: string;
}

export interface SelectProviderProps {
  item?: TSelectItem[];
  label?: string;
}

export const SelectContext = createContext<TSelectContext | null>(null);

const SelectProvider = ({
  children,
  item,
  label,
}: PropsWithChildren<SelectProviderProps>) => {
  const [selectVal, setSelectVal] = useState<TSelectItem["value"]>(
    item ? item[0].value : ""
  );

  const selectList = item?.filter((e) => e.value === selectVal) || [];
  const notSelectList = item?.filter((e) => e.value !== selectVal) || [];

  const onValueChange = (id: string) => setSelectVal(id);

  const value = {
    selectList,
    notSelectList,
    selectVal,
    setSelectVal,
    onValueChange,
    item,
    label,
  };

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

export default SelectProvider;
