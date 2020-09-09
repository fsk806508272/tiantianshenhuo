<template>
	<view class="distribution">
		<view class="header">
			<image class="left" src="../../../static/cut/back_white.png" mode="" @tap="toUser()"></image>
			<view class="title">分销中心</view>
			<view class="right" @tap="toRules()">规则</view>
		</view>
		<view class="page_bg"></view>
		<view class="discenter_top_box">
			<view class="discenter_info">
				<image :src="avatar" class="avatar_img" mode="widthFix"></image>
				<view class="info_right">
					<view class="info_title">
						<text>{{name}}</text>
						<image style="width: 90rpx;" v-if="list.userType==1" src="/static/cut/level1.png" mode="widthFix"></image>
						<image style="width: 90rpx;" v-if="list.userType==2" src="/static/cut/level2.png" mode="widthFix"></image>
						<image style="width: 108rpx;" v-if="list.userType==3" src="/static/cut/level3.png" mode="widthFix"></image>
						<image style="width: 144rpx;" v-if="list.userType==4" src="/static/cut/level4.png" mode="widthFix"></image>
						<image style="width: 144rpx;" v-if="list.userType==5" src="/static/cut/level5.png" mode="widthFix"></image>
					</view>
					<view class="info_txt">{{list.addtime}}加入代理</view>
				</view>
			</view>
			<view class="dis_money_box">
				<text>当前累计获取佣金(元)</text>
				<view class="dis_money_txt">{{list.totalCommission || 0}}</view>
			</view>
		</view>
		<view class="discenter_bottom_box">
			<view class="disbottom_list">
				<view class="dl_box">
					<text>今日获取佣金</text>
					<view class="dl_money">{{list.todayTotalCommission || 0}}</view>
				</view>
				<view class="dl_box">
					<text>待收益佣金</text>
					<view class="dl_money">{{wait_money || 0}}</view>
				</view>
			</view>
			<view class="disbottom_with">
				<text>可提现佣金：{{list.canWithdrawCommission || 0}}元</text>
				<view>立即提现<image src="/static/cut/right_orange.png" mode="widthFix"></image></view>
			</view>
			<view class="my_invite_code">
				<view>我的邀请码：<text>{{bindedInvitationCode}}</text></view>
				<text @tap="copy()">复制</text>
			</view>
			<view class="invite_nav_box">
				<view class="invite_item" @tap="toInvitePage()">
					<image src="/static/cut/discenter_icon1.png" mode="widthFix"></image>
					<view>已邀请用户</view>
					<text>{{list.totalPersonCount || 0}}人</text>
				</view>
				<view class="invite_item" @tap="toCommissionPage()">
					<image src="/static/cut/discenter_icon2.png" mode="widthFix"></image>
					<view>佣金明细</view>
					<text>{{list.commissionCount || 0}}笔</text>
				</view>
				<view class="invite_item" @tap="toShare">
					<image src="/static/cut/discenter_icon3.png" mode="widthFix"></image>
					<view>推广二维码</view>
					<text>扫描邀请</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import h5Copy from '@/common/junyi-h5-copy.js'
	import {UserModel} from "@/common/models/user.js"
	let userModel=new UserModel()
	export default{
		data(){
			return{
				list:'',
				avatar: '/static/cut/logo.png',
				name: '汤圆圆',
				wait_money:'',
				bindedInvitationCode:''
			}
		},
		onLoad(res) {
			this.avatar = res.logo
			this.name = res.name
			this.bindedInvitationCode = res.bindedInvitationCode
			console.log(res)
			userModel.getSelectStatistics(data =>{
				this.list = data
				console.log(this.list)
			})
			
		},
		methods:{
			toRules(){
				uni.navigateTo({
					url:'distributionRules'
				})
			},
			toUser(){
				uni.switchTab({
					url:'../user'
				})
			},
			toInvitePage(){//userType
				uni.navigateTo({
					url: `/pages/user/distribution/invite?userType=${this.list.userType}`
				})
			},
			toCommissionPage(){
				uni.navigateTo({
					url: '/pages/user/distribution/commission'
				})
			},
			copy(){
				let content = this.bindedInvitationCode
				const result = h5Copy(content)
				if(result===true){
					uni.showToast({
						title:'复制成功',
						duration:1500,
						icon:'none'
					})
				}
			},
			toShare(){
				uni.navigateTo({
					url:'/pages/user/share/share'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.header{
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		.left{
			position: absolute;
			left:20rpx;
			width:20rpx;
			height:34rpx;
		}
		.title{
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: 400;
		}
		.right{
			position: absolute;
			right:20rpx;
			color: #FFFFFF;
			font-size: 28rpx
		}
	}
	.discenter_top_box{
		background:linear-gradient(90deg,rgba(255,105,75,1),rgba(247,63,67,1));
		border-radius:0px 0px 50rpx 50rpx;
		padding: 20rpx 20rpx 0;
		.discenter_info{
			background: #fff;
			border-radius: 20rpx;
			padding: 40rpx 30rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 88rpx;
			.avatar_img{
				display: block;
				width:100rpx;
				height:100rpx;
				border-radius:50%;
				margin-right: 15rpx;
			}
			.info_right{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				.info_title{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 10rpx;
					text{
						font-size:34rpx;
						font-weight:500;
						color:rgba(30,30,30,1);
					}
					image{
						margin-left: 15rpx;
						height: 42rpx;
					}
				}
				.info_txt{
					width: 100%;
					font-size:26rpx;
					color:rgba(140,140,140,1);
				}
			}
		}
		.dis_money_box{
			background: #fff;
			border-radius: 20rpx;
			margin-top: 20rpx;
			padding: 70rpx 0;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			text-align: center;
			text{
				font-size:26rpx;
				color:rgba(160,160,160,1);
			}
			.dis_money_txt{
				font-size:66rpx;
				font-family:Bahnschrift;
				font-weight:400;
				color:rgba(30,30,30,1);
				margin-top: 10rpx;
			}
		}
	}
	.discenter_bottom_box{
		padding: 0 20rpx 20rpx;
		.disbottom_list{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			background: #fff;
			.dl_box{
				position: relative;
				margin-bottom: 70rpx;
				width: 50%;
				text-align: center;
				&:first-child:after{
					content: "";
					display: block;
					width:1rpx;
					height:60rpx;
					background:rgba(230,230,230,1);
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 0;
				}
				text{
					font-size:26rpx;
					color:rgba(160,160,160,1);
				}
				.dl_money{
					font-size:36rpx;
					font-family:Bahnschrift;
					font-weight:400;
					color:rgba(30,30,30,1);
					margin-top: 10rpx;
				}
			}
		}
		.disbottom_with{
			background: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #F2F2F2;
			border-radius:0px 0px 20rpx 20rpx;
			text{
				font-size:26rpx;
				color:rgba(60,60,60,1);
			}
			view{
				font-size:26rpx;
				color:rgba(255,102,0,1);
				display: flex;
				justify-content: flex-end;
				align-items: center;
				image{
					display: block;
					width: 10rpx;
					height: 20rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.my_invite_code{
		margin: 20rpx 0;
		background: #fff;
		padding: 35rpx 30rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text{
			font-size:26rpx;
			color:rgba(255,102,0,1);
		}
		view{
			font-size:26rpx;
			color:rgba(120,120,120,1);
			text{
				font-size:34rpx;
				font-family:Source Han Sans CN;
				font-weight:500;
				color:rgba(60,60,60,1);
			}
		}
	}
	.invite_nav_box{
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-radius: 20rpx;
		.invite_item{
			width: 33.3%;
			padding: 45rpx 10rpx 40rpx;
			box-sizing: border-box;
			text-align: center;
			border-right: 1px solid #F2F2F2;
			&:last-of-type{
				border-right: 0;
			}
			image{
				display: block;
				width: 58rpx;
				height: 59rpx;
				margin: 0 auto 25rpx;
			}
			view{
				font-size:26rpx;
				color:rgba(30,30,30,1);
				margin-bottom: 10rpx;
			}
			text{
				font-size:24rpx;
				color:rgba(140,140,140,1);
			}
		}
	}
</style>
