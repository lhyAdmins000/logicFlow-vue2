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
  type: 'UNIQUE_EDGE_BEZIER',
  view: BezierEdge,
  model: Model,
};
