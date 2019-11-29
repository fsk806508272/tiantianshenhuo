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
			<view class="list" @tap="toDetail(item.id)">
				<view class="user">
					<image :src='item.logoImg'></image>
					<view class="info">
						<view class='nickName'>{{item.nickname}}</view>
						<view class="gray">{{item.createTime}}</view>
					</view>
				</view>
				<view class="content">{{item.dynamicContent}}</view>
				
				<view class="one" v-if="item.pictureList.length==1">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image mode="aspectFit" @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="two" v-if="item.pictureList.length==2">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="three" v-if="item.pictureList.length==3">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="two" v-if="item.pictureList.length==4">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="three" v-if="item.pictureList.length>=5">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
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
				pageNo:1,
				token:''
			}
		},
		onLoad(options){
			this.token = options.token
			this.requestData()
		},
		methods: {
			add(){
				console.log(111)
			},
			toPublish(){
				uni.navigateTo({
					url:`/pages/lifecircle/publish?token=${this.token}`
				})
			},
			clickTab(index){
				this.tabIndex = index
			},
			toIndex(){
				const android = window.android
				if (window.android) {
					window.android.finish();
				} else {
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			toDetail(item){
				uni.navigateTo({
					url:`/pages/lifecircle/detail?id=${item}&token=${this.token}`
				})
			},
			preview(list,number){
				uni.previewImage({
					urls:list,
					current:number,
				})
			},
			requestData(){
				let req = {}
				if(this.tabIndex==1){
					req.type = 2
				}
				req.pageNo = this.pageNo
				req.pageSize = 20
				req.isMeOrAll = 2
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamic/findUserDynamicList',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded', 
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
		padding-top:88rpx;
	}
	.navbar{
		position: fixed;
		top:0;
		height:88rpx;
		width: 750rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		z-index: 99;
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
		margin-top: 20rpx;
		background-color: #fff;
		padding:30rpx;
		.user{
			height:74rpx;
			display: flex;
			.info{
				.nickName{
					font-size: 30rpx;
					color:#1E1E1E;
				}
				.gray{
					color:#A0A0A0;
				}
			}
			image{
				margin-right: 10rpx;
				height:74rpx;
				width:74rpx;
				border-radius:50%;
			}
		}
		.content{
			margin: 20rpx 0;
			font-size: 28rpx;
			color:#1E1E1E;
		}
		.one{
			image{
				width:400rpx;
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
				margin-right: 7rpx;
				width:225rpx;
				height:225rpx;
				margin-bottom: 7rpx;
			}
		}
		.bottom{
			margin-top: 20rpx;
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
					margin-left: 50rpx;
					width:36rpx;
					height:36rpx;
				}
			}
			
		}
	}
</style>
