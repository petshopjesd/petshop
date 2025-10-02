import React, { useState, useEffect, useCallback } from 'react';

export function UseFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [refetchIndex, setRefetchIndex] = useState(0);

    const refetch = useCallback(() => {
    setRefetchIndex(prevIndex => prevIndex + 1);
    }, []);

    useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
    .then(response => {
        if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => setData(data))
    .catch(error => {
        if (error.name !== 'AbortError') {
        setError(error);
        }
    })
    .finally(() => setLoading(false));

    return () => {
    controller.abort();
    };
    }, [url, refetchIndex]);
    return { data, loading, error, refetch };
}
