<template>
	<view class="comPic">
		<scroll-view 
			class="picLeftScroll"
			scroll-y>
			<view class="picLeft">
				<view 
					class="picLeftItem" 
					:class="current===index? 'active':null"
					v-for="(item,index) in leftData" 
					:key='item.id' 
					@click="nowCategory(index,item.id)">
					<text>{{item.title}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="picRight">
			<view v-if="haveMessage" >
				<view  v-for="(item,index) in rightData" :key='item.id' >
					<image :src="item.img_url" class="picRigPublic" @click="preview(index)"></image>
					<text class="picRigTitle">{{item.title}}</text>
				</view>
			</view>
			<view v-else class="picRigNoMessage picRigPublic">暂无数据</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				leftData:[],
				rightData:[],
				current:0,
				haveMessage:true,
				picRigUrls:[]
			}
		},
		onLoad() {
			this.getPicData();
			this.getPicNavDetail();
		},
		methods: {
			async getPicData(){
				const resData = await this.$myRequest({
					url:'/api/getimgcategory'
				});
				this.leftData = resData.data.message;
			},
			async getPicNavDetail(currentId=15){
				const detailData = await this.$myRequest({
					url:`/api/getimages/${currentId}`
				});
				if(detailData.data.message.length){
					this.rightData = detailData.data.message;
					this.haveMessage = true;
					this.picRigUrls = this.rightData.map(item=>item.img_url);
				}else{
					this.haveMessage =false;
				};
				
			},
			nowCategory(currentIndex,currentId){
				this.current = currentIndex;
				this.getPicNavDetail(currentId);
			},
			preview(index){
				uni.previewImage({
					current:index,
					urls:this.picRigUrls,
					loop:true
				})
			}
		}
	}
</script>

<style lang="stylus">
	.active
		background-color #c31e00
		text
			color #fff
	.comPic
		display flex
	.picLeftScroll
		width 210rpx
		height 100vh
		.picLeft
			width 200rpx
			.picLeftItem
				height 130rpx
				line-height 130rpx
				border-bottom 1px solid #eee
				border-right 1px solid #eee
				text-align center
				color #555555
		.picRight
			width 550rpx
			text-align center
	.picRigPublic
		width 530rpx
		margin 10rpx auto
		text-align center
		border-radius 10rpx
	.picRigNoMessage
		height 300rpx
		background-color rgba(221,221,221,.5)
		line-height 300rpx
		color #555555	
	.picRigTitle
		display block
		width 530rpx
		margin 10rpx auto
		margin-bottom 30rpx
</style>
