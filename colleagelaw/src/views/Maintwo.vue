<template>
<div>
    <div class="img">
        <img src="../assets/logo.png" class="icon">
    </div>
    <div class="header">
        
        <div class="wrap">
            <div v-if="guanlii">
            <ul class="ula">  <!--float 属性定义元素在哪个方向浮动。以往这个属性总应用于图像，使文本围绕在图像周围，不过在 CSS 中，任何元素都可以浮动。浮动元素会生成一个块级框，而不论它本身是何种元素。-->
                <li><a @click="admin()">管理员列表</a><span>|</span></li>
                <li><a @click="treelisl()">树木信息管理</a><span>|</span></li>
                <li><a @click="user()">用户列表</a><span>|</span></li>
                <li><a @click="zhuce()">校友注册</a><span>|</span></li>
                
                <li><a @click="guanli()">管理员注册</a><span>|</span></li>
                                                                <!--左浮动和右浮动-->
                <!--div4是浮动元素,div3是一个标准流元素,div4总是保证自己的顶部和上一个元素div3(标准流中的元素)的底部对齐。
                假如某个div元素A是浮动的，如果A元素上一个元素也是浮动的，那么A元素会跟随在上一个元素的后边(如果一行放不下这两个元素，那么A元素会被挤到下一行),
                而如果A元素上一个元素是标准流中的元素，那么A的相对垂直位置不会改变，也就是说A的顶部总是和上一个元素的底部对齐。  -->
                <!--    ul和li都是块级元素   -->
            </ul>
            <ul class="ulb">
                
                <li><a @click="center()">个人中心</a><span></span></li>
                <li class="cart" @click="quit()"><a href="#">退出登录</a></li>

            </ul>
        </div>
        <div v-else>
            <ul class="ula">  <!--float 属性定义元素在哪个方向浮动。以往这个属性总应用于图像，使文本围绕在图像周围，不过在 CSS 中，任何元素都可以浮动。浮动元素会生成一个块级框，而不论它本身是何种元素。-->
                
                <li><a  @click="treelis()">树木信息管理</a><span>|</span></li>
                
                
             
                                                                <!--左浮动和右浮动-->
                <!--div4是浮动元素,div3是一个标准流元素,div4总是保证自己的顶部和上一个元素div3(标准流中的元素)的底部对齐。
                假如某个div元素A是浮动的，如果A元素上一个元素也是浮动的，那么A元素会跟随在上一个元素的后边(如果一行放不下这两个元素，那么A元素会被挤到下一行),
                而如果A元素上一个元素是标准流中的元素，那么A的相对垂直位置不会改变，也就是说A的顶部总是和上一个元素的底部对齐。-->
               
            </ul>
           
            <ul class="ulb" >
                
                <li><a @click="cente()">个人中心</a><span></span></li>
                <li class="cart" @click="quia()"><a href="#">退出登录</a></li>

            </ul>
        
        </div>
            
        </div>
    </div> <!--宽度100%-->
    <div class="content">
   <keep-alive include="xiaoyou,guanli"> <router-view></router-view></keep-alive>
    
    </div>
</div>    
</template>

<script>

export default ({
data()
{
return{
    guanlii:true
}
},
methods:{
    user()
    {
        this.$router.push('/user')
    },
    quia()
    {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("tok")
        this.$router.push('/login')
    },
    quit()
    {
        sessionStorage.removeItem("token")
        this.$router.push('/login')
    },
    admin()
    {
        this.$router.push('/administratorslist')
    },
    treelisl()
    {
       
        this.$router.push('/treelist')
    },
    treelis()
    {
        this.$router.push('/trealist')
    },
    zhuce()
    {
        this.$router.push('/xiaoyou')
    },
    guanli()
    {
        this.$router.push('/guanliyuan')
    },
    center()
    {
        this.$router.push('/center')
    },
    cente()
    {
        this.$router.push('/guanlicen')
    }
},
mounted()
{
    if(sessionStorage.getItem("tok")=="tree")
    {
        this.guanlii=false
    }
}
})
</script>

<style scoped>
.icon
{
margin:20px;
}
.img{
    width:100%;
    height:110px;
    background-color: #00707a;
 
}
.header{
    width:100%;
    height:40px;   
    background-color:#333;
    margin:0;
    line-height:40px;  /*行高等于高时，能居中显示*/
}
.wrap{  /*高度由内容撑开即可*/
    width:1226px;
    margin:0;
    
    }
.ula{
    margin-right: 300px;
    margin:0;
    float:left
}
.ulb{
   
    margin-top:0;
    float:right
}
      /*垂直显示因为li是块元素*/
.header li{
    float:left;
    list-style: none;
}
.header a
{
    color:#b0b0b0;
    font-size:12px;
}
    
.header span
{
    color:#424242;
    margin:0 3.6px;
    font-size:12px;
}
.header a:hover{
    color:#fff
}
.cart{
    width:90px;
    height:40px;
    background-color: #424242;
    margin-left:15px;
    text-align: center;
}
.cart:hover{
    background-color: #fff;
   
}
.cart:hover>a{
    color:#ff6700;
}
.content{
    margin-top:50px;
}
</style>