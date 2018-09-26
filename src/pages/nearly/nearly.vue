<template>
	<div class="container lineTop" @click="clickBody($event)">

		<tabBar cur_index="1"></tabBar>

		<div class="swiper">
			<div class="navbar" style="position: fixed;top:0px;z-index:100000;">
	
					<div v-for="(item,index) in tabs" :key="index" :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick(index)">
						<div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
					</div>
		
				<div class="navbar_slider" :class="navbarSliderClass"></div>
			</div>

			<div class="content" :duration="50"  :style="'height:'+contentHeight" @change="swiperChange" :current="currentTab" @animationfinish="onAnimationfinish">
				<div v-if="currentTab == 0">
					<div class="search_mains" id="item1">
						<div @click="$router.push({ path:'/pages/busineshop/shoplist',query: { id: item.id,title:item.name}})" class="info_list" v-for="(item,index) in reMarketList" :key='index'>
							<div class="bgc_img">
								<img :src="'https://sh.szwfy.com.cn/attachment/'+item.images" alt="" />
								<!--<span class="like z_top">关注+</span>-->
								<p class="share z_top">
									<i></i> 推荐
								</p>
								<p class="address z_top">
									<i>
                      					<img src="../../../static/images/icon_adree@2x.png" alt="" />
                      				</i>
									<span>{{item.distance}}km</span>
								</p>
								<div class="title_name">
									<h4>{{item.name}}</h4>
									<p>24家品牌活动</p>
								</div>
							</div>

							
							<!--显示店铺信息的title蒙版-->
							<div class="moderly">
							
							</div>
							
						</div>

						<div @click="$router.push({ path:'/pages/busineshop/shoplist',query: { id: item.id,title:item.name}})" class="info_list" v-for="(item,index) in marketList" :key='index'>
							<div class="bgc_img">
								<img :src="'https://sh.szwfy.com.cn/attachment/'+item.images" alt="" />
								<!--<span class="like z_top">关注+</span>-->
								<p class="share z_top">
									<i></i> 推荐
								</p> 
								<p class="address z_top">
									<i>
                      					<img src="../../../static/images/icon_adree@2x.png" alt="" />
                      				</i>
									<span>{{item.distance}}km</span>
								</p>
								<div class="title_name">
									<h4>{{item.name}}</h4>
									<p>24家品牌活动</p>
								</div>
							</div>

							<div class="moderly">
						
							</div>
						</div>

					<div class="mt10">
						<zan-loadmore v-if="!isBottom" type="loading" ></zan-loadmore>
						<zan-loadmore v-if="isBottom" type="text"  text="暂无数据"></zan-loadmore>
					</div>
						
					</div>
				</div>
			<div v-if="currentTab == 1">
					<div class="mains" id="item2" :class="{'mt60':currentTab == 1}" >
			
						<div class="main_img">
							<div class="swiperContainer">
              <mt-swipe style="height:260px" :show-indicators="indicatorDots" 
              :defaultIndex="swiperCurrent" :autoplay="autoplay"
          :auto="duration" @change="bannerSwiperChange" class="swiper">
         
            <mt-swipe-item v-for="(item,index) in RecommendShop?RecommendShop.images:[]" :key="index">
                  <img :src="item" class="slide-image" />
            </mt-swipe-item>
              </mt-swipe>
								<div class="dots">
									<block v-for="(item,index) in RecommendShop?RecommendShop.images:[]" :key="index">
										<view class="dot" :class="{'active':swiperCurrent == index}"></view>
									</block>
								</div>
							</div>
							<!-- <img src="../../../static/images/img_coat.png" alt="" /> -->
						</div>
						<ul class="main_ul" v-if='recommendShopShow'>
							<h3 class="f16" v-if="RecommendShop.recommend.length !=0">大牌推荐</h3>
							<li @click="$router.push({ path:'/pages/busineshop/shop',query:{id:item.id}})" v-for="(item,index) in RecommendShop.recommend" :key="index">
								<a href="javascript:;">
									<img :src="item.logo" alt="" />
								</a>
								<p class="f13">{{item.merchname}}</p>
							</li>

						</ul>
						<ul class="main_ul" v-if='recommendShopShow'>
							<h3 class="f16" v-if="RecommendShop.hotList.length !=0">热门品牌</h3>
							<li @click="$router.push({ path:'/pages/busineshop/shop',query:{id:item.id}})" v-for="(item,index) in RecommendShop.hotList" :key="index">
								<a href="javascript:;">
									<img :src="item.logo" alt="" />
								</a>
								<p class="f14">{{item.merchname}}</p>
							</li>
								<br />
						</ul>
						<ul class="main_ul" v-if='!recommendShopShow' v-for="(item,index) in secondCategoryShopList" :key="index">
							<h3 class="f16">{{item.catename}}</h3>
							<li v-for="(item1,index1) in item.merchInfo" :key="index1">
								<a href="javascript:;" @click="$router.push({ path:'/pages/busineshop/shop',query:{id:item1.merchid}})" >
									<img :src="item1.logo" alt="" />
								</a>
								<p class="f14">{{item1.merchname}}</p>
							</li>
							
						</ul>
					</div>

				</div>
			</div>
		</div>

		<div class='category' v-if='currentTab==1' scroll-y="true" :style="{ height: h_scroll + 'px'}">
			<div @click="getSecondShopList(item.id,index)"  class="y_tabs align f16" v-for="(item,index) in categoryParent" :key="index" :class="{'navbar_ybars':ybarsIndex == index}">
				<span class="line_bar" :class="{'line_bars_show':ybarsIndex == index}"></span> {{item.catename}}
			</div>

		</div>

		<div class="homeHeader w100">

				<div class="searchBox">
						<span class="searchIcon mr15"></span>
						<input type="text" class="search" placeholder-class="placeholder" @focus='searchFocus' @blur="searchBlur" @confirm="searchs" confirm-type="search" :placeholder="placeholder" v-model="userword">
						<span class="searchIcon_2 mr15"></span>
						<ul class="shop_m">
									<li  class="shop_home" @click.stop="shoptogle()">
										<span>
											<img src="../../../static/images/btn_triangle.png" alt="" />
										</span>
										<i style="color:#323232;">{{searchtype.type0}}</i>
									</li>
									<li  class="shop_home_02" v-if="toglestatus" @click="texttab()">{{searchtype.type1}}</li>
						</ul>
				</div>
				
			
			
		
			<!-- <div class="ser_button" v-if='currentTab==0'>
				<a href="">热门</a>
				<a href="">人气</a>
				<a href="">距离</a>
				<a href="">优惠</a>
			</div> -->

		</div>
	</div>
