import { useState, useEffect, useCallback } from 'react';

export const useApi = <T = unknown>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedApiCall = useCallback(apiCall, [apiCall]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await memoizedApiCall();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memoizedApiCall]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setValue = (key: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const setError = (key: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [key]: error }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const hasErrors = Object.keys(errors).length > 0;

  return {
    values,
    errors,
    hasErrors,
    setValue,
    setError,
    reset,
    setValues,
  };
};