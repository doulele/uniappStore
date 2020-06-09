<template>
	<view>
		<advisory-list :adData='adData' @adClick='adClick'></advisory-list>
	</view>
</template>

<script>
	import advisoryList from "../../components/advisoryList/advisoryList"
	export default {
		data() {
			return {
				adData:[]
			}
		},
		onLoad() {
			this.getAdvisoryData()
		},
		components:{
			advisoryList
		},
		methods: {
			async getAdvisoryData(){
				const resData = await this.$myRequest({
					url:"/api/getnewslist"
				});
				this.adData = resData.data.message;
			},
			adClick(thisId){
				uni.navigateTo({
					url:"/pages/advisory/details/details?id=" + thisId
				})
			}
		}
	}
</script>

<style>

</style>
