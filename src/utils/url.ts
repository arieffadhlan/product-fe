export const getAllQueryParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) result[key] = value;

  return result;
};

export const updateSearchParam = (
  key: string,
  updatedValue: string | number | string[] | null | undefined,
  searchParams: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(searchParams.toString());

  if (updatedValue) {
    const valueString = Array.isArray(updatedValue) ? updatedValue.join(",") : String(updatedValue);
    params.set(key, valueString);
  } else {
    params.delete(key);
  }

  return params;
};
