import React, { useState } from 'react';

function ProgressForm({ goal, addProgress, cancelProgress }) {
  const [formData, setFormData] = useState({
    value: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.value || isNaN(Number(formData.value))) {
      alert('Veuillez entrer une valeur numérique valide');
      return;
    }
    
    // Ajouter le progrès
    addProgress(goal.id, {
      value: Number(formData.value),
      notes: formData.notes
    });
    
    // Réinitialiser le formulaire
    setFormData({
      value: '',
      notes: ''
    });
  };

  return (
    <div className="progress-form">
      <h3>Ajouter un progrès pour: {goal.title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Valeur ({goal.unit}):
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder={`Nombre de ${goal.unit}`}
              required
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Notes (optionnel):
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes additionnelles"
            />
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={cancelProgress}>Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default ProgressForm;