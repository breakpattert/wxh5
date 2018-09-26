<template>

  <div class="container" @touchmove="handletouchmove($event)">
    <!-- <div @click="isBuild" class="fansAuth"></div> -->
    <tabBar cur_index="0"></tabBar>

    <div v-if="posPopShow" class="fullPage2 pos_pop_wrap" style="z-index:99999999999;">
      <div class="cont">
        <div class="pos_pop">
          <img src="../../../static/images/img_adr.png">
          <div>无法获取地理位置，请允许地理位置授权</div>
          <button open-type="openSetting" class="smallbtn" @opensetting="opensetting">获取位置</button>
        </div>
      </div>
      <div class="footH"></div>
    </div>

    <div class="homeHeader lineBottom w100">
      <span class="adressIcon ml15 mr5" @click="$router.push({ path: '/pages/home/GoCity'})"></span>
      <span class="f12 color28 mr5 city" @click="$router.push({ path: '/pages/home/GoCity'})">{{city}}</span>
      <div class="searchBox mr4">
        <span class="searchIcon mr15"></span>
        <input type="text" class="search" disabled placeholder-class="placeholder" @click='searchFocus' @blur="searchBlur"
          :placeholder="placeholder">

      </div>
      
      <span class="carIcon" >
            <!-- <button v-if="!isNoticeAuth" open-type="getUserInfo" 
            @getuserinfo="bindGetUserInfo" @click="getUserInfo11"
            class="carAuth">
            </button> -->
            <span class="carIconIn" @click="$router.push({ path:'/pages/user/myCar'})">
      
                <span v-if="getCarCount&&getCarCount>0&&userInfo" class="count">{{getCarCount>99 ?'...':getCarCount}}</span>
            </span>
      </span>
      

    </div>

    <div class="recommendContainer" v-if="everyRecommendList&&everyRecommendList.length>0">
      <div class="todayRecommend h50p ">
        <div class="recommendTitle f16 bold color28">今日推荐
          <div class="fr"> {{swiperCurrent+1}}/{{everyRecommendList.length}}</div>
        </div>
      </div>
      <div class="swiperContainer">

 
        <mt-swipe style="height:260px" :show-indicators="indicatorDots" :defaultIndex="swiperCurrent" :autoplay="autoplay"
          :auto="duration" @change="swiperChange" class="swiper">
         
            <mt-swipe-item v-for="(item,index) in everyRecommendList" :key="index"
             @click="herfrecommend(item.type,item.linkid,item.id)">
              <div>
                <img class="banner" :src="item.thumb" alt="">
              </div>
              <div class="recommendContent h130 lineBottom">
                <div class="contentTitle mt12 f13 color29">{{item.title}}</div>
                <div class="mt8 color9a f12">{{item.description}}</div>
              </div>
            </mt-swipe-item>
         
        </mt-swipe>
      </div>
    </div>

    <div class="week" v-if="cluster_id&&cluster_id.length>0">
      <div class="weekHeader">
        <div class="weekTitle f16 bold color28">本周逛哪</div>
        <div class="weekTitleDetail mt11 f12 color9a">{{title}}</div>
      </div>
      <div class="weekContent lineBottom">
        <div class="item">
          <img class="bg" :src="imageslist[0]" alt="">
          <div class="more" @click="$router.push({ path:'/pages/busineshop/shoplist',query: { id: cluster_id[0],title:titlelist[0]}})">
            查看更多>>
          </div>
          <div class="itemDetail mt9">
            {{titlelist[0]}}
          </div>
        </div>
        <div class="item">
          <img class="bg" :src="imageslist[1]" alt="">
          <div class="more" @click="$router.push({ path:'/pages/busineshop/shoplist',query: { id: cluster_id[1],title:titlelist[1]}})">
            查看更多>>
          </div>
          <div class="itemDetail mt9">
            {{titlelist[1]}}
          </div>
        </div>
      </div>
    </div>

    <div class="toSale" v-if="tadaySaleList&&tadaySaleList.length>0">
      <div class="toSaleHeader h50p ">
        <div class="toSaleTitle f16 bold color28">大牌促销</div>
        <div class="more" @click="$router.push('/pages/nearly/bigSale')">>></div>
      </div>
      <div class="saleContent lineBottom">
        <div class="item" v-for="(item,index) in tadaySaleList" :key="index" @click="$router.push({ path:'/pages/busineshop/shop',query: { id: item.merchid }})">
          <div class="picHeader">
            <img class="bg" :src="item.bigsaleContent.thumb" alt="">
            <div class="sale f12">
              <!-- {{item.text}} -->
              {{item.bigsaleContent.title}}
            </div>
          </div>
          <!-- <div class="goodsDetail">
                  <div class="goodsName mt6 color28 f14">{{item.bigsaleContent.title}}</div>
                  <div class="price align f14">
                    <span class="mr5 colorf45d ">￥299</span>
                    <span class="old">￥699</span>
                  </div>
              </div> -->
        </div>


      </div>

    </div>
    <div class="ChinaGoods" v-if="true">
      <div class="goodsHeader">
        <div class="goodsTitle f16 bold color28">
          国货当自强
          <div class="more fr">>></div>
        </div>
        <div class="weekTitleDetail mt11 f12 color9a">made in China厉害了我的国</div>
      </div>
      <div class="goodsContent lineBottom">
        <img @click="$router.push({ path:'/pages/goodsDetail/index',query: { id: 458}})" class="goods" src="https://sh.szwfy.com.cn/attachment/images/3/2018/09/hXx90zo5dg7SYK8qp15DXgRsXGZzWq.png"
          alt="">
        <div class="goodsDetail">
          <div class="detailTitle f13 color28 mt8">超越维密指日可待！</div>
          <div class="mt8 f12 color9a">中国人自己的内衣品牌，支持国产，促进内需。</div>
        </div>
      </div>
      <!-- <div class="oldBrand lineBottom">
          <div class="left ">
              <img src="https://sh.szwfy.com.cn/attachment/images/3/2018/09/lR0wNK766K5W4knLF45wENT0ka4t2T.jpg" alt="">
          </div>
          <div class="right">
              <div class="mt14 f14 color28 bold">中国老牌‘回力鞋’的国际潮</div>
              <div class="mt14 f12 color9a">在中国一双99元的回力鞋成为好莱坞，明显的新宠，还在穿adidass你就out了</div>
          </div>
      </div> -->
    </div>

    <div class="w100" v-if="nearlySale&&nearlySale.length>0">
      <div class="nearlyHeader lineBottom" :class="{'custom':showsheader,'custompoin':showsheader2}">
        <div class="nearlyTitle f16 bold color28">附近优惠</div>
        <div class="sortBy" @click="togglePopup">
          <span class="f14 color28 mr7">筛选</span>
          <div class="icon"></div>
        </div>
      </div>

      <div class="nearly">

        <mt-popup  v-model="showTop"  position="top">
          <div class="nearlysearch">
            <div class="myToast">
              <h3>优惠活动</h3>
              <ul class="t_main">
                <li v-for="(its,ins) in shopD_list" :key="ins" @click="tabs(its,ins)" :class="{'li_active':selelet_active==ins}" >
                  		{{its.text}}
                </li>
                <!--<li>
                  <a href="">满500减200</a>
                </li>-->
          
         
              </ul>
              <div class="f_main">
              	<div class="k_price">{{detil_val}}￥</div>
                <p>
                	人均消费（0~2000￥）
                
                </p>
               
                
                <div class="s_input">
                  <mt-range v-model.lazy="value"
                      :min="2"
                      :max="100"
                      :step="2"
                      :bar-height="10">
                    </mt-range>
                  <!-- <van-slider custom-class="slider" :value="value" step="2" bar-height="10px" @change="onChange" /> -->
                </div>

              </div>
              <div class="f_button">
                <button class="button-01" @click="del($event)">清空设置</button>
                <button class="button-02" @click="handleGetfindList(1,4)">查看{{shop_num}}个商家</button>
              </div>
            </div>

          </div>
        </mt-popup>

        <!-- <van-popup :show="showTop" custom-class="top" @close="togglePopup" position="top" catchtouchmove="true">
         
        </van-popup> -->

        <div class="goodsContent">
          <div class="item lineBottom" v-for="(item,index) in nearlySale" :key="index" @click="$router.push({ path:'/pages/busineshop/shop',query: { id: item.id }})">
            <div class="left">
              <img :src="item.logo" alt="">
            </div>
            <div class="right mt10">
              <div class="title f15 color28  over_hidden">
                <!-- ULCON 优衣库   -->
                {{item.merchname}}
              </div>
              <div class="price colorf45d f14 mt12">
                <!-- 满500减100 -->
                {{item.name}}
              </div>
              <div class="time mt12">
                <span class="color9a f10 fl mt1">
                  <!-- 2018/08/07-2018/08/21 -->
                  {{item.timestart}} -- {{item.timeend}}
                </span>
                <span class="f12 color28 fr">{{item.jl}}KM</span>
               
              </div>
            </div>
          </div>

            <div class="mt10">
             
                <zan-loadmore v-if="(hasFindSale=='click')?!findlistIsBottom:!isBottom" type="loading" ></zan-loadmore>
                <zan-loadmore v-if="(hasFindSale=='click')?findlistIsBottom:isBottom" type="text"  text="暂无数据"></zan-loadmore>
            </div>
            

        </div>
      </div>
    </div>
    <!--侧滑-->
  </div>



