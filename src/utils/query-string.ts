// 쿼리스트링 만들어주는 함수
export const createQueryString = (
  searchParams: Record<string, string>
): string => {
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  return query.toString();
};
