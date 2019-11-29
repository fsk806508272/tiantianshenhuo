<template>
	<view>
		<view class="box">
			<view class="user">
				<image :src='item.logoImg'></image>
				<view class="info">
					<view class='nickName'>{{item.nickname}}</view>
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
					<image @tap="focusButn" src="/static/cut/lifecircle/comment.png"></image>
					<view>{{item.commentNumber}}</view>
				</view>
			</view>
		</view>
		
		<view class="commentList">
			<block v-for="(data,index) in item.userDynamicCommentViewList" :key="index">
				<view class="top">
					<view class="lf">
						<image :src="data.logoImg"></image>
						<view class="info">
							<view class="name">{{data.nickname}}</view>
							<view class="time">{{data.createTime}}</view>
						</view>
					</view>
					<view class="rt">回复</view>
				</view>
				<view class="middle">{{data.replyContent}}</view>
			</block>
		</view>
		
		<view class="toComment" v-if="showInput">
			<input v-model="comment" placeholder="点击输入评论" @blur="blur" :focus="focus" />
			<view @tap="send">发送</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				token:'',
				item:'',
				focusInput: false,
				isInput: false,
				comment:'',
				showInput:false,
				focus:false
			}
		},
		methods: {
			queryDetail() {
				
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamic/findUserDynamicDetails',
					data:{
						id:that.id
					},
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded',	 
					},
					success(res){
						that.item = res.data.data
					}
				})
			},
			blur(){
				this.showInput = false
				this.focus = false
			},
			send(){
				this.showInput = false
				let that = this
				let req = {}
				req.userDynamicId = this.item.id
				req.fid = 0
				req.replyContent = this.comment
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamicReply/addCommentDynamic',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						token:that.token
					},
					success(res){
						that.queryDetail()
					}
				})
			},
			focusButn(){
				this.showInput = true
				this.focus = true
			},
		},
		
		onLoad(options){
			this.id = options.id
			this.token = options.token
			this.queryDetail()
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.box{
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
	
	.toComment{
		margin-top: 20rpx;
		height:110rpx;
		background-color: #f0f0f0;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		input{
			width:600rpx;
			background-color:#fff;
			height:70rpx;
			padding-left:20rpx;
			border-radius:8rpx;
			
		}
		view{
			margin-left: 20rpx;
			color: #ff6600;
			font-size:30rpx;
		}
	}
	
	.commentList{
		margin:20rpx 0;
		background-color: #fff;
		padding:30rpx;
		.top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.lf{
				display: flex;
				image{
					width:74rpx;
					height:74rpx;
					border-radius:50%;
				}
				.info{
					margin-left: 10rpx;
					.name{
						font-size:30rpx;
						color:rgba(80,80,80,1);
					}
					.time{
						font-size:24rpx;
						color:rgba(160,160,160,1);
					}
				}
			}
			.rt{
				color:#ff6600;
			}
		}
		.middle{
			width:580rpx;
			margin: 30rpx 0 30rpx 90rpx;
		}
	}
</style>
