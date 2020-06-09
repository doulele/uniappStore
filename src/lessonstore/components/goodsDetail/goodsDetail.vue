<template>
	<view class="goodsDetail">
		<swiper class="goodsDetailSwiper"
			indicator-dots
			indicator-color='#eee'
			indicator-active-color='#c31e00'
			autoplay
			interval='3000'
			circular
			>
			<swiper-item v-for="(item,index) in goodsCursorData" :key='index'>
				<image :src="item.src" class="goodsDetCurPic"></image>
			</swiper-item>
		</swiper>
		<view class="sellDetil">
			<text class="sellNowPirce">￥{{goodsSellData.sell_price}}</text>
			<text class="sellOldPrice">￥{{goodsSellData.market_price}}</text>
			<text class="sellTitle">{{goodsSellData.title}}</text>
			<view class="sellDetilDetail">
				<text class="articleNUmber">货号：{{goodsSellData.goods_no}}</text>
				<text class="inventory">库存：{{goodsSellData.stock_quantity}}</text>
			</view>
		</view>
		<view class="goodsDetailDetail">
			<text class="goodsDDTitle">详情介绍</text>
			<rich-text :nodes="goodsDeDeData.content"></rich-text>
		</view>
		<view class="goodsTabBar">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	
	export default {
		data() {
			return {
				theId:0,
				goodsCursorData:[],
				goodsSellData:[],
				goodsDeDeData:[],
        options: [
					{
            icon: 'headphones',
            text: '客服'
					}, 
					{
            icon: 'shop',
            text: '店铺',
            info: 0,
            infoBackgroundColor:'#007aff',
            infoColor:"red"
					}, 
					{
            icon: 'cart',
            text: '购物车',
            info: 0
					}
				],
        buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
        ]
			}
		},
		components: {uniGoodsNav},
		onLoad(options) {
			this.theId = options.id;
			this.goodsDetalData();
		},
		methods: {
			async goodsDetalData(){//推荐商品详情页数据
				const goodsCursorRes = await this.$myRequest({//详情页轮播图数据
					url:"/api/getthumimages/" + this.theId
				});
				const goodsSellRes = await this.$myRequest({//详情页轮播图数据
					url:"/api/goods/getinfo/" + this.theId
				});
				const goodsDetalRes = await this.$myRequest({//详情页详情数据
					url:"/api/goods/getdesc/" + this.theId
				});
				this.goodsCursorData = goodsCursorRes.data.message;
				this.goodsSellData = goodsSellRes.data.message[0];
				this.goodsDeDeData = goodsDetalRes.data.message[0];
			},
      onClick (e) {
        uni.showToast({
          title: `点击${e.content.text}`,
          icon: 'none'
        })
      },
      buttonClick (e) {
        console.log(e)
        this.options[2].info++
      }
		
		}
	}
</script>

<style lang="stylus" scoped>
	.goodsDetailSwiper
		width 750rpx
		height 700rpx
		.goodsDetCurPic
			width 100%
			height 100%
	.sellDetil
		padding-top 40rpx
		.sellNowPirce
			margin 0 10rpx 0 20rpx
			font-size 40rpx
			color #c31e00
		.sellOldPrice
			font-size 28rpx
			color #999999
			text-decoration line-through
		.sellTitle
			display block
			padding 20rpx
		.sellDetilDetail
			border-top 2px solid #eee
			border-bottom 2px solid #eee
			padding 5rpx 20rpx
			text
				font-size 26rpx
				display block
				line-height 45rpx
	.goodsDetailDetail
		padding 20rpx 0 49px 0 
		.goodsDDTitle
			font-size 40rpx
			font-weight 550
			line-height 100rpx
	.goodsTabBar
		position fixed
		bottom 0
		left 0
		right 0
</style>
