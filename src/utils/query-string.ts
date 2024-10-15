export const createQueryString = (
  searchParams: Record<string, string>
): string => {
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value], idx) => {
    if (value) {
      query.append(key, value);
    }
  });

  return query.toString();
};
