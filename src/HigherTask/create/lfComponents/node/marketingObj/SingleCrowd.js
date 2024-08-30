// 单个人群节点
// eslint-disable-next-line
import Vue from 'vue';
// eslint-disable-next-line
import SingleCrowd from './vComp/SingleCrowd.vue';
// eslint-disable-next-line
import { HtmlNode, HtmlNodeModel } from '@logicflow/core';
import selfValidation, {
  // afterNodeWithGoalCrowdValid,
  sourceNodeWithMultipleValid,
} from '../../tools/valid';

const width = 237;
const height = 76;
const afterNodeType = ['GOAL_CROWD', 'MERGE', 'SPLIT', 'AND', 'EXCLUDE', 'UNIQUE'];
// class SingleCrowdModel extends RectResize.model {
//   initNodeData(data) {
//     // console.log('initNodeData', data);
//     const {
//  x, y,
// } = data;
//     data.text = {
//       value: data?.properties?.data?.nodeName || '单个人群包',
//       x: x - width / 2 + 24 + 16 + 8,
//       y: y - height / 2 + 8,
//     };
//     super.initNodeData(data);
//     // 作为来源
//     this.sourceRules = [
//       selfValidation,
//       sourceNodeWithMultipleValid('单个人群包后置只能连接一个节点', { graphModel: this.graphModel, id: this.id }),
//       afterNodeWithGoalCrowdValid('单个人群包的后置节点必须为目标节点'),
//     ];
//   }

//   setAttributes () {
//     super.setAttributes();
//     this.radius = 8;
//     this.width = width;
//     this.height = height;
//   }

//   setToBottom () {
//     this.zIndex = 0;
//   }

//   getTextStyle () {
//     // const style = super.getTextStyle();
//     // const properties = this.getProperties();
//     // h('text', {
//     //   x: x - width / 2 + 24 + 16 + 8,
//     //   y: y - height / 2 + 8,
//     //   fontSize: 16,
//     //   fontWeight: 600,
//     //   'letter-spacing': 0.7,
//     //   'dominant-baseline': 'text-before-edge', // 设置文本基线在文本上方
//     //   'text-anchor': 'start', // 设置文本锚点在左侧
//     //   fill: '#fff',
//     // }, [nodeName || '单个人群包']),
//     return {
//       fontSize: 16,
//         fontWeight: 600,
//         'letter-spacing': 0.7,
//         'dominant-baseline': 'text-before-edge', // 设置文本基线在文本上方
//         'text-anchor': 'start', // 设置文本锚点在左侧
//         fill: '#fff',
//     };
//   }

//   // 修改桩样式
//   getAnchorStyle(anchorInfo) {
//     const style = super.getAnchorStyle(anchorInfo);
//     style.stroke = 'rgb(24, 125, 255)';
//     style.r = 5;
//     style.hover.r = 10;
//     style.hover.fill = 'rgb(24, 125, 255)';
//     style.hover.stroke = 'rgb(24, 125, 255)';
//     return style;
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
// class SingleCrowdView extends RectResize.view {
//   getShape() {
//     // 获取XxxNodeModel中定义的形状属性
//     const { model } = this.props;
//     const {
//  x, y, width, height, radius,
// } = model;
//     // 获取XxxNodeModel中定义的样式属性
//     const style = model.getNodeStyle();
//     const { nodeName, isValid = true } = model.getProperties();
//     return h('g', {}, [
//         h('rect', {
//             ...style,
//             x: x - width / 2,
//             y: y - height / 2,
//             width,
//             height,
//             fill: isValid ? 'rgba(71, 98, 254, 0.9)' : '#FEEFF1',
//             stroke: isValid ? 'rgba(71, 98, 254, 0.9)' : '#FF5050',
//             strokeWidth: 1,
//             rx: radius,
//             ry: radius,
//         }),
//         h('svg', {
//             x: x - width / 2 + 24,
//             y: y - height / 2 + 8,
//             width: 16,
//             height: 16,
//             viewBox: '0 0 16 16',
//         }, [
//             h('path', {
//                 fill: '#fff',
// eslint-disable-next-line
//                 d: 'M4.92627 11.0257C3.55931 10.0601 2.66669 8.46761 2.66669 6.66668C2.66669 3.72116 5.0545 1.33334 8.00002 1.33334C10.9456 1.33334 13.3334 3.72116 13.3334 6.66668C13.3334 8.46761 12.4408 10.0601 11.0738 11.0257L12.4624 14.1997C12.5362 14.3684 12.4593 14.5649 12.2906 14.6387C12.2485 14.6571 12.203 14.6667 12.157 14.6667H3.84303C3.65893 14.6667 3.50969 14.5174 3.50969 14.3333C3.50969 14.2873 3.51921 14.2419 3.53764 14.1997L4.92627 11.0257ZM9.41642 10.564L10.3045 9.93668C11.3607 9.19054 12 7.98348 12 6.66668C12 4.45754 10.2092 2.66668 8.00002 2.66668C5.79088 2.66668 4.00002 4.45754 4.00002 6.66668C4.00002 7.98348 4.63936 9.19054 5.69559 9.93668L6.58361 10.564L5.37204 13.3333H10.628L9.41642 10.564ZM5.41236 7.31361L6.70622 6.99014C6.85075 7.57021 7.37522 8.00001 8.00002 8.00001C8.62482 8.00001 9.14929 7.57021 9.29382 6.99014L10.5877 7.31361C10.2986 8.47374 9.24969 9.33334 8.00002 9.33334C6.75035 9.33334 5.70147 8.47374 5.41236 7.31361Z',
//             }),
//         ]),

