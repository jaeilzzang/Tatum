import useSelect from "@/components/select/hooks";
import { normalizeStr } from "@/utils/utils-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { FormEventHandler, useRef } from "react";

export const useSelectSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { selectVal, item, ...selectProps } = useSelect();

  const ref = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const textValue = ref.current?.value || "";

    if (!normalizeStr(textValue)) {
      alert("검색 필터 값 미입력");
      return;
    }

    const currentParams = new URLSearchParams(searchParams.toString());

    item.forEach((e) => {
      // 기존 select 필터 모두 삭제
      currentParams.delete(e.value);
    });

    // 입력 받은 select 필터만 query string 등록
    currentParams.set(selectVal, textValue);

    router.push(`${pathname}?${currentParams}`);
  };

  return { onSubmit, ref, selectVal, item, ...selectProps };
};
