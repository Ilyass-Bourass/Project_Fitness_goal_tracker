import React from 'react';

function PerformanceSummary({ goals }) {
  // Fonction pour obtenir les statistiques hebdomadaires
  const getWeeklyStats = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    let totalGoals = 0;
    let achievedGoals = 0;
    
    // Statistiques par catégorie
    const categoryStats = {
      steps: { total: 0, count: 0 },
      workout: { total: 0, count: 0 },
      water: { total: 0, count: 0 }
    };
    
    goals.forEach(goal => {
      // Compter seulement les progrès de la semaine dernière
      const weeklyProgress = goal.progress ? goal.progress.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneWeekAgo && entryDate <= today;
      }) : [];
      
      // Calculer le total des progrès hebdomadaires
      const weeklyTotal = weeklyProgress.reduce((sum, entry) => sum + Number(entry.value), 0);
      
      // Mettre à jour les statistiques par catégorie
      if (goal.category in categoryStats) {
        categoryStats[goal.category].total += weeklyTotal;
        categoryStats[goal.category].count += 1;
      }
      
      // Vérifier si l'objectif est atteint cette semaine
      totalGoals++;
      if (weeklyTotal >= Number(goal.target)) {
        achievedGoals++;
      }
    });
    
    return {
      totalGoals,
      achievedGoals,
      achievementRate: totalGoals > 0 ? (achievedGoals / totalGoals) * 100 : 0,
      categoryStats
    };
  };
  
  const stats = getWeeklyStats();
  
  // Formater les moyennes par catégorie
  const formatCategoryAverage = (category) => {
    if (stats.categoryStats[category].count === 0) return "Pas de données";
    return `${Math.round(stats.categoryStats[category].total / stats.categoryStats[category].count)}`;
  };
  
  // Obtenir l'unité pour chaque catégorie
  const getCategoryUnit = (category) => {
    switch(category) {
      case 'steps': return 'pas';
      case 'workout': return 'minutes';
      case 'water': return 'verres';
      default: return '';
    }
  };

  return (
    <div className="performance-summary">
      <div className="summary-card">
        <h3>Taux de réussite hebdomadaire</h3>
        <div className="stat-circle">
          {stats.achievementRate.toFixed(0)}%
        </div>
        <p>{stats.achievedGoals} objectifs atteints sur {stats.totalGoals}</p>
      </div>
      
      <div className="category-stats">
        <h3>Moyennes hebdomadaires par catégorie</h3>
        
        <div className="stat-item">
          <span className="stat-label">Pas:</span>
          <span className="stat-value">
            {formatCategoryAverage('steps')} {getCategoryUnit('steps')}
          </span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Entraînement:</span>
          <span className="stat-value">
            {formatCategoryAverage('workout')} {getCategoryUnit('workout')}
          </span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Eau:</span>
          <span className="stat-value">
            {formatCategoryAverage('water')} {getCategoryUnit('water')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PerformanceSummary;