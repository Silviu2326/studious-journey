const assert = require('assert');
const UserModel = require('../models/User');
const MissionModel = require('../models/Mission');
const GoalModel = require('../models/Goal');
const ActivityLogModel = require('../models/ActivityLog');
const SkillTreeModel = require('../models/SkillTree');

console.log('Running Backend Model Tests...');

// Test User Model
const user = UserModel.getStats();
assert.equal(user.name, 'Silviu');
UserModel.updateStats({ currentXp: 5000 });
assert.equal(UserModel.getStats().currentXp, 5000);
console.log('User Model: PASS');

// Test Mission Model
const missions = MissionModel.getAll();
assert(missions.length > 0);
const m1 = MissionModel.getById('m1');
assert.equal(m1.id, 'm1');
MissionModel.update('m1', { status: 'COMPLETED' });
assert.equal(MissionModel.getById('m1').status, 'COMPLETED');
console.log('Mission Model: PASS');

// Test Goal Model
const goal = GoalModel.getGoal();
assert.equal(goal.status, 'AHEAD');
GoalModel.updateGoal({ progressPercent: 50 });
assert.equal(GoalModel.getGoal().progressPercent, 50);
console.log('Goal Model: PASS');

// Test Activity Model
const initialCount = ActivityLogModel.getAll().length;
ActivityLogModel.addLog({ message: 'Test Log', type: 'INFO' });
assert.equal(ActivityLogModel.getAll().length, initialCount + 1);
console.log('ActivityLog Model: PASS');

// Test SkillTree Model
const tree = SkillTreeModel.getTree('fullstack');
assert(tree.nodes.length > 0);
const node = SkillTreeModel.getNode('fullstack', 'html-basics');
assert.equal(node.id, 'html-basics');
SkillTreeModel.updateNodeStatus('fullstack', 'html-basics', 'LOCKED');
assert.equal(SkillTreeModel.getNode('fullstack', 'html-basics').status, 'LOCKED');
console.log('SkillTree Model: PASS');

console.log('All tests passed!');
