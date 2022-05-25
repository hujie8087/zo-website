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
        <el-table-column label="产品内容">
          <template #default="scope">
            <span v-text="scope.row.content"></span
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
    <el-dialog title="编辑内容" v-model="editVisible" width="80%">
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
        <el-form-item label="产品内容">
          <!-- <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          /> -->
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchData } from '../../api/index';
export default {
  name: 'productsType',
  setup() {
    const query = reactive({
      type: '',
      name: '',
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
    let form = reactive({
      typeId: '',
      name: '',
      content: '',
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      console.log(instance.txt.html());
      // 表单校验
      ruleForm.value.validate((valid) => {
        if (valid) {
          editVisible.value = false;
          ElMessage.success(`修改第 ${idx + 1} 行成功`);
          Object.keys(form).forEach((item) => {
            tableData.value[idx][item] = form[item];
          });
        } else {
          return false;
        }
      });
    };
    const checkShow = (row) => {
      console.log(row);
      // tableData.value.map((item) => {
      //   if (row.id === item.id) {
      //     item.isShow = val;
      //   }
      //   return item;
      // });
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
</style>
