<template>
  <div class="top-tools">
    <div class="tools-form-wrp">
      <el-form
        :model="formData"
        :inline="true"
        ref="formRef"
        :show-message="false"
      >
        <el-form-item
          label="名称"
          prop="canvasName"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-input
            class="input-style"
            maxlength="50"
            show-word-limit
            :disabled="canvasType === 'detail'"
            v-model="formData.canvasName"
            placeholder="请输入任务名称"
            style="width: 150px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="rt-btn-wrp" style="white-space: nowrap">
      <el-button
        size="small"
        :disabled="canvasType === 'detail'"
        type="primary"
        plain
        @click="handleAutoView"
        >自动布局</el-button
      >
    </div>
  </div>
</template>
<script>

export default {
  props: {
    lf: Object,
    taskDetail: Object,
  },
  watch: {
    taskDetail: {
      handler(newValue) {
        this.formData = {
          canvasName: newValue.canvasName,
          canvasDesc: newValue.canvasDesc,
          sendTime: newValue.sendTime,
        };
        this.canvasStatus = newValue.canvasStatus;
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      canvasType: '',
      formData: {
        canvasName: '',
        canvasDesc: '',
        sendTime: '',
      },
      canvasStatus: '',
      graphData: {},
      emulatedFlag: false, // 模拟执行状态
    };
  },
  methods: {


    // 禁用画布
    handleDisable() {
      // this.canvasStatus = 1;
      this.$emit('handleDisable');
    },




    // 自动布局
    handleAutoView() {
      console.log(this.graphData);
      // eslint-disable-next-line
      this.$props.lf.extension.dagre && this.$props.lf.extension.dagre.layout({
        nodesep: 20,
        ranksep: 50,
        rankdir: 'LR',
        align: '',
      });
      // const { nodes, edges } = this.$props.lf.getGraphData();
      // this.$props.lf.extension.AutoLayout.layout(nodes, edges);
      this.$props.lf.fitView();
      // this.$props.lf.fitView();
      // this.$props.lf.render(this.graphData);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-tools {
  border-bottom: 1px solid #e5e7f1;
  padding: 6px 12px 6px 0;
  background: #fff;
  display: flex;
  justify-content: space-between;

  .tools-form-wrp {
    flex: 1;
    &::v-deep {
      .el-form-item--small.el-form-item {
        margin-bottom: 0;
      }
      .el-form-item:last-child {
        margin-right: 0;
      }
    }
  }

  .rt-btn-wrp {
    flex: 0 0 355px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .el-button:not(:nth-child(1)) {
      margin-left: 5px;
    }

    .el-button {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  &::v-deep .input-style {
    overflow: hidden;
  }

  &::v-deep .input-style .el-input__inner {
    padding-right: 40px;
  }

  &::v-deep .input-style .el-input__suffix {
    right: 1px;
  }

  &::v-deep
    .input-style
    .el-input__suffix
    .el-input__suffix-inner
    .el-input__clear {
    display: inline-block;
    right: 0;
    text-align: right;
  }

  &::v-deep .resetDatePickerStyle .el-input__inner {
    padding-left: 20px;
    padding-right: 0px;
  }

  &::v-deep .resetDatePickerStyle .el-input__prefix {
    left: -2px;
  }
  &::v-deep .resetDatePickerStyle .el-input__suffix {
    right: 0px;
  }
}
</style>
