import { useCallback, useState } from 'react';

interface Result<T> {
  isLoading: boolean;
  data: T | undefined;
  error: unknown;
  isError: boolean;
}

interface Options<T> {
  isLoading?: boolean;
  initData?: T;
}

export const useMutation = <T>(callback: () => Promise<T>, options?: Options<T>): [() => void, Result<T>] => {
  const [isLoading, setLoading] = useState<boolean>(options?.isLoading || false);
  const [data, setData] = useState<T | undefined>(options?.initData);
  const [error, setError] = useState<unknown>();
  const [isError, setIsError] = useState<boolean>(false);

  const mutation = useCallback(() => {
    callback()
      .then(setData)
      .catch((e) => {
        setError(e);
        setIsError(true);
      })
      .finally(() => setLoading(false));
  }, [callback]);

  return [mutation, { data, error, isError, isLoading }];
};
