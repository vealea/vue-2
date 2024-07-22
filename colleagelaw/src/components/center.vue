<template>
  <div
    class="card"
    id="centera"
  >
    <el-card>
      <el-form
        label-width="70px"
        class="login-container"
        :model="form"
        :rules="rules"
        :inline="true"
        ref="form"
      >
        <slot name="title"></slot>
        <el-form-item
          prop="oldPwd"
          label="旧密码"
        >
          <el-input
            v-model="form.oldPwd"
            palceholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPwd"
        >
          <el-input
            v-model="form.newPwd"
            palceholder="请输入新密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submit('form')"
            type="primary"
            class="submit"
          >确认</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>
  
  <script>
import axios from "axios";
import testa from "../function/zhengze";
export default {
  data() {
    var passworrd = (rule, value, callback) => {
      if (testa(value) === false) {
        return callback(new Error("年龄不能为空"));
      } else callback();
    };
    return {
      form: {
        oldPwd: "",
        newPwd: "",
      },
      rules: {
        oldPwd: [
          {
            min: 5,
            max: 15,
            message: "长度在5到15个字符之间",
            trigger: "blur",
            required: true,
          },
          {
            validator: passworrd,
            message: "密码只能包含数字和大小写字母",
            trigger: "blur",
          },
        ],
        newPwd: [
          {
            min: 6,
            max: 15,
            message: "长度在6到15个字符之间",
            trigger: "blur",
            required: true,
          },
          {
            validator: passworrd,
            message: "密码只能包含数字和大小写字母",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: ["id"],
  methods: {
    submit(forma) {
      this.$refs[forma].validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url: "http://8.138.58.77:8806/gdufe/admin/updatePwd",
            data: { id: this.id, ...this.form },
          }).then((data) => {
            console.log(data);
            if (data.data.message == "成功") {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
            if (data.data.data == "密码不一致！") {
              this.$message({
                type: "error",
                message: "旧密码输入错误",
              });
            }
          });
        }
      });
    },
  },
};
</script>
  <style scoped>
.card {
  width: 27%;
  margin: auto;
  height: 60%;
}
.login_title {
  margin-left: 80px;
}
.submit {
  margin-left: 105px;
  margin-top: 10px;
}
</style>
  <style>
#centera .el-card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  padding: 20px;
  color: #303133;
  height: 300px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
</style>