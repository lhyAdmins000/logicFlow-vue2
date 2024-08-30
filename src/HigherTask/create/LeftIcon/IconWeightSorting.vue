<template>
    <div class="crowd-item">
        <div class="icon">
            <img src="@/assets/lfCanvas/compute/icon-compute-unique.svg" alt="">
        </div>
        <span class="node-span">排重</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    mounted() { },
    methods: {},
};
</script>
<style lang="scss" scoped>
.crowd-item {
    height: 32px;
    color: rgba(165, 140, 100, 1);
    border: 1px solid rgba(255, 180, 30, 1);
    background-color: rgba(255, 180, 30, 0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    padding-left: 7px;

    .icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 4px;
    }

    .node-span {
        font-size: 12px;
    }
}
</style>
