<template>
  <div class="compute-v-node" :class="{'valid-error' :isError }">

    <template v-if="isError">
      <div class="icon-div">
        <img class="crowd-icon" src="@/assets/lfCanvas/compute/icon-compute-merge.svg" alt="">
      </div>
      <el-tooltip class="item" effect="dark" :content="dataObj.errorMsg" placement="right">
        <p class="valid-p">校验未通过<i class="el-icon-warning-outline"></i></p>
      </el-tooltip>
    </template>

    <template v-else>
      <div class="icon-div">
        <img class="crowd-icon" src="@/assets/lfCanvas/compute/icon-compute-merge.svg" alt="">
      </div>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    modeProperties: {
      type: Object,
      default: () => ({}),
    },
    text: {
      type: String,
      default: '',
    },
    model: {
      type: Object,
      default: () => ({}),
    },
    graphModel: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isError() {
      return this.dataObj?.nodeStatus?.toString() === '2';
      // return true;
    },
  },
  data() {
    return {
      dataObj: {
        nodeStatus: '', // 0:未做校验，草稿=0，1:errorMsg存校验成功，2:errorMsg 校验失败原因
        errorMsg: '',
        nodeName: '',
        materialName: '',
        sendTime: '',
        selectSum: '',
      },
    };
  },
  mounted() {
    // console.log('mounted', this.modeProperties);
    if (JSON.stringify(this.modeProperties.data || {}) !== '{}') {
      console.log('dongdongmounted', this.modeProperties.data);
      this.dataObj = {
        ...this.modeProperties.data,
      };
    }
  },
  methods: {
    // properties修改
    handleChange(data) {
      console.log('handleChange', data.getProperties());
      // console.log('isSelected', this.model.isSelected);
      this.dataObj = data.getProperties().data;
    },
  },
};
</script>

<style lang="scss" scoped>
.compute-v-node {
  width: 50px;
  height: 50px;
  padding: 5px;

  .valid-p{
    color: rgba(255, 80, 80, 1);
    margin-top: 4px;
    font-size: 14px;
    width: 90px;
    transform: translateX(-16px);
  }

  .icon-div {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(96.25% 96.25% at 50% 3.75%, rgba(255, 180, 30, 1) 0%, rgba(255, 180, 30, 0.8) 100%);

    .crowd-icon {
      width: 20px;
      height: 18px;
    }
  }
}

// 错误信息红色展示
.valid-error {
  .icon-div{
    background: radial-gradient(96.25% 96.25% at 50% 3.75%, rgba(255, 80, 80, 0.8) 2%, #FF5050 65%, rgba(255, 80, 80, 0.8) 100%);
  }
}
</style>
