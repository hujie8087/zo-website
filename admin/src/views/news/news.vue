<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select
          v-model="query.type"
          placeholder="选择产品类别"
          class="handle-select mr10"
        >
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input
          v-model="query.name"
          placeholder="输入产品名称"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
          >新增</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="typeName"
          label="产品类别"
          width="100"
        ></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column label="产品内容" width="400">
          <template #default="scope">
            <div v-text="scope.row.content" class="text-overflow"></div
          ></template>
        </el-table-column>
        <el-table-column label="产品大图" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.maxImg"
              :preview-src-list="[scope.row.maxImg]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="产品小图" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.minImg"
              :preview-src-list="[scope.row.minImg]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" align="center" width="80">
          <template #default="scope">
            <el-checkbox
              v-model="scope.row.isShow"
              @change="checkShow(scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" align="center" width="80">
          <template #default="scope">
            <el-checkbox
              v-model="scope.row.isRelevant"
              @change="checkShow(scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" width="80" align="center"
          ><template #default="scope">
            <el-input-number
              v-model="scope.row.order"
              :controls="false"
              @blur="setOrder(scope.row)"
              size="mini"
              :min="1"
              :max="1000"
              style="width: 100%"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog
      title="编辑内容"
      v-model="editVisible"
      width="80%"
      @close="cancelEdit"
    >
      <el-form
        label-width="100px"
        :model="form"
        :rules="formRules"
        ref="ruleForm"
      >
        <el-form-item label="产品类别" prop="typeId">
          <el-select
            v-model="form.typeId"
            placeholder="选择产品类别"
            class="handle-select mr10"
          >
            <el-option key="1" label="广东省" value="1"></el-option>
            <el-option key="2" label="湖南省" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="产品内容"> <div ref="editor"></div></el-form-item>
        <el-form-item label="产品大图">
          <el-upload
            class="avatar-uploader"
            action="https://www.fastmock.site/mock/c1e5a5d1eaff7d422ff79301d9adc355/api/upload-img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.maxImg" :src="form.maxImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品小图">
          <el-upload
            class="avatar-uploader"
            action="https://www.fastmock.site/mock/c1e5a5d1eaff7d422ff79301d9adc355/api/upload-img"
            :show-file-list="false"
            :on-success="handleImgSuccess"
          >
            <img v-if="form.minImg" :src="form.minImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-checkbox v-model="form.isShow"></el-checkbox>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-checkbox v-model="form.isRelevant"></el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import WangEditor from 'wangeditor';
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchData } from '../../api/index';
export default {
  name: 'productsType',
  setup() {
    const query = reactive({
      type_id: '',
      news_title: '',
      pageIndex: 1,
      pageSize: 10,
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    const ruleForm = ref();
    const formRules = reactive({
      typeId: [{ required: true, message: '请选择产品类别', trigger: 'blur' }],
      name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
    });
    // 获取表格数据
    const getData = () => {
      fetchData(query).then((res) => {
        tableData.value = res.data;
        console.log(tableData);
        pageTotal.value = res.total || 50;
      });
    };
    getData();
    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        type: 'warning',
      })
        .then(() => {
          ElMessage.success('删除成功');
          tableData.value.splice(index, 1);
        })
        .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    const editor = ref(null);
    let instance;
    const content = reactive({
      html: '',
      text: '',
    });
    let form = reactive({
      typeId: '',
      name: '',
      content: '',
      isShow: '',
      isRelevant: '',
      order: '',
      maxImg: '',
      minImg: '',
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
      setTimeout(() => {
        console.log(ruleForm.value);
        if (instance) return;
        instance = new WangEditor(editor.value);
        instance.config.zIndex = 1;
        instance.config.uploadImgServer =
          'https://www.fastmock.site/mock/c1e5a5d1eaff7d422ff79301d9adc355/api/upload-img';
        instance.config.uploadImgAccept = [
          'jpg',
          'jpeg',
          'png',
          'gif',
          'bmp',
          'webp',
        ];
        instance.create();
        instance.txt.html(form.content);
      }, 0);
    };
    // 新增数据
    const handleAdd = () => {
      editVisible.value = true;
      setTimeout(() => {
        if (instance) return;
        instance = new WangEditor(editor.value);
        instance.config.zIndex = 1;
        instance.create();
        instance.txt.html(form.content);
      }, 0);
    };
    const saveEdit = () => {
      form.content = instance.txt.html();
      // 表单校验
      ruleForm.value.validate((valid) => {
        if (valid) {
          editVisible.value = false;
          ElMessage.success(`修改第 ${idx + 1} 行成功`);
          Object.keys(form).forEach((item) => {
            tableData.value[idx][item] = form[item];
          });
          instance.destroy();
          instance = null;
        } else {
          return false;
        }
      });
    };
    const cancelEdit = () => {
      editVisible.value = false;
    };
    const checkShow = (row) => {
      console.log(row);
    };
    const setOrder = (row) => {
      console.log(row.order);
    };
    const handleAvatarSuccess = (res, file) => {
      form.maxImg = res.data[0].url;
    };
    const handleImgSuccess = (res, file) => {
      form.minImg = res.data[0].url;
    };
    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      form,
      formRules,
      ruleForm,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      checkShow,
      cancelEdit,
      content,
      editor,
      handleAdd,
      setOrder,
      handleAvatarSuccess,
      handleImgSuccess,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.text-overflow {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.avatar-uploader {
  width: 200px;
  height: 200px;
}
.avatar-uploader /deep/ .el-upload {
  width: 200px;
  height: 200px;
}
.avatar-uploader /deep/ .el-upload img {
  width: 100%;
  height: 100%;
}
</style>
