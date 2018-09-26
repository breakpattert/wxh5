<template>
<div class="container lineTop">
    <div v-if="list&&list.length<=0" class="empty_2">
        <img src="../../../static/images/img_collect.png">
        <div>您还没有收藏过商品哟o(∩_∩)o</div>
      </div>
    <div class="likeAll" v-if="list&&list.length>0">
  
          <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push({ path:'/pages/goodsDetail/index',query: { id: item.goodsid }})">
            <img :src="item.thumb" alt="">
            <div class="itemDetial">
              <span class="fl f16 width_s over_hidden">{{item.title}}</span>
              <span class="fr colorf45d f16">￥{{item.productprice}}</span>
            </div>
        </div> 
        	
		
    </div>
  	<div class="mt10" v-if="list&&list.length>0">
						<zan-loadmore v-if="!isBottom" type="loading" ></zan-loadmore>
						<zan-loadmore v-if="isBottom" type="text"  text="暂无数据"></zan-loadmore>
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
      list:[],
      page : 1,
      prePage : 6,
      isBottom:false
    };
  },
  components: {},
  created() {},
  methods: {
    async getMore(){
      var dataList=this.list;
      let result = await this._to(
        this.$http.mylike(this.$store.state.user.userInfo.openId,this.page,this.per_page)
      );
      if(!result.error&&!result.list.total){
        this.list = [];
      }else if(!result.error&&result.list.data.length>0){
        console.log(dataList)
        this.list = dataList.concat(result.list.data);
        this.page++;
      }else{
        console.log("加载失败")
        return false;
      }
    },
  },
  async onReachBottom() {
    
   if( this.isBottom) return
     
//   let data = await this.$http.marketList(
//        this.$store.state.user.locationInfo.latitude,
//        this.$store.state.user.locationInfo.longitude,
//        ++this.page,
//        this.prePage,
//        1
//		)
     
     
     	let result = await this._to(
		       this.$http.mylike(this.$store.state.user.userInfo.openId,
		       	++this.page,
		       	this.prePage
		       )
     	);
    	
    
     
     
    
		if(result[1].list.data.length<this.prePage){
			this.isBottom=true
		}
		this.list = [...this.list,...result[1].list.data];
   
    
   	

    
  },
  async mounted() {
   	 let result = await this._to(
       this.$http.mylike(this.$store.state.user.userInfo.openId)
     );
    
     this.list = result[1].list.data;

  },
  onPullDownRefresh() {},
  async created() {

  }
};
</script>
<style  scoped lang='scss'>
.container {
padding-bottom:10px;
  margin-top: 14px;
  .likeAll {
    display: flex;
	width:100%;
    flex-wrap: wrap;
    padding-left: 7px;
    justify-content: flex-start;
       .item {
      margin: 0 5px;
		float:left;
		width:47%;
		padding:8px;

      border-radius: 2px;
      & > img {
       	width:164px;
		height:215px;
     
      }
      .itemDetial {
        height: 44px;
        padding-top: 11px;
        .titles{
        	width:80px;
        }
        .width_s{
        	width:80px;
        }
      }
    }

    
  }
}
</style>
