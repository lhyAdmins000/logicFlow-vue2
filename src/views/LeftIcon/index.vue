<template>
  <div class="left-bar-item" :style="`border: 1px solid ${borderColor};background-color:${backGroundColor};`">
    <img class="icon" :src="itemObj.icon" alt="">
    <p class="name" :style="`color:${borderColor};`">{{itemObj.name}}</p>
  </div>
</template>
<script>
export default {
  props: {
    itemObj: {
      type: Object,
      default: () => ({}),
    },
    borderColor: {
      type: String,
      default: 'rgba(71, 98, 254, 1)',
    },
    backGroundColor: {
      type: String,
      default: 'rgba(71, 98, 254, 0.1)',
    },
  },
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.left-bar-item{
  width: 140px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  padding-left: 24px;
  .icon{
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
  .name{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-align: left;
  }

}
</style>
