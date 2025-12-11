const initialActivity = [
  { id: "a1", message: "Has completado el nodo HTML básico", type: "COMPLETE", timestamp: "hace 2h" },
  { id: "a2", message: "Has aprobado el boss fight de POO", type: "ACHIEVEMENT", timestamp: "ayer" },
  { id: "a3", message: "Añadiste 'Clean Code' a recursos", type: "ADD", timestamp: "ayer" }
];

class ActivityLogModel {
  constructor() {
    this.logs = [...initialActivity];
  }

  getAll() {
    return this.logs;
  }

  addLog(log) {
    const newLog = { id: `a${Date.now()}`, timestamp: "Justo ahora", ...log };
    this.logs.unshift(newLog);
    return newLog;
  }
}

module.exports = new ActivityLogModel();
