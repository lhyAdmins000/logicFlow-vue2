<template>
  <div class="dong-task-canvas" v-loading="loading">
    <el-form
        :model="formData"
        :rules="rules"
        ref="dongForm"
        label-width="100px"
        class="dongForm"
        :disabled="disabled"
    >
      <el-form-item label="发送店铺" prop="shopId" style="margin-top: 16px" >
        <el-select
            v-model="formData.shopId"
            placeholder="请选择发送店铺"
            :style="inputW"
        >
            <el-option :label="userData.shopName" :value="userData.shopId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择客服" prop="customerId" style="margin-top: 16px">
        <el-select
            v-model="formData.customerId"
            placeholder="请选择客服触达用户"
            :style="inputW"
        >
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.customerServicePin"
              :value="item.id"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="选择素材" prop="materialId" style="margin-top: 16px">
        <el-select
            @change="handleChangeMaterials"
            v-model="formData.materialId"
            filterable
            placeholder="请选择素材"
            :style="inputW"
            :filter-method="handleMaterialFilter"
            v-el-select-lazyload="loadSelectMore(rangeNumber)"
        >
            <el-option
                v-for="item in materialsList && materialsList.slice(0, rangeNumber)"
                :key="item.materialId"
                :label="item.materialName"
                :value="item.materialId"
            />
        </el-select>
        <el-popover
          v-if="formData.materialId"
          placement="right"
          width="350"
          popper-class="preview-dong1"
          trigger="click"
        >
            <div class="preview" >
              <el-card class="preview-div">
                  <div class="pre-view-shop-info">
                      <img class="shop-img" src="@/assets/images/yunpin.jpg"/>
                      <span>xxxx旗舰店</span>
                  </div>
                  <div class="preview-html" v-html="previewHtml"></div>
              </el-card>
              <!-- <p class="preview-p">效果预览</p> -->
            </div>
          <el-button class="ml-1" slot="reference" type="text">预览</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="咚咚测试" prop="pin" style="margin-top: 16px">
        <el-tooltip
            class="item"
            effect="dark"
            :content="'请输入用户pin，最多5个，用英文“，”隔开'"
            placement="bottom"
        >
            <el-input
                v-model="pins"
                placeholder="请输入用户pin，最多5个，用英文“，”隔开"
                :style="inputW"
            >
            </el-input>
        </el-tooltip>
        <el-button
            type="primary"
            style="margin-left: 12px"
            @click="handleTestSend()"
            >测试发送</el-button
        >
        <div class="select-tip">
          <p>由于咚咚消息管控原因，用户可能无法收到测试消息</p>
        </div>
      </el-form-item>
    </el-form>
    <!-- <div class="preview">
        <el-card class="preview-div">
            <div class="pre-view-shop-info">
                <img class="shop-img" src="@/assets/images/yunpin.jpg"/>
                <span>xxxx旗舰店</span>
            </div>
            <div class="preview-html" v-html="previewHtml"></div>
        </el-card>
        <p class="preview-p">效果预览</p>
    </div> -->
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
import { getDdCustomerServiceList } from '@/api/ddMessage.js';
// eslint-disable-next-line import/extensions
import { deepClone } from '@/utils/index';

