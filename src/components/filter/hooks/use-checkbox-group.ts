import { GenericItemType } from "@/types";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useMemo } from "react";

interface Props {
  item: GenericItemType[];

  queryKey: string;
}
const useCheckboxGroup = ({ item, queryKey }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkboxStatus = searchParams.get(queryKey);

  const currentParams = new URLSearchParams(searchParams.toString());
  const checkParams = checkboxStatus ? checkboxStatus.split(",") : [];

  const newFilterList: GenericItemType[] = [
    { value: "all", label: "ALL" },
    ...item,
  ];

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
      updatedParams = item.map((e) => e.value);
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
        updatedParams = item.filter((e) => e.value !== id).map((e) => e.value);
      } else {
        // 필터 추가
        updatedParams.push(id);
      }
    }

    currentParams.set(queryKey, updatedParams.join(","));
    const decodeURI = decodeURIComponent(currentParams.toString());

    router.push(`${pathname}?${decodeURI}`);
  };

  return {
    isAll,
    checkParams,
    filterItem: newFilterList,
    handleCheckedChange,
  };
};

export default useCheckboxGroup;
