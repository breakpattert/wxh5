<template>
<div class="container lineTop" :style="{ height: windowHeight + 'px' }">
  <div v-if="list&&list.length<=0" class="empty_2">
        <img src="../../../static/images/img_focus.png">
        <div>您还没有关注过店铺哟o(∩_∩)o</div>
      </div>
    <div class="myFocusAll"  v-if="list&&list.length>0">
      
        <div class="item lineBottom h40" v-for="(item,index) in list" v-if="item.isfollow==1" :key="index">            
              <img  class="fl shopLogo" :src="item.logo" alt="">
         
            <span class="shopName over_hidden f16" @click="$router.push({ path:'/pages/busineshop/shop',query: { id: item.merchid }})">{{item.merchname}}</span>
            <div class="cancelFocus fr mr15" @click="tabfollow(item.isfollow,item.merchid,index)">
                <span>{{item.isfollow==1?"取消关注":"关注"}}</span>
            </div>
        </div> 

    </div>  
</div>
</template>
<script>
import {getSystemInfoSync} from "@/utils/wechat";
export default {
  data() {
    return {
      windowHeight:0,
      page: 1,
      per_page: 10,
      list: [],
      fllow_s: ""
    };
  },
  components: {},
  created() {},
  methods: {
    async getMore(){
      var dataList=this.list;
      let result = await this._to(
        this.$http.myfollow(this.$store.state.user.userInfo.openId,this.page,this.per_page)
      );

      if(!result[1].error&&!result[1].list.total){
        this.list = [];
      }else if(!result[1].error&&result[1].list.data.length>0){
        console.log(dataList)
        this.list = dataList.concat(result[1].list.data);
        this.page++;
      }else{
        console.log("加载失败")
        return false;
      }
    },
    async tabfollow(fllow, merchid,index) {
      if (fllow == 1) {
        let resultList = await this._to(
          this.$http.getfollow(
            merchid,
            this.$store.state.user.userInfo.openId,
            0
          )
        );
        if(resultList[1].status==1){
          this.list=this.list.filter(function(val,i){
            return i!=index;
          })
        }        
      }
    },
    async sharelist() {
      let result = await this._to(
        this.$http.myfollow(this.$store.state.user.userInfo.openId)
      );
      this.list = result[1].list.data;

      console.log(this.list, 6);
    }
  },

  
  onPullDownRefresh() {},
  created() {},
  onReachBottom: function () {
    console.log('加载更多')
    var that = this;
    that.loadMoreTxt='拼命加载中';

    setTimeout(() => {
      this.getMore();
    }, 1000)
  },
  async mounted() {
    const systemInfo = getSystemInfoSync();
    this.windowHeight=systemInfo.windowHeight;

    this.getMore();   
    
     // let result = await this._to(
    //   this.$http.myfollow(this.$store.state.user.userInfo.openId)
    // );
    // this.list = result[1].list.data;

    // console.log(this.list, 6);
  },
};
</script>
<style  scoped lang='scss'>
.container {
  .h100{
    height: 100px;
    line-height: 100px;
 
 }
  .myFocusAll {
    width: 100%;
    .item {
      .shopLogo {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 7px;
        left: 15px;
        border-radius: 50%;
      }
      .shopName {
        display:inline-block;
        width:440rpx;
        margin-left: 57px;
      }
      .cancelFocus {
        // height: 40px;
        // line-height: 40px;
        & > span {
          display: inline-block;
          width: 54px;
          height: 24px;
          border: 1px solid #ff455d;
          color: #ff455d;
          text-align: center;
          font-size: 12px;
          line-height: 24px;
          // vertical-align: middle;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
