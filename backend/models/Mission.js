const initialMissions = [
  {
    id: "m1",
    title: "Fundamentos de HTML",
    type: "LEARN",
    durationMin: 25,
    xpReward: 150,
    topic: "Programación",
    status: "PENDING",
    subTasks: [
      { id: "st1", title: "Ver vídeo 'HTML Básico'", durationMin: 15, completed: false },
      { id: "st2", title: "Hacer quiz de 10 preguntas", durationMin: 10, completed: false }
    ]
  },
  {
    id: "m2",
    title: "Repasar 30 tarjetas de JavaScript",
    type: "REVIEW",
    durationMin: 10,
    xpReward: 50,
    status: "PENDING"
  },
  {
    id: "m3",
    title: "Examen mini 'HTML + CSS básico'",
    type: "BOSS",
    durationMin: 20,
    xpReward: 500,
    status: "PENDING",
    topic: "Evaluación"
  }
];

class MissionModel {
  constructor() {
    this.missions = [...initialMissions];
  }

  getAll() {
    return this.missions;
  }

  getById(id) {
    return this.missions.find(m => m.id === id);
  }

  update(id, updates) {
    const index = this.missions.findIndex(m => m.id === id);
    if (index !== -1) {
      this.missions[index] = { ...this.missions[index], ...updates };
      return this.missions[index];
    }
    return null;
  }
}

module.exports = new MissionModel();
