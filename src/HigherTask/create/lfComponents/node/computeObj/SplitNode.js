// 拆分节点
// eslint-disable-next-line
import Vue from 'vue';
// eslint-disable-next-line
import ComponentNode from './vComp/SplitNode.vue';
// eslint-disable-next-line
import { HtmlNode, HtmlNodeModel, h } from "@logicflow/core";
import selfValidation, { targetNodeWithMultipleValid, sourceNodesLenthMaxValid } from '../../tools/valid';

const width = 50;
const height = 50;
// 人群 合并、拆分、排重、交集、排除
const beforeNodeTypes = ['SINGLE_CROWD', 'BATCH_CROWD', 'MERGE', 'SPLIT', 'UNIQUE', 'AND', 'EXCLUDE'];
// 目标组、合并、拆分、排重、交集、排除
// const afterNodeTypes = ['GOAL_CROWD', 'MERGE', 'SPLIT', 'UNIQUE', 'AND', 'EXCLUDE'];
class SplitNodeView extends HtmlNode {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.vueItem = null;
  }

    // 修改锚点样式
    getAnchorShape(anchorData) {
      // console.log(super.getAnchorShape(anchorData));
      const { x, y, type } = anchorData;
      return type === 'left' ? null : h('circle', {
        cx: x,
        cy: y,
        r: 10,
        fill: 'rgb(24, 125, 255)',
        strokeWidth: 1,
        fillOpacity: 0.5,
        visibility: 'hidden',
        stroke: 'rgb(24, 125, 255)',
        className: 'custom-anchor split-outgoing-anchor',
      });
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

class SplitNodeModel extends HtmlNodeModel {
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
      // {
      //   message: '拆分后置节点只能为目标人群、合并、拆分、排重、交集、排除',
      //   validate: (_, targetNode) => afterNodeTypes.includes(targetNode.type),
      // },
      {
        message: '拆分节点不可以作为前置节点',
        validate: () => false,
      },
      // {
      //   message: '开始节点后置只能连接一个节点',
      //   validate: () => {
      //     const { id } = this;
      //     // 已本节点为起点的边
      //     const edges = this.graphModel.getNodeOutgoingEdge(id);
      //     return edges.length === 0;
      //   },
      // },
    ];

    // 作为目标
    this.targetRules = [
      sourceNodesLenthMaxValid('', { graphModel: this.graphModel, id: this.id }),
      targetNodeWithMultipleValid('拆分前置只能连接一个节点！', { id: this.id, graphModel: this.graphModel }),
      {
        message: '拆分前置节点只能为单个人群包、批量人群包、合并、拆分、排重、交集、排除',
        validate: (sourceNode) => beforeNodeTypes.includes(sourceNode.type),
      },
    ];
  }

  //   // 修改桩样式
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
      edgeAddable: false,
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
  type: 'SPLIT',
  view: SplitNodeView,
  model: SplitNodeModel,
};
