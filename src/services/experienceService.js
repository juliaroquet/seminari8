// services/experiencesService.js
const API_URL = "http://localhost:3000/api/user"; // URL de tu API

// Obtener todas las experiencias
export const getExperiences = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener las experiencias');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Actualizar una experiencia
export const updateExperience = async (updatedExperience) => {
  try {
    const response = await fetch(`${API_URL}/${updatedExperience.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExperience),
    });
    if (!response.ok) throw new Error('Error al actualizar la experiencia');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear una nueva experiencia (si es necesario)
export const createExperience = async (newExperience) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExperience),
    });
    if (!response.ok) throw new Error('Error al crear la experiencia');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar una experiencia
export const deleteExperience = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar la experiencia');
    return id; // Devuelve el id de la experiencia eliminada
  } catch (error) {
    console.error(error);
    return null;
  }
};
