// 注册lf组件
import SingleCrowd from './node/marketingObj/SingleCrowd'; // 单人群
import StartNode from './node/marketingObj/StartNode'; // 开始
import EndNode from './node/marketingObj/EndNode'; // 结束
import BatchCrowd from './node/marketingObj/BatchCrowd'; // 批量人群
import GoalCrowd from './node/marketingObj/GoalCrowd'; // 目标人群
import RuleCrowd from './node/marketingObj/RuleCrowd'; // 目标人群

import MergeNode from './node/computeObj/MergeNode'; // 合并
import SplitNode from './node/computeObj/SplitNode'; // 拆分
import UniqueNode from './node/computeObj/UniqueNode'; // 排重
import Intersection from './node/computeObj/Intersection'; // 交集
import ExcludeNode from './node/computeObj/ExcludeNode'; // 排除
import SpreadNode from './node/computeObj/SpreadNode'; // 智能扩散
import SortNode from './node/computeObj/SortNode'; // 高能排序

import DongNode from './node/touchObj/DongNode'; // 咚咚
import SmsNode from './node/touchObj/SmsNode'; // 短信
// 贝塞尔曲线
import Bezier from './edge/Bezier';
// 拆分后的连线
import SplitBezier from './edge/SplitBezier';
// 排重后
import UniqueBezier from './edge/UniqueBezier';
// eslint-disable-next-line
export const registerCustomElement = (lf) => {

  lf.register(SingleCrowd); // 单个人群注册
  lf.register(StartNode); // 开始节点注册
  lf.register(EndNode); // 结束节点注册
  lf.register(BatchCrowd); // 批量人群包
  lf.register(GoalCrowd); // 目标人群
  lf.register(RuleCrowd); // 人群规则

  lf.register(MergeNode); // 合并
  lf.register(SplitNode); // 拆分
  lf.register(UniqueNode); // 排重
  lf.register(Intersection); // 交集
  lf.register(ExcludeNode); // 排除
  lf.register(SpreadNode); // 智能扩散
  lf.register(SortNode); // 高能排序

  lf.register(DongNode); // 咚咚节点
  lf.register(SmsNode); // 短信节点
  // lf.register(SmsNode); // 短信节点

  // 贝塞尔
  lf.register(Bezier);
  lf.register(SplitBezier);
  lf.register(UniqueBezier);
};
