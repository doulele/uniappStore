<template>
	<view>
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" class="aboutUs" ></image>
		<text class="contactPhone" @click="callPhone">联系电话：17606505121（点击拨打）</text>
		<text class="contactLocation">我的地址：浙江省杭州市余杭区东湖街道欣北钱江国际广场</text>
		<map 
			class="myMap"
			:longitude='longitude'
			:latitude='latitude'
			scale=13
			:markers='markers'></map>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude:120.259181,
				latitude:30.474837,
				markers:[
					{
						id:1,
						longitude:120.259181,
						latitude:30.474837,
						iconPath:'../../../static/images/myIcon.jpg',
						width:40,
						height:40
					}
				]
			}
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:'17606505121'
				})
				console.log(333)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.aboutUs
	.contactPhone
	.contactLocation
		display block
		width 750rpx
		line-height 80rpx
	.aboutUs
		width 750rpx
		height 320rpx
		margin-bottom 20rpx
	.contactPhone
		border-bottom 1px solid #eee
	.myMap
		width 750rpx
		height 750rpx
</style>
