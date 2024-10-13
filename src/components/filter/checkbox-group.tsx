"use client";

import React, { useMemo } from "react";
import Checkbox from "./checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  item: {
    id: string;
    name: string;
  }[];
}

const CheckboxGroup = ({ item }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams().get("checked");

  const checkParams = searchParams ? searchParams.split(",") : [];

  const newFilterList = [{ id: "all", name: "ALL" }, ...item];

  const isAll = useMemo(
    () => checkParams.length === item.length || checkParams.includes("all"),
    [checkParams, item.length]
  );

  // 체크 상태 업데이트
  const handleCheckedChange = (id: string) => {
    let updatedParams = [...checkParams];

    if (id === "all") {
      // 'all' 선택 시, 전체 선택/해제
      updatedParams = isAll ? [] : item.map((e) => e.id);
    } else if (updatedParams.includes(id)) {
      updatedParams = updatedParams.filter((param) => param !== id);
    } else {
      updatedParams.push(id);
    }

    // 쿼리스트링 업데이트
    if (updatedParams.length) {
      router.push(pathname + `?checked=${updatedParams.join(",")}`);
      return;
    }

    router.push(pathname);
  };

  return (
    <>
      {newFilterList.map(({ id, name }) => {
        return (
          <Checkbox
            color="teal"
            key={id}
            id={id}
            label={name}
            checked={isAll ? true : checkParams.includes(id)}
            onCheckedChange={() => handleCheckedChange(id)}
          />
        );
      })}
    </>
  );
};

export default CheckboxGroup;