</template>
<script>
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
          name: "商场",
          type: "1",
          checked: true
        },
        {
          name: "店铺",
          type: "2",
          checked: true
        }
      ],
      placeholder: "搜你想要的~",
      activeIndex: 0,
      currentTab: 0,
      winWidth: 0,
      winHeight: 0,
      ybarsIndex: 0,

      indicatorDots: false,
      swiperCurrent: 0,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      width_scroll: "",
      contentHeight: 0,
      h_scroll: "",
      marketList: null,
      categoryParent: null,
      RecommendShop: null,
      recommendShopShow: true,
      secondCategoryShopList: null,
      reMarketList: null,
      toglestatus: false,
      searchtype: {
        type0: "店铺",
        type1: "商品"
      },
      userword: "",
      page: 1,
      prePage: 4,
      isBottom: false
    };
  },
  components: {
    tabBar,
    sercah
  },

  methods: {
    searchFocus() {
      this.placeholder = "";
    },
    searchBlur() {
      this.placeholder = "搜你想要的 ~";
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
    tabClick(e) {
      this.activeIndex = e;
      this.currentTab = this.activeIndex;
    },
    swiperChange(e) {
      this.currentTab = e;
      this.activeIndex = this.currentTab;
    },
    shoptogle() {
      this.toglestatus = !this.toglestatus;
    },
    async herftype() {
      let types = 0;
      this.$router.push({
        path: "/pages/searchshop/searchresult",
        query: { type: types, keyword: this.userword }
      });
    },
    //			华润万象城
    async herftype_02() {
      let types = 1;
      this.$router.push({
        path: "/pages/searchshop/searchresult",
        query: { type: types, keyword: this.userword }
      });
    },
    clickBody() {
      this.toglestatus = false;
    },
    texttab(e) {
      if (this.searchtype.type1 == "店铺") {
        this.searchtype.type1 = "商品";
        this.searchtype.type0 = "店铺";
        this.toglestatus = !this.toglestatus;
        console.log(1);
      } else if (this.searchtype.type1 == "商品") {
        this.searchtype.type1 = "店铺";
        this.searchtype.type0 = "商品";
        this.toglestatus = !this.toglestatus;
        console.log(2);
      }
    },
    searchs() {
      if (this.searchtype.type0 == "商品") {
        console.log(3);
        this.herftype();
      } else if (this.searchtype.type0 == "店铺") {
        console.log(4);
        this.herftype_02();
      }
    },
    bannerSwiperChange(e) {
      this.swiperCurrent = e;
    },
    onAnimationfinish() {
      console.log("滑动完成.....");
    },
    async getSecondShopList(id, index) {
      this.ybarsIndex = index;
      if (id != 0) {
        this.recommendShopShow = false;
        const [err, data] = await this._to(
          this.$http.getSecondCategoryShopList(
            id,
            this.$store.state.user.clusterInfo.id
          )
        );
        this.secondCategoryShopList = data.result;
      } else {
        this.recommendShopShow = true;
      }
    }
  },
  mounted() {},
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        return "navbar_slider_1";
      }
    }
  },
  onPullDownRefresh() {},
  async onReachBottom() {
    if (this.isBottom) return;

    let data = await this.$http.marketList(
      this.$store.state.user.locationInfo.latitude,
      this.$store.state.user.locationInfo.longitude,
      ++this.page,
      this.prePage,
      1
    );
    if (data.result.data.length < this.prePage) {
      this.isBottom = true;
    }
    this.marketList = [...this.marketList, ...data.result.data];
  },
  async created() {
    const [remarketList, data, data1, RecommendShop] = await this._U
      .PromiseAll(
        this.$http.marketList(
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          1,
          10,
          1,
          1
        ),
        this.$http.marketList(
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          1,
          10,
          1
        ),
        this.$http.getShopCategory(),
        this.$http.getRecommendShop(this.$store.state.user.clusterInfo.id)
      )
      .catch(e => {
        console.log(e);
      });

    // 推荐
    // const [remarketListErr ,remarketList] = await this._to(
    // 	this.$http.marketList( this.$store.state.user.locationInfo.latitude,
    // 	 this.$store.state.user.locationInfo.longitude, 1 ,10 ,1,1
    // ))
    this.reMarketList = remarketList.result;

    // const [err ,data] = await this._to(
    // 	this.$http.marketList( this.$store.state.user.locationInfo.latitude,
    // 	 this.$store.state.user.locationInfo.longitude, 1 ,10,1
    // ))

    this.marketList = data.result.data;

    // const [err1 ,data1] = await this._to(this.$http.getShopCategory())

    const arr = [];
    arr.push({ id: 0, catename: "推荐" });
    for (const key in data1.result) {
      if (data1.result.hasOwnProperty(key) && /^(\d)*$/.test(key)) {
        const element = data1.result[key];
        arr.push(element);
      }
    }

    this.categoryParent = arr;

    // const [RecommendShoperr,RecommendShop] = await this._to(this.$http.getRecommendShop(this.$store.state.user.clusterInfo.id))
    this.RecommendShop = RecommendShop.result;
    console.log(this.RecommendShop, 9);
  }
};
</script>
<style scoped lang='scss'>
.container {
  background-color: #fff;
  padding-bottom: 60px;
  .category {
    position: fixed;
    top: 99px;
    left: 0;
    width: 100px;
    background: #f2f2f2;
    overflow-y: scroll;
    .y_tabs {
      line-height: 60px;
      font-family: PingFang-SC-Bold;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #9a9a9a;
      height: 54px;
      width: 100.5px;
      position: relative;
    }
    .navbar_ybars {
      background-color: #fff;
      font-size: 14px;
      color: #323232;
    }
  }
  .homeHeader {
    position: fixed;
    top: 40px;
    z-index: 100000;
    background: #fff;
    padding: 6px 15px;
    line-height: 58px;
    .shop_m {
      position: absolute;
      right: 0px;
      top: 0px;
      .shop_home {
        width: 60px;
        height: 30px;
        border-radius: 30px;
        background: #e8e8e8;
        color: #323232;
        position: relative;
        right: 0px;
        top: 0px;
        text-align: center;

        font-size: 14px;
        line-height: 30px;
        padding-right: 8px;

        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          position: absolute;
          top: 0px;
          right: 5px;
          img {
            width: 65%;
            height: 7.5px;
          }
        }
      }
      .shop_home_02 {
        width: 60px;
        height: 46px;
        background: url("#{$imgUrl}img_box.png") no-repeat center center;
        background-size: cover;
        position: absolute;
        right: 0px;
        top: 22px;
        text-align: center;
        color: #323232;
        font-size: 14px;
        line-height: 51px;
      }
    }

    .adressIcon {
      width: 13px;
      height: 20px;
      display: inline-block;
      background: url("#{$imgUrl}icon_adr.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
    .searchBox {
      display: inline-block;
      height: 30px;
      line-height: 28px;
      /*border: solid 0.5px #b7b7b7;*/
      background: #e8e8e8;
      width: 100%;
      border-right: 0;
      padding-left: 14px;
      position: relative;
      border-radius: 30px;
      .searchIcon {
        display: inline-block;
        width: 13.5px;
        height: 14px;
        background: url("#{$imgUrl}search.png") no-repeat center center;
        background-size: cover;
        vertical-align: middle;
      }
      .searchIcon_2 {
        display: inline-block;
        width: 1px;
        height: 15px;
        vertical-align: middle;
        background: #9a9a9a;
      }
      .search {
        display: inline-block;
        width: 238px;
        height: 15px !important;

        color: #323232;
        vertical-align: middle;
      }
    }
    .ser_button {
      height: 48px;
      line-height: 0px;
      padding: 2px 15px;
      a {
        display: inline-block;
        margin-left: 6px;
        height: 24px;
        border: solid 0.5px #9a9a9a;
        border-radius: 10px;
        color: #b7b7b7;
        line-height: 22px;
        width: 56px;
        font-size: 12px;
        text-align: center;
      }
    }
    .carIcon {
      position: relative;
      display: inline-block;
      width: 21px;
      height: 22px;
      background: url("#{$imgUrl}icon_screen.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
      .count {
        position: absolute;
        width: 15px;
        height: 15px;
        right: -10px;
        top: -6px;
        border-radius: 50%;
        background-color: #ff455d;
        color: #fff;
        text-align: center;
        line-height: 15px;
        font-size: 10px;
      }
    }
  }
  .swiper {
    width: 100%;
    .navbar {
      margin-bottom: 1px;
      border-radius: 3px 3px 0 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      position: relative;
      top: 0;
      height: 40px;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #e8e8e8;
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
          color: #9a9a9a;
          font-weight: 500;
          display: inline-block;
          font-size: 16px;
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
        bottom: 0.5px;
        width: 15%;
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
      height: 100%;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      .search_mains {
        margin-top: 108px;
        margin-bottom: 56px;
      }
      .line_bar {
        display: none;
        position: absolute;
        top: 20px;
        left: 10px;
        height: 20px;
        width: 3px;
        background: #ff455d;
      }
      .line_bars_show {
        display: inline-block;
      }
      .info_list {
        width: 100%;
        overflow: hidden;
        padding: 15px;
        padding-bottom: 0;
        position: relative;
        .moderly {
          text-align: center;
          padding: 13px 0;
          position: absolute;
          left: 0;
          /*top:-15px;*/
          right: 0;
          bottom: 0;
          margin: auto;
          height: 170px;
          background: rgba(0, 0, 0, 1);
          opacity: 0.2;
          border-radius: 5px;
          width: 92%;
        }
        .bgc_img {
          width: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 5px;
          height: 170px;
          /*background:#ff4500;*/
          /*border:0.5px solid #ccc;*/
          img {
            width: 100%;
            height: 100%;
          }
          .z_top {
            z-index: 10000;
          }
          .like {
            width: 47px;
            height: 23px;
            background-color: #ff455d;
            border-radius: 5px;
            position: absolute;
            top: 11px;
            right: 11px;
            text-align: center;
            line-height: 23px;
            font-size: 12px;
            color: #fff;
          }
          .address {
            width: 68px;
            /*height:40px;*/
            position: absolute;
            bottom: 11px;
            right: 11px;
            i {
              display: inline-block;
              width: 17px;
              height: 21px;
              overflow: hidden;
              position: relative;
              left: 10px;
              top: -0.5px;
              img {
                width: 50%;
                height: 11px;
              }
            }
            span {
              color: #ffffff;
              position: absolute;
              font-size: 12px;
              left: 22px;
            }
          }
          .title_name {
            z-index: 1000;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 152px;
            text-align: center;
            height: 60px;
            padding: 14px 0;

            h4 {
              color: #fff;
              font-weight: 700;
              font-size: 14px;
              text-align: center;
            }
            p {
              color: #f0f0f0;
              font-size: 12px;
              text-align: center;
            }
          }
          .share {
            position: absolute;
            top: 11px;
            left: 0;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0;
            letter-spacing: 0;
            color: #ffffff;
            width: 54px;
            line-height: 25px;
            height: 25px;
            background-color: rgba(50, 50, 50, 0.6);
            border-radius: 0rem 5px 5px 0;
            i {
              display: inline-block;
              width: 3px;
              height: 15px;
              margin: 0 6px;
              position: relative;
              top: 3px;
              background-color: #ffffff;
            }
          }
        }
        .codeall {
          width: 100%;
          overflow: hidden;
          .v_code {
            padding: 6px;
            height: 113px;
            display: inline-block;
            .lis {
              width: 100%;
              height: 100%;
              a {
                width: 73px;
                height: 73px;
                border-radius: 5px;
                border: solid 0.5px #e8e8e8;
                margin: 0 auto;
                overflow: hidden;
                img {
                  width: 60px;
                  height: 100%;
                }
              }
            }
            p {
              text-align: center;
              line-height: 28px;
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0;
              color: #323232;
            }
          }
        }
      }
      scroll-view {
        float: left;
        width: 26%;
        /*  background-color: #f2f2f2;*/
      }
      .y_tabs {
        line-height: 60px;
        font-family: PingFang-SC-Bold;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #9a9a9a;
        /*background:#ccc;  */
        height: 54px;
        width: 100.5px;
        position: relative;
      }

      .mt60 {
        margin-top: 84px;
      }
      .mains {
        width: 100%;
        padding: 15px;
        background: #fff;
        float: left;
        width: 74%;
        margin-left: 95px;
        .main_img {
          width: 100%;
          border-radius: 5px;
          height: 109px;
          overflow: hidden;

          .swiperContainer {
            width: 100%;
            height: 100%;
            position: relative;
            .swiper {
              width: 100%;
              height: 109px;
              image {
                width: 100%;
                height: 100%;
              }
            }
            .dots {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 9px;
              display: flex;
              justify-content: center;
              .dot {
                margin: 0 4px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                transition: all 0.6s;
                border: 1.5px solid #fff;
                &.active {
                  width: 10px;
                  background: #ffb505;
                }
              }
            }
          }
        }
        .main_ul {
          width: 100%;
          overflow: hidden;
          margin-top: 6px;

          h3 {
            padding: 15px 4px 10px 4px;
            color: #000;
            font-weight: 700;
            font-size: 14px;
          }
          li {
            float: left;
            width: 25%;
            padding: 6px;
            a {
              width: 58px;
              border: 0.5px solid #ccc;
              border-radius: 5px;
              border: solid 0.5px #e8e8e8;
              height: 60px;
              margin: 0 auto;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            p {
              text-align: center;
              /*	line-height:28px;*/
              font-size: 13px;
              color: #323232;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>