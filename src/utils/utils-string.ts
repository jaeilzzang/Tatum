// 1차원 객체에서 key 배열 뽑기
// 다차원 지원 X
export const keys = (str: Record<string, unknown>) => Object.keys(str);

// 문자열 공백제거
export const removeSpace = (str: string): string => str.replace(/\s+/g, "");

// 문자열 소문자
export const lower = (str: string): string => str.toLowerCase();

// 문자열 정규화
export const normalizeStr = (str: string): string => {
  const removeSpaceStr = removeSpace(str).trim();
  const lowerStr = lower(removeSpaceStr);

  return lowerStr;
};
