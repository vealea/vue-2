<template>
    <div>
        <div class="img">
        <img src="../assets/logo.png" class="icon">
        </div>
    <el-card class="ca">
        <div @click="change()" class="changbuton">{{ changenum }}</div>
        <div v-if="type">
    <el-form label-width="70px" class="login-container" :model="form"  :inline="true" ref="form"> <!--inline表示label和表单输入框在同一行-->
        <h3 class="login_title">系统管理员登录</h3>
        <el-form-item prop="name" label="用户名"> <!--prop的内容要和rules里相应的字段名一一对应-->
            <el-input v-model="form.name" palceholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" palceholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="sumbit()" type="primary"  class="submit" >登录</el-button>
        </el-form-item>
    </el-form>
        </div>
        <div v-else>
            <el-form label-width="70px" class="login-container" :model="form"  :inline="true" ref="form"> <!--inline表示label和表单输入框在同一行-->
        <h3 class="login_title">页面管理员登录</h3>
        <el-form-item prop="name" label="用户名"> <!--prop的内容要和rules里相应的字段名一一对应-->
            <el-input v-model="form.name" palceholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" palceholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="sumbi()" type="primary"  class="submit">登录</el-button>
        </el-form-item>
    </el-form>
        </div>
</el-card>

<el-link type="info" href="https://beian.miit.gov.cn" class="link">粤ICP备2023058845</el-link>
</div>

</template>
<script>
import axios from 'axios'
export default ({
data()
{
    return{
        form:{
            name:'',
            password:''
        },
        type:true,
        
    }
},
methods:{
    change(){
        this.type=!this.type
    },
    sumbi()
    {
        axios({
            method:'post',
            url:'http://8.138.58.77:8806/gdufe/admin/login',
            data:{...this.form,
           }
        }).then((data) =>{
  new Promise((resolve, reject) => {
    
    
  
    if(data.data.message=="成功"&&data.data.data.marks!="first"){
    
        sessionStorage.setItem("token", data.data.data.token);
        sessionStorage.setItem("tok","tree")
        sessionStorage.setItem("id",data.data.data.id)
     
    }
    else{
        
         (

            ()=>{this.$message({
            type:'error',
            message:'用户名或者密码错误'
        })}
        
        )()
        
    }
    resolve()
  })}
).then(() => this.$router.push('/trealist'))
    },
    sumbit()
    {   
        axios({
            method:'post',
            url:'http://8.138.58.77:8806/gdufe/admin/login',
            data:{...this.form,
           }
        }).then((data) =>{
  new Promise((resolve, reject) => {
   
    
  
    if(data.data.message=="成功"&&data.data.data.marks=="first"){
    sessionStorage.setItem("token", data.data.data);
    sessionStorage.setItem("ida",data.data.data.id)}
    else{
        
         (

            ()=>{this.$message({
            type:'error',
            message:'用户名或者密码错误'
        })}
        
        )()
        
    }
    resolve()
  })}
).then(() => this.$router.push('/administratorslist'))
    },
        
},

computed:
{
    changenum()
    {   const num1='切换为页面管理员'
        const num2='切换为系统管理员'
        return this.type?num1:num2
    }
}

})
</script>
<style scoped>
.link{
    margin-top: 150px;  margin-left:690px;
}
.submit{
    margin-left: 105px; margin-top:10px
}
.ca{
    margin:auto;
    width:350px;
    height:320px;
    margin-top:140px;
}
.login_title{
    margin-left: 88px;
}
.changbuton{
    margin-left: 213px;
    margin-top: 1px;
    font-size: 12px;
    color:#00707a;
    background-color: white;
}
.changbuton:hover{
    margin-left: 213px;
    margin-top: 1px;
    font-size: 12px;
    color:#00707a;
    cursor: pointer;
    background-color: white;

}
.icon
{
margin:20px;
}
.img{
    width:100%;
    height:121px;
    background-color: #00707a;
    
}
.beian{
    margin-top:300px ;
}
</style>