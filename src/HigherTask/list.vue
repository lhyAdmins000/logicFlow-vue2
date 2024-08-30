<template>
<div class="Manage">
  <div class="manage_header">
    <bread />
    <!-- <el-button type="primary" @click="goCreate">创建任务</el-button> -->
  </div>
  <div class="task_list" style="margintop: 20px" v-loading="loading">
    <div class="task_info">
      <!-- <div class="task_title">任务列表</div> -->
      <el-form :inline="true">
        <el-form-item label-width="90px" label="任务名称/ID">
            <el-input placeholder="请输入任务名称/ID" v-model="searchData.taskNameAndId" clearable/>
        </el-form-item>
        <el-form-item label-width="90px" label="素材标题/ID">
            <el-input placeholder="请输入素材标题/ID" v-model="searchData.materialNameAndId" clearable/>
        </el-form-item>
        <el-form-item label-width="90px" label="素材类型">
            <el-select placeholder="请选择" v-model="searchData.channel" clearable>
                <el-option
                    v-for="(value,key) in channelStatus"
                    :key="value"
                    :label="value"
                    :value="key">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label-width="90px" label="创建时间">
            <el-date-picker
                v-model="searchData.createTime"
                :value-format="'yyyy-MM-dd'"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="goCreate"
            >创建任务
            </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#f8f9fb', color: '#000', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="canvasName" label="任务名称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="description" label="任务描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="crowdNum" label="人群规模"> </el-table-column>
        <el-table-column prop="id" label="任务ID" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="channel" label="素材类型" min-width="120" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span>{{ channelStatus[row.channel] }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="materialName" label="素材标题" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="materialDescription" label="素材描述" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="materialId" label="素材ID" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="taskStatus" label="执行状态" :formatter="getTaskStatus">
        </el-table-column>
        <el-table-column prop="pushNum" label="推送数"> </el-table-column>
        <el-table-column prop="sendSuccess" label="推送成功数"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120"> </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              @click="cancleTask(scope)"
              v-if="scope.row.taskStatus === 0 || scope.row.taskStatus === 6"
              >取消</el-button
            > -->
            <el-button type="text" @click="goDetail(scope)">查看</el-button>
             <el-button
              type="text"
              @click="handleEditor(scope, 'edit')"
              >编辑</el-button
            >
            <!--<el-button type="text" @click="handleEditor(scope, 'copy')">复制</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="pagesize"
          layout="total, prev, pager, next, sizes,jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
// eslint-disable-next-line import/extensions
import { filterData } from '@/utils/index';
// eslint-disable-next-line import/extensions
import { getHigerTaskList } from '@/api/higherTask.js';

export default {
  data() {
    return {
      channelStatus: { // 素材类型
        0: '短信',
        1: '咚咚文本',
        2: '咚咚富文本',
      },
      taskStatusList: { // 执行状态
        0: '未执行',
        1: '执行中',
        2: '执行完毕',
        4: '草稿',
        5: '全部取消',
        6: '部分取消',
      },
      searchData: {
        channel: '',
        materialNameAndId: '',
        taskNameAndId: '',
        taskStatus: '',
        createTime: '',
      },
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      pageNumber: 1,
      total: 0,
      loading: false,
    };
  },
  mounted() {
    this.getTaskList(1, 10);
  },
  methods: {
    handleCopy(id) {
      this.$axios
        .get('/innovation/web/task/group/copy', {
          params: {
            groupId: id,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    // 搜索
    handleSearch() {
        this.currentPage = 1;
        this.getTaskList(1, 10);
    },

    // 重置
    handleReset() {
      Object.assign(this.searchData, this.$options.data().searchData);
      this.currentPage = 1;
      this.getTaskList(1, 10);
    },

    getTaskList(pageNumber, pageSize) {
      this.loading = true;
      const { createTime, ...others } = this.searchData;
        const [createTimeStart, createTimeEnd] = createTime || [];
        getHigerTaskList({
          ...filterData({
            createTimeStart: createTimeStart ? `${createTimeStart} 00:00:00` : '',
            createTimeEnd: createTimeEnd ? `${createTimeEnd} 23:59:59` : '',
            pageNumber,
            pageSize,
            ...others,
          }),
        })
        .then((res) => {
          this.loading = false;
          if (res.code === 2000) {
            const { total, rows } = res.data;
            this.total = total;
            this.tableData = rows;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getTaskStatus(rows) {
      let taskStatus = '';
      switch (rows.taskStatus) {
        case 0:
          taskStatus = '未执行';
          break;
        case 1:
          taskStatus = '执行中';
          break;
        case 2:
          taskStatus = '执行完毕';
          break;
        case 4:
          taskStatus = '草稿';
          break;
        case 5:
          taskStatus = '全部取消';
          break;
        case 6:
          taskStatus = '部分取消';
          break;
        default:
          taskStatus = '执行失败';
          break;
      }
      return taskStatus;
    },
    dateFormat(row, column) {
      const date = row[column.property];
      if (date === undefined) {
        return '';
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    cancleTask(scope) {
      this.$confirm('任务取消后将不会触达用户，确定要取消吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.loading = true;
          this.axios
            .get(`/innovation/web/task/group/cancel?groupId=${scope.row.id}`)
            .then((res) => {
              this.loading = false;
              if (res.code === 2000) {
                this.$message({
                  type: 'success',
                  message: '操作成功',
                });
                this.getTaskList(1, 10);
              }
            });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: 'info',
            message: '已取消操作',
          });
        });
    },
    // 创建
    goCreate() {
      this.$router.push({
        path: '/task/createHigherTask',
      });
    },
    goDetail(scope) {
      this.$router.push({
        path: '/task/createHigherTask',
        query: {
          id: scope.row.id,
          groupId: scope.row.groupId,
          type: 'detail',
        },
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getTaskList(this.pageNumber, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTaskList(val, this.pagesize);
    },
    handleEditor(scope) {
      this.$router.push({
        path: '/task/createHigherTask',
        query: {
          id: scope.row.id,
          groupId: scope.row.groupId,
          type: 'edit',
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Manage {
  font-size: 14px;
  .manage_header{
    width: 100%;
    position: relative;
    .el-button{
      position: absolute;
      top: 4px;
      right: 20px;
    }
  }
}
.task_list {
  width: 98%;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  .ButtonRight {
    float: right;
    margin-bottom: 8px;
  }
  .page {
    margin-top: 20px;
    text-align: center;
  }
  .task_info {
    padding: 20px 20px 0 20px;

    .task_title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      font-weight: bold;
    }
    .el-table {
      margin: 10px 0;
    }
  }
}
</style>
