<template>
	<view class="adDetal">
		<text class="adDetaTitle">{{detailData.title}}</text>
		<view class="timeAndViews">
			<text class="adDetaTime">发布时间：{{detailData.add_time}}</text>
			<text class="adDetaView">浏览：{{detailData.click}}</text>
		</view>
		<rich-text :nodes="detailData.content" class="adDetaContent"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData:[]
			}
		},
		onLoad(options) {
			this.getDetailData(options.id)
		},
		methods: {
			async getDetailData(ID){
				console.log(ID);
				const resDetailsData = await this.$myRequest({
					url:"/api/getnew/" + ID
				});
				this.detailData = resDetailsData.data.message[0];
				console.log(this.detailData)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.adDetal
		padding 30rpx 20rpx
		font-size 30rpx
		.adDetaTitle
			text-align center
			font-size 45rpx
			font-weight 550
			margin 20rpx 0
		.timeAndViews
			padding 20rpx 20rpx 90rpx 0rpx;
			text
				font-size 25rpx
			.adDetaTime
				float left
			.adDetaView
				float right
	.adDetaContent
		margin-top 40rpx
		background-color #007AFF
</style>
