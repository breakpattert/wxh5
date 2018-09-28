<template>
<div class="container lineTop">
	<div class="w100">
		 <div v-html="content" >
			 
		
		</div>
	

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
