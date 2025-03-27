import axios from 'axios';


export const getEntityById = async (type: 'people' | 'planets' | 'films', id: string) => {
    try {
        const response = await fetch(`https://swapi.py4e.com/api/${type}/${id}/`);
        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }
        const data = await response.json();

        if (type === 'people') {
            return {
                nombre: data.name,
                altura: data.height,
                peso: data.mass,
                color_cabello: data.hair_color,
                color_piel: data.skin_color,
                año_nacimiento: data.birth_year,
                genero: data.gender,
            };
        }

        if (type === 'planets') {
            return {
                nombre: data.name,
                clima: data.climate,
                terreno: data.terrain,
                gravedad: data.gravity,
                población: data.population,
            };
        }

        if (type === 'films') {
            return {
                título: data.title,
                episodio: data.episode_id,
                director: data.director,
                productor: data.producer,
                estreno: data.release_date,
            };
        }

        return null;
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        return null;
    }
};

export const getEntities = async (type: 'people' | 'planets' | 'films') => {
    try {
        const response = await fetch(`https://swapi.py4e.com/api/${type}/`);
        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }
        const data = await response.json();
        return data.results.map((item: any, index: number) => ({
            id: `${index + 1}`,
            nombre: item.name || item.title,
            type,
        }));
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        return [];
    }
};
