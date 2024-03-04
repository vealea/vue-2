<template>
    <div>
      <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
    >  <!--关闭前会调用handleClose方法-->
    <el-form ref="form" :rules="rules" :model="form"  :inline="true"> <!--这里要添加:rules属性来使用验证，即必须填写某些内容-->
    <el-form-item label="请输入新密码:" prop="password" label-width="145px" >
      <el-input  palceholder="请输入新密码" v-model="form.password"></el-input>
    </el-form-item>
    </el-form>
   
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
      <div class="tabel">
        <div style="display:flex;">
          <div style="width:286px;margin-left: 1050px;">
        <el-input placeholder="请输入要查询的用户编号" v-model="uid"  class="buto"></el-input></div>
        <el-button @click="chaxun()" type="primary" class="buton">查询</el-button>
      </div>
          <el-table
          border
          :cell-style="tableCellStyle"
          :header-cell-style="tableHeaderCellStyle"
        :data="tableData"
        style="width: 93%;margin-left: 50px;">
        <el-table-column
          prop="id"
          label="校友编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="180">
        </el-table-column>
        <el-table-column
          prop="department"
          label="专业"
          width="180">
        </el-table-column>
       
        <el-table-column
          prop="phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        
        <el-table-column
          prop="password"
          label="校友密码">
        </el-table-column>
         
          <el-table-column
          label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deletea(scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="ziti"><span style="color:#025662d9">提示：</span>新增用户的密码会被屏蔽，在修改一次密码后密码会被显示</div>
    <div class="pager">
      <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="PageData.limit"
      @current-change="handlePage">  <!--表示总的数据条数，一般我们不设置时每页显示10条，所以这里一共5页,此时可以获取页mama-->
    </el-pagination>
    </div>
      
      </div>
      <el-link type="info" href="https://beian.miit.gov.cn" class="link">粤ICP备2023058845</el-link>
    </div>
  </template>
  <script>
  import axios  from 'axios';
  
  export default ({
      data() {
          return {
            uid:null,
            form:{
              phone:'',
              password:1,
            },
            rules:{
              password:[{required:true,message:'请输入密码'},
            {min:6,max:15,message:'长度在6到15个字符之间',trigger: 'blur'}
          ]
            },
            dialogVisible:false,
            tableData: [],
            total:0,
            token:'',
            PageData:{
              page:1,
              limit:10
            }
          }
        },
        methods:{
          submit()
          {
            this.$refs.form.validate((valid) => {
              if(valid) //若有必须填的内容没填，那么会返回false
              {
                
                if(this.modelType===0)
                {
                 
                  
                  addUser(this.form).then(() => {
                    this.getlist()
                  })
                }
                else{
                  
                  
                  axios({
                    method:'post',
                    url:'http://8.138.58.77:8806/gdufe/user/admin/updateUser',
                    data:{...this.form}}).then((data) => {
                    
                      this.PageData.page=1
                    this.getlist()
                  })
                }
               //form可以获得提交的内容
                this.$refs.form.resetFields()  //提交时也要清空表单数据
                this.dialogVisible=false
                //
              }
          })
        },
        handleClose()
        {
          this.$refs.form.resetFields()
          this.dialogVisible=false
        },
        chaxun()
        {
          this.total=1
          axios({
            method:'get',
            url:`http://8.138.58.77:8806/gdufe/user/admin/getUserById/${this.uid}`
          }).then((data) =>{
            this.tableData.length=0
           
            this.tableData.push(data.data.data)
          })
        },
          edit(row)
          {
            this.modelType=1
            this.dialogVisible=true
            this.form=JSON.parse(JSON.stringify(row))
        
          },
          getlist()
          {
             
              axios({method:'get',
                url:`http://8.138.58.77:8806/gdufe/user/pageUser/${this.PageData.page}/${this.PageData.limit}`, //这种方式可以在url后拼接参数，而且不一定是?url方式,这个例子为/1/3
                
    })
    .then(data => {
      // this.tableData=data.data.list 
      // this.total=data.data.count
  
      this.total=data.data.data.total
   
      this.tableData=data.data.data.records //箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者——vue对象,匿名函数中的this指向的是windows，和全局变量一样。
    
    })
    .catch(function (error) {
      console.log(error);
    });  },
    cancel()
    {
      this.$refs.form.resetFields()
      this.dialogVisible=false
    },
    deletea(row)
    {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
            axios({
              method:'delete',
              url:'http://8.138.58.77:8806/gdufe/user/admin/deleteUserById',
              data:[row.id]

              
            }).then(() =>{
              this.$message({
                type:'success',
                message:'成功删除'
              })
              this.getlist()
            })
          }).catch(() =>{
            this.$message({
              type:'info',
              message:'已取消删除'
            })
          })
    },  
          handlePage(val)
        {

  this.PageData.page =val  //拿到此时的页码
  this.getlist()
        },
          tableCellStyle () {
     return 'border:1px solid #DDD'
   },
   tableHeaderCellStyle () {
    return 'border:1px solid #DDD'
  }
        },
        mounted()
        {
          this.getlist()
        },
         
      created(){
          //页面加载时就从本地通过localstorage获取存储的token值
        const token = sessionStorage.getItem("token");
       
      },
  })
  </script>
  <style scoped>
  .pager{
    margin-left: 40px;
  }
  .el-table--border{
    border:1px solid #DDD
  }
  .buto{

margin-top: -7px;
margin-bottom: 10px;
}

.ziti{
  font-family:'Courier New', Courier, monospace;
  font-size: small;margin-left: 900px;
}
.buton{
  margin-left: 30px;
    margin-top: -7px;
    margin-bottom: 12px;
    margin-right: 54px;
    background-color: #025662d9;
}
.link{
  margin-top: 30px; margin-left:690px 
}
  </style>
  <style>
 
  </style>
  
  
  