const UserModel = require('../models/User');
const MissionModel = require('../models/Mission');
const GoalModel = require('../models/Goal');
const ActivityLogModel = require('../models/ActivityLog');

const getDashboardData = (req, res) => {
  try {
    const user = UserModel.getStats();
    const missions = MissionModel.getAll();
    const goal = GoalModel.getGoal();
    const activity = ActivityLogModel.getAll();

    res.json({
      user,
      missions,
      goal,
      activity
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
};

module.exports = {
  getDashboardData
};
