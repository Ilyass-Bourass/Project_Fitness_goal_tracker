import React from 'react'

export default function GoalForm() {
    

    return (
    <div className="goal-form">
      <h3>Ajouter un nouvel objectif</h3>
      <form >
        <div className="form-group">
          <label>
            Titre:
            <input
              type="text"
              name="title"
              
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
              placeholder="Description de votre objectif"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Catégorie:
            <select name="category" >
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
                placeholder="Valeur cible"
                required
              />
              <input
                type="text"
                name="unit"
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
