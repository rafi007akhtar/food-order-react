import { useCallback, useEffect, useState } from "react";

const typicalPostOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function useHttp(url, options = undefined, onCompletion) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (options?.method === typicalPostOptions.method) {
    options = {
      ...typicalPostOptions,
      ...options,
      body: JSON.stringify(options.body),
    }
  }
  console.log("options:", options);

  const fetchFn = useCallback(async () => {
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
      setError(err);
    }
  }, [url, options]);

  if (response && onCompletion) {
    onCompletion();
  }

  return [response, error, isLoading, fetchFn];
}
