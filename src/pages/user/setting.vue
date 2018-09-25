<template>
  <div class="container lineTop">
    <div class="w100">
      <div class="quit_login f18" @click="quitLogin">退出登录</div>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {

      };
    },
    components: {},
    computed() {},
    methods: {
      //退出
      async quitLogin() {
        // this.$store.state.user.userOpen=null;
        // this.$store.state.user.userInfo=null;

        // this.$store.commit("SET_USER_OPEN", "");
        this.$store.commit("SET_USER_INFO", "");

         this.$router.push({ path: '/pages/login/loginIndex', reLaunch: true })
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    mounted() {},
    onPullDownRefresh() {},
    async onShow() {}
  };

</script>
<style scoped lang='scss'>
  .container {
    .quit_login {
      position: fixed;
      z-index: 1;
      left: 0;
      right: 0;
      bottom: 30rpx;
      width: 690rpx;
      height: 94rpx;
      text-align: center;
      line-height: 94rpx;
      color: #fff;
      background: #ff455d;
      border-radius: 10rpx;
      margin: 0 auto;
      text-align: center;
      display: block !important;
    }
  }
</style>
