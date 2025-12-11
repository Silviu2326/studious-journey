const initialData = {
  name: "Silviu",
  level: 7,
  currentXp: 4320,
  nextLevelXp: 5000,
  streakDays: 12,
  gems: 320
};

class UserModel {
  constructor() {
    this.data = { ...initialData };
  }

  getStats() {
    return this.data;
  }

  updateStats(updates) {
    this.data = { ...this.data, ...updates };
    return this.data;
  }
}

module.exports = new UserModel();
