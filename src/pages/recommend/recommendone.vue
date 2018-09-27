<template>
<div class="container lineTop">
	<div class="w100">
		 <div v-html="content" >
			 
		
		</div>
		 <!-- <wxParse :content="content" @preview="preview" @navigate="navigate" /> -->
		<!-- <div v-html="content">
       
    	</div> -->
		<!-- <h2>女性最时髦的25种穿搭，你最喜欢哪种？</h2>
		<div class="header_box">
			<div class="logo">
				<img src="../../../static/images/icon_official.png" alt="" />
			</div>
			<p class="f12 color32 ml5">
				天天逛街
			</p>
			<span class="fr color9a f10">2018.09.10</span>
		</div>
		<div class="f16 color32 text">
			今天要给大家介绍的是日本30岁成熟女性的时髦
			穿搭，30岁的女性更加知性、成熟、性感，那么
			该如何穿搭才能更显时尚呢？下面就给大家推荐
		</div>
		<div class="box_img">
			<img src="https://sh.szwfy.com.cn/attachment/images/3/2018/09/ano8teQIZrBqBQnCI8N9lb3Mb38OqR.png" alt="" />
		</div>
		<div class="f16 color32 text">
			若隐若现的短裙带上花边蕾丝，凸显出女性的体
			美，在用色方面取的是冷色调，显得整个人更加
			空灵，非常有女人味儿~
		</div>
		<div class="box_img">
			<img src="https://sh.szwfy.com.cn/attachment/images/3/2018/09/e212d1T2tTF77XyI77d72F2fFtRht7.png" alt="" />
		</div>
		<div class="f16 color32 text">
			蓝色的上衣和白色的紧身短裤完美将身形勾勒出
			来了，深灰色的内衣也将女性的特点无线放大，
			整体协调统一，完美。
		</div>
		<div class="f16 color32 text_2">
					最后看了小编近日的推荐，各位小伙伴们还有什
					么比较时尚的穿衣搭配呢？是不是马上就想试试
					呢?
		</div> -->

	</div>
</div>
</template>
<script>

export default {
  data() {
    return {
		content:''
	};
  },

  created() {},
  methods: {
	  
  },
  async mounted() {},
  onPullDownRefresh() {},
  async created() {
		// 今日推荐
		
      let [err, everyRecommendList] = await this._to(
        this.$http.getEveryRecommend(this.$route.query.id)
	  );
	  
      this.content = everyRecommendList.list.content;
  }
};
</script>
<style  scoped lang='scss'>


.container {
  padding: 0 15px;

  
}
</style>
