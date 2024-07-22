<template>
  <div class="card">
    <el-card class="car">
      <el-form
        label-width="70px"
        class="login-container"
        :model="form"
        :rules="rules"
        :inline="true"
        ref="form"
      >
        <h3 class="login_title">校友用户注册</h3>
        <el-form-item
          prop="phone"
          label="手机号"
        >
          <el-input
            v-model="form.phone"
            palceholder="请输入账号,只能包含大小写字母和数字组合"
            v-int
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            palceholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="form.username"
            palceholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="专业"
          prop="department"
        >
          <el-input
            v-model="form.department"
            palceholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grade"
        >
          <el-select
            v-model="form.grade"
            placeholder="请选择"
          >
            <el-option
              v-for="item in yearsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submit('form')"
            type="primary"
            class="submit"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import testa from "../function/zhengze";

export default {
  name: "xiaoyou",
  data() {
    var passworrd = (rule, value, callback) => {
      if (testa(value) === false) {
        return callback(new Error("年龄不能为空"));
      } else callback();
    };
    return {
      yearsList: [],
      form: {
        department: "",
        grade: "",
        username: "",
        password: "",
        phone: "",
      },
      rules: {
        phone: [
          {
            min: 10,
            max: 11,
            message: "手机号码格式不对",
            trigger: "blur",
            required: true,
          },
        ],
        password: [
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
        grade: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        username: [
          {
            min: 2,
            max: 10,
            message: "输入内容长度在2到10个字符",
            trigger: "blur",
            required: true,
          },
        ],
        department: [
          {
            min: 3,
            max: 10,
            message: "输入内容长度在3到10个字符",
            trigger: "blur",
            required: true,
          },
        ],
      },
    };
  },

  methods: {
    initYears() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      this.initSelectYear(year);
    },
    initSelectYear(year) {
      this.yearsList = [];
      for (let i = 0; i < 41; i++) {
        this.yearsList.push({ value: year - i, label: year - i + "年" });
      }
    },
    submit(forma) {
      this.$refs[forma].validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url: "http://8.138.58.77:8806/gdufe/user/admin/addUser",
            data: { ...this.form },
          }).then((data) => {
            if (data.data.message == "成功") {
              this.$message({
                type: "success",
                message: "注册成功",
              });
            }
          });
        }
      });
    },
  },
  mounted() {
    this.initYears();
  },
};
</script>
<style scoped>
.submit {
  margin-left: 105px;
  margin-top: 10px;
}
.login_title {
  margin-bottom: 45px;
  margin-left: 96px;
}
.car {
  height: 480px !important;
}
.card {
  width: 29%;
  height: 500px;
  margin: auto;
}

.login-container {
  margin-left: 29px;
}
</style>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>