const initialGoal = {
  title: "Fullstack Junior en 6 meses",
  targetDate: "14 de junio 2026",
  progressPercent: 45,
  completedNodes: 27,
  totalNodes: 60,
  status: "AHEAD"
};

class GoalModel {
  constructor() {
    this.goal = { ...initialGoal };
  }

  getGoal() {
    return this.goal;
  }

  updateGoal(updates) {
    this.goal = { ...this.goal, ...updates };
    return this.goal;
  }
}

module.exports = new GoalModel();
