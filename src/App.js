import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import ProgressForm from './components/ProgressForm';
import PerformanceSummary from './components/PerformanceSummary';
import useLocalStorage from './hooks/useLocalStorage';
function App() {
  // État pour stocker les objectifs
 // const [goals, setGoals] = useState([]);
  // État pour stocker l'objectif sélectionné pour saisir le progrès
 // const [selectedGoal, setSelectedGoal] = useState(null);

 const [goals, setGoals] = useLocalStorage('fitness-goals', []);
 const [selectedGoal, setSelectedGoal] = useState(null);

  // Charger les données du localStorage au démarrage
  // useEffect(() => {
  //   const savedGoals = localStorage.getItem('fitness-goals');
  //   if (savedGoals) {
  //     setGoals(JSON.parse(savedGoals));
  //   }
  // }, []);

  // // Sauvegarder les données dans localStorage quand goals change
  // useEffect(() => {
  //   localStorage.setItem('fitness-goals', JSON.stringify(goals));
  // }, [goals]);

  // Ajouter un nouvel objectif
  const addGoal = (goal) => {
    setGoals([...goals, { 
      id: Date.now(), 
      ...goal, 
      progress: [], 
      createdAt: new Date() 
    }]);
  };

  // Mettre à jour un objectif existant
  const updateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  // Supprimer un objectif
  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  // Ajouter un progrès à un objectif
  const addProgress = (goalId, progressData) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          progress: [...goal.progress, {
            id: Date.now(),
            ...progressData,
            date: new Date()
          }]
        };
      }
      return goal;
    }));
    // Reset selected goal après l'ajout du progrès
    setSelectedGoal(null);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="goal-section">
          <h2>Mes Objectifs Fitness</h2>
          <GoalForm addGoal={addGoal} />
          <GoalList 
            goals={goals} 
            updateGoal={updateGoal} 
            deleteGoal={deleteGoal} 
            selectGoal={setSelectedGoal} 
          />
        </div>
        
        <div className="progress-section">
          {selectedGoal ? (
            <>
              <h2>Saisir Progrès</h2>
              <ProgressForm 
                goal={selectedGoal} 
                addProgress={addProgress} 
                cancelProgress={() => setSelectedGoal(null)} 
              />
            </>
          ) : (
            <div className="select-goal-prompt">
              <p>Sélectionnez un objectif pour saisir votre progrès</p>
            </div>
          )}
        </div>
        
        <div className="summary-section">
          <h2>Mon Résumé</h2>
          <PerformanceSummary goals={goals} />
        </div>
      </div>
    </div>
  );
}

export default App;