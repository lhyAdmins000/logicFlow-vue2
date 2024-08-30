<template>
  <el-dialog
    title="xxxx"
    class="merge-node-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
  >
    <div class="custom-dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 显示弹窗
    handleShowDialog() {
      this.dialogVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.split-node-dialog {
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #d6d8db;
  }

  ::v-deep .el-table__fixed-header-wrapper .el-checkbox {
    visibility: hidden;
  }
  &::v-deep .split-node-dialog-reset-input-style {
    overflow: hidden;
    width: 400px;
  }

  &::v-deep .split-node-dialog-reset-input-style .el-input__inner {
    padding-right: 60px;
  }

  &::v-deep .split-node-dialog-reset-input-style .el-input__suffix {
    right: 1px;
  }

  &::v-deep
    .split-node-dialog-reset-input-style
    .el-input__suffix
    .el-input__suffix-inner
    .el-input__clear {
    display: inline-block;
    right: 0;
    text-align: right;
  }

  .merge-node-tips {
    width: 100%;
    color: #ff9600;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    padding-left: 130px;
    border: 1px solid rgb(255, 180, 30);
    background-color: rgba(255, 180, 30, 0.15);
    padding: 5px;

    .tips {
      margin-left: 10px;
    }
  }

  .split-handle-wrp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;

    & > li {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-right: 30px;

      .label {
        text-align: right;
        line-height: 32px;
        padding-right: 8px;
        margin-right: 10px;
        position: relative;

        &::before {
          content: ":";
          position: absolute;
          top: 0;
          right: 0px;
        }
      }
    }
  }

  .split-table-wrp {
    width: 100%;
    overflow: auto;
    max-height: 500px;
  }

  .custom-dialog-footer {
    widows: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
  }
}
</style>