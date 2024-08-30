// eslint-disable-next-line
import { BezierEdge, BezierEdgeModel } from '@logicflow/core'
// eslint-disable-next-line
import { h } from '@logicflow/core';
// 贝塞尔曲线
class Model extends BezierEdgeModel {
  constructor (data, graphModel) {
    super(data, graphModel);
    this.strokeWidth = 2;
    const { edgeName } = this.properties?.data || {};
    this.text.editable = false;
    this.text.value = `${edgeName || ''}`;
    this.properties.data = {
      ...this.properties?.data || {},
    };
  }

  getTextPosition() {
    const position = super.getTextPosition();

    // if (!this.text.value) return position;
    // console.log('边文字坐标1', this.endPoint.x, this.startPoint.x, this.pointsList);
    // 修复排重时设置的文字坐标错乱
    // 获取连线起终点间隔
    const splitWidth = Math.abs(this.endPoint.x - this.startPoint.x);
    // 取最小x值  加间隔的一半
    const minX = Math.min(this.endPoint.x, this.startPoint.x);
    position.x = minX + splitWidth / 2;
    // const endPoint
    // console.log(position);
    return position;
  }

  // setAttributes() {
  //   this.isAnimation = true;
  // }

  getTextStyle () {
    const style = super.getTextStyle();
    // style.fill = '#ffffff';
    style.backgroundColor = '#ffffff';
    style.fontSize = 14;
    style.color = '#FEBC38';
    style.width = 50;
    style.marginLeft = 'auto';
    style.marginRight = 'auto';
    return style;
  }

  getEdgeStyle () {
    const attributes = super.getEdgeStyle();
    // const { properties } = this;
    // const style = getShapeStyleFuction(attributes, properties);
    return {
 ...attributes, strokeWidth: 2, stroke: '#B5C0FF', fill: 'none',
};
  }
}

// 重写view
// class CustomEdgeView extends BezierEdge {
//   getShapeStyle() {
//     const attributes = super.getShapeStyle();
//     console.log('attributes', attributes);
//     return { ...attributes, fill: 'none' };
//   }
// }
export default {
  type: 'EDGE_BEZIER',
  view: BezierEdge,
  model: Model,
};
