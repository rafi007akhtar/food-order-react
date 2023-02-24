import { useCallback, useState } from "react";

const typicalPostOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function useHttp(url, onCompletion) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFn = useCallback(async (options=undefined) => {
    if (options?.method === typicalPostOptions.method) {
      options = {
        ...typicalPostOptions,
        ...options,
        body: JSON.stringify(options.body),
      }
    }
    console.log("options:", options);
    try {
      setIsLoading(true);
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Error! Something went wrong");
      }

      const resJSON = await res.json();
      setResponse(resJSON);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [url]);

  if (response && onCompletion) {
    onCompletion();
  }

  return [response, error, isLoading, fetchFn];
}
