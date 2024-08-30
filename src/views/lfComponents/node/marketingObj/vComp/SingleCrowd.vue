<template>
  <div>
    <div class="single-crowd" :class="{'valid-error' :isError }">
      <div class="icon-div">
        <img class="crowd-icon" src="@/assets/lfCanvas/singleCrowd.svg" alt="">
      </div>
      <div class="desc-div">
        <!-- {{ modeProperties?.nodeName }} -->
        <p class="title">{{ crowdData?.nodeName ||'单个人群包' }}</p>
        <p class="title-1">人群规模：<span>{{ crowdData?.crowdSum ||'未选择' }}</span></p>
      </div>
      <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
        <el-button>上左</el-button>
      </el-tooltip> -->
    </div>

    <el-tooltip v-if="isError" class="item" effect="dark" :content="crowdData.errorMsg" placement="right">
      <p class="valid-p">校验未通过<i class="el-icon-warning-outline"></i></p>
   </el-tooltip>
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
  data() {
    return {
      crowdData: {
        nodeStatus: '', // 0:未做校验，草稿=0，1:errorMsg存校验成功，2:errorMsg 校验失败原因
        errorMsg: '',
        nodeName: '',
        crowdSum: '',
        crowdId: '',
      },
    };
  },
  mounted() {
    if (JSON.stringify(this.modeProperties.data || {}) !== '{}') {
      // console.log('mounted', this.modeProperties.data);
      this.crowdData = {
        ...this.modeProperties.data,
      };
    }
  },
  computed: {
    isError() {
      return this.crowdData?.nodeStatus?.toString() === '2';
      // return true;
    },
  },
  methods: {
    // properties修改
    handleChange(data) {
      console.log('handleChange', data.getProperties());
      // console.log('isSelected', this.model.isSelected);
      this.crowdData = data.getProperties().data;
    },
  },
};
</script>
<style lang="scss" scoped>
.single-crowd{
  width: 234px;
  height: 76px;
  border: 1px solid rgba(71, 98, 254, 1);
  background: rgba(71, 98, 254, 0.1);
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  gap: 8px;

  .desc-div{
    height: 52px;
    .title{
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      text-align: left;
      color: rgba(71, 98, 254, 1);
      white-space: nowrap;
      width: 130px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 4px;
    }
    .title-1{
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      color: rgba(71, 98, 254, 1);
      white-space: nowrap;
      width: 130px;
      text-overflow: ellipsis;
    }
  }
  .icon-div{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    background: linear-gradient(180deg, #4762FE 0%, rgba(71, 98, 254, 0.8) 100%);
    .crowd-icon{
      width: 16px;
      height: 20px;
    }
  }

}
.single-crowd.valid-error{
  border: 1px solid rgba(255, 80, 80, 1);
  background: rgba(254, 239, 241, 1);
  .desc-div{
    .title,.title-1{
      color: rgba(255, 80, 80, 1);
    }
  }
  .icon-div{
    background: radial-gradient(96.25% 96.25% at 50% 3.75%, rgba(255, 80, 80, 0.8) 2%, #FF5050 65%, rgba(255, 80, 80, 0.8) 100%);
  }
}
.valid-p{
  color: rgba(255, 80, 80, 1);
  margin-top: 4px;
  font-size: 14px;
  width: 90px;
  margin: 0 auto;
  margin-top: 2px;
}
</style>
