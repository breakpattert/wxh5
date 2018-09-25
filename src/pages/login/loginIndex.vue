<template>
<div class="container lineTop">
    <div class="fullPage">
          <h4 class="logo">
          	乐享购物，精彩生活
          </h4>
          <div class="bg">
          	<img src="../../../static/images/img_backk.png" alt="" />
          
          </div>
          <div class="loginRegiter">
              <div class="login mr38 f18" @click="$router.push({ path: '/pages/login/login'})">登录</div>
              <div class="regiter f18" @click="$router.push({ path: '/pages/login/register'})">注册</div>
          </div>
          <button  open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" class="wechat">
              <span class="icon"></span>
              <span class=" mr7">微信快捷登录</span>
              <span class="glt">>></span>
          </button>
    </div>

</div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        const data = await getUserInfo();
        this.userInfo = data.userInfo;
        this.$router.push({ path: '/pages/home/home',isTab: true })
       
      } else {
        console.log("用户还未授权过");
      }
    },
     async bindGetUserInfo({ mp }) {
      const { detail } = mp;
      if (detail.rawData) {
        const encryptedData = detail.encryptedData;
        const iv = detail.iv;
        this.user_Info = detail.userInfo;
        if(!this.$store.state.user.userOpen){
     
              await this.getUserOpen();
               this.getAllProducts();
              
        }
        const userOpen = this.$store.state.user.userOpen;
        let authInfo = "";
        
        try {
          authInfo = await this.$http.doAuth(
            userOpen.openid,
            encryptedData,
            iv,
            userOpen.session_key,
            userOpen.authkey
          );
        } catch (error) {
          this.$tips.alert(error);
        }
       
        authInfo['openid'] = "sns_wa_" + authInfo.openId;
        authInfo.openId = "sns_wa_" + authInfo.openId;
        this.$store.commit("SET_USER_INFO", authInfo);
        this.$store.commit("SET_DO_AUTH", true);
        this.isNoticeAuth = true;
          
      if(authInfo){
        this.$router.push({ path: "/pages/home/home", isTab: true });
      }
   

      } else {
        console.log("用户按了拒绝按钮");
        this.isNoticeAuth = true;
        return;
      }
    },
  },
  mounted() {
    // this.hasauth();

    // login().then(res => {
    //   console.log(res);
    // });
  },
  onPullDownRefresh() {},
  onShow() {}
};
</script>

<style  scoped lang='scss'>
    .container{
        .fullPage{
          background: #f2f2f2;
          justify-content:flex-start;
            .logo{
              width: 280.5px;
              height: 36.5px;
				text-align: center;
               margin: 136px 0 34px 26px;
               font-size: 16px;
               color: #323232;
               font-family: FZZHYJW--GB1-0;
            }
            .bg{
              
              /* background-size: cover;*/
              width: 335.5px;
			height: 107.5px;
               margin: 0 auto;
               margin-bottom:78px;
               margin-top:55px;
               padding:15px 0;
               img{
               	width: 100%;
               	height:100%
               }
            }
            .loginRegiter{
                margin: 30px 0 30px 0;
                text-align: center;
                .login,.regiter{
                  display: inline-block;
                  height: 47px;
                  width: 120px;
                  line-height: 47px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 3px 3px 1px #ccc;
                }
               
            }
            .wechat{
              text-align: center;
              border:none;
              outline: none;
              background: #f2f2f2;
                .icon{
                  display: inline-block;
                  vertical-align: middle;
                  background: url(#{$imgUrl}icon_wx.png) no-repeat center center;
                  background-size: cover;
                  width: 36px;
                  height: 30px;
                  margin-right: 18px;
                }
            }
            
        }
    }

   
</style>
