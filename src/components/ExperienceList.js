import React, { useState } from 'react';
import EditForm from './EditForm';

const ExperienceList = ({ experiences, onUpdate }) => {
  const [editingExperience, setEditingExperience] = useState(null);

  const handleEditClick = (experience) => {
    setEditingExperience(experience);
  };

  const handleSave = (updatedExperience) => {
    onUpdate(updatedExperience);
    setEditingExperience(null);
  };

  return (
    <div>
      <ul>
        {experiences.map((experience) => (
          <li key={experience.id}>
            <span>{experience.name}</span>
            <button onClick={() => handleEditClick(experience)}>Editar</button>
          </li>
        ))}
      </ul>
      {editingExperience && (
        <EditForm
          experience={editingExperience}
          onSave={handleSave}
          onCancel={() => setEditingExperience(null)}
        />
      )}
    </div>
  );
};

export default ExperienceList;
