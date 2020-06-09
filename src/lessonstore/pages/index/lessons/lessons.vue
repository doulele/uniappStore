<template>
	<view>
		<goods-list :goodsData='goodsData' :isnoMore='isnoMore'></goods-list>
	</view>
</template>

<script>
	import goodsList from "../../../components/goodsList/goodsList.vue"
	
	export default {
		data() {
			return {
				goodsData:[],
				page:1,
				isPage:true,
				isnoMore:false
			}
		},
		components:{
			goodsList
		},
		onLoad() {
			this.getLessonData()
		},
		methods: {
			async getLessonData(){
				const resData = await this.$myRequest({
					url:"/api/getgoods?pageindex=" + this.page
				});
				if(!resData.data.message.length){
					this.isPage = false;
					this.isnoMore = true;
				}
				this.goodsData.push(...resData.data.message);
				if(this.page === 1){
					console.log(222);
					uni.stopPullDownRefresh()
				}
			}
		},
		onReachBottom() {
			if(this.isPage){
				this.page +=1;
				this.getLessonData();
			}
		},
		onPullDownRefresh() {
			console.log(555);
			this.goodsData = [];
			this.page = 1;
			this.isPage = true;
			this.isnoMore = false;
			this.getLessonData()
		}
	}
</script>

<style>

</style>
