import { API_KEY } from '@/core';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

export function useTmdb<T>(url: string, params: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);

  const paramsString = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: API_KEY,
            ...params,
          },
          signal: controller.signal,
        });

        setData(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, paramsString]);

  return { data };
}
