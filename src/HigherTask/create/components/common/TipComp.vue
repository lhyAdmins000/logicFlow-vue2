<template>
  <div class="canvas-alert">
    <el-alert
    type="warning"
    :closable="false"
    show-icon
    >
    <template #title>
      <p class="select-data-p" v-for="(item,index) in tipList" :key="index">
        {{ item }}
      </p>
    </template>
  </el-alert>
  </div>
</template>
<script>
export default {
  props: {
    tipList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" scoped>
.canvas-alert{
  ::v-deep .el-alert--warning.is-light{
    background-color: #e6f7ff;
    border: 1px solid  #91d5ff;
    color: #666;
    .el-alert__icon{
        color: #409EFF;
        font-size: 26px;
        width: 30px;
    }
    margin-bottom:10px;
  }
}
</style>
