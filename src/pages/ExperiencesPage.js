import React, { useState } from 'react';
import ExperienceList from '../components/ExperienceList';

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([
    { id: 1, name: 'Experiencia 1' },
    { id: 2, name: 'Experiencia 2' },
  ]);

  const handleUpdate = (updatedExperience) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      )
    );
  };

  return (
    <div>
      <h1>Lista de Experiencias</h1>
      <ExperienceList experiences={experiences} onUpdate={handleUpdate} />
    </div>
  );
};

export default ExperiencesPage;
