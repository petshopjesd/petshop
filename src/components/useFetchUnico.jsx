import React from 'react'
import { useState, useEffect } from 'react'

export function UseFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        useEffectUnico(() => {
            const controller = new AbortController();
            setLoading(true);
            fetch(url, { signal: controller.signal })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
            return () => {
                controller.abort(); // Limpieza del efecto para evitar fugas de memoria
            };
            // Aquí podrías agregar lógica que necesites al montar el componente
        }, []);

  return ({data, loading, error})
}
