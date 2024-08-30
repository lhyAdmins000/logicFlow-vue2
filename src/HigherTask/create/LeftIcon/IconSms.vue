<template>
  <div class="crowd-item">
    <div class="icon">
      <svg width="1em" height="1em" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" aria-hidden="true" focusable="false" class="">
        <g id="icon-crowd-pack" stroke="none" stroke-width="1" fill-rule="evenodd">
          <path d="M6.71647204,8.36383047 C4.41436678,8.36383047 2.54162242,6.49108611 2.54162242,4.18898085 C2.54162242,
          1.88687559 4.40523144,0.00499588816 6.71647204,0.00499588816 C9.02771264,0.00499588816 10.8913217,1.87774025 10.8913217,
          4.17984551 C10.8913217,6.48195078 9.0185773,8.36383047 6.71647204,8.36383047 Z M6.71647204,1.21999589 C5.08124648,1.21999589 3.75662242,
          2.54461995 3.75662242,4.17984551 C3.75662242,5.81507108 5.08124648,7.13969514 6.71647204,7.13969514 C8.3516976,7.13969514 9.67632166,5.81507108 9.67632166,
          4.17984551 C9.67632166,2.54461995 8.34256227,1.21999589 6.71647204,1.21999589 Z M12.8188781,14.83165 L0.614066024,14.83165 C0.276058506,14.83165 0.00199835526,
          14.5575899 0.00199835526,14.2195824 C0.00199835526,11.2688681 3.01666001,8.87540942 6.71647204,8.87540942 C10.4162841,8.87540942 13.4309457,11.2688681 13.4309457,
          14.2195824 C13.4218104,14.5575899 13.1568856,14.83165 12.8188781,14.83165 Z M1.28094572,13.6075147 L12.1519984,13.6075147 C11.7591788,11.6160109 9.47534422,10.0904094 6.71647204,
          10.0904094 C3.95759986,10.0904094 1.67376527,11.6251463 1.28094572,13.6075147 Z" id="\u5F62\u72B6" fill-rule="nonzero"></path>
        </g>
      </svg>
    </div>
    <span class="node-span">短信</span>
  </div>
</template>
<script>
export default {
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
.crowd-item{
  height: 32px;
  color: #b99a75;
  border: 1px solid #B99A75;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  padding-left: 7px;
  .icon{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(185, 139, 84);
    color: #fff;
    border-radius: 4px;
  }
  .node-span{
    font-size: 12px;
  }
}
</style>
