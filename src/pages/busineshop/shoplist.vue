<template>
  <div class="container">
    <div class="circleimg w100">
      <img :src="cluster_info.images" alt="">
    </div>
    <div class="circleinfo managementList">
      <div class="handerItem">
        <div></div>
        <div class="icon">
          <img src="../../../static/images/icon_addresse.png">
        </div>
        <div class="hander_name over_hidden" @click="openLocation">{{cluster_info.province}}{{cluster_info.city}}{{cluster_info.area}}{{cluster_info.addr}}</div>
        <div class="lineLeft rightbtn" @click="dialTel(cluster_info.tel)">
          <div class="icon">
            <img src="../../../static/images/icon_iphone.png">
          </div>
        </div>
      </div>
      <div class="handerItem">
        <div class="icon">
          <img src="../../../static/images/icon_time.png">
        </div>
        <div class="hander_name over_hidden">{{cluster_info.business_time}}</div>
      </div>
    </div>

    <div class="focus w100" v-if="follow_list&&follow_list.length>0">
      <div class="dt colorf45d">关注</div>
      <div class="dd flexwrap">
        <div v-for="(item,index) in follow_list" :key="index" @click="$router.push({ path:'/pages/busineshop/shop',query:{id:item.id}})">
          <img :src="item.logo">
        </div>
      </div>
    </div>

    <div v-if="floor_list&&floor_list.length<=0" class="empty">
      <img src="../../../static/images/icon_none.png">
      <div>该商场还没有店铺哦o(∩_∩)o</div>
    </div>

    <div class="circlecont w100" v-if="floor_list&&floor_list.length>0">
      <div class="w100" v-for="(item,index) in floor_list" :key="index">
        <div class="w100" v-if="item.merch_list&&item.merch_list.length>0">
          <div class="dt">{{item.name}}</div>
          <div class="dd flexwrap">
            <div v-for="(childitem,childindex) in item.merch_list" :key="childindex" @click="$router.push({ path:'/pages/busineshop/shop',query:{id:childitem.id}})">
              <img :src="childitem.logo">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import QQMapWX from "../../../static/lib/qqmap-wx-jssdk";
var qqmapsdk;

export default {
  data() {
    return {
      openid: null,
      authkey: null,
      cluster_info: {
        images: "",
        province: "",
        city: "",
        area: "",
        addr: "",
        tel: "",
        business_time: "",
        latitude:"0",
        longitude:"0",
      },
      floor_list: [],
      follow_list: []
    };
  },
  components: {},
  computed: {
    ...mapState({
      userOpen: state => state.user.userOpen,
      userInfo: state => state.user.userInfo
    })
  },
  created() {},
  methods: {
    dialTel(num) {
      if (num) {
        wx.makePhoneCall({
          phoneNumber: num
        });

        return false;
      } else {
        this.$tips.alert("该商场暂未添加联系方式");
        return false;
      }
    },
    openLocation() {
      var that = this;
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        key: "6IQBZ-KWUCD-S764U-P7WO6-YQQCO-7RF5F" //必填
      });
      // 根据详细地址解析经纬度
      qqmapsdk.geocoder({
        address:
          this.cluster_info.province +
          this.cluster_info.city +
          this.cluster_info.area +
          this.cluster_info.addr,
        success: function(res) {
          let [latitude, longitude] = [
            res.result.location.lat,
            res.result.location.lng
          ];
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          });
        },
        fail: function(res) {
          //console.log(res);
        },
        complete: function(res) {
          //console.log(res);
        }
      });
    }
  },
  mounted() {},
  onPullDownRefresh() {},
  async created() {
    console.log(this.$route.query); //id 21 title 万象城
    wx.setNavigationBarTitle({ title: this.$route.query.title });

    this.openid = this.$store.state.user.userOpen.openid;
    this.authkey = this.$store.state.user.userInfo.authkey;

    const [err, res] = await this._to(
      this.$http.getWeekListMore(this.$route.query.id, this.openid)
      // this.$http.getWeekListMore("24",this.openid)
    );
    this.cluster_info = res.result.cluster_info;
    this.floor_list = res.result.floor_list;
    this.follow_list = res.result.follow_list;
  }
};
</script>
<style  scoped lang='scss'>
.flex {
  display: -webkit-box;
  display: box;
  display: -ms-flexbox;
  display: flexbox;
  display: -webkit-flex;
  display: flex;
}

.flex > div {
  text-align: center;
  width: 0%;
  /* for uc */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.flexwrap {
  display: flex;
  flex-wrap: wrap;
}
.container {
  background: #f2f2f2;
  .circleimg {
    background: #ffffff;
    overflow: hidden;
    height: 170px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .managementList {
    background: #ffffff;
    width: 100%;
    .handerItem {
      position: relative;
      width: 100%;
      height: 40px;
      display: flex;
      &::before {
        content: "";
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        position: absolute;
        bottom: 0;
        background: #e8e8e8;
      }
      .icon {
        width: 58px;
        height: 100%;
        position: relative;

        img {
          content: "";
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      }
      .rightbtn {
        position: absolute;
        right: 0;
        width: 150rpx;
        height: 100%;
        .icon {
          width: 100%;
        }
      }
      .hander_name {
        font-size: 14px;
        color: #404040;
        line-height: 40px;
        width: 480rpx;
      }
    }
  }

  .dt {
    line-height: 80rpx;
    padding: 0 30rpx;
  }
  .dd {
    background: #ffffff;
    > div {
      position: relative;
      text-align: center;
      width: 25%;
      height: 188rpx;
      padding: 44rpx 0;

      &::before {
        content: "";
        width: 1px;
        height: 100%;
        transform: scaleX(0.5);
        position: absolute;
        top: 0;
        left: 0;
        background: #e8e8e8;
      }
      &::after {
        content: "";
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        position: absolute;
        bottom: 0;
        left: 0;
        background: #e8e8e8;
        z-index: 2;
      }
      img {
        width: 100rpx;
        height: 100rpx;
        margin: 0 auto;
      }
    }
    > div:nth-child(1) {
      &::before {
        width: 0px;
      }
    }
  }
}
</style>
