<template>
	<div class="container lineTop">
		<!-- <button v-if="!hasAuthInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
    </button> -->
	 <!-- <div  @click="isBuild" class="fansAuth"></div> -->
		<tabBar cur_index="2"></tabBar>
		<!-- <goAuth></goAuth> -->
		<!--商铺消息？-->
		<div v-if="merchNotice.length!==0&&shopNotice.length!==0">
	
		

		<!--官方消息-->
		<div class="message">
			<div class="message_main">
						<scroll-view scroll-x="false" style=" white-space: nowrap; display: flex;" :style="{ width: width_scroll + 'px' }">
					
						  <view style="background:#fff; width:100%; height: 79px; display: inline-block; padding:10px 12px;" @touchstart="touchstart">
						  	<ul style="position: absolute;" @click="$router.push({ path:'/pages/news/newsdetil',query: { id:0,type:1}})">
						  		<li class="ul_li_01">
						  			<!--<span class="reding" v-if="item.type=='3'"></span>
						  			<span class="reding" v-if="item.type=='1'"></span>-->
						  			<a>
						  				<img src="../../../static/images/icon_official.png" alt=""/>
						  				<!--<img src="../../../static/images/icon_news.png" alt="" v-if="item.type==2"/>
						  				
						  				
						  				<img src="../../../static/images/icon_wx.png" alt="" />-->
						  			</a>
						  		</li>
						  		<li class="ul_li_02 over_hidden">
						  			<h3 class="over_hidden">官方消息</h3><span>官方</span>
						  			<p class="over_hidden">{{shopNotice[0].title}}</p>
						  		</li>
								<li class="ul_li_03">
									<span>{{shopNotice[0].createtime}}</span>
								</li>

						  	</ul>
						  </view>
						  <!--<view class="mesbutton" :class="[{'goBack':index==flag},{'showdel':showclass}]">
								<div class="messageleft">置顶</div>
								<div class="messageright"  @click="del(index)">删除</div>
						  </view>-->
						  
						  
						</scroll-view>
			</div>

		</div>
		<!--交易消息-->
		<!--<div class="message">
			<div class="message_main">
						<scroll-view scroll-x="false" style=" white-space: nowrap; display: flex;" :style="{ width: width_scroll + 'px' }">
					
						  <view style="background:#fff; width:100%; height: 79px; display: inline-block; padding:10px 12px;" @touchstart="touchstart">
						  	<ul style="position: absolute;">
						  		<li class="ul_li_01">
						  			<a>
						  				<img src="../../../static/images/icon_news.png" alt=""/>
			
						  			</a>
						  		</li>
						  		<li class="ul_li_02 over_hidden">
						  			<h3 class="over_hidden">交易消息</h3>
						  			<p class="over_hidden">您已经成功下单</p>
						  		</li>
								<li class="ul_li_03">
									<span>2018.9.11</span>
								</li>

						  	</ul>
						  </view>		  
						</scroll-view>
			</div>

		</div>-->
		<!--店铺客服与用户对话-->

		
			<div class="message">
			<div class="message_main">
						<scroll-view scroll-x="false" style=" white-space: nowrap; display: flex;" :style="{ width: width_scroll + 'px' }">
					
						  <view  v-for="(item,index) in merchNotice" :key="index" style="background:#fff; width:100%; height: 79px; display: inline-block; padding:10px 12px;" @touchstart="touchstart">
						  	<!--<ul style="position: absolute;" @click="$router.push({ path:'/pages/news/newsdetil'})">-->
						  		<ul style="position: absolute;" @click="$router.push({ path:'/pages/news/newsdetil',query: { id:item.merchId,type:2}})">
						  		<li class="ul_li_01">
						  			<!--<span class="reding" v-if="item.type=='3'"></span>
						  			<span class="reding" v-if="item.type=='1'"></span>-->
						  			<a>
						  				<img :src="item.info[0].logo" alt="" />
						  				<!--<img src="../../../static/images/icon_news.png" alt="" v-if="item.type==2"/>
						  				<img src="../../../static/images/icon_official.png" alt=""/>
						  				
						  				<img src="../../../static/images/icon_wx.png" alt="" />-->
						  			</a>
						  		</li>
						  		<li class="ul_li_02">
						  			<h3 classs="over_hidden">{{item.info[0].merchname}}</h3> 
						  			<p>{{item.info[0].bannername}}</p>
						  		</li>
								<li class="ul_li_03">
									<span>2017.8.7</span>
								</li>

						  	</ul>
						  </view>
						  <!--<view class="mesbutton" :class="[{'goBack':index==flag},{'showdel':showclass}]">
								<div class="messageleft">置顶</div>
								<div class="messageright"  @click="del(index)">删除</div>
						  </view>-->
						  
						  
						</scroll-view>
			</div>
		

		</div>
		</div>
		
		
		<div v-if="merchNotice.length==0&&shopNotice.length==0" class="empty_2">
       				 <img src="../../../static/images/icon_news2.png">
        			<div>您还没有收到消息哟o(∩_∩)o</div>
      	</div>

	</div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
