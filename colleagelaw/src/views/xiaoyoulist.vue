<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
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
      <div style="display:flex;">
        <div style="width:286px;margin-left: 1050px;">
          <el-input
            placeholder="请输入要查询的用户编号"
            v-model="uid"
            class="buto"
          ></el-input>
        </div>
        <el-button
          @click="chaxun()"
          type="primary"
          class="buton"
        >查询</el-button>
      </div>
      <el-table
        border
        :cell-style="tableCellStyle"
        :header-cell-style="tableHeaderCellStyle"
        :data="tableData"
        style="width: 93%;margin-left: 50px;"
      >
        <el-table-column
          prop="id"
          label="校友编号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="department"
          label="专业"
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="校友密码"
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
      <div class="ziti"><span style="color:#025662d9">提示：</span>新增用户的密码会被屏蔽，在修改一次密码后密码会被显示</div>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="PageData.limit"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>

    </div>
    <el-link
      type="info"
      href="https://beian.miit.gov.cn"
      class="link"
    >粤ICP备2023058845</el-link>
  </div>
</template>
  <script>
import axios from "axios";

export default {
  data() {
    return {
      uid: null,
      form: {
        phone: "",
        password: 1,
      },
      rules: {
        password: [
          { required: true, message: "请输入密码" },
          {
            min: 6,
            max: 15,
            message: "长度在6到15个字符之间",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
      tableData: [],
      total: 0,
      token: "",
      PageData: {
        page: 1,
        limit: 10,
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              this.getlist();
            });
          } else {
            axios({
              method: "post",
              url: "http://8.138.58.77:8806/gdufe/user/admin/updateUser",
              data: { ...this.form },
            }).then((data) => {
              this.PageData.page = 1;
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
    chaxun() {
      this.total = 1;
      axios({
        method: "get",
        url: `http://8.138.58.77:8806/gdufe/user/admin/getUserById/${this.uid}`,
      }).then((data) => {
        this.tableData.length = 0;
        this.tableData.push(data.data.data);
      });
    },
    edit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    getlist() {
      axios({
        method: "get",
        url: `http://8.138.58.77:8806/gdufe/user/pageUser/${this.PageData.page}/${this.PageData.limit}`,
      })
        .then((data) => {
          this.total = data.data.data.total;
          this.tableData = data.data.data.records;
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
            url: "http://8.138.58.77:8806/gdufe/user/admin/deleteUserById",
            data: [row.id],
          }).then(() => {
            this.$message({
              type: "success",
              message: "成功删除",
            });
            this.getlist();
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
.pager {
  margin-left: 40px;
}
.el-table--border {
  border: 1px solid #ddd;
}
.buto {
  margin-top: -7px;
  margin-bottom: 10px;
}

.ziti {
  font-family: "Courier New", Courier, monospace;
  font-size: small;
  margin-left: 900px;
}
.buton {
  margin-left: 30px;
  margin-top: -7px;
  margin-bottom: 12px;
  margin-right: 54px;
  background-color: #025662d9;
}
.link {
  margin-top: 30px;
  margin-left: 690px;
}
</style>

  
  
  