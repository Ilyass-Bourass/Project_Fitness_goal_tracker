import React, { useState } from 'react';

function GoalForm({ addGoal }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'steps', // Par défaut: steps, workout, water
    target: '',
    unit: 'pas' // Unité par défaut pour steps
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Auto-set unit based on category
    if (name === 'category') {
      let unit = '';
      switch(value) {
        case 'steps':
          unit = 'pas';
          break;
        case 'workout':
          unit = 'minutes';
          break;
        case 'water':
          unit = 'verres';
          break;
        default:
          unit = '';
      }
      setFormData(prev => ({ ...prev, unit }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!formData.title || !formData.target) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Ajouter le nouvel objectif
    addGoal(formData);
    
    // Réinitialiser le formulaire
    setFormData({
      title: '',
      description: '',
      category: 'steps',
      target: '',
      unit: 'pas'
    });
  };

  return (
    <div className="goal-form">
      <h3>Ajouter un nouvel objectif</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Titre:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Marcher 10 000 pas"
              required
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description de votre objectif"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Catégorie:
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="steps">Pas</option>
              <option value="workout">Entraînement</option>
              <option value="water">Eau</option>
            </select>
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Objectif:
            <div className="target-input">
              <input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="Valeur cible"
                required
              />
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unité"
              />
            </div>
          </label>
        </div>
        
        <button type="submit">Ajouter objectif</button>
      </form>
    </div>
  );
}

export default GoalForm;