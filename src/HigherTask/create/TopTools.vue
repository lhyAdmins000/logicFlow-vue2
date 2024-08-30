<template>
  <div class="top-tools">
    <div class="tools-form-wrp">
      <el-form :model="formData" :inline="true" ref="formRef" :show-message="false">
        <el-form-item label="任务名称" prop="canvasName" :rules="[{ required: true, message: '请输入任务名称', trigger: 'blur' }]">
          <el-input class="input-style" maxlength="50" show-word-limit :disabled="canvasType === 'detail' || !isEdit" v-model="formData.canvasName" placeholder="请输入任务名称" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input class="input-style" maxlength="100" show-word-limit :disabled="canvasType === 'detail' || !isEdit" v-model="formData.canvasDesc" placeholder="请输入任务描述" style="width: 160px;"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" prop="sendTime" :rules="[
          { required: true, message: '请选择执行时间', trigger: 'blur' },
        ]">
          <el-date-picker
          class="resetDatePickerStyle"
            v-model="formData.sendTime"
            :disabled="canvasType === 'detail' || !isEdit"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :default-value="new Date().setMinutes(new Date().getMinutes() + 30)"
            :default-time="defaultTime"
            :picker-options="dongPickerOptions"
            placeholder="选择执行时间"
            style="width: 170px;"
            >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="rt-btn-wrp" style="white-space: nowrap;">
      <el-button size="small" :disabled="canvasType === 'detail'" type="primary" plain @click="handleAutoView">自动布局</el-button>
      <el-button size="small" v-if="isEdit" :disabled="canvasType === 'detail'|| !isEdit" type="primary" plain @click="handleImitate">模拟执行</el-button>
      <el-button size="small" v-if="canvasStatus === 1" :disabled="true" type="primary" plain :loading="true">模拟执行中</el-button>
      <el-button size="small" v-if="canvasStatus === 1" type="primary" plain @click="handleRefresh">刷新</el-button>
      <el-button size="small" :disabled="canvasType === 'detail'|| !isEdit || emulatedFlag" type="primary" @click="handleDraft">草稿</el-button>
      <el-button size="small" :disabled="canvasType === 'detail' || !isEdit" type="primary" @click="handleCreate">发布任务</el-button>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import { filterData, dateFormat,getTimeAfterHalfHour,handleValidTime } from '@/utils';
// eslint-disable-next-line
import { getAddDraft, getSimulateExec, getCanvasAdd, getHigerTaskStatus } from '@/api/higherTask';
import { canEdit } from './NodeEnum';

