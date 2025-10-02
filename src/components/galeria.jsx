import React, { useState, useEffect } from 'react'
import { UseFetch } from '../components/useFetch.jsx'
import { HOST } from '../config'
import g from '../css/galeria.module.css'

export default function Galeria() {
    const { data: galerias, error: galeriasError, loading: galeriasLoading } = UseFetch(HOST + 'galeria');
    const [selectedGaleriaId, setSelectedGaleriaId] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [fotosLoading, setFotosLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (galerias && galerias.length > 0 && !selectedGaleriaId) {
            setSelectedGaleriaId(galerias[0].id);
        }
    }, [galerias, selectedGaleriaId]);

    useEffect(() => {
        if (!selectedGaleriaId) return;

        const fetchFotos = async () => {
            setFotosLoading(true);
            // Limpiar imágenes anteriores para evitar mostrar las incorrectas mientras cargan las nuevas
            setImagenes([]); 
            try {
                const response = await fetch(`${HOST}foto/${selectedGaleriaId}`);
                if (!response.ok) throw new Error('Error al cargar las imágenes');
                const data = await response.json();

                const imageUrls = data.map(item => {
                    try {
                        const byteCharacters = atob(item.foto);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: 'image/jpeg' });
                        return { url: URL.createObjectURL(blob), alt: item.nombre };
                    } catch (e) {
                        console.error("Error procesando imagen:", e);
                        return { url: '/imgs/nophoto.png', alt: 'Error al cargar imagen' };
                    }
                });

                setImagenes(imageUrls);
                setCurrentIndex(0);
            } catch (error) {
                console.error("Fallo al obtener fotos:", error);
            } finally {
                setFotosLoading(false);
            }
        };

        fetchFotos();

        // Función de limpieza para revocar las URLs de objeto y evitar fugas de memoria
        return () => {
            imagenes.forEach(img => {
                if (img.url.startsWith('blob:')) {
                    URL.revokeObjectURL(img.url);
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGaleriaId]);

    const goToPrevious = () => {
        if (imagenes.length === 0) return;
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imagenes.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        if (imagenes.length === 0) return;
        const isLastSlide = currentIndex === imagenes.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const handleGaleriaChange = (event) => {
        setSelectedGaleriaId(event.target.value);
    };

    return (
        <>
            <div className={g.garea}>
                <section className={g.titulo}>
                    <h3>Fotos Recientes</h3>
                    <h1>Galería</h1>
                    <form>
                        <select name="galerias" id="galerias" className={g.inputgeneral} onChange={handleGaleriaChange} value={selectedGaleriaId} disabled={galeriasLoading}>
                            {galerias && galerias.length > 0 ? (
                                galerias.map((item, index) => (
                                    <option value={item.id} key={index}>{item.nombre}</option>
                                ))) : (<option value="">{galeriasLoading ? 'Cargando...' : 'No hay galerías'}</option>)}
                        </select>
                    </form>
                </section>
                <section className={g.maincont}>
                    {fotosLoading ? (
                        <div className={g.slidercont}><p>Cargando imágenes...</p></div>
                    ) : imagenes && imagenes.length > 0 ? (
                        <>
                            <div className={g.slidercont}>
                                <div className={g.arrow} onClick={goToPrevious}>
                                    <img src="/imgs/arrowleft.png" alt="Flecha izquierda" />
                                </div>
                                <img key={currentIndex} src={imagenes[currentIndex]?.url} alt={imagenes[currentIndex]?.alt} className={g.sliderImage} />
                                <div className={g.arrow} onClick={goToNext}>
                                    <img src="/imgs/arrowright.png" alt="Flecha derecha" />
                                </div>
                            </div>
                            <div className={g.dotsContainer}>
                                {imagenes.map((_, slideIndex) => (
                                    <div
                                        key={slideIndex}
                                        className={`${g.dot} ${currentIndex === slideIndex ? g.activeDot : ''}`}
                                        onClick={() => goToSlide(slideIndex)}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={g.slidercont}><p>No hay imágenes en esta galería.</p></div>
                    )}
                </section>
            </div>
        </>
    )
}