export default {
  directives: {
    'el-select-lazyload': (el, binding) => {
      const selectElem = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
      if (selectElem) {
        selectElem.addEventListener('scroll', () => {
          // eslint-disable-next-line operator-linebreak
          const condition =
            selectElem.scrollHeight - selectElem.scrollTop <= selectElem.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    },
  },
  props: {
    dongFormData: {
        type: Object,
        default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    formData: { // 监听formData中数据 传递给父组件
        deep: true,
        handler(val) {
            this.$emit('update:dongFormData', val);
        },
    },
  },
  data() {
    return {
      inputW: 'width: 400px;',
        formData: {
            shopId: '',
            customerId: '',
            materialId: '',
            materialName: '',
        },
        pins: '', // 测试发送的用户pin
        rules: {
            shopId: [{ required: true, message: '请选择发送店铺', trigger: 'change' }],
            customerId: [{ required: true, message: '请选择客服触达用户', trigger: 'change' }],
            materialId: [{ required: true, message: '请选择素材', trigger: 'change' }],
        },
        allMaterialList: [], // 总素材集合
        materialsList: [], // 素材集合
        customerList: [], // 客服集合
        previewHtml: '',
        rangeNumber: 0, // 下拉分页
        loading: false,
        timer: '', // 搜索间隔
        shortUrl: '',
    };
  },
  computed: {
    userData() {
        return this.$store.state.userdata;
    },
  },
  created() {
    this.getCustomerList();
    this.getMaterialList();
  },
  methods: {
    // 测试发送
    handleTestSend() {
        this.$refs.dongForm.validate((valid) => {
            if (valid) {
                if (!this.pins.trim()) {
                    this.$message.warning('请输入用户pin');
                    return;
                }

                if (this.pins.split(',').length > 5) {
                    this.$message.warning('最多添加5个用户pin');
                    return;
                }
                this.loading = true;
                this.$axios.post('/innovation/web/dd/test/add', {
                    toPins: this.pins,
                    materialId: this.formData.materialId,
                    customerId: this.formData.customerId,
                }).then((res) => {
                    // console.log(res);
                    if (Object.is(res.code, 2000) && res.data) {
                        this.$message.success('发送成功');
                    }
                }).finally(() => {
                    this.loading = false;
                });
            }
        });
    },

    // 咚咚素材表单校验
    handleValidDongForm() {
        return this.$refs.dongForm.validate();
    },

    // 搜索素材
    handleMaterialFilter(query) {
        if (query) {
            if (this.timer != null) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
            this.materialsList = this.materialsList.filter(
                (item) => item.materialName.toLowerCase().includes(query.toLowerCase()),
                // eslint-disable-next-line function-paren-newline
            );
            clearTimeout(this.timer);
            this.timer = null;
            this.rangeNumber = 20;
            }, 300);
        } else {
            this.materialsList = deepClone(this.allMaterialList);
        }
    },

    // 加载更多
    loadSelectMore() {
      // eslint-disable-next-line no-return-assign
      return () => (this.rangeNumber += 20);
    },

    // p标签替换span+br
    handlePToSpan(pToSpan = true, content = '') {
      if (pToSpan) {
        return this.previewHtml.replace(/<p/g, '<span').replace(/<\/p>/g, '</span><br></br>');
      }
      return content.replace(/<span>(.*?)(<br\s*\/?><\/br>)/g, '<p>$1</p>$2').replaceAll('<br></br>', '');
    },

    // 切换素材
    handleChangeMaterials(id) {
        // console.log(id);
        const currentMaterial = this.materialsList.find((item) => item.materialId === id);
        this.formData.materialName = currentMaterial.materialName;
        this.axios
        .get('/innovation/web/material/getDraftById', { params: { id } })
        .then((res) => {
            // console.log(res);
            let content = res.data.content.replace('#NICKNAME#', '#买家昵称#');
            content = this.handlePToSpan(false, content);
            // 设置短链
            if (content.indexOf('#shortUrl#') !== -1) {
                this.loading = true;
                    this.axios
                    .get('/innovation/web/task/short/url', {
                    params: {
                        sourceUrl: res.data.longUrl,
                    },
                    }).then((rs) => {
                        if (Object.is(rs.code, 2000)) {
                            this.shortUrl = rs.data;
                            this.previewHtml = content.replace('#shortUrl#', rs.data);
                            // eslint-disable-next-line max-len
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                this.previewHtml = content;
            }
        });
    },

    // 编辑或复制进入回显
    handleInitData(data) {
        // console.log(data, this.allMaterialList);
        this.formData.shopId = data.shopId;
        this.formData.customerId = data.customerId;
        this.formData.materialId = data.materialId;
        this.loading = true;
        this.$axios
            .get('/innovation/web/task/material/list', {
            params: {
                pageNumber: 1,
                channel: 1,
                pageSize: 99999,
            },
        })
        .then((res) => {
            // console.log(res);
        //   this.loading = false;
            if (Object.is(res.code, 2000)) {
                const list = res.data.rows;
                // 修复分页过多时  回显id的情况
                  // console.log(data.materialId);
                  if (data.materialId) {
                    // eslint-disable-next-line max-len
                    const index = list.findIndex((item) => item.materialId === data.materialId);
                    if (index !== -1) { // 如果找到了对象 obj
                        const obj = list[index];
                        list.splice(index, 1); // 先将它从数组中删除
                        list.unshift(obj); // 然后再将其插入到数组的最前面
                    }
                  }
                  this.materialsList = list || [];
                 this.allMaterialList = deepClone(list);
                // 校验素材是否有效
                const hasMaterial = list.some(
                    (item) => item.materialId === data.materialId,
                );
                if (!hasMaterial) {
                    this.formData.materialId = '';
                    this.$message.warning('当前素材已停用，请更换其他素材');
                } else {
                    // 回显预览
                    this.handleChangeMaterials(data.materialId);
                }
            }
        }).finally(() => {
            this.loading = false;
        });
    },

    // 获取客服
    getCustomerList() {
        getDdCustomerServiceList({
            pageNumber: 1,
            pageSize: 99999,
            openFlag: 1,
        }).then((res) => {
            // console.log(res);
            this.customerList = res.data.rows;
        });
    },

    // 获取素材
    getMaterialList() {
      this.loading = true;
      this.$axios
        .get('/innovation/web/task/material/list', {
          params: {
            pageNumber: 1,
            channel: 1,
            pageSize: 99999,
          },
        })
        .then((res) => {
            // console.log(res);
        //   this.loading = false;
          if (Object.is(res.code, 2000)) {
            this.materialsList = res.data.rows || [];
            this.allMaterialList = deepClone(res.data.rows);
            this.rangeNumber = 20;
          }
        }).finally(() => {
            this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.preview-dong1{

  .preview {
    position: absolute;
    width: 350px;
    display: flex;
    flex-direction: column;
    right: 0;
    top: -82px;
    .preview-p{
      font-size: 16px;
      font-size: 16px;
      margin-top: 5px;
      color: #999;
    }
    .speck{
      line-height: 1.6;
      font-size: 14px;
      color: #999;
      text-align: justify;
      margin-top: 15px;
    }
    .preview-div{
       ::v-deep .el-card__body{
        padding-top:0;
       }
      .pre-view-shop-info{
          display: flex;
          align-items: center;
          .shop-img{
              width: 50px;
              border-radius: 50%;
          }
      }

      .preview-html{
          box-shadow: 0 2px 12px -5px rgba(0,0,0,.7);
          padding: 10px;
          margin-top: 5px;
          border-radius: 16px;
          max-height: 250px;
          overflow: auto;
          ::v-deep a{
            color: #409EFF;
            text-decoration: underline !important;
          }
      }
    }
}
}
</style>
<style lang="scss" scoped>
.dong-task-canvas{
    position: relative;
    .select-tip{
      font-size: 14px;
      color: rgba(246, 162, 52);
      line-height: 1.4;
      margin-top: 10px;
    }
}
</style>
