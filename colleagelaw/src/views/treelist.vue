<template>
  <div>
    <eltable :dataurl="this.dataurl">
   
  </eltable>
   
  </div>
</template>
<script>
import eltable from '../components/table.vue'
import axios from 'axios'
export default ({
    data() {
        return {
          dataurl:'',
          guanliid:99999
        }
      },
      components:{
        eltable:eltable
      },
     
      beforeMount()
      {alert('1111')
        
        this.dataurl="http://8.138.58.77:8806/gdufe/tree/pageTree"          
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