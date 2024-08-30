<template>
  <div class="higher-create">
    <div class="higher-container" v-loading="loading">
      <!--主内容-->
      <div class="content">
        <!--左侧slider-->
        <DiagramSidebar @dragInNode="$_dragInNode" :taskDetail="taskDetail" />
        <div class="lf-diagram">
          <!-- 顶部+工具 -->
          <TopTools
            :lf="lf"
            :taskDetail="taskDetail"
            :loading.sync="loading"
            @handleDisable="handleDisable"
            @handleEnable="handleEnable"
            @handleImitate="handleImitate"
          />
          <div class="lf-diagram-canvas" ref="diagram"></div>
        </div>
      </div>
    </div>

    <SingleCrowdDialog ref="SINGLE_CROWD" />
    <BatchCrowdDialog ref="BATCH_CROWD" />
    <GoalCrowdDialog ref="GOAL_CROWD" />

    <MergeNodeDialog ref="MERGE" />
    <SplitNodeDialog ref="SPLIT" />
    <UniqueNodeDialog ref="UNIQUE" />
    <IntersectionNodeDialog ref="AND" />
    <ExcludeNodeDialog ref="EXCLUDE" />
    <!--弹窗-->
    <DongDialog ref="DONGDONG" />
    <!--短信弹窗-->
    <SmsDialog ref="SMS" />
    <!--人群规则-->
    <RuleCrowdDialog ref="RULE_CROWD" />
  </div>
</template>
<script>
// 节点枚举
// eslint-disable-next-line
import LogicFlow from '@logicflow/core';
// eslint-disable-next-line
import { SelectionSelect } from '@logicflow/extension';
// eslint-disable-next-line
// import { Dagre } from '@logicflow/layout';

// eslint-disable-next-line
import TopTools from './TopTools';
import DiagramSidebar from './DiagramSidebar.vue';
// eslint-disable-next-line
import '@logicflow/core/dist/style/index.css';
// eslint-disable-next-line
import '@logicflow/extension/lib/style/index.css';
// 注册自定义节点
import { registerCustomElement } from './lfComponents/register';
// 自动布局
import Dagre from './lfComponents/tools/dagre';

import MiniMap from './lfComponents/tools/miniMap';
// eslint-disable-next-line
// 弹窗
import SingleCrowdDialog from './components/peopleComp/SingleCrowdDialog.vue';
import BatchCrowdDialog from './components/peopleComp/BatchCrowdDialog.vue';
import GoalCrowdDialog from './components/peopleComp/GoalCrowdDialog.vue';

import RuleCrowdDialog from './components/peopleComp/RuleCrowdDialog.vue';

import MergeNodeDialog from './components/computeComp/MergeNodeDialog.vue';

import SplitNodeDialog from './components/computeComp/SplitNodeDialog.vue';

import UniqueNodeDialog from './components/computeComp/UniqueNodeDialog.vue';

import IntersectionNodeDialog from './components/computeComp/IntersectionNodeDialog.vue';

import ExcludeNodeDialog from './components/computeComp/ExcludeNodeDialog.vue';


import DongDialog from './components/touchComp/DongDialog.vue';

import SmsDialog from './components/touchComp/SmsDialog.vue';


