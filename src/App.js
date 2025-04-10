import React from 'react'
import Header from './components/Header'
import './App.css'
import GoalForm from './components/GoalForm'

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="goal-section">
          <h2>Mes Objectifs Fitness</h2>
          <GoalForm/>
        </div>
      </div>
    </div>
  )
}
