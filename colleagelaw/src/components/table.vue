<template>
  <div>
    
    <el-dialog  title="图片详情" :visible.sync="dialogVisibl" width="50%" :before-close="handleclo">
   
   <img v-if="!(imagelist.length==0)" :src="imagelist[impage]">
   <div class="pager">
 <el-pagination
 layout="prev, pager, next"
 :total="totalima"
 :page-size="1"
 :current-page.sync="currentPage"
 @current-change="handleima">  <!--表示总的数据条数，一般我们不设置时每页显示10条，所以这里一共5页,此时可以获取页mama-->
</el-pagination>
</div>
   <el-button @click="deleima">删除该页图片</el-button>
   <el-button @click="di=!di" v-if="!di">添加图片</el-button>
<div v-if="di">
 <input type="file" id="file" @change = "addurl" />
</div> 
    </el-dialog>
<el-dialog
title="最新打卡内容"
:visible.sync="dialogVisibla"
width="60%"
:before-close="handleclose">
<div style="margin: auto;width: 100px;font-weight:700;font-size: 17px;margin-bottom: 10px;">打卡图片</div>
<img v-if="!(imgmesslist.length==0)" :src="imgmesslist[imp]">
<span v-else style="margin-bottom: 50px;display: inline-block;">无</span>
   <div class="pag" v-if="!(imgmesslist.length==0)">
 <el-pagination
 layout="prev, pager, next"
 :total="totalimg"
 :page-size="1"
  @current-change="handlemg">  <!--表示总的数据条数，一般我们不设置时每页显示10条，所以这里一共5页,此时可以获取页mama-->
</el-pagination>
</div>
  
<div v-if="!display">
  <div style="margin: auto;width: 100px;font-weight:700;font-size: 17px;margin-bottom: 25px;">打卡文字</div>
<span v-if="form.message">{{ form.message }}</span>
<span v-else>无</span>
</div>
<span slot="footer" class="dialog-footer">
  <div>
   
  <el-button   id="button">删除</el-button> 
  
</div>

</span>