export default {
  props: {
    lf: Object,
    taskDetail: Object,
  },
  watch: {
    taskDetail: {
      handler(newValue) {
        this.formData = {
          canvasName: newValue.canvasName,
          canvasDesc: newValue.canvasDesc,
          sendTime: newValue.sendTime,
        };
        this.canvasStatus = newValue.canvasStatus;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    canvasType() { // 查看
      return this.$router.history.current.query.type;
    },
    canvasId() {
      return this.$router.history.current.query.id || this.id;
    },
    groupId() {
      return this.$router.history.current.query.groupId;
    },
    isEdit() {
      return !this.canvasStatus || canEdit.includes(this.canvasStatus.toString());
    },
  },
  data() {
    return {
      defaultTime: `${getTimeAfterHalfHour()}:00`, // 默认时间
      formData: {
        canvasName: '',
        canvasDesc: '',
        sendTime: '',
      },
      canvasStatus: '',
      dongPickerOptions: {
         // 咚咚消息
        selectableRange: [
          '09:00:00 - 22:59:59',
        ],
        format: 'HH:mm',
        disabledDate(time) {
          return (
            // eslint-disable-next-line operator-linebreak
            time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() > Date.now() + 3600 * 24 * 1000 * 90
          );
        },
      },
      id: '', // 创建时为空  模拟执行返回
      graphData: {},
      emulatedFlag: false, // 模拟执行状态
    };
  },
  methods: {
    // 刷新 查询画布状态 缺少接口
    handleRefresh() {
      // this.canvasStatus = 2;
      getHigerTaskStatus(this.canvasId).then((res) => {
        if (res.code === 2000) {
          this.canvasStatus = res.data.canvasStatus;
          if (canEdit.includes(res?.data?.canvasStatus?.toString())) {
            if (res.data.msg) {
              this.$message.warning(res.data.msg);
            } else {
              this.$message.success(res.data.msg || '模拟执行完毕');
            }
            this.$emit('handleEnable', this.canvasId);
          } else {
            this.$message.success('刷新成功');
          }
        }
      }).catch(() => {
        console.log('刷新失败');
      });
    },

    // 模拟执行
    handleImitate() {
      this.$refs.formRef.validate((valid, obj) => {
        if (valid) {
          const { nodes, edges } = this.$props.lf.getGraphData();

          console.log(nodes, edges);
          if (nodes.length === 0) {
            this.$message.error('请添加节点');
            return;
          }
          this.$confirm('是否模拟执行?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$emit('update:loading', true);
            this.emulatedFlag = true;
            getSimulateExec({
                ...this.formData,
                ...filterData({
                  id: this.canvasId,
                  groupId: this.groupId,
                }),
                nodes,
                edges,
            }).then((res) => {
              // const { data } = res;
              console.log(res);
              if (res.code === 2000) {
                // this.$message.success('正在执行请稍后');

                // id赋值
                this.id = res.data.id;
                this.canvasStatus = res.data.canvasStatus;
                this.handleValidCallback({ nodes, res });

                // 设置校验未通过
                if (res.data.errorVoList.length > 0) {
                  return;
                }
                this.handleDisable();
                // this.$router.push({
                //   path: '/task/higherTask',
                // });
                // this.$props.lf.updateEditConfig({
                //   isSilentMode: true,
                // });
              }
            }).finally(() => {
              console.log(111);

              this.$emit('update:loading', false);
              this.emulatedFlag = false;
            });
          });
        } else {
          // console.log(obj);
          const messagegList = Object.values(obj);
          this.$message.error(messagegList[0][0].message);
        }
      });
    },

    // 禁用画布
    handleDisable() {
      // this.canvasStatus = 1;
      this.$emit('handleDisable');
    },

    // 模拟和创建执行校验失败处理
    handleValidCallback({ nodes, res }) {
      // 将所有未通过节点更新校验状态更新
      const isErrorNode = nodes.filter((item) => item.properties.data?.nodeStatus?.toString() === '2');
      isErrorNode.forEach((item) => {
          const data = this.lf.getProperties(item.id);
          this.$props.lf.setProperties(item.id, {
            data: {
              ...data.data,
              nodeStatus: '',
              errorMsg: '',
            },
          });
      });

      // 设置校验未通过
      if (res.data.errorVoList.length > 0) {
        res.data.errorVoList.forEach((item) => {
          const data = this.lf.getProperties(item.id);
          this.$props.lf.setProperties(item.id, {
            data: {
              ...data.data,
              nodeStatus: 2,
              errorMsg: item.msg,
            },
          });
        });
        this.$message.warning('校验未通过');
      }
    },

    // 创建
    handleCreate() {
      this.$refs.formRef.validate((valid, obj) => {
        if (valid) {
          if (!handleValidTime(this.formData.sendTime)) {
            this.$message.warning('执行时间至少晚于当前时间半小时以上');
            return;
          }
          // lf节点
          const { nodes, edges } = this.$props.lf.getGraphData();
          if (nodes.length === 0) {
            this.$message.error('请添加节点');
            return;
          }
          // const nodeTypes = nodes.map((item) => item.type);
          // if (!nodeTypes.includes('START') || !nodeTypes.includes('END')) {
          //   this.$message.error('请添加开始节点或结束节点');
          //   return;
          // }
          // this.$message.success('保存成功');
          this.$confirm('是否发布任务？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$emit('update:loading', true);
            getCanvasAdd({
              ...this.formData,
                ...filterData({
                  id: this.canvasId,
                  groupId: this.groupId,
                }),
                nodes,
                edges,
            }).then((res) => {
              // const { data } = res;
              console.log(res);
              if (res.code === 2000) {
                // id赋值
                this.id = res.data.id;
                this.canvasStatus = res.data.canvasStatus;

                // 设置校验未通过
                if (res.data.errorVoList.length > 0) {
                 this.handleValidCallback({ nodes, res });
                } else {
                  this.$message.success('发布成功');
                  this.$router.push({
                    path: '/task/manage',
                  });
                }
              }
            }).finally(() => {
              this.$emit('update:loading', false);
            });
          });
        }
          // console.log(obj);
          const messagegList = Object.values(obj);
          this.$message.error(messagegList[0][0].message);
      });
    },

    // 保存草稿
    handleDraft() {
      this.$refs.formRef.validate((valid, obj) => {
        if (valid) {
          // if (!this.handleValidTime()) {
          //   this.$message.warning('执行时间需晚于当前时间30分钟后');
          //   return;
          // }
          // this.$message.success('保存成功');
          // this.$confirm('是否保存草稿？', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning',
          // }).then(() => {

          // });
          // lf节点
          const { nodes, edges } = this.$props.lf.getGraphData();
          if (nodes.length === 0) {
            this.$message.error('请添加节点');
            return;
          }
          // const nodeTypes = nodes.map((item) => item.type);
          // if (!nodeTypes.includes('START') || !nodeTypes.includes('END')) {
          //   this.$message.error('请添加开始节点或结束节点');
          //   return;
          // }
          // this.$message.success('保存成功');
          this.$confirm('是否保存草稿？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$emit('update:loading', true);
            getAddDraft({
              ...this.formData,
                ...filterData({
                  id: this.canvasId,
                  groupId: this.groupId,
                }),
                nodes,
                edges,
            }).then((res) => {
              // const { data } = res;
              console.log(res);
              if (res.code === 2000) {
                this.$message.success('保存成功');
                this.$router.push({
                  path: '/task/manage',
                });
              }
            }).finally(() => {
              this.$emit('update:loading', false);
            });
          });
        } else {
          // console.log(obj);
          const messagegList = Object.values(obj);
          this.$message.error(messagegList[0][0].message);
        }
      });
    },

    // 自动布局
    handleAutoView() {
      console.log(this.graphData);
      // eslint-disable-next-line
      this.$props.lf.extension.dagre && this.$props.lf.extension.dagre.layout({
          nodesep: 20,
          ranksep: 50,
          rankdir: 'LR',
          align: '',
        });
      // const { nodes, edges } = this.$props.lf.getGraphData();
      // this.$props.lf.extension.AutoLayout.layout(nodes, edges);
      this.$props.lf.fitView();
        // this.$props.lf.fitView();
      // this.$props.lf.render(this.graphData);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-tools {
  border-bottom: 1px solid #e5e7f1;
  padding: 6px 12px 6px 0;
  background: #fff;
  display: flex;
  justify-content: space-between;

  .tools-form-wrp{
    flex: 1;
    &::v-deep{
      .el-form-item--small.el-form-item{
        margin-bottom: 0;
      }
      .el-form-item:last-child{
        margin-right: 0;
      }
    }
  }

  .rt-btn-wrp{
    flex: 0 0 355px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .el-button:not(:nth-child(1)){
      margin-left: 5px;
    }

    .el-button{
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  &::v-deep .input-style{
    overflow: hidden;
  }

  &::v-deep .input-style .el-input__inner {
    padding-right: 40px;
  }

  &::v-deep .input-style .el-input__suffix{
    right: 1px;
  }

  &::v-deep .input-style .el-input__suffix .el-input__suffix-inner .el-input__clear{
    display: inline-block;
    right: 0;
    text-align: right;
  }

  &::v-deep .resetDatePickerStyle .el-input__inner{
    padding-left: 20px;
    padding-right: 0px;
  }

  &::v-deep .resetDatePickerStyle .el-input__prefix{
    left: -2px;
  }
  &::v-deep .resetDatePickerStyle .el-input__suffix{
    right: 0px;
  }
}
</style>
