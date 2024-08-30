<template>
  <div>
    <div class="goal-crowd" :class="{ 'valid-error': isError }">
      <div class="icon-div">
        <img class="crowd-icon" src="@/assets/lfCanvas/goalCrowd.svg" alt="" />
      </div>
      <div class="desc-div">
        <!-- {{ modeProperties?.nodeName }} -->
        <p class="title">{{ crowdData?.nodeName || "目标人群" }}</p>
        <p class="title-1">
          目标规模：<span>{{ crowdData?.crowdSum || "-" }}</span>
        </p>
        <p class="title-1">
          发送上限：<span>{{ crowdData?.selectSum || "-" }}</span>
        </p>
      </div>
      <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
        <el-button>上左</el-button>
      </el-tooltip> -->
    </div>
    <el-tooltip
      v-if="isError"
      class="item"
      effect="dark"
      :content="crowdData.errorMsg"
      placement="right"
    >
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
  computed: {
    isError() {
      return this.crowdData?.nodeStatus?.toString() === '2';
      // return true;
    },
  },
  data() {
    return {
      crowdData: {
        nodeStatus: '', // 0:未做校验，草稿=0，1:errorMsg存校验成功，2:errorMsg 校验失败原因
        errorMsg: '',
        nodeName: '',
        crowdSum: '',
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
  methods: {
    // properties修改
    handleChange(data) {
      // console.log('handleChange111', data.getProperties());
      // console.log('isSelected', this.model.isSelected);
      // 清空状态
      this.crowdData = data.getProperties().data;
    },
  },
};
</script>
<style lang="scss" scoped>
.goal-crowd {
  width: 237px;
  height: 88px;
  border: 1px solid rgba(64, 158, 255, 1);
  background: rgba(64, 158, 255, 0.1);
  padding: 12px 0 12px 24px;
  border-radius: 8px;
  display: flex;
  gap: 8px;
  .valid-p {
    color: rgba(255, 80, 80, 1);
    text-align: left;
    margin-top: 2px;
    font-size: 14px;
  }
  .desc-div {
    height: 52px;
    .title {
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      text-align: left;
      color: rgba(64, 158, 255, 1);
      white-space: nowrap;
      overflow: hidden;
      width: 130px;
      text-overflow: ellipsis;
      margin-bottom: 4px;
    }
    .title-1 {
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      text-align: left;
      color: rgba(64, 158, 255, 1);
      overflow: hidden;
      white-space: nowrap;
      width: 150px;
      text-overflow: ellipsis;
    }
  }
  .icon-div {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    background: linear-gradient(
      180deg,
      #409eff 0%,
      rgba(64, 158, 255, 0.8) 100%
    );
    .crowd-icon {
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }
  }
}
.goal-crowd.valid-error {
  border: 1px solid rgba(255, 80, 80, 1);
  background: rgba(254, 239, 241, 1);
  .desc-div {
    .title,
    .title-1 {
      color: rgba(255, 80, 80, 1);
    }
  }
  .icon-div {
    background: radial-gradient(
      96.25% 96.25% at 50% 3.75%,
      rgba(255, 80, 80, 0.8) 2%,
      #ff5050 65%,
      rgba(255, 80, 80, 0.8) 100%
    );
  }
}
.valid-p {
  color: rgba(255, 80, 80, 1);
  margin-top: 4px;
  font-size: 14px;
  width: 90px;
  margin: 0 auto;
  margin-top: 2px;
}
</style>
