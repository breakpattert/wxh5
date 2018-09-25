<template>
<div class="container lineTop">
    <div class="news" v-for="(item,index) in newsdetil_list" v-if="show_1" :key="index">
		<p class="color9a data_new f12 mb15">{{item.createtime}}</p>
		<ul>
			<li class="lis_1">
				<h4 class="f14 color32">{{item.title}}</h4>
				<p class="f10 color9a">{{item.createtime}}</p>
			</li>
			<li class="lis_2 mt14">
				<p class="f12 color32" v-html="item.detail"></p>
			</li>
		</ul>
		

    </div>
    <div class="news" v-for="(item, index) in newsdetil_list" v-if="show_2" :key='index'>
		<p class="color9a data_new f12 mb15">09月06号 15：06</p>
		<ul>
			<li class="lis_1">
				<h4 class="f14 color32">{{item.merchname}}</h4>
				<p class="f10 color9a">2018.09.06 15:09</p>
			</li>
			<li class="lis_2 mt14">
				<p class="f12 color32">{{item.bannername}}</p>
			</li>
		</ul>
		

    </div>
    <!--<div class="news" v-for="item in newsdetil_list">
		<p class="color9a data_new f12 mb15">09月06号 15：06</p>
		<ul>
			<li class="lis_1">
				<h4 class="f14 color32">这里是消息的标题</h4>
				<p class="f10 color9a">2018.09.06 15:09</p>
			</li>
			<li class="lis_2 mt14">
				<p class="f12 color32">这里是消息详情，也就是这个消息里面的内容在这个位置呈现</p>
			</li>
		</ul>
		

    </div>-->
  
</div>
</template>
<script>

export default {
  data() {
    return {
    	newsdetil_list:[],
    	show_1:false,
    	show_2:false
    };
  },
  components: {},
  created() {},
  methods: {
    
    },
   
  mounted() {
   
  },
  onPullDownRefresh() {},
   async onShow() {

   

    const data = await this.$http.saleMsg(this.$store.state.user.userInfo.openId)

//  this.sendgoods_message = data.list.sendgoods_message[0];
//  let merchNoticelist = [];
//  for (const key in data.list.merchNotice) {
//					if (data.list.merchNotice.hasOwnProperty(key)&& (typeof parseInt(key)) == 'number') {
//						const element = data.list.merchNotice[key];
//						merchNoticelist.push(element)
//					}
//				}
    	
// 	this.merchNotice = data.list.merchNotice[this.$route.query.id];
// 		console.log(this.shopNotice,6);
// 	console.log(,7);
   if(this.$route.query.type==1){
   	this.show_1=true;
   		this.show_2=false;
   	this.newsdetil_list = data.list.shopNotice;
   }else if(this.$route.query.type==2){
   	this.show_1=false;
   	this.show_2=true;
   	this.newsdetil_list = data.list.merchNotice[this.$route.query.id];
   }
//  this.$store.commit("SET_NEWS_INFO",data.list);
   
      // this.shopNotice = data.list.shopNotice
  }
};
</script>
<style  scoped lang='scss'>
  .container{
  	background:#f2f2f2;
    .news{
    	margin-top:28px;
    	.data_new{
    		text-align: center;
    	}
    	ul{
    		width:345px;
			/*height:130px;*/
			padding:14px 13px;
			background:rgba(255,255,255,1);
			border-radius:3px;
			box-shadow:2px 3px 3px rgba(154,154,154,0.15);
			.lis_1{
				h4{
					font-weight: 700;
				}
				p{
				margin-top:5px;

				}
			}
			.lis_2{
				p{
		
				}
			}
    	}
    }

  }
</style>