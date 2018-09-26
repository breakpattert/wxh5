<template>
  <div class="container lineTop">

    <div @click="isBuild" class="fansAuth"></div>
    <div class="banner_img">
      <img :src="shopinfo.headimg" alt="" />
      <button @click="tabfollow()">
        <!--	{{fllow_s}}-->
        <div :class="{'starActive':fllow_s}"></div>
      </button>
    </div>
 

    
    <!--改版的店铺详情信息-->
    <div class="edit_shop_info">
      <div class="shop_detil">

        <div class="shop_text">
          <div class="moderly">

          </div>
          <a href="">
            <img :src="shopinfo.logo" alt="" />
          </a>
          <div class="shop_info">

            <h3 class="over_hidden w200">{{shopinfo.merchname}}</h3>
            <p class="shop_pons">
              <span>粉丝：{{shopinfo.favorite_num}} </span>
              <span>赞与收藏：{{shopinfo.follow_num}}</span>
            </p>
            <p class="over_hidden shop_pons">
              <span>地址：{{shopinfo.province==null?'':shopinfo.province}}{{shopinfo.city==null?'':shopinfo.city}}{{shopinfo.area==null?'':shopinfo.area}}{{shopinfo.address}}（距您{{shopinfo.jl/1000}}km) &nbsp;>

              </span>
            </p>

          </div>
          <button @click="toggleCouponsPopup">领券</button>
        </div>
      </div>
      <!--<div class="info_p color9a f12">
   			卡宾服饰由中国时装设计界最高奖——“金顶奖”得主卡宾先生于
			1997年创建。其“颠覆流行”的品牌理念，始终领先一步的个性时
			尚定位以及对原创设计的坚持与付出...【点击查看更多】
   		</div>-->
    </div>
    <!-- 优惠券领取 -->
    <mt-popup  v-model="showCouponsbottom"  position="bottom">
          <div>
        <view>
          <div class="onSale w100">
            <div class="header h40 lineBottom">
              <span class="fl ml15">领取优惠券</span>
              <span class="fr mr15 bgc_img" @click="oend()">
                <img src="../../../static/images/icon_close.png" alt="" style="width:16px;height:16px;" />
              </span>
            </div>
            <div class="mainslist_2">
              <!--<div class="item_2">
									<div class="voucher_s"  v-for="(its,index) in goodsDetail.coupons" :key="index">
									<div class="voucher_text">
										<div class="voucher_span v_price">￥</div>
										<div class="voucher_span v_money">{{its.backmoney}}</div>
										<div class="voucher_span v_text">
											<a>优惠券名称</a>
											<a class="v_add color9a">使用条件&nbsp;:&nbsp;满{{its.deduct}}减{{its.enough}}可使用</a>
											<a class="v_add color9a">适用范围&nbsp;:&nbsp;全场通用</a>
										</div>

									</div>
									<p class="v_ptext">{{its.timestart}}—{{its.timeend}} &nbsp;<a class="text_a"></a></p>
									<img src="../../../static/images/img_yhj.png" alt="" />
									<span class="span_no" @click="getPay_coupon(its.id)">立即领取</span>
								</div>
			              </div>-->
              <div class="item_2" v-for="(ite,index) in shopinfo.coupon_list" :key="index">
                <div class="voucher_s">
                  <div class="voucher_text">
                    <div class="voucher_span v_price">￥</div>
                    <div class="voucher_span v_money">{{ite.deduct}}</div>
                    <div class="voucher_span v_text">
                      <a>{{ite.couponname}}</a>
                      <a class="v_add color9a">使用条件&nbsp;:&nbsp;满{{ite.enough}}减{{ite.deduct}}可使用</a>
                      <a class="v_add color9a">适用范围&nbsp;:&nbsp;全场通用</a>
                    </div>

                  </div>
                  <p class="v_ptext">{{ite.timestart}}—{{ite.timeend}} &nbsp;
                    <a class="text_a"></a>
                  </p>
                  <img src="../../../static/images/img_yhj.png" alt="" />
                  <span class="span_no" @click="getPay_coupon(its.id)">立即使用</span>
                </div>
              </div>
              <!--   <button>确定</button>-->
            </div>
          </div>

        </view>
      </div>
    </mt-popup>
   

    <div class="swiper">
      <div class="navbar">
        
          <div v-for="(item,index) in tabs" :key="index" :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick(index)">
            <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
          </div>
   
      </div>

     <mt-swipe :show-indicators="false" :style="'height:'+contentHeight"  :defaultIndex="currentTab" :autoplay="false"
           @change="swiperChange" class="content">

          <mt-swipe-item>
                  <div class="likeAll" id="item1">

                      <div v-if="goodlist.data&&goodlist.data.length<=0" class="empty">
                        <img src="../../../static/images/icon_none.png">
                        <div>该商家还没发布促销信息</div>
                      </div>

                      <div class="w100 item-wrap" v-if="goodlist.data&&goodlist.data.length>0">
                        <div @click="$router.push({ path:'/pages/goodsDetail/index',query: { id: item.id }})" class="item lineLeft lineBottom2" v-for="(item,index) in goodlist.data" :key="index">
                          <a href=""><img :src="item.thumb" alt=""></a>
                          <div class="item_text">
                            {{item.title}}

                          </div>
                          <div class="itemDetial">

                            <span class="fl colorf45d f14">￥{{item.marketprice}}</span>
                            <span class="fr f12 color_s">{{item.keywords}}</span>

                          </div>
                          <span class="z_price">7.5折</span>
                        </div>
                      </div>
                    </div>
          </mt-swipe-item>

          <mt-swipe-item>
                <div class="likeAll" id="item2">
                    <div v-if="goodlist.data&&goodlist.data.length<=0" class="empty">
                      <img src="../../../static/images/icon_none.png">
                      <div>该商家还没发布商品</div>
                    </div>

                    <div class="w100 item-wrap" v-if="goodlist.data&&goodlist.data.length>0">
                      <div class="item lineLeft lineBottom2" v-for="(item2,index2) in P_List.data" :key="index2" @click="$router.push({ path:'/pages/goodsDetail/index',query: { id: item2.id }})">
                        <a href=""><img :src="item2.thumb" alt=""></a>
                        <div class="item_text">
                          {{item2.title}}
                          <!--<span>8.5折</span>-->
                          <!--<span>{{diCount(item2.discounts_price,item2.marketprice)}}折</span>-->
                        </div>
                        <div class="itemDetial">

                          <span class="fl colorf45d f14">￥{{item2.marketprice}}</span>
                          <span class="fr f12 color_s">已售{{item2.sales}}件</span>

                        </div>
                        <span class="z_price">8.5折</span>
                      </div>
                    </div>
                  </div>
          </mt-swipe-item>
   </mt-swipe>
      
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getLocation
} from "@/utils/wechat";
import tabBar from "@/components/tabBar";
import sercah from "@/components/sercah";
export default {
  data() {
    return {
      tabs: [
        {
          name: "促销",
          type: "1",
          checked: true
        },
        {
          name: "全部商品",
          type: "2",
          checked: true
        }
      ],

      activeIndex: 0,
      currentTab: 0,
      winWidth: 0,
      winHeight: 0,
      ybarsIndex: 0,
      contentHeight: 0,
      shopinfo: "",
      goodlist: "",
      PromList: "",
      P_List: "",
      a: "",
      b: "",
      showCouponsbottom: false,
      fllowtext: {
        type: "关注",
        istype: "取消关注"
      },
      fllow_s: false
    };
  },
  components: {
    tabBar,
    sercah
  },
  
  methods: {
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        const data = await getUserInfo();
        this.userInfo = data.userInfo;
      } else {
        console.log("用户还未授权过");
        //   this.$router.push({ path: '/pages/login/goAuth' })
        //  this.$router.replace({ path: "/pages/login/goAuth" });
      }
    },
    isBuild() {
      this.$tips.alert("敬请期待...");
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
    toggleCouponsPopup() {
      this.showCouponsbottom = !this.showCouponsbottom;
    },
    oend() {
      this.showCouponsbottom = false;
    },
    async saltfollow() {
      let [err1, data] = await this._to(getLocation());
      let infolist = await this._to(
        this.$http.getShopInfo(
          this.$route.query.id,
          data.latitude,
          data.longitude,
          // this.$store.state.user.userInfo.openId
        )
      );
      this.shopinfo = infolist[1].result;
    },
    tabfollow() {
      // this.saltfollow();
      console.log(this.shopinfo.isfollow);
      if (this.shopinfo.isfollow == "1") {
        this.$http.getfollow(
          this.$route.query.id,
          // this.$store.state.user.userInfo.openId,
          0
        );
  
        this.fllow_s = false;
        this.shopinfo.isfollow = 0;
      } else {
        this.$http.getfollow(
          this.$route.query.id,
          // this.$store.state.user.userInfo.openId,
          1
        );
     
        this.fllow_s = true;
        this.shopinfo.isfollow = 1;
      }
     },
    tabClick(e) {
      
      this.activeIndex = e;

      this.currentTab = this.activeIndex;
    },
    poinClick(e) {
      this.ybarsIndex = e;
      //   console.log(e);
    },
    swiperChange(e) {
      this.currentTab = e;
      this.activeIndex = this.currentTab;
    },
    //  处理时间戳

    toDate(number) {
      var n = number * 1000;
      var date = new Date(n);
      var Y = date.getFullYear() + "/";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    },
    onAnimationfinish() {
      console.log("滑动完成.....");
    }
  },
  async mounted() {



    console.log(this.$route.query.id);



	
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        return "navbar_slider_1";
      }
    },
    diCount() {
      return (a, b) => {
        return parseInt(a / b);
      };
    }
  },
  onPullDownRefresh() {},
 
  async created() {

  
    this.shopinfo = "";
    this.goodlist = "";
    this.P_List = "";
 
    const [infolist, PromGoodsList, PromList] = await this._U.PromiseAll(
      this.$http.getShopInfo(
        this.$route.query.id,
        this.$store.state.user.locationInfo.latitude,
        this.$store.state.user.locationInfo.longitude,
        // this.$store.state.user.userInfo.openId
      ),
      this.$http.getShopPromGoodsList(this.$route.query.id),
      this.$http.getShopGoodsList(this.$route.query.id)
    );
		this.currentTab=0;
    this.shopinfo = infolist.result;
    this.goodlist = PromGoodsList.result;
    this.P_List = PromList.result;
    console.log(this.currentTab);
    if(this.currentTab==0){
      
			this.goodlist = PromGoodsList.result;
				let s = Math.ceil(this.goodlist.data.length);
			if(s==0){
    		this.contentHeight = "250px";
	  	}else{
	  			this.contentHeight = 256*s + 'px';
	  	}
		}
 

    this.shopinfo.coupon_list.map(i => {
      i.timestart = this._U.formatTime(i.timestart);
      i.timeend = this._U.formatTime(i.timeend);
    });
    if (this.shopinfo.isfollow == "1") {
      this.fllow_s = true;
    } else {
      this.fllow_s = false;
    }


  }
};
</script>
<style  scoped lang='scss'>
.container {
  background-color: #fff;
  padding-bottom: 20px;
  font-family:PingFang-SC-Regular;
  .banner_img{
  	width:100%;
  	height:240px;
  	
  	img{
  		width:100%;
  		height:100%;
  	}
	button{
			position: absolute;
			top:15px;
			right:15px;
			text-align: center;
			font-size: 12px;
			color:#fff;
			width:34px;
			height:34px;
			background:rgba(154,154,154,0.4);
			/*opacity:0.4;*/
			border-radius:50%;
			box-shadow:2px 4px 4px rgba(50,50,50,0.1);
			div{
				width:18px;
				height:16px;
				position: absolute;
				z-index: 3;

				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;

				 background: url("#{$imgUrl}icon_heart_act.png") no-repeat 100% 100%;
				 background-size: cover;

			}
			 .starActive{
         			 background: url("#{$imgUrl}/icon_kindheart_act.png") no-repeat 100% 100%; 
         			  background-size: cover;
        	}
	}	
  }
  .codeall{
  	.v_code{
  		margin-right:10px;
  		position: relative;
  		img{
  			width:100%;
  			height:100%;
  		}
  		.code_price{
  			width:56px;
  			position: absolute;
  			left:0;
  			top:0;
  			height:70px;
  			padding:20px 6px;
  	
  			
  			h4{
  				font-size: 12px;
  				color:#fff;
  				margin-bottom:4px;
				font-family:PingFang-SC-Regular;
  			}
  			p{
  				font-size:10px;
  				color:#fff;
  				font-family:PingFang-SC-Regular;
  			}
  			
  		}
  		.code_button{
  			width:56px;
  			position: absolute;
  			right:0;
  			top:0;
  			height:70px;
  			padding:20px 6px 12px 6px;
  	
  			p{
  				font-size: 10px;
  				text-align: center;
  				color:#fc9fff;
  				margin-bottom:10px;
  				font-family:PingFang-SC-Regular;
  			}
  			button{
  					width: 43.5px;
						height: 14.5px;
	
						border-radius: 7px;
						color:#fff;
						font-size:9px;
						text-align: center;
						padding:0;
						line-height: 12px;
						background-color: #fc9fff;
  			}
  		}
  	}
  }

  .swiper {
    width: 100%;
    .navbar {
      border-radius: 3px 3px 0 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      position: relative;
      top: 0;
      height: 40px;
      width:100%;
      background-color: #fff;
      border-top: 1px solid #e8e8e8;
      border-bottom:1px solid #e8e8e8;
      .navbar_item {
        position: relative;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 10px 0;
        text-align: center;
        font-size: 0;
        .navbar_title {
         color: #9a9a9a;
          font-weight: 500;
          display: inline-block;
          font-size: 14px;
          max-width: 8em;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .selective {
          color: #323232;
        }
        .navbar_item_on {
          color: #ff455d;
        }
      }
      .navbar_slider {
        position: absolute;
        left: 0;
        bottom: -1px;
        width:15%;
        height: 2px;
    
        background-color: #ff455d;

        transition: all 0.1s;
      }

      .navbar_slider_0 {
        left: 18%;
      }

      .navbar_slider_1 {
        left: 68%;
      }
    }

    .content {
      box-sizing: border-box;
     /* height: 100%;*/
      width: 100%;
      -webkit-overflow-scrolling: touch;

      	.likeAll{
          .item-wrap{
        display: flex;
        background: #fff;
        flex-wrap: wrap;
       	
        justify-content: flex-start;

        .item{
         position: relative;
          border-radius: 2px;
          width:50%;
          padding:8px 10px;
				

           

						a{  
							display: block;
						height: 169px;
						width: 100%;
						overflow: hidden;
						margin:0 auto;
						img{
         			width:100%;
         			height:100%;
          	}
	
						}
  				.item_text{
  						width: 125px;
							height: 31.5px;
							font-family: PingFang-SC-Regular;
							font-size: 12px;
							font-weight: normal;
							font-stretch: normal;
							line-height: 20px;
							letter-spacing: 0;
							color: #323232;
							padding:9px;
							position: relative;
					
  				}
          .itemDetial{
            height: 44px;
            padding: 30px 9px 9px 9px;
           
            .color_s{
            	color: #9a9a9a;
            }
          }
          .z_price{
          		
						display: inline-block;
						position: absolute;
						left:0px;
						width: 40px;
						height: 20px;
						line-height: 20px;
						background-color: #ff455d;
						border-radius:0px 4px 4px 4px;
					
						text-align: center;
						font-size: 12px;
						color: #ffffff;
						overflow: hidden;
						top:0px;
						
          }
        }
        }
      }







    }
  }
  /*弹窗优惠券*/
   .discounts {
    width: 100%;
    height: 43px;
    line-height: 43px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 19px;
    .right-arrow {
      width: 8px;
      height: 15px;
      background: url(#{$imgUrl}/icon_ret.png) no-repeat center/cover;
    }
    .present {
      flex: 1;
      display: flex;
      align-items: center;
      .discount_msg {
        height: 43px;
        line-height: 43px;
        font-family: PingFang-SC;
        font-size: 14px;
        letter-spacing: 1px;
        color: #323232;
      }

      .gift {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 12px;
        position:relative;
        bottom:8px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  /*改版的店铺详情*/
 .edit_shop_info{
 	padding:0 15px;
 	
 	background:#fff;
 	width:100%;
/* 	border:0.5px solid red;*/
/* 	padding-bottom:28px;*/

 	  .shop_detil{
  		width:100%;
	/*		height: 150px;*/
			position: relative;
			/*box-shadow: 0 3px 2.8px 0.2px rgba(50, 50, 50, 0.1);*/
		/*	border-bottom:0.5px solid red;*/
			img{
				width:100%;
			}
			.shop_text{
				overflow: hidden;
				position: relative;
				/*right:0;
				left:0;
				top:0px;*/
				padding:15px 0 15px 0;
				margin:auto;
				/*	width: 353px;*/
					/*height: 110px;*/
					/*background-color: rgba(232, 232, 232, 0.3);*/
				
					border-radius: 3px;

					a{
						width:49px;
						height:49px;
						background:rgba(255,255,255,1);
						border:0.5px solid rgba(245,245,245,1);
						border-radius:50%;
						box-shadow:4px 6px 6px rgba(50,50,50,0.05);
						display: block;
						float:left;
						margin:14px 14px 14px 0px;
						overflow: hidden;
						img{
							width:100%;
							height:100%;
							
						}
					}
					.shop_info{
					/*	float:left;*/
						overflow: hidden;
						font-family: PingFang-SC-Regular;
						.shop_pons{
							span{
								padding-right:12px;
							}
							
						}
						h3{
								font-size: 16px;
									line-height: 24px;
								color:#323232;
								font-weight: 700;
								
						}
						p{
							line-height: 24px;
							font-size:12px;
							color:#323232;
							span{
								font-size:12px;
									color:#323232;
							}
						}
						
					}
				button{
						position: absolute;
						top:15px;
						right:15px;
						text-align: center;
						/*padding:0px 8px;*/
						width:50px;
						line-height:24px;
						height: 24px;
						line-height: 24px;
						background-color: #ff455d;
						border-radius: 12px;
						font-size: 14px;
						color:#fff;
						padding:0;

				}	
			}
  }
  .info_p{
  	height:60px;
 /* 	border:0.5px solid brown;*/
  	line-height:21px;
  }
 }
	/*弹窗后优惠券样式*/
	  /*弹窗*/
         .mainslist_2{
      	width:100%;
      	height:400px;
      	overflow-y:scroll;
      	button{
      		background-color:#ff455d;
					color:#fff;
					font-size:14px;
					line-height:36px;
					height: 36px;
					text-align: center;
					margin-top:15px;
					border-radius: 0;
      	}
      	.item_2{
      	/*	padding:15px;*/
      		height:72px;
     
      		.item2_left{
   
      			
      		}
      		.item2_right{
      	
      		}
      	.voucher_s{
				margin:15px 0;
					padding:0 15px;
					width: 100%;
					height: 133px;
					position: relative;
					border-radius: 5px;
	/*				border: solid 0.5px #e8e8e8;*/
			
					.text_a{
						font-size:14px;
						color:#9a9a9a;
						display: inline-block;
						
					}
					.p_text{
					


						display: inline-block;
						position: absolute;
						height:34px;
						top:16.5px;
						left:42px;
						width:158px;
					
			
						p{
								font-family: PingFang-SC-Regular;
								font-size: 14px;
								color: #ffffff;
						}
						.p_daily{
							font-size:10px;
							color: #ffffff;
						}
			

						
					}
			
					.p_price{
						position: absolute;
						width:89px;
						height:49.5px;
					
						top:8px;
						right:25px;
						p{
								position: absolute;
								top:11px;
								left:1.5px;
								font-family: FZXKJW--GB1-0;
								font-size: 36px;
								font-weight: 500;
								color: #ffffff;
								margin-left:10px;
						}
						i{
							font-size: 18px;
							color:#fff;
						}

					}
					.p_time{
						bottom:12px;
						left:27.5px;
						position: absolute;
						height:32px;
						width: 170px;
					
						p{
								font-family: PingFang-SC-Regular;
								font-size: 10px;
								font-weight: normal;
								line-height: 18px;
								color: #9a9a9a;
						}
		
					}
					.voucher_text{
						padding-top:28px;
				/*		padding-right:33px;*/
						position: absolute;
						height:100px;
						/*width:255.5px;*/
					/*	border:0.5px solid red;*/
						top:-10px;
						left:28px;

						.voucher_span {
							display: inline-block;
						}
						.v_text{
							/*border:0.5px solid #000;*/
							position: relative;
							bottom:4px;
							margin-left:42px;
							a{
								font-size: 16px;
								color: #323232;
								line-height:32px;

								}
							.v_user{
							color:#9a9a9a;
							}
							.v_add{
									height: 21px;
									font-size: 12px;
									line-height:21px ;
									color:#9a9a9a;
									text-align:left;
					
							}	
						}
						.v_price{
							font-family: HiraginoSansGB-W3;
							font-size: 15px;
							color: #fff;
							position: relative;
							bottom:9px;
						}
						.v_money{
								font-family: FZXKJW--GB1-0;
								font-size: 21.5px;
								color: #fff;
								position: relative;
								bottom:9px;
						}
				
					}
					.v_ptext{
						color: #7b7b7b;
						font-size: 10px;
						position: absolute;
						bottom:16px;
						left:137px;

					}
	
					img{
						width:100%;
						height:100%;
					}
					span{
						position: absolute;
						padding:2px 6px;
						height:21px;
						display: block;
						right:25px;
						bottom:10px;
						border-radius: 3px;
						text-align: center;
						
						font-size: 12px;
						color: #fff;
						background: #ff455d;
					}
					.span_no{
						border:0.5px solid #FF455D;
						color:#fff;
					}
					.span_blue{
						border: solid 0.5px #3fd4ff;
						color:#3fd4ff;
					}
			}
	
      	}
      }
}
</style>