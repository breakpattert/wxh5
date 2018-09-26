<template>
	<div class="container lineTop" @touchstart.prevent>
		<!-- <button v-if="!hasAuthInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
    </button> -->
		<div @click="isBuild" class="fansAuth"></div>
		<!--<tabBar cur_index="1"></tabBar>-->
		<goAuth></goAuth>
		 <div class="w100 s_box lineBottom">      
            	<div class="searchBox">
						<span class="searchIcon mr15"></span>
						<input type="text" class="search" placeholder-class="placeholder" @focus='searchFocus' @blur="searchBlur" @confirm="searchs" confirm-type="search" :placeholder="placeholder_2" v-model="userword">
						<span class="searchIcon_2 mr15"></span>
						<ul class="shop_m">
									<li class="shop_home" @click="shoptogle()">
										<span>
											<img src="../../../static/images/btn_triangle.png" alt="" />
										</span>
										<i style="color:#323232;">{{searchtype.type0}}</i>
									</li>
									<li class="shop_home_02" v-show="toglestatus" @click="texttab()">{{searchtype.type1}}</li>
							</ul>
				</div>
				
					
                        <!--<span class="carIcon">
                        	
                        </span>-->
    	</div>
    	
	   	<div class="w100" v-if="showhitory">
			  <div class="serch_like w100">           
				<h3>热门搜索:</h3>
				<div @click="searchs">searchs</div>
	  			<div class="s_buttons">
	  				<span v-for="(item2,index2) in wordlist" :key="index2" @click="herfresult(item2,index2)" :class="{'navactive':activeIndex == index}">{{item2.keyword}}</span>
	  				<!--<span>耐克</span>-->
	  			</div>
	  			</div>
		    	<div class="w100 search_history">
		    		<h3>搜索历史：</h3>
		    		<ul>
		    			<li v-for="(item,index) in searchList" :key="index" @click="herfresult_word(item,index)">{{item.key}}</li>
		    			<!--<li>阿迪王男装</li>
		    			<li>阿迪王男装</li>-->
		    		</ul>
		    		<button @click="delhistory()">清除搜索历史</button>
		    		
		    	</div>
		</div>
		
		<van-popup :show="show.top" custom-class="top" @close="togglePopup" position="top">
			<div class="myToast">
				<ul class="t_main">
					
					<li v-for="(its,ins) in shopD_list" @click="tabs(its,ins)" :class="{'li_active':selelet_active==ins}" :key="ins">
						<a href="" v-if="its.minprice<500">{{its.minprice}}-{{its.maxprice}}元</a>
						<a href="" v-if="its.minprice==500">{{its.minprice}}以上</a>
					</li>
					<!--<li>
						<a href="">100元以上</a>
					</li>-->
				</ul>
				<div class="f_main">
					<p>请输入价格区间</p>
					<div class="s_input">
						<input type="text" class="search" v-model="minprice" placeholder-class="placeholder" @focus='priceFocus' placeholder="最低价">
					</div>
					<div class="lines">--</div>
					<div class="s_input">
						<input type="text" class="search" v-model="maxprice" placeholder-class="placeholder" @focus='priceFocus' placeholder="最高价">
					</div>
				</div>
				<div class="f_button" @click="but_sulit()">
					<button>确定</button>
				</div>
			</div>
		</van-popup>
			<div class="result_page w100 lineBottom" style="z-index:1000;background: #fff;" v-if="result_pageshow">
				<li @click="ListBySale()">
					销量
					<a class="ri_poins">
					<!--	:class="{'poin_pull':pullshow}"-->
					
						<span class="poin_top" :class="{'poin_top_show':pullshow}"></span>
						<span class="poin_bottom" :class="{'poin_bottom_show':downshow}"></span>
					</a>
				</li>
				<li @click="ListByPrice()">
					价格
					<a class="ri_poins">
						<span class="poin_top_1" :class="{'poin_top_show':pullshow_2}"></span>
						<span class="poin_bottom_1" :class="{'poin_bottom_show':downshow_2}"></span>
					</a>
				</li>
				<li @click="togglePopup">
					筛选
					<!--<button class="show-btn" bindtap="showDialogBtn">弹窗</button>-->
					<span class="carIcon">
						
                        	<!--<view bindtap="clickArea">点击此处</view>　-->
             		</span>
				</li>
			</div>   
		<div class="nearly" v-if="showresult" :class="{'nearly_top':show_margin_top}">
			<!--<div class="nearlyHeader">
			            <div class="nearlyTitle f16 bold color28">附近优惠</div>
			            <div class="sortBy">
			              <span class="f14 color28 mr7">筛选</span>
			              <div class="icon"></div>
			            </div>
			        </div>-->
		     
			<div class="goodsContent">
					
				<div class="item"  v-for="(item,index) in resultlist" :key="index" v-if="showitem1">
					<div class="left">
						<img :src="item.thumb" alt="">
					</div>
					<div class="right mt8">
						<div class="title f14 color28">
							{{item.title}}
						</div>
						<!--<div class="price colorf45d f16 mt12">
				                	
				                 	￥580  <span class="f12 color9a">500人付款</span>
				                </div>-->
						<div class="time mt12" style="overflow: hidden;">
							<span class="colorf45d f16 fl">￥{{item.marketprice}}</span>
							<span class="f12 fr color9a mr23">{{item.sales}}人付款</span>
						</div>
						<div class="time mt20">
							<span class="color32 f12 fl" style="position: absolute;">{{item.merchname}}</span>
							<span class="f14 fr mr23">1.1KM</span>
						</div>
					</div>
				</div>
				<div class="item lineBottom"  v-for="(item,index) in resultlist" :key="index" v-if="showitem2" @click="$router.push({ path:'/pages/busineshop/shop',query: { id: item.id}})">
					<div class="left">
						<img :src="item.logo" alt="">
					</div>
					<div class="right mt8">
						<div class="title f14 color28">
							{{item.merchname}}
						</div>

						<div class="time mt12" style="overflow: hidden;">
							<span class="fl ridio">
								<i><img src="../../../static/images/img_star.png" alt="" /></i>
								<i><img src="../../../static/images/img_star.png" alt="" /></i>
								<i><img src="../../../static/images/img_star.png" alt="" /></i>
								<i><img src="../../../static/images/img_star.png" alt="" /></i>
								<i><img src="../../../static/images/img_star.png" alt="" /></i>
							</span>
							<span class="f12 color32">5.0</span>
						<!--	<span class="f12 fr color9a mr23">销量：{{item.id}}</span>-->
							
						</div>
						<div class="time mt20">
							<span class="color32 f12 fl" style="position: absolute;">销量：{{item.id}}</span>
							<span @click="$router.push({ path:'/pages/busineshop/shop',query: { id: item.id}})" class="f12 fr color9a mr23 goshop">进店>> </span>
						</div>
					</div>
				</div>
				<!--<div class="item">
					<div class="left">
						<img src="../../../static/images/img_mensclothing.png" alt="">
					</div>
					<div class="right mt8">
						<div class="title f14 color28">
							的大富大贵多岁的分公司法规
						</div>
	
						<div class="time mt12" style="overflow: hidden;">
							<span class="colorf45d f16 fl">￥500</span>
							<span class="f12 fr color9a mr23">500人付款</span>
						</div>
						<div class="time mt20">
							<span class="color32 f12 fl">生巅峰发的非官方个公分</span>
							<span class="f12 fr color9a mr23">1.1KM</span>
						</div>
					</div>
				</div>-->

			</div>
		</div>

	</div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";