const needShowDialog = ['SINGLE_CROWD', 'DONGDONG', 'SMS', 'BATCH_CROWD', 'RULE_CROWD'];
// 需要双击弹窗节点集合
const needDbclickShowDialog = ['SINGLE_CROWD', 'GOAL_CROWD', 'DONGDONG', 'SMS', 'BATCH_CROWD', 'RULE_CROWD', 'MERGE', 'SPLIT', 'UNIQUE', 'AND', 'EXCLUDE'];
// 计算节点类型枚举  连线优化
const computedTypeList = ['MERGE', 'SPLIT', 'UNIQUE', 'AND', 'EXCLUDE'];
export default {
  components: {
    TopTools,
    DiagramSidebar,
    SingleCrowdDialog,
    GoalCrowdDialog,
    DongDialog,
    SmsDialog,
    BatchCrowdDialog,
    RuleCrowdDialog,
    MergeNodeDialog,
    SplitNodeDialog,
    UniqueNodeDialog,
    IntersectionNodeDialog,
    ExcludeNodeDialog,
  },
  data() {
    return {
      lf: null, // logicflow实例
      loading: false,
      isShowDeleteConfirm: false, // 是否正在删除弹窗
      taskDetail: {},
    };
  },
  mounted() {
    this.initLogicFlow();
  },
  methods: {

    $_dragInNode(data) {
      // console.log(data);
      this.lf.dnd.startDrag({
        ...data,
      });
    },

    // 初始化logicflow
    initLogicFlow() {
      // 先设置loading
      if (this.canvasId || this.copyId) {
        this.loading = true;
      }
      // 引入框选插件
      // LogicFlow.use(SelectionSelect);
      // LogicFlow.use(MiniMap);
      // LogicFlow.use(Dagre);
      // LogicFlow.use(Menu);
      // console.log(MiniMap);
      const lf = new LogicFlow({
        container: this.$refs.diagram,
        width: Number(getComputedStyle(this.$refs.diagram).width),
        height: Number(getComputedStyle(this.$refs.diagram).height),
        overlapMode: 1, // 元素重合时堆叠模式
        autoWrap: true,
        isSilentMode: this.canvasType === 'detail', // 仅浏览不可编辑模式
        // disabledTools: this.canvasType === 'detail' ? ['multipleSelect', 'SelectionSelect', 'Menu'] : [], // 禁止启用的内置工具
        adjustNodePosition: this.canvasType !== 'detail', // 是否允许拖动节点。
        stopMoveGraph: true, // 关闭画布拖动  和框选冲突
        // stopZoomGraph: true,
        // stopScrollGraph: true,
        nodeTextEdit: false, // 允许节点文本可以编辑
        metaKeyMultipleSelected: true,
        partial: true,
        // adjustEdgeStartAndEnd: true, // 自定义调整点样式
        grid: {
          visible: false,
          size: 5,
        },
        background: {
          // eslint-disable-next-line
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDUgNzkuMTY0NTkwLCAyMDIwLzEyLzA5LTExOjU3OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDMtMjhUMTQ6NTk6MDcrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDMtMjhUMTQ6NTk6MDcrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTAzLTI4VDE0OjU5OjA3KzA4OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjljZGJmYzIxLWVmYWYtNDBmYy1hNGQxLWU1ZDM4OTJkZDBjZCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjliZDZjMTc2LTg3NWEtZjQ0Yi1hZTU5LTEzOGNjZmZjNmZiYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU0MGYwNjI1LWQ0N2MtNDA2ZC1hMjdkLTA5Y2RiNWJlYzYxOCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTQwZjA2MjUtZDQ3Yy00MDZkLWEyN2QtMDljZGI1YmVjNjE4IiBzdEV2dDp3aGVuPSIyMDIyLTAzLTI4VDE0OjU5OjA3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWNkYmZjMjEtZWZhZi00MGZjLWE0ZDEtZTVkMzg5MmRkMGNkIiBzdEV2dDp3aGVuPSIyMDIyLTAzLTI4VDE0OjU5OjA3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6aWc8cAAAAMUlEQVQokWP89v0nA3GACavor1+/iFXKxsY2GE2FiBJDMmINrF+/fmG6YUiFAE1MBQD+6y9X+nEg/gAAAABJRU5ErkJggg==")',
          backgroundRepeat: 'repeat',
        },
        keyboard: {
          enabled: true,
          shortcuts: [
            {
              keys: ['backspace'],
              callback: () => {
                const elements = lf.getSelectElements(true);
                if ((elements.nodes.length > 0 || elements.edges.length > 0) && !this.isShowDeleteConfirm && !this.lf.getEditConfig().isSilentMode) {
                  // 弹窗状态不展示删除
                  const isShowDiaglog = needDbclickShowDialog.some((item) => {
                    console.log(this.$refs[item]);
                    return this.$refs[item].dialogVisible;
                  });
                  if (isShowDiaglog) return;
                  this.isShowDeleteConfirm = true;
                  this.$confirm('是否删除当前节点?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  }).then(() => {
                    this.isShowDeleteConfirm = false;
                    console.log(elements);
                    lf.clearSelectElements();
                    elements.edges.forEach((edge) => lf.deleteEdge(edge.id));
                    elements.nodes.forEach((node) => lf.deleteNode(node.id));
                    this.$message({
                      type: 'success',
                      message: '删除成功!',
                    });
                  }).catch(() => {
                    this.isShowDeleteConfirm = false;
                  });
                }
              },
            },
          ],
        },
        plugins: this.canvasType === 'detail' ? [MiniMap] : [
          SelectionSelect,
          MiniMap,
          // AutoLayout,
          Dagre,
          // Menu,
        ],
      });
      lf.setTheme(
        {
          baseEdge: { strokeWidth: 1 },
          baseNode: { strokeWidth: 1 },
          nodeText: { overflowMode: 'autoWrap', lineHeight: 1.5 },
          edgeText: { overflowMode: 'autoWrap', lineHeight: 1.5 },
        },
      );
      registerCustomElement(lf);
      lf.setDefaultEdgeType('EDGE_BEZIER');
      // 校验未通过提示
      lf.on('connection:not-allowed', ({ msg }) => {
        // console.log(msg);
        if (msg) {
          this.$message.warning(msg);
        }
      });
      // 外部拖入节点添加时
      lf.on('node:dnd-add', (data) => {
        // console.log('外部拖入节点添加时', data);
        if (needShowDialog.includes(data.data.type)) {
          console.log('外部拖入节点添加时', data);
          this.$refs[data.data.type].handleShowDialog({ data: data.data, lf: this.lf });
        }
      });
      lf.on('node:dbclick', (data) => {
        console.log('双击::', data, this.lf.getEditConfig().isSilentMode);
        if (needDbclickShowDialog.includes(data.data.type)) {
          console.log('双击时', data);
          this.$refs[data.data.type].handleShowDialog({
            data: data.data,
            lf: this.lf,
            disabled: this.lf.getEditConfig().isSilentMode,
          });
        }
      });

      // 连线新增触发
      lf.on('edge:add', (data) => {
        console.log('连线新增触发', data);
        // console.log('node数据', this.lf.getNodeModelById(data.data.targetNodeId));

        // 判断边终点x是否大于节点x  大于则认定连接到了节点的右侧  要调整至左侧
        this.handleOptimizeEdge(data);
        // if (data.data.type === 'EDGE_BEZIER') {
        //   this.$message.warning('不支持贝塞尔曲线');
        //   lf.deleteEdge(data.data.id);
        // }
      });


      // const position = lf.getPointByClient(0, 0);
      // console.log(position);
      // lf.extension.miniMap.width = 300;
      // lf.extension.miniMap.height = 150;
      // lf.extension.miniMap.show();
      this.lf = lf;
      lf.render('');
      lf.extension.miniMap.show();
    },

    // 连线优化
    handleOptimizeEdge(data) {
      // console.log('node数据', this.lf.getNodeModelById(data.data.targetNodeId));
      const nodeModel = this.lf.getNodeModelById(data.data.targetNodeId);
      // 终点x
      const endX = data.data.endPoint.x;
      // 目标节点x
      const nodeX = nodeModel.x;
      // 大于则认定连接到了节点的右侧  要调整至左侧
      if (endX > nodeX) {
        // 获取边
        const edgeModel = this.lf.getEdgeModelById(data.data.id);
        // 计算节点连线偏移量需要+5
        const offset = computedTypeList.includes(nodeModel.type) ? 5 : 0;
        // console.log('offset', offset);
        // 计算节点左侧x
        const endPoint = {
          x: nodeX - nodeModel.width / 2 + offset,
          y: data.data.endPoint.y,
        };
        edgeModel.updateEndPoint(endPoint);
        // this.lf.updateEdge(data.data.id, { endPoint: { x: nodeModel, y: data.data.endPoint.y } });
      }

      // 起点x
      const startX = data.data.startPoint.x;
      // 来源节点x
      const sourceNodeModel = this.lf.getNodeModelById(data.data.sourceNodeId);
      const sourceNodeX = sourceNodeModel.x;
      // 起点小于来源节点x  认定起点连接到了起点  将起点调至右侧
      if (startX < sourceNodeX) {
        // 获取边
        const edgeModel = this.lf.getEdgeModelById(data.data.id);
        // 计算节点右侧x
        const startPoint = {
          x: sourceNodeX + sourceNodeModel.width / 2,
          y: data.data.startPoint.y,
        };
        edgeModel.updateStartPoint(startPoint);
      }
    },

    // 解除禁用
    handleEnable() {
      console.log('handleDisable');
      this.lf.updateEditConfig({
        isSilentMode: false,
        adjustNodePosition: true,
        stopMoveGraph: true,
        metaKeyMultipleSelected: true,
        plugins: [
          SelectionSelect,
          MiniMap,
          Dagre,
        ],
      });
      this.lf.openSelectionSelect();
    },

    // 设置禁用
    handleDisable() {
      this.lf.updateEditConfig({
        isSilentMode: true,
        adjustNodePosition: false,
        stopMoveGraph: true,
        metaKeyMultipleSelected: true,
        plugins: [MiniMap],
      });
      // eslint-disable-next-line
      this.lf?.closeSelectionSelect && this.lf.closeSelectionSelect();
    },

    // 模拟执行
    handleImitate() {
      console.log(this.lf.getGraphData());
    },
  },
};
</script>
<style lang="scss" scoped>
.Main-Iframe {
  .higher-create {
    .higher-container {
      height: calc(100vh - 64px);
    }
  }
}
.higher-create {
  background: #fff;
  position: relative;
  .button {
    top: 4px;
    right: 14px;
    position: absolute;
  }
  .header {
    position: relative;
    .bread {
      background-color: #ffffff;
      box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.06);
      padding: 10px;
      line-height: 20px;
      margin-bottom: 10px;
      display: flex;
      font-size: 12px;
      .first {
        padding-left: 3px;
        color: #97a3b4;
      }
      .line {
        padding: 0 10px;
      }
    }
    .button {
      position: absolute;
      top: 4px;
      right: 14px;
    }
  }
  .higher-container {
    margin: 10px;
    border: 1px solid #e5e7f1;
    height: calc(100vh - 101px);
    .content {
      position: relative;
      display: flex;
      height: 100%;
      .lf-diagram {
        flex: 1;
        .lf-diagram-canvas {
          height: calc(100% - 45px);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.content {
  .lf-mini-map {
    width: 300px;
    height: 150px;
    right: 0;
    bottom: 0;
    padding-top: 0;
    .lf-mini-map-graph {
      width: 100% !important;
      height: 100% !important;
    }
    .lf-mini-map-header,
    .lf-mini-map-close {
      display: none;
    }
  }
  .lf-line-text {
    .lf-basic-shape {
      fill: none !important;
    }
  }
}
</style>
