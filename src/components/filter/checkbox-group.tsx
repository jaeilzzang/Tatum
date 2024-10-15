"use client";

import React, { useMemo } from "react";
import Checkbox from "./checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  item: {
    id: string;
    name: string;
  }[];

  queryKey: string;
}

const CheckboxGroup = ({ queryKey, item }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkboxStatus = searchParams.get(queryKey);

  const currentParams = new URLSearchParams(searchParams.toString());
  const checkParams = checkboxStatus ? checkboxStatus.split(",") : [];

  const newFilterList = [{ id: "all", name: "ALL" }, ...item];

  const isAll = useMemo(() => {
    // 초기상태 기본 값
    if (!checkboxStatus) return true;

    // 모두 선택 시
    return checkParams.length === item.length;
  }, [checkParams, item.length]);

  // 체크 상태 업데이트
  const handleCheckedChange = (id: string) => {
    let updatedParams = [...checkParams];

    if (id === "all") {
      // 'all' 선택 시 전체 선택
      updatedParams = item.map((e) => e.id);
    } else if (updatedParams.includes(id)) {
      if (updatedParams.length === 1) {
        alert("최소 1개는 체크되어있어야 합니다.");
        return;
      }
      // 체크 해제
      updatedParams = updatedParams.filter((param) => param !== id);
    } else {
      // 초기 상태 all true 상태에서 다른 체크를 누르면 그 체크만 해제한 값을 등록
      if (!updatedParams.length) {
        updatedParams = item.filter((e) => e.id !== id).map((e) => e.id);
      } else {
        // 필터 추가
        updatedParams.push(id);
      }
    }

    currentParams.set(queryKey, updatedParams.join(","));
    const decodeURI = decodeURIComponent(currentParams.toString());

    router.push(`${pathname}?${decodeURI}`);
  };

  if (!newFilterList.length) return null;

  return newFilterList.map(({ id, name }) => {
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
  });
};

export default CheckboxGroup;
