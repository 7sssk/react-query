import { useEffect, useState } from 'react';

interface Options<T> {
  isLoading?: boolean;
  initData?: T | undefined;
}

export const useQuery = <T>(callback: () => Promise<T>, options?: Options<T>) => {
  const [isLoading, setLoading] = useState<boolean>(options?.isLoading || false);
  const [data, setData] = useState<T | undefined>(options?.initData);
  const [error, setError] = useState<unknown>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    callback()
      .then(setData)
      .catch((e) => {
        setError(e);
        setIsError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    isLoading,
    data,
    error,
    isError,
  };
};
