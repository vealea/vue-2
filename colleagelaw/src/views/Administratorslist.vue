<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
      label-width="100px"
    > 
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="200px"
        :inline="true"
      > 
        <el-form-item
          label="请输入新密码:"
          prop="password"
          label-width="145px"
        >
          <el-input
            palceholder="请输入新密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel()">取 消</el-button>
        <el-button
          type="primary"
          @click="submit()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <div class="tabel">
      <el-table
        border
        :cell-style="tableCellStyle"
        :header-cell-style="tableHeaderCellStyle"
        :data="tableData"
        style="width: 93%;margin-left: 50px;"
      >
        <el-table-column
          prop="id"
          label="管理员编号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="管理员姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="管理员密码"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deletea(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>

    </div>
    <el-link
      type="info"
      href="https://beian.miit.gov.cn"
      style="margin-top: 250px;  margin-left:690px;"
    >粤ICP备2023058845</el-link>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
          },
          {
            min: 6,
            max: 15,
            message: "长度在6到15个字符之间",
            trigger: "blur",
          },
        ],
      },
      form: {},
      dialogVisible: false,
      tableData: [],
      total: 0,
      token: "",
      PageData: {
        page: 1,
        limit: 5,
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            axios({
              method: "post",
              url: "http://8.138.58.77:8806/gdufe/admin/updateAdmin",
              data: { ...this.form },
            }).then(() => {
              this.getlist();
            });
          }
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    edit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      console.log(row);
      this.form = JSON.parse(JSON.stringify(row));
    },
    getlist() {
      axios({
        method: "get",
        url: `http://8.138.58.77:8806/gdufe/admin/pageUser/${this.PageData.page}/${this.PageData.limit}`, 
      })
        .then((data) => {
          this.total = data.data.data.total;
          this.tableData = data.data.data.records;
          this.tableData = this.tableData.filter((item) => item.id != 1);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cancel() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    deletea(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios({
            method: "delete",
            url: "http://8.138.58.77:8806/gdufe/admin/deleteAdminById",
            data: [row.id],
          }).then(() => {
            this.getlist();
            this.$message({
              type: "success",
              message: "成功删除",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handlePage(val) {
      this.PageData.page = val; 
      this.getlist();
    },
    tableCellStyle() {
      return "border:1px solid #DDD";
    },
    tableHeaderCellStyle() {
      return "border:1px solid #DDD";
    },
  },
  mounted() {
    this.getlist();
  },
  created() {
    const token = sessionStorage.getItem("token");
  },
};
</script>
<style scoped>
.el-table--border {
  border: 1px solid #ddd;
}
</style>


