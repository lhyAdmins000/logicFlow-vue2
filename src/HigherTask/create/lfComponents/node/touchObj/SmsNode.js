// 短信节点
// eslint-disable-next-line
import Vue from 'vue';
// eslint-disable-next-line
import SMSNode from './vComp/SMSNode.vue';
// eslint-disable-next-line
import { HtmlNode, HtmlNodeModel } from "@logicflow/core";
import selfValidation, { targetNodeWithMultipleValid } from '../../tools/valid';

const width = 342;
const height = 95;
// class SmsNodeModel extends RectResize.model {
//   initNodeData(data) {
//     super.initNodeData(data);
//     // 校验规则
//     // 作为来源时
//     this.sourceRules = [
//       selfValidation,
//       sourceNodeWithMultipleValid('短信后置只能连接一个节点', { graphModel: this.graphModel, id: this.id }),
//       {
//         message: '短信后置只允许连接结束节点',
//         validate: (_, targetNode) => targetNode.type === 'END',
//       },
//       // {
//       //   message: '开始节点后置只能连接一个节点',
//       //   validate: () => {
//       //     const { id } = this;
//       //     // 已本节点为起点的边
//       //     const edges = this.graphModel.getNodeOutgoingEdge(id);
//       //     return edges.length === 0;
//       //   },
//       // },
//     ];

//     // 作为目标
//    this.targetRules = [
//     targetNodeWithMultipleValid('短信前置只能连接一个节点！', { id: this.id, graphModel: this.graphModel }),
//   ];
//   }

//   setAttributes () {
//     super.setAttributes();
//     this.radius = 10;
//     this.width = 200;
//     this.height = 75;

//     // 菜单配置
//     // 右键菜单
//     this.menu = [
//       {
//         className: 'lf-menu-delete',
//         text: '删除',
//         callback(node) {
//           console.log(node);
//         },
//       },
//     ];
//   }

//   setToBottom () {
//     this.zIndex = 0;
//   }

//   getNodeStyle () {
//     const style = super.getNodeStyle();
//     const properties = this.getProperties();
//     return getShapeStyleFuction(style, properties);
//   }

//   getTextStyle () {
//     const style = super.getTextStyle();
//     const properties = this.getProperties();
//     return getTextStyleFunction(style, properties);
//   }

//   getDefaultAnchor() {
//     const {
//       x,
//       y,
//       width, id,
//     } = this;
//     const anchors = [];
//     anchors.push({
//       x: x - width / 2,
//       y,
//       id: `${id}_0`,
//       type: 'left',
//     });
//     anchors.push({
//       x: x + width / 2,
//       y,
//       id: `${id}_1`,
//       type: 'right',
//     });
//     return anchors;
//   }
// }

// // 自定义圆角边框
// class SmsNodeView extends RectResize.view {
//   getShape() {
//     // 获取XxxNodeModel中定义的形状属性
//     const { model } = this.props;
//     const {
//  x, y, width, height, radius,
// } = model;
//     // 获取XxxNodeModel中定义的样式属性
//     const style = model.getNodeStyle();
//     return h('g', {}, [
//         h('rect', {
//             ...style,
//             x: x - width / 2,
//             y: y - height / 2,
//             width,
//             height,
//             fill: '#ECEDF0',
//             stroke: '#DADDE7',
//             strokeWidth: 1,
//             rx: radius,
//             ry: radius,
//         }),
//         h('svg', {
//             x: x - width / 2 + 5,
//             y: y - height / 2 + 5,
//             width: 60,
//             height: 60,
//             viewBox: '0 0 1028 1024',
//         }, [
//             h('path', {
//                 fill: style.stroke,
                // eslint-disable-next-line
//                 d: 'M236.26 836.77c-11.6 0.02-21.03-9.35-21.1-20.95v-51.37a248.605 248.605 0 0 1 44.89-142.77 254.086 254.086 0 0 1 115.07-91.15l7.65-3.06-6.48-5.08A148.162 148.162 0 0 1 318.56 405c0-82.32 67.46-149.31 150.36-149.31 82.9 0 150.36 66.97 150.36 149.31 0 45.97-21.32 89.34-57.73 117.39l-6.51 5.08 7.68 3.06a254.142 254.142 0 0 1 115.1 91.12 248.595 248.595 0 0 1 44.86 142.8v51.37c0 11.56-9.48 20.95-21.1 20.95H236.26z m232.7-282.43c-116.66 0-211.54 94.28-211.54 210.14v30.4h422.99v-30.4c0-115.89-94.88-210.14-211.48-210.14h0.03z m-0.06-256.77c-59.63 0-108.1 48.19-108.1 107.42 0 59.26 48.5 107.45 108.1 107.45 59.63 0 108.13-48.19 108.13-107.45 0-59.22-48.5-107.42-108.13-107.42z m294.11 462.17c-0.25-14.05-1.64-28.06-4.16-41.89h24.67v-18.78c-0.09-72.84-49.77-136.25-120.48-153.75l-4.89-1.16c-9.08-3.06-15.17-10.95-15.17-19.57 0-8.47 5.66-16.05 14.37-19.35l0.15-0.03 0.15-0.06c29.32-13.18 48.21-42.29 48.31-74.43-0.07-34.65-22.06-65.45-54.8-76.78a157.996 157.996 0 0 0-24.04-44.8c-0.43-0.69-0.86-1.39-1.28-2.08 67.67 1.16 122.34 56.17 122.34 123.66-0.05 30.72-11.6 60.31-32.38 82.93l-4.16 4.59 5.5 2.81c66.8 34.19 108.75 102.99 108.55 178.03v39.72c0 11.56-9.45 20.95-21.1 20.95h-41.58z m0 0',
//             }),
//         ]),
//         h('text', {
//           x: x - width / 2 + 65,
//           y: y - height / 2 + 30,
//           fontSize: 18,
//           fontWeight: 600,
//         }, ['短信']),
//     ]);
//   }
// }
class SmsNodeView extends HtmlNode {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.vueItem = null;
  }

  shouldUpdate() {
    // console.log('shouldUpdate');
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
          return h(SMSNode, {
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

class SmsNodeModel extends HtmlNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.overflow = 'visible';
    return style;
  }

  setAttributes() {
    // console.log('setAttr', this.properties?.data?.nodeStatus?.toString());
    this.height = height;
    this.width = width;
    this.text.editable = false;
    // this.inputData = this.text.value
  }

    initNodeData(data) {
    super.initNodeData(data);
    // 校验规则
    this.sourceRules = [
      selfValidation,
      {
        message: '短信节点不可以作为前置节点',
        validate: () => false,
      },
    ];

    // 作为目标
    this.targetRules = [
      targetNodeWithMultipleValid('短信前置只能连接一个节点！', { id: this.id, graphModel: this.graphModel }),
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
      x,
      y,
      width, id,
    } = this;
    const anchors = [];
    // console.log(this.properties?.data?.nodeStatue?.toString());
    anchors.push({
      x: x - width / 2,
      y,
      id: `${id}_0`,
      type: 'left',
    });
    // anchors.push({
    //   x: x + width / 2,
    //   y: this.properties?.data?.nodeStatus?.toString() === '2' ? y - 12.5 : y,
    //   id: `${id}_1`,
    //   type: 'right',
    // });
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
  type: 'SMS',
  view: SmsNodeView,
  model: SmsNodeModel,
};
