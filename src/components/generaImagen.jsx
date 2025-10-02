import React, { useState, useEffect } from 'react';

export default function Generaimagen({ foto }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Si no hay foto, no hacemos nada y limpiamos el estado.
        if (!foto) {
            setImageUrl(null);
            return;
        }

        let objectUrl = null;

        try {
            // 1. Decodificar los datos Base64 a un formato binario
            const byteCharacters = atob(foto);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            // 2. Crear un objeto Blob a partir del array binario
            const blob = new Blob([byteArray], { type: 'image/png' });

            // 3. Crear una URL de objeto y actualizar el estado
            objectUrl = URL.createObjectURL(blob);
            setImageUrl(objectUrl);

        } catch (e) {
            setError(`Error al procesar la imagen: ${e.message}`);
        }

        // 4. Limpiar la URL de objeto para evitar fugas de memoria
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [foto]); // La dependencia correcta es `foto`

    if (error) {
        return <p>{error}</p>;
    }

    if (!imageUrl) {
        return  <img src="/imgs/nophoto.png" alt="Imagen generada" width={"100%"} />
    }

    return (
            <img src={imageUrl} alt="Imagen generada" width={"100%"} />
    );
}