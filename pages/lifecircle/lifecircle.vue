<template>
	<view>
		<view class="navbar">
			<image class="back" @tap="toIndex" src="/static/cut/lifecircle/backto.png"></image>
			<view class="title">生活圈</view>
			<image @tap="toPublish" class="camera" src="/static/cut/lifecircle/camera.png"></image>
		</view>
		
		<view class="tabbar">
			<view @tap="clickTab(0)" class="tab" :class="tabIndex==0?'light':''">热门动态</view>
			<view @tap="clickTab(1)" class="tab" :class="tabIndex==1?'light':''">最新动态</view>
		</view>
		
		<block v-for="(item,index) in data" :key="index">
			<view class="list">
				<view class="user">
					<image :src='item.logoImg'></image>
					<view class="info">
						<view>{{item.nickname}}</view>
						<view class="gray">{{item.createTime}}</view>
					</view>
				</view>
				<view class="content">{{item.dynamicContent}}</view>
				
				<view class="one" v-if="item.pictureList.length==1">
					<image :src="item.dynamicPicture"></image>
				</view>
				<view class="two" v-if="item.pictureList.length==2">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image :src="img"></image>
					</block>
				</view>
				<view class="three" v-if="item.pictureList.length==3">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image :src="img"></image>
					</block>
				</view>
				<view class="two" v-if="item.pictureList.length==4">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image :src="img"></image>
					</block>
				</view>
				<view class="three" v-if="item.pictureList.length>=5">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image :src="img"></image>
					</block>
				</view>
				
				<view class="bottom">
					<view class="lf">已浏览{{item.browseNumber}}次</view>
					<view class="rt">
						<image src="/static/cut/lifecircle/good.png"></image>
						<view>{{item.numberOfPoints}}</view>
						<image src="/static/cut/lifecircle/comment.png"></image>
						<view>{{item.commentNumber}}</view>
					</view>
				</view>
				
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:'',
				tabIndex:0,
				pageNo:1
			}
		},
		onLoad(){
			this.requestData()
		},
		methods: {
			toPublish(){
				uni.navigateTo({
					url:'/pages/lifecircle/publish'
				})
			},
			clickTab(index){
				this.tabIndex = index
			},
			toIndex(){
				uni.navigateBack({
					delta:1
				})
			},
			requestData(){
				let req = {}
				if(this.tabIndex==1){
					req.type = 2
				}
				req.pageNo = this.pageNo
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamic/findUserDynamicList',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzU1NDY0OTMsInVzZXJuYW1lIjoiYjkzYTQ5M2Q2YzExNDg5MjkwNDY0MmQ0M2RlMmQxMzUifQ.-n-jJ03mj9iMJxSjl2NNzZI9JwZtNPKxEzZ5hYvR4kg'	 
					},
					success(res){
						that.data = res.data.data.userDynamicList
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.navbar{
		height:88rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		.back{
			width:21rpx;
			height:36rpx;
		}
		.title{
			font-size:36rpx;
			font-weight:500;
			color:rgba(30,30,30,1);
		}
		.camera{
			width:44rpx;
			height:37rpx;
		}
	}
	
	.tabbar{
		background-color: #fff;
		height:90rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.tab{
			font-size:32rpx;
			font-weight:500;
			color:rgba(60,60,60,1);
			&.light{
				color:rgba(255,102,0,1);
			}
		}
	}
	
	.list{
		margin-top: 10rpx;
		background-color: #fff;
		padding:20rpx;
		.user{
			height:74rpx;
			display: flex;
			image{
				margin-right: 10rpx;
				height:74rpx;
				width:74rpx;
				border-radius:50%;
			}
		}
		.content{
			margin: 30rpx 0;
		}
		.one{
			image{
				width:360rpx;
				height:360rpx;
			}
		}
		.two{
			display: flex;
			flex-wrap:wrap;
			image{
				margin-right: 10rpx;
				width:300rpx;
				height:300rpx;
				margin-bottom: 10rpx;
			}
		}
		.three{
			display: flex;
			flex-wrap: wrap;
			image{
				margin-right: 10rpx;
				width:225rpx;
				height:225rpx;
				margin-bottom: 10rpx;
			}
		}
		.bottom{
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			.lf{
				color:#A0A0A0;
			}
			.rt{
				display: flex;
				view{
					margin-left: 10rpx;
				}
				image{
					margin-left: 20rpx;
					width:36rpx;
					height:36rpx;
				}
			}
			
		}
	}
</style>
