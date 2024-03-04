<template>
  <div class="card">
  <el-card>
  <el-form label-width="70px" class="login-container" :model="form" :rules="rules" :inline="true" ref="form"> <!--inline表示label和表单输入框在同一行-->
        <h3 class="login_title">班级管理员注册</h3>
        <el-form-item prop="name" label="用户名"> <!--prop的内容要和rules里相应的字段名一一对应-->
            <el-input v-model="form.name" palceholder="请输入账号,只能包含大小写字母和数字组合"
 ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" palceholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit('form')" type="primary" class="submit" >注册</el-button>
        </el-form-item>
    </el-form>
    
  </el-card>
</div>
</template>

<script>
import axios from 'axios'
import testa from '../function/zhengze'
export default ({
  name:'guanli',
    data() {
      var passworrd = (rule, value, callback) => {
        if (testa(value)===false) {
          return callback(new Error('年龄不能为空'));
        }
        else callback()
      
      };
      return {  
        
        form: {
      password:'',
      name:''
        },
        rules:{
          name:[
          {
            min:3,max:18,message:'用户名请在3位到18位之间',trigger:'blur',required:true
          }
          ],
         password:[
          
            {
              min:6,max:15,message:'长度在6到15个字符之间',trigger: 'blur',required:true
            },
            {
              validator: passworrd,message:'密码只能包含数字和大小写字母',trigger:'blur'
            }
          ]
        }
      }
    },
    methods: {
      submit(forma) {
       
        this.$refs[forma].validate((valid) => { 
                               //validate是需要跟rules配套使用，否则即使提示密码位数不足也会将密码和用户名提交到后端
        if(valid){
        
          axios({
            method:'post',
            url:'http://8.138.58.77:8806/gdufe/admin/addAdmin',
            data:{...this.form
            }
          }).then(data => {
            if(data.data.message=='成功')
            {
              this.$message({
                type:'success',
                message:'注册成功'
              })
            }
          })
      }})},
     
    }
})

</script>
<style scoped>
.login_title{
  margin-bottom:45px;
}
.card{
  width:60%;
  margin:auto
}
.submit{
  margin-left: 105px; margin-top:10px
}
</style>
<style>
  input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }

</style>