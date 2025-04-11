import React, { useState } from 'react';

function GoalItem({ goal, updateGoal, deleteGoal, selectGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...goal });

  // Calculer le progrès total pour cet objectif
  const calculateTotalProgress = () => {
    if (!goal.progress || goal.progress.length === 0) return 0;
    
    // Somme de toutes les valeurs de progrès
    const total = goal.progress.reduce((sum, entry) => sum + Number(entry.value), 0);
    return total;
  };

  const totalProgress = calculateTotalProgress();
  const progressPercentage = Math.min((totalProgress / Number(goal.target)) * 100, 100);

  // Gérer les modifications du formulaire d'édition
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  // Sauvegarder les modifications
  const handleSaveEdit = () => {
    updateGoal(editData);
    setIsEditing(false);
  };

  // Gérer l'annulation de l'édition
  const handleCancelEdit = () => {
    setEditData({ ...goal });
    setIsEditing(false);
  };

  // Calculer la date du dernier progrès
  const getLastProgressDate = () => {
    if (!goal.progress || goal.progress.length === 0) return "Pas encore de progrès";
    
    const lastEntry = [...goal.progress].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    )[0];
    
    return new Date(lastEntry.date).toLocaleDateString();
  };

  // Mode affichage normal
  if (!isEditing) {
    return (
      <div className="goal-item">
        <div className="goal-info">
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
          <div className="goal-stats">
            <span>Catégorie: {goal.category}</span>
            <span>Objectif: {goal.target} {goal.unit}</span>
            <span>Progrès: {totalProgress} {goal.unit}</span>
            <span>Dernier progrès: {getLastProgressDate()}</span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <span className="progress-text">{progressPercentage.toFixed(0)}%</span>
          </div>
        </div>
        
        <div className="goal-actions">
          <button onClick={() => selectGoal(goal)}>Ajouter Progrès</button>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
          <button onClick={() => deleteGoal(goal.id)}>Supprimer</button>
        </div>
      </div>
    );
  }
  
  // Mode édition
  return (
    <div className="goal-item editing">
      <div className="edit-form">
        <input
          type="text"
          name="title"
          value={editData.title}
          onChange={handleEditChange}
          placeholder="Titre de l'objectif"
        />
        <textarea
          name="description"
          value={editData.description}
          onChange={handleEditChange}
          placeholder="Description"
        />
        <select 
          name="category" 
          value={editData.category}
          onChange={handleEditChange}
        >
          <option value="steps">Pas</option>
          <option value="workout">Entraînement</option>
          <option value="water">Eau</option>
        </select>
        <div className="target-input">
          <input
            type="number"
            name="target"
            value={editData.target}
            onChange={handleEditChange}
            placeholder="Objectif"
          />
          <input
            type="text"
            name="unit"
            value={editData.unit}
            onChange={handleEditChange}
            placeholder="Unité"
          />
        </div>
        <div className="edit-actions">
          <button onClick={handleSaveEdit}>Sauvegarder</button>
          <button onClick={handleCancelEdit}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default GoalItem;