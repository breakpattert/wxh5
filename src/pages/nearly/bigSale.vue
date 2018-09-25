<template>
  <div>
    <div class="nearly">
      <div class="nearlyHeader lineBottom">
        <div class="nearlyTitle f16 bold color28">附近优惠</div>
        <div class="sortBy" @click="poinsearch">
          <span class="f14 color28 mr7">筛选</span>
          <div class="icon"></div>
        </div>
      </div>

      <div class="nearlysearch" v-if="searchshow">
        <div class="myToast">
          <h3>优惠活动</h3>
          <ul class="t_main">
            <li>
              <a href="">满500减200</a>
            </li>
            <li>
              <a href="">满500减200</a>
            </li>
            <li>
              <a href="">满500减200</a>
            </li>
            <li>
              <a href="">满500减200</a>
            </li>
            <li>
              <a href="">满500减200</a>
            </li>
            <li>
              <a href="">满500减200</a>
            </li>
          </ul>
          <div class="f_main">
            <p>人均消费</p>
            <div class="s_input">
              <van-slider custom-class="slider" value="50" step="10" bar-height="10px" @change="onChange" />
            </div>

          </div>
          <div class="f_button">
            <button class="button-01">清空设置</button>
            <button class="button-02">查看20个商家</button>
          </div>
        </div>

      </div>
      
      <div v-if="nearlySale&&nearlySale.length<=0" class="empty">
        <img src="../../../static/images/icon_none.png">
        <div>暂时还没有推荐大牌促销哟o(∩_∩)o</div>
      </div>

      <div class="goodsContent" v-if="nearlySale&&nearlySale.length>0">
        <div class="item lineBottom" v-for="(item,index) in nearlySale" :key="index" @click="$router.push({ path:'/pages/busineshop/shop',query: { id: item.merchid }})">
          <div class="left">
            <img :src="item.logo" alt="">
          </div>
          <div class="right mt10">
            <div class="title f15 color28">
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
                {{item.timestart}}-{{item.timeend}}
              </span>
              <span class="f12 color28 fr">{{item.jl/1000}}KM</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  // import {
  //   login,
  //   getUserInfo,
  //   getSetting,
  //   setStorage,
  //   getStorage,
  //   getLocation,
  //   NetworkStatusChange
  // } from "@/utils/wechat";
  export default {
    data() {
      return {
        page: 1,
        per_page: 2,
        nearlySale: []
      }
    },
    onReachBottom: function () {
      console.log('加载更多')
      var that = this;
      that.loadMoreTxt = '拼命加载中';

      setTimeout(() => {
        this.getMore();
      }, 1000)
    },
    async mounted() {
      // const systemInfo = getSystemInfoSync();
      // this.windowHeight=systemInfo.windowHeight;

      this.getMore();
    },
    methods: {
      async getMore() {
        var dataList = this.nearlySale;

        let [err4, nearlySale] = await this._to(
          this.$http.getNearlySale(
            this.$store.state.user.clusterInfo.id,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.page,
            this.per_page
          )
        );
        nearlySale.result.data.map(i => {
          i.timestart = this._U.formatTime(i.timestart * 1000)
          i.timeend = this._U.formatTime(i.timeend * 1000)

        })


        if (nearlySale.status == 1 && !nearlySale.result.total) {
          this.nearlySale = [];
        } else if (nearlySale.status == 1 && nearlySale.result.data.length > 0) {
          console.log(dataList)
          this.nearlySale = dataList.concat(nearlySale.result.data);
          this.page++;
        } else {
          console.log("加载失败")
          return false;
        }
      },
    }
  };

</script>

<style scoped lang='scss'>
  .nearly {
    width: 100%;
    padding: 0 15px;

    .nearlysearch {
      /*height:200px;*/
      /*border:0.5px solid red;*/
      width: 100%;

      .myToast {
        border: 0;
        position: relative;
        width: 100%;

        padding: 0 15px;
        background-color: #fff;
        text-align: center;
        /*  border:0.5px solid #0000FF;*/

        margin-top: 12px;

        h3 {
          text-align: left;
          font-size: 14px;
          line-height: 40px;
          color: #9a9a9a;
        }

        .t_main {
          overflow: hidden;
          width: 100%;

          li {
            width: 70px;
            margin-right: 23px;
            float: left;
            height: 30px;
            border-radius: 3px;
            /*	border: solid 0.5px #323232;*/
            text-align: center;
            line-height: 30px;

            /*border: solid 0.5rem #b7b7b7;*/
            a {
              color: #323232;
              font-size: 12px;
              /*color: #b7b7b7;*/
            }
          }
        }

        .f_main {
          text-align: left;
          overflow: hidden;

          p {
            color: #9a9a9a;
            margin-top: 15px;
            margin-bottom: 45px;
            font-size: 14px;
          }

          .van-slider {
            height: 10px !important;
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
  }

</style>
