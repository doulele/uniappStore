<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	/*每个页面公共css */
	@import'~@/static/css/fonts/iconfont.css';/* 引进字体图标css */
	text
		font-size 30rpx
	.gomeImgLoad
		width 750rpx
		height 350rpx
</style>
