<template>
	<view class="content">
		<view class="recommendList">
			<view 
				class="recommendGoods" 
				v-for="(item,index) in goodsData" 
				:key='item.id'
				@click="goodsClicked(item.id)">
				<view class="goodsImg">
					<img :src="item.img_url" alt='图片加载失败'></img>
				</view> 
				<view class="goodsPrice">
					<text class="goodsSellPrice">￥{{item.sell_price}}</text>
					<text class="goodsMarketPrice">￥{{item.market_price}}</text>
				</view>
				<text class="goodsTitle">{{item.title}}</text>
			</view>
		</view>
		<text class="noMore" v-if="isnoMore">人家也是有底线的(*￣︿￣)</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:['goodsData','isnoMore'],
		methods: {
			goodsClicked(ID){
				this.$emit('witchClicked',ID)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.content
		background-color #eee
	.recommendList
		display flex
		flex-wrap wrap
		justify-content space-evenly
		.recommendGoods
			width 355rpx
			background-color #fff
			margin-top 20rpx
			img
				width 355rpx
				height 355rpx
				display block
				text-align center
				line-height 335rpx
				color #999999
				font-size 30rpx
			.goodsPrice
			.goodsTitle
				display block
				padding 0 10rpx
				margin-bottom 10rpx
			.goodsSellPrice
				color shop-color
				font-size 38rpx
			.goodsMarketPrice
				color rgb(200,200,200)
				font-size 28rpx
				text-decoration line-through
				 margin-left 15rpx
	.noMore
		width 750rpx
		height 80rpx
		display block
		line-height 80rpx
		text-align center
		background-color #dddddd
		color #888
</style>
