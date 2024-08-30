<template>
  <div class="sms-v-node">
    <div class="sms-node"  :class="{'valid-error' :isError }">
      <div class="icon-div">
        <img class="crowd-icon" src="@/assets/lfCanvas/sms.svg" alt="">
      </div>
      <div class="desc-div">
        <!-- {{ modeProperties?.nodeName }} -->
        <p class="title">{{ smsData?.nodeName ||'短信' }}</p>
        <div class="content-div">
          <p class="title-1"><span class="label-span">内容：</span><span>{{ smsData?.materialName ||'未设置' }}</span></p>
          <p class="title-1"><span class="label-span">发送时间：</span><span>{{ smsData?.sendTime ||'-' }}</span></p>
        </div>
      </div>
    </div>
    <el-tooltip v-if="isError" class="item" effect="dark" :content="smsData.errorMsg" placement="right">
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
      return this.smsData?.nodeStatus?.toString() === '2';
    },
  },
  data() {
    return {
      smsData: {
        nodeStatus: '', // 0:未做校验，草稿=0，1:errorMsg存校验成功，2:errorMsg 校验失败原因
        errorMsg: '',
        nodeName: '',
        materialName: '',
        sendTime: '',
        // selectSum: '',
      },
    };
  },
  mounted() {
    // console.log('mounted', this.modeProperties);
    if (JSON.stringify(this.modeProperties.data || {}) !== '{}') {
      console.log('dongdongmounted', this.modeProperties.data);
      this.smsData = {
        ...this.modeProperties.data,
      };
    }
  },
  methods: {
    // properties修改
    handleChange(data) {
      console.log('handleChange', data.getProperties());
      // console.log('isSelected', this.model.isSelected);
      this.smsData = data.getProperties().data;
    },
  },
};
</script>
<style lang="scss" scoped>
.sms-v-node{
  .sms-node{
    width: 342px;
    height: 95px;
    border: 1px solid rgba(0, 200, 100, 1);
    background: rgba(0, 200, 100, 0.1);
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
        color: rgba(40, 150, 100, 1);
        white-space: nowrap;
        overflow: hidden;
        width: 235px;
        text-overflow: ellipsis;
      }
      .title-1{
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        color: rgba(40, 150, 100, 1);
        white-space: nowrap;
        overflow: hidden;
        width: 235px;
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
      background: radial-gradient(96.25% 96.25% at 50% 3.75%, #00C864 0%, rgba(0, 200, 100, 0.8) 100%);
      .crowd-icon{
        width: 16px;
        height: 21px;
      }
    }

  }
  .sms-node.valid-error{
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
