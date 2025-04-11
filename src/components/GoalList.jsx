import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, updateGoal, deleteGoal, selectGoal }) {
  if (goals.length === 0) {
    return (
      <div className="empty-goals">
        <p>Vous n'avez pas encore d'objectifs. Créez votre premier objectif!</p>
      </div>
    );
  }

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalItem 
          key={goal.id} 
          goal={goal} 
          updateGoal={updateGoal}
          deleteGoal={deleteGoal}
          selectGoal={selectGoal}
        />
      ))}
    </div>
  );
}

export default GoalList;