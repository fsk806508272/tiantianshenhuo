<template>
	<scroll-view 
		 scroll-y='true'
		 :style="{height:height==-1?'100%':height+'rpx'}"
		 @scrolltolower='loadMore' 
		 :lower-threshold='lowerThreshold' 
		 @touchstart="doTouchStart" 
		 @touchend="doTouchEnd" 
		 @touchmove="doTouchMove"
		  >
		<!-- 下拉提示 -->
		<view class="upDown" :style="{height: upDownTipsHeight+'px',maxHeight:maxHeight+'px'}" :class="isHeightChange?'heightAnimation':''">
			<text 
			class="arrow" 
			:class="upDownTipsHeight>=pullHeight?'upArrow':''" 
			v-if="!isAllowLoading&&upDownTipsHeight>20"
			>
			<view class="iconfont icon-changyongicon_huaban"></view>
			</text>
			<view class="loading" v-if="isAllowLoading">
				<text class="list"></text>
				<text class="list"></text>
				<text class="list"></text>
				<text class="list"></text>
				<text class="list"></text>
				<text class="list"></text>
				<text class="list"></text>
				<text class="list"></text>
			</view>
		    <view class="flex-wrap" v-if="flag">
				 <view class="tips">{{upDownTips}}</view>
				 <view class="refreshOver" style="margin-right: 30rpx;margin-left: 100rpx;" v-show="isHeightChange&&!isAllowLoading">刷新完成</view>
				 <view class="time">上次更新{{time}}</view>
			</view>
		</view>
		<!-- 内容 -->
		<slot></slot>
	</scroll-view>
</template>

<script>
	import './iconfont.css'
	import './demo.css'
	export default{
		data(){
			return{
				upDownTipsHeight:0,//下拉时提示框的高度
				upDownTips:'1',//下拉时提示框的文字内容
				startY:0,//第一次点击屏幕的Y坐标
				startX:0,//第一次点击屏幕的X坐标
				distanceY:0,//滑动的距离
				isAllowLoading:false,//下拉释放时是否显示loading样式
				isHeightChange:false,//下拉释放时提示框高度变化是否有动画
				isAllowPullDown:false,//是否触发下拉刷新
				isInterval:false,//防止鼠标或者手指移动时多次执行逻辑判断
				time:''//时间
			}
		},
	
		props: {
			flag:{
				type:Boolean,
				default:true
			},
			height:{
				type:Number,
				default :1200
			},
			pullHeight: {
				type: Number,
				default: 50
			},
			maxHeight: {
				type: Number,
				default: 100
			},
			bottomTips:{
				type: String,
				default: ''
			},
			lowerThreshold:{
				type: Number,
				default: 20
			},
			isTab:{
				type: Boolean,
				default: false
			},
			isAllowPull:{
				type: Boolean,
				default: true
			}
		},
		methods:{
			//鼠标点击
			doTouchStart(e){
				if(!this.isAllowPull){
					return;
				}
				this.isHeightChange = false;
				this.isInterval = true;
				this.startY = e.touches[0].clientY;
				this.startX = e.touches[0].clientX;
			},
			//鼠标移动
			doTouchMove(e){
				 
				if(!this.isAllowPull){
					return;
				}
				//滑动的距离
				this.distanceY = e.touches[0].clientY - this.startY;
				//只检测一次
				if(this.isInterval){
					this.isInterval = false;
					//这里判断横向滑动的距离差，主要是为了防止一个页面多个该组件时（横向tab切换）,出现的误操作
					if(Math.abs(this.startX-e.touches[0].clientX)>10&&this.isTab){
						this.isAllowPullDown = false;
					}
					else{
						this.isAllowPullDown = true;
					}
				}
				//根据横向滑动的距离判断是否触发下拉
				if(!this.isAllowPullDown){
					return;
				}
				this.upDownTipsHeight = this.distanceY;
				 if(this.upDownTipsHeight>=this.pullHeight){
					this.upDownTips = '释放立即刷新';
				}
			},
			//鼠标松开
			doTouchEnd(e){
				let time = new Date()
				 let month=time.getMonth()+1;
				 let day=time.getDate();           
				 let h=time.getHours();
				 let m=time.getMinutes();
				 // 下拉显示时间
				 this.time = month+'-'+day + '   '+ h+':'+m
				if(!this.isAllowPull){
					return;
				}
				if(this.upDownTipsHeight>=this.pullHeight){
					this.isAllowLoading = true;
					this.upDownTips = '正在刷新...';
					this.currentPage = 1;
					this.loadingType = "more";
					this.$emit('refresh',1);
				}
				else{
					this.distanceY = 0;
					this.upDownTipsHeight = 0;
					this.upDownTips = '刷新完成';
					
				}
				this.isInterval = true;
				this.isAllowPullDown = false;
				this.isHeightChange = true;
				
			},
			//重置
			reSet(){
				if(!this.isAllowPull){
					return;
				}
				this.isAllowLoading = false;
				this.upDownTips = '';
				this.upDownTipsHeight = 0;
				this.distanceY = 0;
				this.isInterval = true;
				this.isAllowPullDown = false;
			}
		
		}
	}
</script>

<style lang="scss" scoped>
	

	.heightAnimation{
		transition: all .2s linear;
	}
	.upDown{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin: 0 auto;
		text-align: center;
	
		.loading{
			width: 110rpx;
			height: 110rpx;
			position: relative;
			transform: scale(.4);
			margin-right: 30rpx;
			.list {
				width:15rpx;
				height:15rpx;
				border-radius:30px;
				background:#090909;
				position:absolute;
				animation:opaticyAnimation linear 0.7s infinite;
				-webkit-animation:opaticyAnimation linear 0.7s infinite;
			}
			.list:nth-child(1) {
				left:24px;
				top:2px;
				animation-delay:0s;
			}
			.list:nth-child(2) {
				left:40px;
				top:8px;
				animation-delay:0.1s;
			}
			.list:nth-child(3) {
				left:47px;
				top:24px;
				animation-delay:0.2s;
			}
			.list:nth-child(4) {
				left:40px;
				top:40px;
				animation-delay:0.3s;
			}
			.list:nth-child(5) {
				left:24px;
				top:47px;
				animation-delay:0.4s;
			}
			.list:nth-child(6) {
				left:8px;
				top:40px;
				animation-delay:0.5s;
			}
			.list:nth-child(7) {
				left:2px;
				top:24px;
				animation-delay:0.6s;
			}
			.list:nth-child(8) {
				left:8px;
				top:8px;
				animation-delay:0.7s;
			}
			@keyframes opaticyAnimation{
				from{
					opacity: 1;
				}
				to{
					opacity: 0;
				}
			}
		}
		.arrow{
			font-size: 40rpx;
			margin-right: 45rpx;
			.iconfont{
				font-size: 50rpx;
			}
		}
		.upArrow{
			transition: all .3s linear;
			transform: rotate(180deg);
		}
		
		.flex-wrap{
			display: flex;
			flex-direction: column;
			.tips{
				font-size: 30rpx;
			}		
			.refreshOver{
				font-size: 30rpx;
			}
			.time{
				font-size: 30rpx;
			}	
		}	
		
	}
	.bottomTips{
		width: 100%;
		height: 80rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loadingRotate{
		display: inline-block;
		font-size: 40rpx;
		animation: loadingAnimation 1s linear infinite;
	}
	@keyframes loadingAnimation{
		0%{
			transform: rotate(0);
		}
		100%{
			transform: rotate(360deg);
		}
	}
</style>