</template>

<script>
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation,
  getSystemInfoSync,
  NetworkStatusChange
} from "@/utils/wechat";
import tabBar from "@/components/tabBar";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      posPopShow: false,
      user_Info: {},
      hasAuthInfo: false,
      isNoticeAuth: false,
      placeholder: "搜索商铺商品",
      searchValue: "",
      _url: "",
      shoplist: [],
      nearlySale: "",
      everyRecommendList: "",
      tadaySaleList: "",
      searchshow: false,
      value: 2,

      indicatorDots: false,
      swiperCurrent: 0,
      autoplay: true,
      interval: 5000,
      duration: 5000,
      showTop: false,
      showsheader: false,
      showsheader2: false,
      touchMove: false,
      weeklist: "",
      title: "",
      titlelist: "",
      imageslist: "",
      cluster_id: "",
      city: "",
      shopD_list: [
        { text: "折扣", states: "1" },
        { text: "满减", states: "2" }
      ],
      selelet_active: null,
      detil_val: "40",
      shop_num: 0,
      str: {
        ids: "",
        average: "",
        type: "",
        search_type: "",
        lat: "",
        lng: ""
      },
      page: 1,
      prePage: 4,
      isBottom: false,
      findlistIsBottom: false,
      pageFindlist: 1,
      hasFindSale: 'none',
      clusterInfo:null,
      isChangeCity:false
    };
  },
  components: {
    tabBar
  },
  computed: {
    ...mapState({
      userOpen: state => state.user.userOpen,
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["getCarCount"])
  },
  watch:{
    clusterInfo(ne,old){
       this.hasFindSale='none'
       this.selelet_active = null;
       this.value =2
    },
    value(ne,od){
      console.log(ne)
    }
  },
  onPageScroll: function(e) {
    if (e.scrollTop > 1291 || (e.scrollTop > 1291 && this.touchMove)) {
      this.showsheader = true;
    } else {
      this.showsheader = false;
    }
  },
  methods: {
    ...mapActions(["getUserOpen", "getAllProducts"]),
   
    async getPosition() {
      
         let [err1, data] = await this._to(getLocation());
        
        //进入时自动弹出位置授权，如果未允许授权：弹出提示请允许授权，如果允许授权：请求数据
        if (err1) {
          this.posPopShow = true;
          return false;
        } else {
          this.posPopShow = false;

          return data;
        }
    },
    async initData(data) {
      this.$store.commit("SET_LOCATION_INFO", data);

      // 根据定位获取返回的第一个商圈
      let [err2, BusinessList] = await this._to(
        this.$http.getBusinessPosition(data.latitude, data.longitude)
      );
     
      if (!this.$store.state.user.ids) {
        let ids = "";
        for (const key in BusinessList.result) {
          if (BusinessList.result.hasOwnProperty(key) && /^(\d)*$/.test(key)) {
            const element = BusinessList.result[key];
            ids += element.id + ",";
            console.log(element, key);
          }
        }
        this.$store.commit("SET_IDS", ids.slice(0, ids.length - 1));
      }

      //如果此地点没有商圈   提示此位置没有相应的商圈
      if (BusinessList.result[0]) {
        if (!this.$store.state.user.clusterInfo) {
          this.$store.commit("SET_CLUSTER_INFO", BusinessList.result[0]);
        }
        this.city = this.$store.state.user.clusterInfo.name;
      } else {
        this.$tips.alert("您所在的位置还没有相应的商圈，敬请期待~");
        this.city = "切换商圈";
      }

      const [
        everyRecommendList,
        getWeekList,
        tadaySaleList,
        nearlySale
      ] = await this._U
        .PromiseAll(
          this.$http.getEveryRecommend(),
          this.$http.getWeekList(
            this.$store.state.user.clusterInfo.province,
            this.$store.state.user.clusterInfo.city,
            this.$store.state.user.clusterInfo.area
          ),
          this.$http.getDadayRecomdend(),
          this.$http.getNearlySale(
            this.$store.state.user.ids,
            // this.$store.state.user.clusterInfo.id,
            data.latitude,
            data.longitude
          )
        )
        .catch(function(e) {
          console.log(e);
        });

      // 今日推荐
      // let [err, everyRecommendList] = await this._to(
      //   this.$http.getEveryRecommend()
      // );
      this.everyRecommendList = everyRecommendList.list;

      // 本周逛哪  暂时不关联商圈
      // let [err7, getWeekList] = await this._to(
      //   this.$http.getWeekList(
      //     this.$store.state.user.clusterInfo.province,
      //     this.$store.state.user.clusterInfo.city,
      //     this.$store.state.user.clusterInfo.area
      //   )
      // );
      this.weeklist = getWeekList;
      this.title = getWeekList.result[0].title;
      this.cluster_id = getWeekList.result[0].content.cluster_id;
      this.titlelist = getWeekList.result[0].content.title;
      this.imageslist = getWeekList.result[0].content.images;

      // 今日促销
      // const [err6, tadaySaleList] = await this._to(
      //   this.$http.getDadayRecomdend()
      // );
      this.tadaySaleList = tadaySaleList.list.data.splice(0, 8);

      // 附近优惠
      // let [err4, nearlySale] = await this._to(
      //   this.$http.getNearlySale(
      //     this.$store.state.user.clusterInfo.id,
      //     data.latitude,
      //     data.longitude
      //   )
      // );
      // nearlySale.result.data.map(i => {
      //   i.timestart = this._U.formatTime(i.timestart * 1000);
      //   i.timeend = this._U.formatTime(i.timeend * 1000);
      // });
      nearlySale.result.data.map(i => {
        i.jl = (i.jl / 1000).toFixed(1);
      });
      this.nearlySale = nearlySale.result.data;

      // let [err5, data1] = await this._to(NetworkStatusChange());
    },
    searchFocus() {
      this.placeholder = "";
      this.$router.push({
        path: "/pages/searchshop/searchresult",
        query: {
          type: "home"
        }
      });
    },
    searchBlur() {
      this.placeholder = "搜索商铺商品";
    },
    // 	 筛选点击
    poinsearch(ev) {
      this.searchshow = !this.searchshow;
    },
    onChange(event) {
      console.log(event,555555)
      this.detil_val = event.mp.detail * 20;
      this.str.average = this.detil_val;
      this.str.type = "1";
      this.findshoping();
      console.log(this.value,111111111111)
    },

    tabs(item, index) {
      this.selelet_active = index;
      this.str.type = "1";
      this.str.search_type = item.states;

      this.findshoping();
    },
    //  获取筛选的个数
    async findshoping() {
      let shopDistrictlist = await this._to(
        this.$http.perCapita(
          this.$store.state.user.clusterInfo.id,
          this.str.average,
          this.str.type,
          this.str.search_type,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude
        )
      );
      this.shop_num = shopDistrictlist[1].list;
    },
    //		 获取筛选商品列表
    async findlist(page, prePage) {
      let shopDistrictlist = await this._to(
        this.$http.perCapita(
          this.$store.state.user.clusterInfo.id,
          this.str.average,
          2,
          this.str.search_type,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          page,
          prePage
        )
      );
      return shopDistrictlist[1].list;
    },
   async handleGetfindList(page, prePage) {
      this.hasFindSale = 'click';
      this.pageFindlist=1;
      const data =await this.findlist(page, prePage);
      this.showTop = !this.showTop;
      this.showsheader2 = !this.showsheader2;
     
     
      this.nearlySale = data;
      
    },
    del(e) {
      console.log(e,'del')
      this.selelet_active = null;
      this.value =2
    },
    isBuild() {
      this.$tips.alert("敬请期待...");
    },
    swiperChange: function(e) {
      this.swiperCurrent = e
    },
    async getAuthInfo() {
      if (!this.$store.state.user.userOpen) {
        await this.getUserOpen();
        this.getAllProducts();
      }
      const userOpen = this.$store.state.user.userOpen;

      const [err, res] = await this._to(getUserInfo());
      if (err) return console.error(err);
      const { encryptedData, iv } = res;

      const [err1, authInfo] = await this._to(
        this.$http.doAuth(
          userOpen.openid,
          encryptedData,
          iv,
          userOpen.session_key,
          userOpen.authkey
        )
      );

      if (err1) return console.error(err1);
      authInfo.openId = "sns_wa_" + authInfo.openId;
      this.$store.commit("SET_USER_INFO", authInfo);
      this.$store.commit("SET_DO_AUTH", true);
      this.user_Info = authInfo;
    },
    async togglePopup() {
      //  	获取筛选的满减
      this.showTop = !this.showTop;
      this.showsheader2 = !this.showsheader2;
        window.scrollTo(0, 1290)
      // wx.pageScrollTo({
      //   scrollTop: 1290,
      //   duration: 300
      // });
    },

    onClose() {
      this.show = false;
      this.showsheader2 = !this.showsheader2;
    },
    handletouchmove(e) {
      this.touchMove = true;
    },
    //跳转四个页面
    herfrecommend(type, linkid, id) {
      if (type == 1) {
        this.$router.push({
          path: "/pages/goodsDetail/index",
          query: { id: linkid }
        });
      } else if (type == 2) {
        this.$router.push({
          path: "/pages/busineshop/shop",
          query: { id: linkid }
        });
      } else if (type == 3) {
        this.$router.push({
          path: "/pages/recommend/recommendone",
          query: { id }
        });
      }
    }
  },
  async mounted() {
    const systemInfo = getSystemInfoSync();
    this.$store.commit("SET_SYSTEM_INFO", systemInfo);
  },

  onPullDownRefresh() {},
  async onReachBottom() {
    
    // 如果是筛选后的结果
     
    if (this.hasFindSale=='click') {
      
      if (this.findlistIsBottom) return;
     
      let nearlySale = await this.findlist(++this.pageFindlist, this.prePage);
     
      
      if (nearlySale.length < this.prePage) {
        this.findlistIsBottom = true;
      }
       nearlySale.map(i => {
          i.jl = (i.jl / 1000).toFixed(1);
        });
      this.nearlySale = [...this.nearlySale, ...nearlySale];
    } else {
      if (this.isBottom) return;

      let nearlySale = await this.$http.getNearlySale(
        this.$store.state.user.ids,
        // this.$store.state.user.clusterInfo.id,
        this.$store.state.user.locationInfo.latitude,
        this.$store.state.user.locationInfo.longitude,
        ++this.page,
        this.prePage
      );

      if (nearlySale.result.data.length < this.prePage) {
        this.isBottom = true;
      }

      nearlySale.result.data.map(i => {
        i.jl = (i.jl / 1000).toFixed(1);
      });
      this.nearlySale = [...this.nearlySale, ...nearlySale.result.data];
    }
  },
  async created() {
   
    this.isBottom = false;
    this.clusterInfo = this.$store.state.user.clusterInfo
    //this.$store.state.user.clusterInfo.id

    if (!this.$store.state.user.locationInfo) {
      var data = await this.getPosition();
      this.initData(data); //获取定位
    } else {
      const data = {
        latitude: this.$store.state.user.locationInfo.latitude,
        longitude: this.$store.state.user.locationInfo.longitude
      };
      this.initData(data); //获取定位
    }
  }
};
</script>
<style scoped lang='scss'>
.container {
  padding-bottom: 60px;
  width: 100%;

  .homeHeader {
    height: 49px;
    line-height: 49px;

    .city {
      width: 50px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      line-height: 12px;
    }

    .adressIcon {
      width: 13.5px;
      height: 20px;
      display: inline-block;
      background: url("#{$imgUrl}icon_adr.png") no-repeat center center;
      background-size: cover;
      position: relative;
      top: 4.5px;
    }

    .searchBox {
      .placeholder {
        color: #b7b7b7;
        font-size: 10px;
        vertical-align: middle;
      }

      background: #f2f2f2;
      display: inline-block;
      height: 25px;
      line-height: 25px;
      width: 245px;
      // border: 1px solid #e8e8e8;
      border-radius: 5px;
      padding-left: 12px;

      .searchIcon {
        display: inline-block;
        width: 13.5px;
        height: 14px;
        background: url("#{$imgUrl}search.png") no-repeat center center;
        background-size: cover;
        vertical-align: middle;
      }

      .search {
        display: inline-block;
        width: 170px;
        height: 20px;
        line-height: 20px;
        min-height: 20px;
        vertical-align: middle;
      }
    }

    .carIcon {
      position: relative;
      display: inline-block;
      width: 21px;
      height: 22px;
      background: url("#{$imgUrl}icon_shopping.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
      .carIconIn {
        position: absolute;
        display: inline-block;
        width: 21px;
        height: 22px;
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
  }

  .recommendContainer {
    width: 100%;
    padding: 0 15px;

    .todayRecommend {
      padding-top: 21px;

      .recommendTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
        position: relative;
      }
    }

    .banner {
      display: block;
      width: 345px;
      height: 170px;
      border-radius: 5px;
    }

    .recommendContent {
      height: 65px;

      .contentTitle {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .mt8 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .week {
    padding: 0 15px;
    width: 100%;

    .weekHeader {
      height: 71px;
      padding-top: 16px;

      .weekTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }
    }

    .weekContent {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      height: 165px;

      .item {
        position: relative;
        display: block;
        margin-right: 5px;

        .bg {
          width: 170px;
          height: 120px;
          border-radius: 5px;
        }

        .more {
          position: absolute;
          top: 85px;
          width: 80px;
          height: 22px;
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 22px;
          margin: 0 auto;
          right: 0;
          left: 0;
        }

        .itemDetail {
        }
      }
    }
  }

  .toSale {
    position: relative;
    padding: 0 15px;
    width: 100%;

    .toSaleHeader {
      padding-top: 21px;

      .toSaleTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }

      .more {
        position: absolute;
        top: 0;
        right: 15px;
      }
    }

    .saleContent {
      width: 100%;
      height: 220px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .item {
        width: 70px;
        height: 70px;

        // margin-right: 7px;
        .picHeader {
          .bg {
            width: 70px;
            height: 70px;
            border-radius: 3px;
            border: 0.5px solid #e8e8e8;
            display: block;
            box-sizing: border-box;
          }

          .sale {
            height: 22px;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /* background-color: #ff455d;*/
            // color: #ff455d;
            text-align: center;
          }
        }

        .goodsDetail {
          .goodsName {
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
          }

          .price {
            .old {
              color: #9a9a9a;
              text-decoration: line-through;
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .ChinaGoods {
    padding: 0 15px;
    width: 100%;

    .goodsHeader {
      height: 71px;
      padding-top: 16px;

      .goodsTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }
    }

    .goodsContent {
      height: 228px;

      .goods {
        width: 345px;
        height: 170px;
        display: block;
        border-radius: 3px;
      }
    }

    .oldBrand {
      height: 127px;
      padding: 17px 15px 0 104px;
      position: relative;

      .left {
        position: absolute;
        left: 0;

        img {
          display: block;
          width: 91px;
          height: 91px;
          border-radius: 5px;
        }
      }
    }
  }

  .nearly {
    width: 100%;
    padding: 0 15px;
  }

  .nearlysearch {
    /*height:200px;*/
    /*border:0.5px solid red;*/

    width: 100%;

    .myToast {
      border: 0;
      position: relative;
      width: 100%;

      /* padding: 0 15px;*/
      background-color: #fff;
      text-align: center;
      /*  border:0.5px solid #0000FF;*/

      margin-top: 11.5px;

      h3 {
        text-align: left;
        font-size: 14px;
        line-height: 40px;
        color: #9a9a9a;
        margin: 0 15px;
      }

      .t_main {
        overflow: hidden;
        width: 100%;
        margin: 0 15px;

        li {
          margin-right: 23px;
          float: left;
          height: 30px;
          border-radius: 3px;
          border: solid 0.5px #e8e8e8;
          background: #e8e8e8;
          text-align: center;
          line-height: 30px;
          margin-right: 15px;
          background: #e8e8e8;
          width: 100px;
          margin-bottom: 15px;
          color: #323232;
          font-size: 12px;

          /*border: solid 0.5rem #b7b7b7;*/
        }
        .li_active {
          border: 0.5px solid #ff455d;
          background: #ffe5e8;
          color: #ff455d;
        }
      }

      .f_main {
        padding: 0 15px;
        text-align: left;
        overflow: hidden;
        position: relative;

        p {
          color: #9a9a9a;
          margin-top: 15px;
          margin-bottom: 62px;
          font-size: 14px;
        }

        .van-slider {
          height: 10px !important;
        }
        .k_price {
          position: absolute;
          top: 86rpx;
          left: 28rpx;
          color: #9a9a9a;
          font-size: 14px;
          /*background: url("#{$imgUrl}btn_sliding.png") no-repeat center center;*/
        }
        .s_input {
          /*margin-left:12px;*/
        }
      }

      .f_button {
        height: 45px;
        line-height: 45px;
        /*border-bottom: solid 0.5px #b7b7b7;*/
        width: 100%;
        margin-top: 30px;

        button {
          border: 0;
          background: #fff;
          float: left;
          width: 50%;
          font-size: 16px;
          color: #fff;
          margin: 0 auto;
          border-radius: 0;
        }

        .button-01 {
          background: #ff7e8f;
        }

        .button-02 {
          background: #ff455d;
        }
      }
    }
  }

  .nearlyHeader {
    padding: 0 15px;
    z-index: 10000;
    height: 50px;
    padding-top: 16.5px;
    position: relative;
    z-index: 1000;
    background: #fff;

    .nearlyTitle {
      height: 20px;
      border-left: 3px solid #ff455d;
      padding-left: 7px;
      line-height: 20px;
    }

    .sortBy {
      position: absolute;
      right: 15px;
      top: 15px;

      .icon {
        width: 15px;
        height: 17px;
        background: url(#{$imgUrl}icon_screen.png) no-repeat center/cover;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .custom {
    position: fixed;
    background: #fff;
    top: 0;
    z-index: 10000;
  }

  .custompoin {
    position: fixed;
    background: #fff;
    top: 0;
    z-index: 10000;
  }

  .goodsContent {
    .item {
      position: relative;
      padding: 12px 0 12px 0;
      height: 115px;

      img {
        width: 91px;
        height: 91px;
        display: block;
        position: absolute;
        left: 0;
      }

      .right {
        margin-left: 110px;
      }
    }
  }

  .pos_pop_wrap {
    background: rgba(255, 255, 255, 0);
    display: -webkit-flex;
    display: flex;
    flex-direction: column;

    .cont {
      background: #ffffff;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footH {
      height: 50px;
      width: 100%;
    }

    .pos_pop {
      margin: 1rem auto 0.2rem;
      text-align: center;
      width: 690rpx;

      img {
        width: 340rpx;
        height: 116rpx;
        display: block;
        margin: 0 auto;
      }

      div {
        text-align: center;
        margin-top: 78rpx;
        font-size: 28rpx;
      }

      button {
        margin: 60rpx auto 0;
      }
    }
  }
}
</style>
