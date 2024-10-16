import { ChangeEventHandler, useState } from "react";

type InputState<T extends string> = { [k in T]: any };
type InputValidation<T extends string> = {
  [k in keyof InputState<T>]: RegExp | boolean;
};

export const useInput = <T extends string>(
  init: InputState<T>,
  validation: InputValidation<T>
) => {
  const [inputValue, setInputValue] = useState<InputState<T>>(init);

  // 각 입력 필드의 유효성을 체크 할 객체
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // 유효성 검사
  const handleValidation = (): boolean => {
    // 유효성 필드 검사
    const invalidField = Object.keys(inputValue).filter((e) => {
      const key = e as keyof InputState<T>;

      if (validation[key] instanceof RegExp) {
        return !validation[key].test(inputValue[key]);
      }

      return !validation[key];
    });

    // 유효하지 않은 필드가 하나도 없으면 true 반환 (모든 필드가 유효한 경우)
    return invalidField.length === 0;
  };

  return {
    inputValue,
    handleChange,
    handleValidation,
  };
};
