<template>
<div class="container lineTop">
      <div class="userInfo">
          <div class="header lineBottom" @click="joinPicture">
            <span >头像</span>
            <img class="mr42" :src="avatarUrl" alt="">
            <div class="arrow"></div>
          </div>
          <div class="userName lineBottom" @click="hasmobile&&$router.push({ path:'/pages/login/bindPhone'})">
            <span>手机号</span>
            <div class="arrow" v-if="hasmobile"></div>
            <p>{{mobile}}</p>
          </div>
          <!-- <div class="nickName lineBottom">
            <span>昵称</span>
            <div class="arrow"></div>
          </div> -->
 
          <div class="sex lineBottom">
           
          <picker @change="bindPickerChange" :value="index" :range="array">
					    <view class="picker" style="padding-left:15px">
					      	性别：
					    </view>
  				</picker>
            <p>{{array[index]}}</p>
            <div class="arrow"></div>
          </div>
          <div class="brth lineBottom">
            <span>出生日期</span>
            <picker mode="date" :value="date" start="1900-09-01" end="2018-09-01" @change="bindDateChange">
              <p class="picker">
                <span> {{date}}</span>
              </p>
            </picker>

            
            <div class="arrow"></div>
          </div>

          <div class="newAress f18" @click="upDate">确认修改</div>
      </div>

  
</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { uploadFile, chooseImage, showActionSheet } from "@/utils/wechat";
export default {
  data() {
    return {
      date: "",
      start: "",
      end: "",
      array: ["女", "男"],
      index: "",
      avatarUrl:'',
      mobile:'未注册',
      hasmobile:true
    };
  },
  components: {},
  computed() {},
  methods: {
    //添加图片
    async joinPicture(e) {
      const [err, res] = await this._to(
        showActionSheet(["从相册中选择", "拍照"])
      );
      if (res == 0) {
        chooseImage("album").then(async path => {
          const data = await uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data=>{
              this.avatarUrl = JSON.parse(data.data).result.url;
          });
          
        });
      } else {
        chooseImage("camera").then(async path => {
          const data = await uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data=>{
              this.avatarUrl = JSON.parse(data.data).result.url;
          });
        });
      }
    },
    bindDateChange(e) {
      this.date = e.mp.detail.value;
    },
    bindPickerChange(e) {
      this.index = e.mp.detail.value;
      console.log(this.index);
    },
    async upDate(){
       
       const res =  await this.$http.upDatePersonInfo(
          this.$store.state.user.userInfo.openId,
          this.avatarUrl,
          this.index, this.date)
        
          if(res.error==0){
            this.$tips.toast('更新成功', () => { 
               this.$router.push({ path: "/pages/user/user", isTab: true });
             })
            
          }
          
          
          // this.$store.state.user.userInfo.avatarUrl= this.avatarUrl
          // this.$store.state.user.userInfo.gender= data.gender
          // this.$store.state.user.userInfo['bth']= data.gender
          // this.$store.commit('SET_USER_INFO',this.$store.state.user.userInfo)

           
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted() {
    this.index = this.userInfo.gender;
    console.log(this.index);
  },
  onPullDownRefresh() {},
  async created() {
    this.avatarUrl =this.userInfo.avatarUrl
    const res = await this.$http.getPersonInfo(this.$store.state.user.userInfo.openId);
    this.avatarUrl =res.avatar
    this.data = res.birthday
    this.index= parseInt(res.gender)
    // this.mobile =res.mobile?res.mobile:'未注册'

    if(this.$store.state.user.userInfo.openId.slice(0,3)=='wap'){
       this.mobile =this.$store.state.user.userInfo.nickname   
       this.hasmobile =false;
    }
    if(res.mobile){
       this.mobile =res.mobile  
       this.hasmobile =false;
    }else{
      this.mobile ='未注册'
    }

  }
};
</script>
<style  scoped lang='scss'>
.container {
  .userInfo {
    width: 100%;
    & > div {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      & > span {
        margin-left: 15px;
      }
      & > p {
        float: right;
        font-size: 14px;
        color: #9a9a9a;
        margin-right: 40px;
      }
      & .picker {
        position: absolute;
        width: 100%;
        height: 40px;
        line-height: 40px;
        right: 0px;
        top: 0;
        & span {
          float: right;
          font-size: 14px;
          color: #9a9a9a;
          margin-right: 40px;
        }
      }
    }
    .header {
      height: 50px;
      img {
        width: 37px;
        height: 37px;
        border-radius: 50%;
      }
    }
    .userName {
    }
    .nickName {
    }
    .sex {
    }
    .brth {
    }
      .newAress {
    width: 345px;
    height: 47px;
    text-align: center;
    line-height: 47px;
    color: #fff;
    background: #ff455d;
    border-radius: 5px;
    margin: 0 auto;
    text-align: center;
    display:block !important;
    margin-top:30px;

  }
  }
}
</style>
