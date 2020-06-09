<template>
	<view class="advisoryList">
		<view class="advisoryListItem" 
			v-for="(item,index) in adData" 
			:key='index'
			@click="clickItem(item.id)">
			<image :src="item.img_url" class="adImg"></image>
			<view class="adRig">
				<text class="adRigTitle">{{item.title}}</text>
				<view class="adRigBot">
					<text class="adrbLeft">发布时间：{{item.add_time | getDate(item.add_time)}}</text>
					<text class="adrbRight">浏览：{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			adData:{
				type:Array,
				default:[]
			}
		},
		methods: {
			clickItem(thisId){
				this.$emit('adClick',thisId)
			}
		},
		filters:{
			getDate(date){
				let myDate = new Date(date),
				year = myDate.getFullYear(),
				month = (myDate.getMonth() + 1).toString().padStart(2,0),
				day = myDate.getDate().toString().padStart(2,0);
				return `${year}-${month}-${day}`
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.advisoryList
		view
			box-sizing border-box
		.advisoryListItem
			width 750rpx
			height 174rpx
			border-bottom 2px solid rgb(195,30,0)
			padding 10rpx 20rpx
			display flex
			.adImg
				width 190rpx
				height 150rpx;
			.adRig
				margin 0 20rpx
				overflow hidden
				position relative
				.adRigTitle
					line-height 10rpx
				.adRigBot
					width 100%
					position absolute
					bottom 0
					text
						font-size 25rpx
					.adrbLeft
						float left
					.adrbRight
						float right
</style>
