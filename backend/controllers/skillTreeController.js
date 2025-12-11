const SkillTreeModel = require('../models/SkillTree');

const getSkillTree = (req, res) => {
  const { treeId } = req.params;
  const tree = SkillTreeModel.getTree(treeId);
  if (!tree) {
    return res.status(404).json({ error: 'Tree not found' });
  }
  res.json(tree);
};

const getAvailableTrees = (req, res) => {
  const trees = SkillTreeModel.getAvailableTrees();
  res.json(trees);
};

const updateNodeStatus = (req, res) => {
  const { treeId, nodeId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const updatedNode = SkillTreeModel.updateNodeStatus(treeId, nodeId, status);
  if (!updatedNode) {
    return res.status(404).json({ error: 'Node not found' });
  }

  res.json(updatedNode);
};

module.exports = {
  getSkillTree,
  getAvailableTrees,
  updateNodeStatus
};
