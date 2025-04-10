import React, { useState } from 'react'

export default function GoalForm() {
    
  const [Goal,setGoal]=useState({
    title:'',
    description:'',
    category: 'steps',
    unit:'pas'
  });

  const [goalsList,setGoalsList]=useState(()=>{
    const saved=localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  const handelSubmit =(e)=>{
    e.preventDefault();
    console.log('avant',goalsList);
    const updatedGoals = [...goalsList, Goal];
    console.log(updatedGoals);

    localStorage.setItem('goals', JSON.stringify(updatedGoals));

  }

  const hadelChaange =(e)=>{
    const {name,value}=e.target;
    setGoal({...Goal,[name]:value});
  }

    return (
    <div className="goal-form">
      <h3>Ajouter un nouvel objectif</h3>
      <form onSubmit={handelSubmit}>
        <div className="form-group">
          <label>
            Titre:
            <input
              type="text"
              name="title"
              onChange={hadelChaange}
              value={Goal.title}
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
              value={Goal.description}
              onChange={hadelChaange}
              placeholder="Description de votre objectif"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Catégorie:
            <select name="category" onChange={hadelChaange} value={goalsList.category}>
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
                value={Goal.target}
                onChange={hadelChaange}
                required
              />
              <input
                type="text"
                name="unit"
                value={Goal.unit}
                onChange={hadelChaange}
                placeholder="Unité"
              />
            </div>
          </label>
        </div>
        
        <button type='submit'>Ajouter objectif</button>
      </form>
    </div>
  );
}
