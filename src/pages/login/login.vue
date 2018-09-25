<template>
<div class="container lineTop">
    <div class="bg"></div>
    <div class="login w100">
        <div class="userName lineBottom h45">
          <div class="userIconWrap ">
              <div class="userIcon" :class="{'active':input_active==1}"></div>
          </div>
          <input type="nubmber" v-model="phone" placeholder="请输入11位手机号" @focus="inputFocus(1)" @blur="blur(1)">
        </div>
        <div class="pwd lineBottom h45">
            <div class="pwdIconWrap">
               <div class="pwdIcon" :class="{'active':input_active==2}"></div>
            </div>
            <input v-if="pwdType=='password'" type="password" :focus='eysFocus' v-model="pwd1"  placeholder="请输入密码" @focus="inputFocus(2)" @blur="blur(2)" >
            <input v-if="pwdType=='text'" type="text" :focus='eysFocus' v-model="pwd1"  placeholder="请输入密码" @focus="inputFocus(2)" @blur="blur(2)" >
            <span class="eysIcon" :class="{'active':eysIconShow}" @click="eysChange()"></span>
        </div>
        <div class="fr color9a">忘记密码？</div>
        <div class="loginBtn f18" @click="doLogin()">登录</div>
    </div>
    <div class="thridLoginTitle">
         <div class="tadaySale">
            <span class="fl hcenter"></span>
            <span class="f16 color9a" >第三方登录</span>
            <span class="fr hcenter"></span>
        </div>
    </div>
    <div class="thridLogin">
        <div class="phoneLogin"  @click="$router.push({ path: '/pages/login/loginPhone'})">
            <div class="phoneIcon"></div>
            <div class="color9a">手机号快捷登陆</div>
        </div>
         <button class="wechatLogin" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo">
            <div class="wechatIcon"></div>
            <div>微信号快捷登陆</div>
         </button>
    </div>
  
</div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
export default {
  data() {
    return {
      input_active: false,
      pwdType: "password",
      eysIconShow: false,
      eysFocus: false,
      phone: "",
      pwd1: ""
    };
  },
  components: {},
  created() {},
  methods: {
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        // const data = await getUserInfo();
        // this.userInfo = data.userInfo;



        this.$router.push({ path: "/pages/home/home", isTab: true });
      } else {
        console.log("用户还未授权过");
      }
    },
    // async bindGetUserInfo({ mp }) {
    //   const { detail } = mp;
    //   if (detail.rawData) {
    //     const encryptedData = detail.encryptedData;
    //     const iv = detail.iv;
    //     this.user_Info = detail.userInfo;
    //     const userOpen = this.$store.state.user.userOpen;
    //     let authInfo = "";
    //     try {
    //       authInfo = await this.$http.doAuth(
    //         userOpen.openid,
    //         encryptedData,
    //         iv,
    //         userOpen.session_key,
    //         userOpen.authkey
    //       );
    //     } catch (error) {
    //       this.$tips.alert(error);
    //     }
    //     authInfo['openId'] = authInfo.openid
    //     this.$store.commit("SET_USER_INFO", authInfo);
    //     this.isNoticeAuth = true;
    //   } else {
    //     console.log("用户按了拒绝按钮");
    //     this.isNoticeAuth = true;
    //     return;
    //   }
    // },

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
    inputFocus(e) {
      this.input_active = e;
      if (e == 2) {
        this.eysFocus = true;
      }
    },
    blur(e) {
      this.input_active = false;
      if (e == 2) {
        this.eysFocus = false;
      }
    },
    eysChange() {
      this.eysFocus = !this.eysFocus;
      this.eysIconShow = !this.eysIconShow;
      this.eysIconShow ? (this.pwdType = "text") : (this.pwdType = "password");
    },
   async doLogin() {
      if (!this.$validate.phone(this.phone)) {
        this.$tips.alert("请输入11位手机号");
        return;
      }
      if (
        !this.$validate.pwd(this.pwd1) &&
        !this.$validate.rangelength(this.pwd1, 6, 18)
      ) {
        this.$tips.alert("6-20位字母、数字组合");
        return;
      }
     const res = await this.$http.doPhonePwdLogin(this.phone, this.pwd1);
          if(res.error!=0){
           return this.$tips.alert(res.message)
          }
           res.member['authkey']=res.token
         
          res.member['openId'] = res.member.openid
      this.$store.commit('SET_USER_INFO',res.member)
       this.$router.push({ path: "/pages/home/home", isTab: true });
    
    }
  },
  mounted() {},
  onPullDownRefresh() {},
  onShow() {}
};
</script>
<style  scoped lang='scss'>
.h45 {
  height: 45px;
  line-height: 45px;
}
.container {
  .bg {
    width: 302px;
    height: 179.5px;
    background: url(#{$imgUrl}img_logo.png) no-repeat center center;
    background-size: cover;
    margin: 20px 0 25px 22px;
  }
  .login {
    padding: 0 15px;
    .userName {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .userIconWrap {
        width: 80px;
        display: flex;
        align-items: center;
        .userIcon {
          width: 20px;
          height: 20px;
          background: url(#{$imgUrl}icon_dl_cup.png) no-repeat center center;
          background-size: cover;
          margin-left: 44px;
        }
        .active {
          background: url(#{$imgUrl}icon_dl.png) no-repeat center center;
          background-size: cover;
        }
      }
      input {
        width: 60%;
      }
    }
    .pwd {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      margin-bottom: 11px;
      input {
        width: 60%;
      }
      .pwdIconWrap {
        width: 80px;
        display: flex;
        align-items: center;
        .pwdIcon {
          width: 17.5px;
          height: 20.5px;
          background: url(#{$imgUrl}icon_mm_pitch.png) no-repeat center center;
          background-size: cover;
          margin-left: 45px;
        }
        .active {
          background: url(#{$imgUrl}icon_mm.png) no-repeat center center;
          background-size: cover;
        }
      }
      .eysIcon {
        width: 25.5px;
        height: 9.5px;
        background: url(#{$imgUrl}icon_hide.png) no-repeat center center;
        background-size: cover;

        position: absolute;
        top: 0;
        bottom: 0;
        right: 15px;
        margin: auto 0;
      }
      .active {
        background: url(#{$imgUrl}icon_display.png) no-repeat center center;
        background-size: cover;
      }
    }
  }
  .loginBtn {
    background-color: #ff455d;
    color: #fff;
    height: 47px;
    line-height: 47px;
    text-align: center;
    border-radius: 5px;
    margin-top: 54px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
  }
  .tadaySale {
    width: 230px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    position: relative;
    .fl,
    .fr {
      width: 61.5px;
      height: 1px;
      right: 0;
      background: url("#{$imgUrl}img_splitLine.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
    .fl {
      transform: rotate(180deg);
      left: 0;
    }
  }
  .thridLogin {
    display: flex;
    justify-content: space-between;
    margin-top: 39px;
    .phoneLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 54px;
      .phoneIcon {
        background: url("#{$imgUrl}icon_yanz.png") no-repeat center center;
        background-size: cover;
        width: 14px;
        height: 24px;
        margin-bottom: 15px;
      }
    }
    .wechatLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      .wechatIcon {
        background: url(#{$imgUrl}icon_wx.png) no-repeat center center;
        background-size: cover;
        width: 36px;
        height: 30px;
      }
    }
  }
}
</style>