</el-dialog>


    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">  <!--关闭前会调用handleClose方法-->
  <el-form ref="form"  :model="form" label-width="80px" :inline="true"> <!--这里要添加:rules属性来使用验证，即必须填写某些内容-->
    
    <el-form-item label="树木名称:" prop="name">  <!--这里要加上prop来保证使用验证-->
    <el-input  palceholder="请输入新内容" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="学名:" prop="xueming">
      <el-input  palceholder="请输入新内容" v-model="form.scientificName"></el-input>
  </el-form-item>
    <el-form-item label="植树日期:" prop="date">
    <el-input  palceholder="请输入植树时间" v-model="form.time"></el-input>
  </el-form-item>
  <el-form-item label="捐种者:" prop="donator">
    <el-input  palceholder="请输入内容" v-model="form.contribute"></el-input>
  </el-form-item>
  <el-form-item label="图片:" prop="tupian">
    <el-input  palceholder="请输入内容" v-model="form.image"></el-input>
  </el-form-item>
 
  </el-form>
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </span>
</el-dialog>

    <div class="tabel">
      <div class="fle">
      
      <div style="display:flex;">
        <el-input placeholder="请输入要查询的树木编号" v-model="tree" class="buto"></el-input>
        <el-button @click="chaxun()" type="primary" class="buton">查询</el-button>
      </div>
    
      </div>
        <el-table
        border
        :cell-style="tableCellStyle"
        :header-cell-style="tableHeaderCellStyle"
      :data="tableData"
      style="width: 93%;margin-left: 50px;">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="树木名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="scientificName"
        label="学名">
      </el-table-column>
      <el-table-column
        prop="time"
        label="植树日期">
      </el-table-column>
      <el-table-column
        prop="contribute"
        label="捐种者">
      </el-table-column>
      <el-table-column
        label="页面图片">
        <template slot-scope="scope">
        <el-link type="primary" @click="displayimage(scope.row)">详情</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="打卡内容">
        <template slot-scope="scope">
          <el-link type="primary" @click="messdetail(scope.row)">详情</el-link>
          </template>
    </el-table-column>
        <el-table-column
        label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteadmin(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="pager">
    <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="PageData.limit"
    @current-change="handlePage">  <!--表示总的数据条数，一般我们不设置时每页显示10条，所以这里一共5页,此时可以获取页mama-->
  </el-pagination>
  </div>
  <el-link type="info" href="https://beian.miit.gov.cn" style="margin-top: 250px;  margin-left:690px;">粤ICP备2023058845</el-link>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {fetchImg,fetchTreeData,fetchfaTreeData,addTreeData,editTreeData,removeMessage,getList,deleteTreeByIds,getAllMessages}  from '../api/index.js'
import {throttle} from '../function/jieliu'
export default ({
    data() {
        return {
          nowrow:{},
          dialogVisibl:false,
          display:false,
          modelType:0,
          totalimg:0,
          dialogVisible:false,
          dialogVisibla:false,
          messagecords:[],
          oldtableData:[],
          total:1,
          rowsw:{},
          messa:'',
          tree:null,
          di:false,
          imgmesslist:[],
          imp:0,
          currentPage:99999,
          totalima:0,
          impage:0,
          rowtre:{},
          imagelist:[],
          form:{
            trid:99999,
              url:'',
              id:'',
              scientificName:'',
              time:'',
              contribute:'',   
              name:'',
              message:''
          },
          tableData: [{
            date: '2016-05-02',
            name: '0-20',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '21-40',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '41-60',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '61-88',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
          ,
          PageData:{
            page:1,
            limit:10
          }
        }
      },
      props:['dataurl'],
      methods:{
        handlemg(val)
      {
        this.imp=val-1
      },
        handleclose()
    { 
      this.dialogVisibla=false,
      this.display=false
      this.form.message=""
    },
        handleima(val)
      {
        this.impage=val-1
        
      },
      addurl(event)
      {
        const file=event.target.files[0];
        const formData =new FormData()
        formData.append("id",this.trid)
        
        formData.append("file", file)
        
       axios.post(`http://8.138.58.77:8806/gdufe/image/admin/upload/${this.trid}/abc`,formData,{
        'Content-type':'multipart/form-data'
       }).then((data) =>{
       
          if(data.data.code==200)
          {
            this.$message({
                type:'success',
                message:'上传图片成功'
              })
              fetchImg().then((data) =>{
         
            let all=0
            this.imagelist=[]
            this.impage=0
            data.data.data.records.forEach(item =>{
              if(item.tid==this.rowtre.id)
              {
            
                all=all+1
                this.imagelist.push(item.url)
              }
            })
            this.totalima=all
            this.currentPage = 1
           
            var uploadinput=document.getElementById("file");
            uploadinput.value=null;
          })
          }
          else{
            this.$message({
                type:'error',
                message:'上传图片失败'
          })
        }
        
        })
//           axios.post('http://8.138.58.77:8806/gdufe/image/admin/upload/12/https://pic4.zhimg.com/v2-14098590ffdbf8a4a3e0db52c07fdded_r.jpg?source=1940ef5c'
//   ).then((data) =>{
// console.log(data)
//   }) 
      
      },
      deleima()
      {
        let urla =this.imagelist[this.impage]
     
        axios({
          method:'delete',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url:"http://8.138.58.77:8806/gdufe/image/admin/deleteImage",
          data:`url=${urla}`
          
        }).then((data) =>{
        
          fetchImg().then((data) =>{
          
            let all=0
            this.currentPage = 1
            this.imagelist=[]
            data.data.data.records.forEach(item =>{
              if(item.tid==this.rowtre.id)
              {
          
                all=all+1
                this.imagelist.push(item.url)
              }
            })
            this.totalima=all
            this.impage=0
        
          })
        
        } )
      },
        chaxun()
        { 
          this.total=1
          console.log(this.guanliid)
          if(sessionStorage.getItem('id')!==null){
          fetchTreeData(this.guanliid).then(data =>{
          this.recod=data.data.data.records
          this.tableData=[];
          this.recod.forEach(item =>{
           
            if(item.id==this.tree)
            {              
              this.tableData.push(item)
            }
          })
        })}
        else{
          fetchfaTreeData().then(data =>{
          
          this.recod=data.data.data.records
          this.tableData=[];
          this.recod.forEach(item =>{
           
            if(item.id==this.tree)
            {
              
              this.tableData.push(item)
            }
          })
        })
        }
        },
        submit()
        {
          this.$refs.form.validate((valid) => {
            if(valid) //若有必须填的内容没填，那么会返回false
            {
              
              if(this.modelType===0)
              {
             
               

                
               addTreeData(this.form).then(()=>{
                  this.PageData.page=1
                  this.getlist()
                })
              }
              else{
                
                editTreeData(this.form).then(() => {
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
      displayimage(row)
    {
      this.rowtre=row
      this.imagelist=[]
     
      this.cid=row.contributeId
      this.trid=row.id
   
      this.tableData.forEach(item =>{
        if(item.id==row.id)
        {
          fetchImg().then((data) =>{
          
            let all=0
            data.data.data.records.forEach(item =>{
              if(item.tid==this.trid)
              {
                all=all+1
                this.imagelist.push(item.url)
              }
            })
            this.totalima=all
         
          })
        }
        
      })
      
      this.dialogVisibl=true
      
    },
      messdetail(row)
      {
this.display=false
getAllMessages().then((data) => {
  
  this.nowrow=row
  // console.log(data.data.data.records)
   this.messagecords=data.data.data
   this.imp=0;
   this.messagecords.forEach(item=> {
   if(item.tid==row.id&&item.isVisible==1)
     {
      this.imgmesslist=item.msgList
       this.form.message=item.messages
  //     this.$set(this.form,"message",item.messages)
     }
   })}).then(() =>{
     
    this.totalimg=this.imgmesslist.length
     this.dialogVisibla=true
  this.rowsw=row
  })
 
    var content=document.getElementById("button")
    console.log(content)
    content.addEventListener("click",throttle(this.send,2500))
    console.log('click')
  // this.form.createTime=data.data.data.createTime
  // this.form.id=data.data.data.id
  // this.form.message='这是一条留言ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  // this.form.uid=data.data.data.uid
  // this.form.tid=data.data.data.tid
 
}



      ,
      handleclo()
    {
       this.dialogVisibl=false
       this.di=false
    },
      handleclose()
      { 
        this.dialogVisibla=false,
        this.display=false
        this.form.message=""
      },
    
      handleClose()
      {
        this.$refs.form.resetFields()
        this.dialogVisible=false
        },
        edit(row)
        {
          this.modelType=1
          this.dialogVisible=true
          console.log(this.form)
          this.form=JSON.parse(JSON.stringify(row))
        
          
        },
        cancel()
        {
           this.$refs.form.resetFields()
        this.dialogVisible=false
        },
        send()
      {
        console.log('删除一次')
        // removeMessage(this.nowrow.id).then((data)=>{
     
        //   if(data.data.data=='删除成功！')
        //     {
        //       this.$message({
        //         type:'success',
        //         message:'删除留言成功'
        //       })
        //     }
        //     else if(data.data.data=='删除失败！')
        //     {
        //       this.$message.error('消息已为空，无法删除');
        //     }
        // })
      },
      
        handlePage(val)
      {

      this.PageData.page =val  //拿到此时的页码
      this.getlist()
      },
      getlist(){
      getList(this.dataurl,this.PageData.page,this.PageData.limit).then(data=>{
     
      // this.tableData=data.data.list
      this.tableData=data.data.data.records
      this.total=data.data.data.total
      this.oldtableData=this.tableData.slice()
      console.log(this.tableData)
      // this.total=data.data.count
  
    })
    .catch(function (error) {
      console.log(error);
    }); 
            },
        deleteadmin(row)
        {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
        
        //   axios.delete("/api/gdufe/tree/admin/deleteTreeByIds", {data:{id:[row.id]}})
        //   .then(function() {
        //     console.log('right')
        //     }
        // )
        deleteTreeByIds(row.id).then(()=>{
          
          this.getlist()
        })
      })
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

        this.guanliid=sessionStorage.getItem("id"),
        console.log('111')
        this.getlist()
     
      setTimeout(function()
      {
      let count = 0;
      var imgs=[]
      //用require的方式添加图片地址，直接添加图片地址的话，在build打包之后会查找不到图片，因为打包之后的图片名称会有一个加密的字符串
      axios({
            url:`http://8.138.58.77:8806/gdufe/image/pageImage/1/5000`
              }).then((data) =>{
                data.data.data.records.forEach(item =>{
                  imgs.push(item.url)
                  
                })
              }).then(()=>{
                console.log(imgs);
      for (let img of imgs) {
          let image = new Image();//Image 对象  ，Image 对象代表嵌入的图像。<img> 标签每出现一次，一个 Image 对象就会被创建。创建一个Image对象：var a=new Image();    定义Image对象的src: a.src=”xxx.jpg”;    这样做就相当于给浏览器缓存了一张图片。
          image.onload = () => {   //onload 事件在图片加载完成后立即执行。   创建一个Image对象：var a=new Image();    定义Image对象的src: a.src=”xxx.gif”;    这样做就相当于给浏览器缓存了一张图片。
              count++;
          };
          image.src = img;
      }
      console.log('加载完成')
              })
    
      },3500)
      
  
      }
})
</script>
<style scoped>
.tabel{
margin-left:auto;
}
.fle{
  display: flex;
  justify-content: space-between;
}
.buto{
    width:300px;
    margin-top: -7px;
    margin-bottom: 20px;
    margin-left:1020px;
}
.buton{
  height:40px;
  margin-left: 30px;
    margin-top: -7px;
    margin-bottom: 12px;
    margin-right: 54px;
    background-color: #025662d9;
}
.el-table--border{
  border:1px solid #DDD
}
.inputcla{
  margin-bottom:30px;
}
img{
  margin-left:25%;
  width:50%;
  height:50%
}
.pag{
margin-bottom:50px ;
}
</style>