<template>
  <div>
    <ecenter :id="id"><template slot="title">
        <h3 class="login_title">系统管理员密码修改</h3>
      </template></ecenter>
  </div>
</template>

<script>
import center from "../components/center.vue";
export default {
  data() {
    return {
      id: "",
    };
  },
  components: {
    ecenter: center,
  },
  methods: {},
  mounted() {
    this.id = sessionStorage.getItem("ida");
  },
};
</script>
<style scoped>
.login_title {
  margin-left: 80px;
}
</style>