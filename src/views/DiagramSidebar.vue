<template>
  <div class="diagram-sidebar">
    <div v-for="groupItem in leftDataList" :key="groupItem.key">
      <h1 class="node-category-title">{{ groupItem.groupName }}</h1>
      <div
        v-for="item in groupItem.nodes"
        :key="item.type"
        class="cursor-pointer"
        @mousedown="dragInNode(item.type)"
      >
        <LeftIcon
          :itemObj="{
            icon: item.icon,
            name: item.name,
          }"
          :borderColor="item.borderColor"
          :backGroundColor="item.backgroundColor"
        />
      </div>

      <!-- <div class="node-category">
        <div :class="canDrag?'cursor-not-allowed':'cursor-pointer'" class="node-item" @mousedown="dragInNode('SINGLE_CROWD')">
          <IconCrowd/>
        </div>
        <div :class="canDrag?'cursor-not-allowed':'cursor-pointer'" class="node-item" @mousedown="dragInNode('BATCH_CROWD')">
          <IconBatch/>
        </div>
        <div :class="canDrag?'cursor-not-allowed':'cursor-pointer'" class="node-item" @mousedown="dragInNode('GOAL_CROWD')">
          <IconGoal/>
        </div>
        <div :class="canDrag?'cursor-not-allowed':'cursor-pointer'" class="node-item" @mousedown="dragInNode('RULE_CROWD')">
          <IconRule/>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
// // 人群
// import IconCrowd from './LeftIcon/IconCrowd.vue';
// // 批量人群包
// import IconBatch from './LeftIcon/IconBatch.vue';
// // 人群规则
// import IconRule from './LeftIcon/IconRule.vue';
// // 目标人群
// import IconGoal from './LeftIcon/IconGoal.vue';
// // 咚咚
// import IconDong from './LeftIcon/IconDong.vue';
// // 短信
// import IconSms from './LeftIcon/IconSms.vue';
import LeftIcon from './LeftIcon/index.vue';

// 初始化后端所需数据
const initNodeData = {
  START: { data: {} },
  END: { data: {} },
  SINGLE_CROWD: {
    data: {
      nodeName: '单个人群包',
    },
  },
  GOAL_CROWD: {
    data: {
      nodeName: '目标人群',
    },
  },
  RULE_CROWD: {
    data: {
      nodeName: '人群规则',
    },
  },
  BATCH_CROWD: {
    data: {
    },
  },
  MERGE: { data: {} },
  EXCLUDE: { data: {} },
  DONGDONG: { data: {} },
  SMS: { data: {} },
  SPLIT: { data: {} },
  UNIQUE: {
    data: {

    },
  },
  AND: {
    data: {

    },
  },

};

export default {
  components: {
    LeftIcon,
  },
  data() {
    return {
      canDrag: true,
      leftDataList: [
        {
          groupName: 'xxx',
          key: 'marketing',
          nodes: [
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/singleCrowd.svg'),
              type: 'SINGLE_CROWD',
              name: 'xxxx',
            },
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/batchCrowd.svg'),
              type: 'BATCH_CROWD',
              name: 'xxxxx',
            },
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/ruleCrowd.svg'),
              type: 'RULE_CROWD',
              name: 'xxxxx',
            },
          ],
        },
        {
          groupName: 'xxxx',
          key: 'target',
          nodes: [
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/goalCrowd.svg'),
              type: 'GOAL_CROWD',
              borderColor: 'rgba(64, 158, 255, 1)',
              backgroundColor: 'rgba(64, 158, 255, 0.1)',
              name: 'xxxx',
            },
          ],
        },
        {
          groupName: 'xxxx',
          key: 'compute',
          nodes: [
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/compute/icon-compute-merge.svg'),
              type: 'MERGE',
              borderColor: 'rgba(255, 180, 30, 1)',
              backgroundColor: 'rgba(255, 180, 30, 0.15)',
              name: 'xxx',
            },
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/compute/icon-compute-split.svg'),
              type: 'SPLIT',
              borderColor: 'rgba(255, 180, 30, 1)',
              backgroundColor: 'rgba(255, 180, 30, 0.15)',
              name: 'xxxx',
            },
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/compute/icon-compute-unique.svg'),
              type: 'UNIQUE',
              borderColor: 'rgba(255, 180, 30, 1)',
              backgroundColor: 'rgba(255, 180, 30, 0.15)',
              name: 'xxx',
            },
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/compute/icon-compute-intersection.svg'),
              type: 'AND',
              borderColor: 'rgba(255, 180, 30, 1)',
              backgroundColor: 'rgba(255, 180, 30, 0.15)',
              name: 'xxxxx',
            },
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/compute/icon-compute-exclude.svg'),
              type: 'EXCLUDE',
              borderColor: 'rgba(255, 180, 30, 1)',
              backgroundColor: 'rgba(255, 180, 30, 0.15)',
              name: 'xxxxx',
            },
            // {
            //   // eslint-disable-next-line
            //   icon: require('@/assets/lfCanvas/leftIcon/compute/icon-compute-spread.svg'),
            //   type: 'SPREAD',
            //   borderColor: 'rgba(255, 180, 30, 1)',
            //   backgroundColor: 'rgba(255, 180, 30, 0.15)',
            //   name: '智能扩散',
            // },
            // {
            //   // eslint-disable-next-line
            //   icon: require('@/assets/lfCanvas/leftIcon/compute/icon-compute-sort.svg'),
            //   type: 'SORT',
            //   borderColor: 'rgba(255, 180, 30, 1)',
            //   backgroundColor: 'rgba(255, 180, 30, 0.15)',
            //   name: '高能排序',
            // },
          ],
        },
        {
          groupName: 'xxxxxx',
          key: 'touch',
          nodes: [
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/dongdong.svg'),
              type: 'DONGDONG',
              borderColor: 'rgba(0, 200, 100, 1)',
              backgroundColor: 'rgba(0, 200, 100, 0.1)',
              name: 'xxxxx',
            },
            {
              // eslint-disable-next-line
              icon: require('@/assets/lfCanvas/leftIcon/sms.svg'),
              type: 'SMS',
              borderColor: 'rgba(0, 200, 100, 1)',
              backgroundColor: 'rgba(0, 200, 100, 0.1)',
              name: 'xxxxx',
            },
          ],
        },
      ],
    };
  },
  props: {
    taskDetail: Object,
  },
  methods: {
    dragInNode(type) {
      this.$emit('dragInNode', {
        type,
        properties: {
          ...initNodeData[type],
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.diagram-sidebar {
  user-select: none;
  flex-basis: 200px;
  padding: 13px 25px 0 25px;
  background: #fff;
  height: 100%;
  overflow-y: auto;
}

.node-item {
  margin-bottom: 12px;
}

.node-category-title {
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  margin-bottom: 12px;
}
</style>
