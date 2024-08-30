/**
 * 公共的校验文件
 * sourceNode, 边的来源节点
 * targetNode, 边的目标节点
 * sourceAnchor, 边的来源桩
 * targetAnchor 边的目标桩
 * LogicFlow 会校验每一条规则，只有全部通过后才能连接。
 */

// 不能连接自己
export default {
  message: '节点不能连接自己！',
  validate: (sourceNode, targetNode) => {
    console.log('sourceNode', sourceNode);
    console.log('targetNode', targetNode);
    return sourceNode.id !== targetNode.id;
  },
};

// 前置节点必须为开始节点
export const beforeNodeWithStartVlaid = function(message = '') {
  return {
    message: message || '前置节点必须为开始节点！',
    validate: (sourceNode) => sourceNode.type === 'START',
  };
};

// 后置节点必须为目标节点
export const afterNodeWithGoalCrowdValid = function(message = '') {
  return {
    message: message || '后置节点必须为目标节点！',
    validate: (_, targetNode) => targetNode.type === 'GOAL_CROWD',
  };
};

// 作为来源不能连接多个节点
export const sourceNodeWithMultipleValid = function(message = '', { graphModel, id }) {
  return {
    message: message || '后置只能连接一个节点',
    validate: () => {
      // const { id } = this;
      // 已本节点为起点的边
      const edges = graphModel.getNodeOutgoingEdge(id);
      return edges.length === 0;
    },
  };
};
// 作为目标不能连接多个节点
export const targetNodeWithMultipleValid = function(message = '', { graphModel, id }) {
  return {
    message: message || '前置只能连接一个节点！',
    validate: () => {
      // 已本节点为终点的边
      const edges = graphModel.getNodeIncomingEdge(id);
      // console.log('目标人群', this.graphModel.getNodeIncomingEdge(id));
      return edges.length === 0;
    },
  };
};

// 作为目标节点来源不能超过10个
export const sourceNodesLenthMaxValid = function(message = '', { graphModel, id }) {
  return {
    message: message || '前置节点不能超过10个！',
    validate: () => {
      // 已本节点为终点的边
      const edges = graphModel.getNodeIncomingEdge(id);
      // console.log('目标人群', this.graphModel.getNodeIncomingEdge(id));
      return edges.length < 10;
    },
  };
};