import tabBar from "@/components/tabBar";
import sercah from "@/components/sercah";
export default {
  data() {
    return {
      show: {
        middle: false,
        top: false,
        bottom: false,
        right: false,
        right2: false
      },
      placeholder_2: "搜你想要的~",
      toglestatus: false,
      showhitory: true,
      showresult: false,
      searchList: "",
      wordlist: "",
      activeIndex: "",
      userword: "",
      resultlist: [],
      searchtype: {
        type0: "店铺",
        type1: "商品"
      },
      result_pageshow: true,
      pullshow: false,
      downshow: false,
      pullshow_2: false,
      downshow_2: false,
      showitem1: true,
      showitem2: false,
      show_margin_top: false,
      by_state: false,
      shopD_list: [
        { minprice: "50", maxprice: "100", states: "1" },
        { minprice: "100", maxprice: "200", states: "2" },
        { minprice: "200", maxprice: "500", states: "3" },
        { minprice: "500", maxprice: "以上", states: "4" }
      ],
      selelet_active: null,
      select_li: false,
      min_price_1: "",
      max_price_2: "",
      minprice: "",
      maxprice: ""
    };
  },
  components: {
    //			tabBar,
    sercah
  },
  created() {
    this.hasauth();
  },
  methods: {
    ...mapActions(["getUserOpen", "getAllProducts"]),
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        this.isNoticeAuth = true;
      } else {
        console.log("用户还未授权过");
      }
    },
    searchFocus() {
      this.placeholder_2 = "";
    },
    priceFocus() {
      this.selelet_active = null;
    },
    searchBlur() {
      this.placeholder_2 = "搜你想要的 ~";
    },
    async bindGetUserInfo({ mp }) {},
    togglePopup() {
      this.toggle("top");
    },
    tabs(item, index) {
      this.select_li = !this.select_li;
      if (this.select_li == true) {
        this.selelet_active = index;
        this.min_price_1 = item.minprice;
        this.max_price_1 = item.maxprice;
      } else if (this.select_li == false) {
        this.selelet_active = null;
        this.min_price_1 = "";
        this.max_price_1 = "";
      }
    },
    but_sulit() {
      debugger;
      console.log(this.select_li);
      if (
        this.select_li == true &&
        (this.minprice == "" || this.maxprice == "")
      ) {
        this.pointlist(this.min_price_1, this.max_price_1);

        return;
      } else if (
        this.select_li == false &&
        (this.minprice == "" || this.maxprice == "")
      ) {
        this.$tips.toast(`请选择价格范围`, function() {}, "none", 800);
      } else if (
        this.select_li == false &&
        (this.minprice !== "" || this.maxprice !== "")
      ) {
        this.pointlist(this.minprice, this.maxprice);

        return;
      } else if (
        this.select_li == true &&
        (this.minprice !== "" || this.maxprice !== "")
      ) {
        this.pointlist(this.minprice, this.maxprice);
      }
    },
    toggle(type) {
      this.show[type] = !this.show[type];
    },
    async delhistory() {
      //				this.deleteSearchHistory()
      let data = await this._to(this.$tips.confirm("确定删除历史记录吗", ""));
      if (data[1] == "confirm") {
        let userOpen = this.$store.state.user.userOpen;
        this.$http.deleteSearchHistory(userOpen.openid);
        let searchList = await this._to(
          this.$http.searchHistory(this.$store.state.user.userOpen.openid)
        );
        this.searchList = searchList[1].list;
      } else {
        return;
      }
    },
    onClose() {
      this.show = false;
    },
    shoptogle() {
      this.toglestatus = !this.toglestatus;
    },
    async sult(type) {
      //  		搜索结果的页面
      let types = type;
      let userOpen = this.$store.state.user.userOpen;
      let resultlist = await this._to(
        this.$http.goodsSearchList(this.userword, userOpen.openid, types)
      );
      this.resultlist = resultlist[1].result.data;
    },
    async sult2(type, keyword) {
      //  		搜索结果的页面
      let types = type;
      let userOpen = this.$store.state.user.userOpen;
      let resultlist = await this._to(
        this.$http.goodsSearchList(keyword, userOpen.openid, types)
      );
      this.resultlist = resultlist[1].result.data;
    },
    herfresult(item2, index2) {
      //				this.$router.push({ path:'/pages/searchshop/search_shop'});
      this.userword = item2.keyword;
      this.showhitory = false;
      this.showresult = true;
      this.result_pageshow = true;
      this.show_margin_top = true;
      this.activeIndex = index2;
      this.sult(0);
    },
    herfresult_word(item, index) {
      //				this.$router.push({ path:'/pages/searchshop/search_shop'});
      this.userword = item.key;
      this.showhitory = false;
      this.showresult = true;

      this.activeIndex = index;
      if (item.type == 0) {
        this.result_pageshow = true;
        this.show_margin_top = true;
        this.showitem1 = true;
        this.showitem2 = false;
        this.sult(0);
      } else if (item.type == 1) {
        this.result_pageshow = false;
        this.show_margin_top = false;
        this.showitem1 = false;
        this.showitem2 = true;
        this.sult(1);
      } else {
        return;
      }
    },
    texttab() {
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
        this.showitem1 = true;
        this.showitem2 = false;
        this.herftype();
        this.show_margin_top = true;
      } else if (this.searchtype.type0 == "店铺") {
        console.log(4);
        this.showitem1 = false;
        this.showitem2 = true;
        this.herftype_02();
        this.show_margin_top = false;
      }
    },
    async pointlist(min, max) {
      debugger;
      let userOpen = this.$store.state.user.userOpen;
      let authkey = this.$store.state.user.userInfo.authkey;
      let pages = 1;
      let shoplist = await this._to(
        this.$http.getPontByPrice(userOpen.openid, authkey, min, max, pages)
      );
      this.resultlist = shoplist[1].list;
      this.show.top = !this.show.top;
    },
    async herftype() {
      let type = 0;
      this.result_pageshow = true;
      this.showhitory = false;
      this.showresult = true;
      this.sult(type);
    },
    //			华润万象城
    async herftype_02() {
      let type = 1;
      this.result_pageshow = false;
      this.showhitory = false;
      this.showresult = true;
      this.sult(type);
      console.log(6666);
    },

    //			按照商品销量排序
    async ListBySale() {
      this.by_state = !this.by_state;
      let by = "";
      if (this.by_state == true) {
        by = "asc";
        this.pullshow = true;
        this.downshow = false;
      } else {
        by = "desc";
        this.pullshow = false;
        this.downshow = true;
      }
      console.log(by);

      let userOpen = this.$store.state.user.userOpen;
      let authkey = this.$store.state.user.userInfo.authkey;
      let pages = 1;

      let resultlist = await this._to(
        this.$http.getGoodsListBySale(userOpen.openid, authkey, pages, by)
      );
      this.resultlist = resultlist[1].list;
    },
    //			按照价格来排序
    async ListByPrice() {
      this.by_state = !this.by_state;
      let by = "";
      if (this.by_state == true) {
        by = "asc";
        this.pullshow_2 = true;
        this.downshow_2 = false;
      } else {
        by = "desc";
        this.pullshow_2 = false;
        this.downshow_2 = true;
      }
      console.log(by);
      let userOpen = this.$store.state.user.userOpen;
      let authkey = this.$store.state.user.userInfo.authkey;
      let pages = 1;
      let resultlist = await this._to(
        this.$http.getGoodsListByPrice(userOpen.openid, authkey, by, pages)
      );

      this.resultlist = resultlist[1].list;
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
    onAnimationfinish() {
      console.log("滑动完成.....");
    }
  },
  mounted() {
    this.showhitory = true;

    if (this.$route.query.type == 0) {
      this.result_pageshow = true;
      this.showhitory = false;
      this.showresult = true;
      this.showitem1 = true;
      this.showitem2 = false;
      let state = this.$route.query.type;
      let keyword = this.$route.query.keyword;
      this.sult2(state, keyword);
    } else if (this.$route.query.type == 1) {
      this.result_pageshow = false;
      this.showhitory = false;
      this.showresult = true;
      this.showitem1 = false;
      this.showitem2 = true;
      let state = this.$route.query.type;
      let keyword = this.$route.query.keyword;
      this.sult2(state, keyword);
    } else if (this.$route.query.type == "home") {
      this.showresult = false;
      this.result_pageshow = false;
      this.showitem1 = true;
      this.showitem2 = false;
    } else {
      return;
    }
  },
  computed: {
    ...mapState({
      userOpen: state => state.user.userOpen,
      userInfo: state => state.user.userInfo
    })
  },
  async created() {
    //		 	 this.$store.state.user;
    let userOpen = this.$store.state.user.userOpen;

    let wordlist = await this._to(this.$http.hotWords(userOpen.openid));

    let searchList = await this._to(this.$http.searchHistory(userOpen.openid));
    this.wordlist = wordlist[1].list;

    this.searchList = searchList[1].list;
    console.log(this.searchList);
  }
};
</script>
<style scoped lang='scss'>
.van-popup {
  overflow-y: none !important;
}
.container {
  background-color: #f2f2f2;
  padding-bottom: 50px;
  .s_box {
    background: #fff;
    padding: 15px;
    z-index: 1000000;
    position: relative;
    position: fixed;
  }
  .van-popup--top {
    top: 108px;
    height: 294px !important;
  }
  .van-popup__overlay {
    top: -1px;
  }

  .myToast {
    border: 0;
    z-index: 1000;
    position: absolute;
    width: 100%;
    height: 208px;
    padding: 0 15px;
    background-color: #fff;
    text-align: center;
    top: 31.5px;
    padding-top: 24px;
    /*  border:0.5px solid #0000FF;*/

    margin-top: 12px;
    .t_main {
      overflow: hidden;
      width: 100%;
      li {
        width: 70px;
        margin-right: 16px;

        float: left;
        height: 30px;
        border-radius: 3px;
        border: solid 0.5px #e8e8e8;
        background: #e8e8e8;
        text-align: center;
        line-height: 30px;
        /*border: solid 0.5rem #b7b7b7;*/

        a {
          color: #323232;
          font-size: 12px;
          text-decoration: none;
          /*color: #b7b7b7;*/
        }
      }
      .li_active {
        border: 0.5px solid #ff455d;
        background: #ffe5e8;
        color: #ff455d;
        a {
          color: #ff455d;
        }
      }
    }
    .f_main {
      text-align: left;
      overflow: hidden;
      p {
        color: #b7b7b7;
        margin: 15px 0;
        font-size: 12px;
      }
      .s_input {
        width: 70px;
        height: 27px;
        border-radius: 3px;
        border: solid 0.5px #b7b7b7;
        float: left;
        input {
          font-size: 12px;
          padding: 0 15px;
        }
      }
      .lines {
        width: 30px;
        line-height: 30px;
        float: left;
        text-align: center;
        margin: 0 3px;
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
        font-size: 16px;
        color: #b7b7b7;
        margin: 0 auto;
      }
    }
  }
  .result_page {
    height: 35px;
    position: fixed;
    top: 59px;
    /*border:0.5px solid #000;*/
    padding-top: 0px;
    li {
      font-family: PingFang-SC-Regula;
      letter-spacing: 1px;
      float: left;
      width: 33.33%;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #323232;
      .ri_poins {
        display: inline-block;
        position: relative;
        left: -2px;
        top: -2px;
        width: 15px;
        height: 15px;
        /*border:0.5px solid red;*/
        .poin_top {
          display: block;
          width: 0;
          height: 0;
          border: 5.5px solid #ffd800;
          border-top: 5.5px solid #0000;
          border-left: 5.5px solid #0000;
          border-right: 5.5px solid #0000;
          border-color: transparent transparent #e8e8e8 transparent;
          /*border-color: transparent transparent #ffd800 transparent;*/
        }

        .poin_top_1 {
          display: block;
          width: 0;
          height: 0;
          border: 5.5px solid #ffd800;
          border-top: 5.5px solid #0000;
          border-left: 5.5px solid #0000;
          border-right: 5.5px solid #0000;
          border-color: transparent transparent #e8e8e8 transparent;
          /*border-color: transparent transparent #ffd800 transparent;*/
        }
        .poin_top_show {
          border-color: transparent transparent #ffd800 transparent;
        }
        .poin_bottom {
          margin-top: 3px;
          display: block;
          width: 0;
          height: 0;
          border: 5.5px solid #e8e8e8;
          border-color: #e8e8e8 transparent transparent transparent;
        }
        .poin_bottom_1 {
          margin-top: 3px;
          display: block;
          width: 0;
          height: 0;
          border: 5.5px solid #e8e8e8;
          border-color: #e8e8e8 transparent transparent transparent;
          /*	border-color: #ffd800 transparent transparent transparent;*/
        }
        .poin_bottom_show {
          border-color: #ffd800 transparent transparent transparent;
        }
      }
    }
    .carIcon {
      position: relative;
      display: inline-block;
      width: 19px;
      height: 21px;
      background: url("#{$imgUrl}icon_screen.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
  }

  .nearly {
    width: 100%;
    padding: 0 15px;
    /*			padding-bottom: 14%;*/
    background: #fff;
    margin-top: 76px;
    .nearlyHeader {
      height: 50px;
      padding-top: 16.5px;
      position: relative;
      .nearlyTitle {
        height: 20px;
        border-left: 2px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }
      .sortBy {
        position: absolute;
        right: 0;
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
    .goodsContent {
      .item {
        position: relative;
        padding: 12px 0 12px 0;
        height: 130px;
        .left {
          width: 118px;
        }
        img {
          width: 118px;
          height: 109px;
          display: block;
          position: absolute;
          left: 0;
        }
        .right {
          margin-left: 140px;
          .ridio {
            margin-right: 4px;
            width: 86px;
            height: 20px;
            position: relative;
            i {
              float: left;
              width: 16px;
              height: 16px;
              img {
                width: 16px;
                height: 16px;
                position: relative !important;
                display: inline-block;
              }
            }
          }
          .goshop {
            display: inline-block;
            width: 54px;
            height: 18px;
            background-color: #ff455d;
            border-radius: 3px;

            line-height: 17px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
  .nearly_top {
    margin-top: 100px;
  }
  .serch_like {
    background: #fff;
    padding: 15px;
    margin-top: 66px;
    /*	padding-top:0;*/
    h3 {
      /*margin-top:15px;*/
      height: 30px;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      letter-spacing: 0rem;
      color: #323232;
    }
    .s_buttons {
      span {
        padding: 0 15.5px;
        margin-right: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        display: inline-block;
        /*width: 71px;*/
        height: 26px;

        line-height: 26px;
        border-radius: 5px;
        border: solid 0.5px rgba(183, 183, 183, 1);
        font-size: 14px;
        text-align: center;
      }
      .navactive {
      }
    }
  }
  .search_history {
    background: #fff;
    padding: 15px;
    margin-top: 10px;
    padding-bottom: 36%;
    h3 {
      height: 30px;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      letter-spacing: 0px;
      color: #323232;
    }
    ul > li {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #9a9a9a;
      border-bottom: 0.5px solid rgba(232, 232, 232, 0.9);
    }
    button {
      width: 140px;
      height: 40px;
      border-radius: 20px;
      border: solid 0.5px #e8e8e8;
      margin: 32px auto;
      background: #fff;
      color: #9a9a9a;
      font-size: 16px;
    }
  }
  .searchBox {
    /* background: #f2f2f2;*/
    display: inline-block;
    height: 30px;
    line-height: 28px;
    background: #e8e8e8;
    width: 100%;
    border-right: 0;
    padding-left: 14px;
    position: relative;
    border-radius: 30px;
    /*position: fixed;*/
    /*  margin-left:15px;*/
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
      /*border-right:1px solid #b7b7b7;*/
      vertical-align: middle;
    }
  }
  .shop_m {
    position: absolute;
    right: 0px;
    top: 0px;
    .shop_home {
      width: 60px;
      height: 30px;

      background: #e8e8e8;
      position: relative;
      right: 0px;
      top: 0px;
      text-align: center;
      color: #323232;
      font-size: 14px;
      line-height: 30px;
      padding-right: 8px;
      border-radius: 30px;
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
      position: absolute;
      background-size: cover;
      right: 0px;
      top: 22px;
      text-align: center;
      color: #323232;
      font-size: 14px;
      line-height: 51px;
      z-index: 1000000;
    }
  }
}
</style>