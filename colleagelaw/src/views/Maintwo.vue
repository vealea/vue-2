<template>
  <div>
    <div class="img">
      <img
        src="../assets/logo.png"
        class="icon"
      >
    </div>
    <div class="header">
      <div class="wrap">
        <div v-if="guanlii">
          <ul class="ula"> 
            <li><a @click="admin()">管理员列表</a><span>|</span></li>
            <li><a @click="treelisl()">树木信息管理</a><span>|</span></li>
            <li><a @click="user()">用户列表</a><span>|</span></li>
            <li><a @click="zhuce()">校友注册</a><span>|</span></li>
            <li><a @click="guanli()">管理员注册</a><span>|</span></li>
          </ul>
          <ul class="ulb">
            <li><a @click="center()">个人中心</a><span></span></li>
            <li
              class="cart"
              @click="quit()"
            ><a href="#">退出登录</a></li>
          </ul>
        </div>
        <div v-else>
          <ul class="ula">
            <li><a @click="treelis()">树木信息管理</a><span>|</span></li>
          </ul>
          <ul class="ulb">
            <li><a @click="cente()">个人中心</a><span></span></li>
            <li
              class="cart"
              @click="quia()"
            ><a href="#">退出登录</a></li>
          </ul>
        </div>
      </div>
    </div> 
    <div class="content">
      <keep-alive include="xiaoyou,guanli"> <router-view></router-view></keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guanlii: true,
    };
  },
  methods: {
    user() {
      this.$router.push("/user");
    },
    quia() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tok");
      this.$router.push("/login");
    },
    quit() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    admin() {
      this.$router.push("/administratorslist");
    },
    treelisl() {
      this.$router.push("/treelist");
    },
    treelis() {
      this.$router.push("/trealist");
    },
    zhuce() {
      this.$router.push("/xiaoyou");
    },
    guanli() {
      this.$router.push("/guanliyuan");
    },
    center() {
      this.$router.push("/center");
    },
    cente() {
      this.$router.push("/guanlicen");
    },
  },
  mounted() {
    if (sessionStorage.getItem("tok") == "tree") {
      this.guanlii = false;
    }
  },
};
</script>

<style scoped>
.icon {
  margin: 20px;
}
.img {
  width: 100%;
  height: 110px;
  background-color: #00707a;
}
.header {
  width: 100%;
  height: 40px;
  background-color: #333;
  margin: 0;
  line-height: 40px; 
}
.wrap {
  width: 1226px;
  margin: 0;
}
.ula {
  margin-right: 300px;
  margin: 0;
  float: left;
}
.ulb {
  margin-top: 0;
  float: right;
}
.header li {
  float: left;
  list-style: none;
}
.header a {
  color: #b0b0b0;
  font-size: 12px;
}
.header span {
  color: #424242;
  margin: 0 3.6px;
  font-size: 12px;
}
.header a:hover {
  color: #fff;
}
.cart {
  width: 90px;
  height: 40px;
  background-color: #424242;
  margin-left: 15px;
  text-align: center;
}
.cart:hover {
  background-color: #fff;
}
.cart:hover > a {
  color: #ff6700;
}
.content {
  margin-top: 50px;
}
</style>