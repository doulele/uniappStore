<template>
	<view class="content">
		<scroll-view
			class="homeScroll" 
			scroll-y="true"
			@scrolltolower="isScrollToLower && lower()"
			@scroll="scroll">
			<!-- 轮播 -->
			<swiper class="swiper" 
				indicator-dots 
				indicator-color='rgb(221,221,221)'
				indicator-active-color='rgb(195,30,0)'
				autoplay
				interval='2000'
				circular>
				<swiper-item class="swiper-item" 
					v-for="(item,index) in swiperdata" 
					:key='item.id'>
					<img :src="item.img">
				</swiper-item>
			</swiper>
			<!-- 导航 -->
			<view class="indexNav">
				<view class="indexNav-item" 
					v-for="(item,index) in navItem" 
					:key="index"
					@click="navGoTo(item.path)">
					<view :class="item.icon"></view>
					<text>{{item.title}}</text>
				</view>
			</view>
			<!-- 推荐页 -->
				<view class="recommend">
					<view class="recommendTitle" id="recommendTitle">
						<text space="emsp" :class="isFixed && 'fixed'">推  荐  商  品</text>
					</view>
					<goods-list 
						:goodsData='goodsData' 
						:isnoMore="!isScrollToLower"
						@witchClicked='goodsClicked'></goods-list>
				</view>
		</scroll-view>
	</view>
</template>

<script>
	import goodsList from '@/components/goodsList/goodsList.vue'
	export default {
		data() {
			return {
				swiperdata:[],
				navItem:[
					{
						title:"课程商店",
						icon:"iconfont icon-ziyuan",
						path:"/pages/index/lessons/lessons"
					},
					{
						title:"联系我们",
						icon:"iconfont icon-guanyuwomen",
						path:"/pages/index/contact/contact"
					},
					{
						title:"社区图片",
						icon:"iconfont icon-tupian",
						path:"/pages/index/pictures/pictures"
					},
					{
						title:"学习视频",
						icon:"iconfont icon-shipin",
						path:"/pages/index/videos/videos"
					}
				],
				goodsData:[],
				page:1,
				isScrollToLower:true,
				isFixed:false,
				recommendTitleDom:Object,
				howHeight:300
			}
		},
		components:{
			"goods-list":goodsList
		},
		onLoad() {
			 this.getSwper();
			 this.getGoods();
		},
		mounted() {
		},
		methods: {
			async getSwper(){//首页轮播数据
				const res = await this.$myRequest({
					url:"/api/getlunbo"
				});
				this.swiperdata = res.data.message;
			},
			async getGoods(){
				const goodsRes = await this.$myRequest({//首页推荐商品数据
					url:`/api/getgoods?pageindex=${this.page}`
				})
				this.isScrollToLower = !!goodsRes.data.message.length;
				this.goodsData.push(...goodsRes.data.message);
			},
			lower(){
				if(this.goodsData.length != 0){
					this.page += 1;
					this.getGoods();
				}
			},
			getHe(){
				const query = uni.createSelectorQuery().in(this);
				query.select("#recommendTitle").boundingClientRect(data => {
					this.howHeight = data.top;
				}).exec();
			},
			scroll(e){
				this.getHe();
				if(this.howHeight < 5){
					this.isFixed = true
				}else{
					this.isFixed = false
					console.log(333)
				}
			},
			navGoTo(data){
				console.log(data)
				uni.navigateTo({
					url:data
				})
			},
			goodsClicked(ID){
				uni.navigateTo({
					url:"/components/goodsDetail/goodsDetail?id=" + ID
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import'~@/static/css/initstyle.styl';
	.content
			background-color rgb(237,237,237)
	.swiper
		width 750rpx
		height 380rpx
		img
			width 100%
			height 100%
	.indexNav
		display flex
		background-color #fff
		.indexNav-item
			flex 1
			text-align center
			.iconfont
				width 120rpx
				height @width
				border-radius 60rpx
				margin 20rpx auto
				color #fff
				font-size 50rpx
				line-height 120rpx
				background-color #c31e00
			.icon-tupian
				font-size 45rpx
			text
				display block
				margin-bottom 20rpx
	.recommendTitle
		height 100rpx
		margin:5rpx 0 0rpx 0;
		background-color #fff
		line-height 100rpx
		text-align center
		text
			height 100rpx
			margin:5rpx 0 0rpx 0;
			background-color #fff
			line-height 100rpx
			text-align center
			font-size 30rpx
			font-weight 550
			color shop-color
	.homeScroll
		height 690px
	
	
	
	.fixed
		position fixed
		//#ifdef H5 
		top 42px
		//#endif
		//#ifdef MP-WEIXIN
		top -2px
		//#endif
		left 0
		right 0
</style>
