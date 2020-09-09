<template>
	<view class="box" :style="{'height':screenHeight}">
		<view class="content">
		<!-- <image src="../../static/authorization.png" mode=""></image> -->
	</view>
	</view>
	
</template>

<script>
	export default {
		components: {
			
		},
		computed:{
			
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					console.log(res)
					that.screenHeight = res.screenHeight+ 'px'
					
				},
	
			})
		},
		data() {
			return {
				screenHeight: 0,
			}
		},
		onLoad() {

		},
		onPageScroll(){

		},
		onReady() {
	
		},
		methods: {

		},
		onReachBottom() {
	
		}
	}
</script>

<style>
	.box{
		display: flex;
		width: 100%;
		/* height: 708px; */
	}
	.content{
		flex-grow: 1;
		margin: 100rpx auto;
		width: 80%;
		/* height: 700rpx; */
		background: url(../../static/authorization.png)0 0 no-repeat;
		background-size:100%;
		/* .image{
		 background-size:contain;
		width:100%;
		height: auto; 
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		} */
		
	}
</style>