//         this.renderCrowScale(h, {
//           nodeName, isValid, x: (x - width / 2 + 24), y: (y - height / 2 + 55), properties: model.getProperties(),
//         }),
//     ]);
//   }

//   // 人群规模或者请选择人群包 渲染
//   renderCrowScale(h, {
//   nodeName, isValid, x, y, properties,
//   }) {
//     let text = '';
//     if (nodeName) {
//       text = isValid ? `人群规模：${properties?.data?.crowdSum || '-'}` : '校验未通过';
//     } else {
//       text = '人群包：未选择';
//     }
//     return h('text', {
//       x,
//       y,
//       'letter-spacing': 1,
//       fontSize: 16,
//       fill: isValid ? 'rgba(255, 255, 255, 0.8)' : '#FF5050',
//     }, [text, vh(Tooltip, {
//       content: '这是一个提示',
//       effect: 'dark',
//     }, [
//       h('i', { class: 'el-icon-question' }),
//     ])]);
//   }
// }

class SingleCrowdNode extends HtmlNode {
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
        render(h) {
          return h(SingleCrowd, {
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
  // setHtml(rootEl) {
  //   // console.log('this.isMounted', this.isMounted, this.props.model.id);
  //   const createVComp = (deadline) => {
  //     if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
  //       if (!this.isMounted) {
  //         const {
  //           properties,
  //           text: { value },
  //         } = this.props.model;
  //         const newModel = this.props.model;
  //         const newGraphModel = this.props.graphModel;
  //         const node = document.createElement('div');
  //         rootEl.appendChild(node);
  //         console.log(properties.nodeName || value);
  //         const Profile = Vue.extend({
  //           render (h) {
  //             return h(SingleCrowd, {
  //               props: {
  //                 text: properties.nodeName || value,
  //                 modeProperties: properties,
  //                 model: newModel,
  //                 graphModel: newGraphModel,
  //               },
  //             });
  //           },
  //         });
  //         this.vueItem = new Profile();
  //         this.vueItem.$mount(node);
  //         this.isMounted = true;
  //         // console.log('this.isMounted1', this.isMounted, this.props.model.id);

  //         // this.vueItem.$children[0].handleChange(this.props.model);
  //       } else {
  //         // console.log('vueItem', this.vueItem);
  //         this.vueItem.$children[0].handleChange(this.props.model);
  //       }
  //     } else {
  //       requestIdleCallback(createVComp);
  //     }
  //   };

  //   requestIdleCallback(createVComp);

  //   // if (!this.isMounted) {
  //   //   this.isMounted = true;
  //   //   const node = document.createElement('div');
  //   //   rootEl.appendChild(node);
  //   //   this.app.$mount(node);
  //   // } else {
  //   //   this.r.component.props.properties = this.props.model.getProperties();
  //   // }
  // }
}

class SingleCrowdModel extends HtmlNodeModel {
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
    // console.log('initNodeData', data);
    //     const {
    //  x, y,
    // } = data;
    //     data.text = {
    //       value: data?.properties?.data?.nodeName || '单个人群包',
    //       x: x - width / 2 + 24 + 16 + 8,
    //       y: y - height / 2 + 8,
    //     };
    super.initNodeData(data);
    // 作为来源
    this.sourceRules = [
      selfValidation,
      sourceNodeWithMultipleValid('单个人群包后置只能连接一个节点', {
        graphModel: this.graphModel,
        id: this.id,
      }),
      {
        message: '人群包后置节点必须为目标节点或计算节点！',
        validate: (_, targetNode) => afterNodeType.includes(targetNode.type),
      },
      // afterNodeWithGoalCrowdValid('单个人群包的后置节点必须为目标节点'),
    ];
    // 不能作为目标
    this.targetRules.push({
      message: '单个人群包节点不能设置前置节点!',
      validate: () => false,
    });
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
    // anchors.push({
    //   x: x - width / 2,
    //   y,
    //   id: `${id}_0`,
    //   type: 'left',
    // });
    anchors.push({
      x: x + width / 2 - 2.5,
      y,
      id: `${id}_1`,
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
  type: 'SINGLE_CROWD',
  view: SingleCrowdNode,
  model: SingleCrowdModel,
};
