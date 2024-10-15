interface IFetchUtils {
  url: string;
  options?: RequestInit;
}

interface IFetchBodyRequest<T> extends Omit<IFetchUtils, "options"> {
  body: T;
  options?: Omit<RequestInit, "body">;
}

type TGetRequest = IFetchUtils;
type TPostRequest<T> = IFetchBodyRequest<T>;
type TPutRequest<T> = IFetchBodyRequest<T>;
type TDeleteRequest = IFetchUtils;

type TFetchUtilsType = {
  get: <T = unknown>(payload: TGetRequest) => Promise<T>;
  post: <T = unknown, P = unknown>(payload: TPostRequest<P>) => Promise<T>;
  put: <T = unknown, P = unknown>(payload: TPutRequest<P>) => Promise<T>;
  delete: <T = unknown>(payload: TDeleteRequest) => Promise<T>;
};

type TFetchHandler = <T>(url: string, options?: RequestInit) => Promise<T>;

const baseUrl =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

// 공통적인 fetch 호출 처리
const handleFetch: TFetchHandler = async (url, options?) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: { ...options?.headers, "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUtils: TFetchUtilsType = {
  get: async ({ url, options }) => {
    const newUrl = baseUrl + url;
    return handleFetch(newUrl, { method: "GET", ...options });
  },

  post: async ({ url, options, body }) => {
    const newUrl = baseUrl + url;
    return handleFetch(newUrl, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put: async ({ url, body, options }) => {
    const newUrl = baseUrl + url;
    return handleFetch(newUrl, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  },

  delete: async ({ url, options }) => {
    const newUrl = baseUrl + url;
    return handleFetch(newUrl, { method: "DELETE", ...options });
  },
};
