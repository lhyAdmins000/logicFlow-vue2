// 合并节点
// eslint-disable-next-line
import Vue from 'vue';
// eslint-disable-next-line
import ComponentNode from './vComp/MergeNode.vue';
// eslint-disable-next-line
import { HtmlNode, HtmlNodeModel } from "@logicflow/core";
import selfValidation, {
  // targetNodeWithMultipleValid
  sourceNodeWithMultipleValid,
} from '../../tools/valid';

const width = 50;
const height = 50;

// 前置节点类型：单个人群包、批量人群包、合并、拆分、排重、交集、排除、智能扩散、高潜排序；（上下顺序依次对应,后两个位定义）
const beforeNodesType = ['SINGLE_CROWD', 'BATCH_CROWD', 'MERGE', 'SPLIT', 'UNIQUE', 'AND', 'EXCLUDE'];

// 后置节点类型：目标组（目标人群）、合并、拆分、排重、交集、排除、智能扩散、高潜排序；（上下顺序依次对应,后两个位定义）
// （选中后右键显示），若连接其他节点则提示：合并节点后只能连接目标组（目标人群）、合并、拆分、排重、交集、排除、智能扩散、高潜排序！
const afterNodesType = ['GOAL_CROWD', 'MERGE', 'SPLIT', 'UNIQUE', 'AND', 'EXCLUDE'];

class MergeNodeView extends HtmlNode {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.vueItem = null;
  }

  shouldUpdate() {
    const data = {
      ...this.props.model.properties,
      isSelected: this.props.model.isSelected,
    };
    if (this.preProperties && this.preProperties === JSON.stringify(data)) return;
    this.preProperties = JSON.stringify(data);
    // eslint-disable-next-line
    return true;
  }

  setHtml(rootEl) {
    if (!this.isMounted) {
      const {
        properties,
        text: { value },
      } = this.props.model;
      const newModel = this.props.model;
      const newGraphModel = this.props.graphModel;
      const node = document.createElement('div');
      rootEl.appendChild(node);
      console.log(properties.nodeName || value);
      const Profile = Vue.extend({
        render (h) {
          return h(ComponentNode, {
            props: {
              text: properties.nodeName || value,
              modeProperties: properties,
              model: newModel,
              graphModel: newGraphModel,
            },
          });
        },
      });
      this.vueItem = new Profile();
      this.vueItem.$mount(node);
      this.isMounted = true;
      // this.vueItem.$children[0].handleChange(this.props.model);
    } else {
      // console.log('vueItem', this.vueItem);
      this.vueItem.$children[0].handleChange(this.props.model);
    }

    // if (!this.isMounted) {
    //   this.isMounted = true;
    //   const node = document.createElement('div');
    //   rootEl.appendChild(node);
    //   this.app.$mount(node);
    // } else {
    //   this.r.component.props.properties = this.props.model.getProperties();
    // }
  }
}

class MergeNodeModel extends HtmlNodeModel {
  setAttributes() {
    this.width = width;
    this.height = height;
    this.text.editable = false;
    // this.inputData = this.text.value
  }

  getNodeStyle () {
    const style = super.getNodeStyle();
    style.overflow = 'visible';
    return style;
  }

  initNodeData(data) {
    super.initNodeData(data);
    // 校验规则
    // 作为来源时
    this.sourceRules = [
      selfValidation,
      sourceNodeWithMultipleValid('合并节点后置只能连接一个节点', { graphModel: this.graphModel, id: this.id }),
      // {
      //   message: '当前合并节点的前置节点不存在',
      //   // validate接受的参数依次是：sourceNode, targetNode, sourceAnchor, targetAnchor
      //   validate: (sourceNode) => {
      //     const parentNode = this.graphModel.getNodeIncomingNode(sourceNode.id);
      //     if (parentNode.length === 0) return false;
      //     return true;
      //   },
      // },
      {
        message: '后置节点类型：目标组（目标人群）、合并、拆分、排重、交集、排除',
        // validate接受的参数依次是：sourceNode, targetNode, sourceAnchor, targetAnchor
        validate: (sourceNode, targetNode) => afterNodesType.includes(targetNode.type),
      },

    ];

    // 作为目标
    this.targetRules = [
      {
        // message: '前置节点类型：单个人群包、批量人群包、合并、拆分、排重、交集、排除、智能扩散、高潜排序',
        message: '合并节点的前置节点只能是单个人群包、批量人群包、合并、拆分、排重、交集、排除节点',
        // validate接受的参数依次是：sourceNode, targetNode, sourceAnchor, targetAnchor
        validate: (sourceNode) => beforeNodesType.includes(sourceNode.type),
      },
    ];
  }

  // 修改桩样式
  getAnchorStyle(anchorInfo) {
    const style = super.getAnchorStyle(anchorInfo);
    style.stroke = 'rgb(24, 125, 255)';
    style.r = 5;
    style.hover.r = 10;
    style.hover.fill = 'rgb(24, 125, 255)';
    style.hover.stroke = 'rgb(24, 125, 255)';
    return style;
  }

  getDefaultAnchor() {
    const {
      x, y, width, id,
    } = this;

    const anchors = [];
    anchors.push({
      x: x - width / 2 + 5,
      y,
      id: `${id}_0`,
      type: 'left',
    });
    anchors.push({
      x: x + width / 2 - 5,
      y,
      id: `${id}_0`,
      type: 'right',
    });
    return anchors;
  }

  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    style.hover.stroke = 'none';
    return style;
  }
}

export default {
  type: 'MERGE',
  view: MergeNodeView,
  model: MergeNodeModel,
};