import tabBar from "@/components/tabBar";
export default {
  data() {
    return {
      flag: "",
      shopNotice:'',
      merchNotice:[],
      sendgoods_message:{},
      mess: [
        {
          type: "1",
          checked: false
        },
        {
          type: "2",
          checked: false
        },
         {
          type: "3",
          checked: false
        },
       
      ],
      currentTab: 0,
      winWidth: 0,
      visible1: false,
      actions: "",
      delshow: false,
      width_scroll: 0,
      showclass: false
    };
  },
  components: {
    tabBar
  },
  created() {
    // this.hasauth();
    // var res = wx.getSystemInfoSync();

    this.width_scroll = res.windowWidth - 30;
  },
 async mounted(){
	
//	const arr =[this.$store.state.user.userInfo.openId , this.$store.state.user.userInfo.authkey]
//	const [err , res] = await this._to(this.$http.getMsgList(...arr))
//	console.log(res,6)
//	debugger
  },
  methods: {
    isBuild() {
      this.$tips.alert("敬请期待...");
    },
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        const data = await getUserInfo();
        this.userInfo = data.userInfo;
      } else {
        console.log("用户还未授权过");
      }
    },
    handleClick() {
      this.visible1 = true;
    },

    bindGetUserInfo(e) {
      if (e.mp.detail.rawData) {
        const data = e.mp.detail.rawData;
        this.userInfo = JSON.parse(data);
        setStorage("userInfo", data);
      } else {
        console.log("用户按了拒绝按钮");
        return;
      }
    },


    touchstart() {
      this.showclass = true;
    },
    del(index) {
      console.log(index);
      this.flag = index;
    },
    onAnimationfinish() {
      console.log("滑动完成.....");
    }
  },
  
  computed: {

  },
  onPullDownRefresh() {},
  async created() {
    // wx.hideTabBar();
    // this.hasauth();

    const data = await this.$http.saleMsg(this.$store.state.user.userInfo.openId)
    this.shopNotice = data.list.shopNotice;
    this.sendgoods_message = data.list.sendgoods_message[0];
    let merchNoticelist = [];
    for (const key in data.list.merchNotice) {
					if (data.list.merchNotice.hasOwnProperty(key)&& ((/^(\d)*$/.test(key))) ) {
						const element = data.list.merchNotice[key];
						merchNoticelist.push({info:element,merchId:key})
					}
				}
   	this.merchNotice = merchNoticelist;
//  this.$store.commit("SET_NEWS_INFO",data.list);
   
      // this.shopNotice = data.list.shopNotice
  }
};
</script>
<style scoped lang='scss'>
.container {
  background-color: #ffffff;
  padding-bottom: 50px;
  .message {
    border-bottom: solid 0.5px #e8e8e8;
    margin-top: 12px;
    .message_main {
      .ul_li_01 {
        float: left;
        position: relative;
        .reding {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff455d;
          position: absolute;
          right: 5px;
          top: 1.5px;
        }
        a {
          width: 54px;
          height: 54px;
         /* background-color: #9a9a9a;*/
          border-radius: 27px;
        /*  border: solid 0.5px #e8e8e8;*/
          overflow: hidden;
          img {
            width: 100%;
            height:100%;
          }
        }
      }
      .ul_li_02 {
        float: left;
        text-align: left;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        padding-left: 12px;
        position: relative;
        width:178px;
        
        h3 {
          font-family: PingFang-SC-Regular;
          font-size: 14px;
		width:125px;
          line-height: 28px;

          color: #323232;

        }
		span {
			position: absolute;
            display: inline-block;
            width: 40px;
            height: 16px;
            background-color: #ff455d;
            border-radius: 3px;
            border: solid 0.5px #ff455d;
            line-height: 14px;
            text-align: center;
            font-size: 12px;
            margin-left: 5px;
            color: #fff;
           top:7px;
			right:2px;

          }
        p {
          font-family: PingFang-SC-Regular;
          font-size: 12px;
          color: #9a9a9a;
        }
      }
      .ul_li_03 {
        float: left;
        text-align: right;
        position: absolute;
        right: -88px;
        top:4px;
        span {
          font-family: PingFang-SC-Regular;
          font-size: 12px;

          letter-spacing: 0;
          color: #9a9a9a;
        }
      }
      .mesbutton {
        background: #ff455d;
        width: 100px;
        padding:12px;
        height: 79px;
        display: inline-block;
        .messageleft {
          float: left;
          width: 50%;
          color:#fff;
        }
        .messageright {
          float: left;
          width: 50%;
          color:#fff;
        }
      }
      .delclass {
        display: none;
        width: 0;
      }

      .goBack {
        display: none;
        /*width:0;*/
      }
      .showdel {
        display: inline-block;
      }
    }
  }
  .swiper {
    width: 100%;
    .navbar {
      margin: 10px 15px;
      border-radius: 3px 3px 0 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      position: relative;
      top: 0;
      height: 40px;
      width: 345px;
      background-color: #fff;
      border-bottom: 2px solid #ff455d;
      .navbar_item {
        position: relative;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 13px 0;
        text-align: center;
        font-size: 0;
        .navbar_title {
          color: #808080;
          font-weight: 500;
          display: inline-block;
          font-size: 15px;
          max-width: 8em;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .selective {
          color: #ff455d;
        }
        .navbar_item_on {
          color: #ff455d;
        }
      }
      .navbar_slider {
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 6px;
        height: 4px;
        border-radius: 50%;
        background-color: #ff455d;
        transition: all 0.1s;
      }
      .navbar_slider_0 {
        left: 25%;
      }
      .navbar_slider_1 {
        left: 75%;
      }
    }
    .content {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>