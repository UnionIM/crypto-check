import { useEffect, useState } from 'react';

export default function useDataFromPromise<T>(
    promise: (...args: any) => Promise<T>,
    params: any[],
    deps?: any[]
) {
    const [data, setData] = useState<{ data: null | T; isLoading: boolean }>({
        data: null,
        isLoading: true,
    });

    useEffect(
        () => {
            promise.apply(null, params).then((value) => {
                setData({ data: value, isLoading: false });
            });
        },
        deps ? [...deps] : []
    );

    return data;
}
