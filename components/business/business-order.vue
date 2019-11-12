<template name="businessOrder">
	<view class="box">
		<view class="top">
			<view class="lf">
				<image src="/static/cut/user/billicon.png"></image>
				<view class="ordercode">{{orderNum}}</view>
			</view>
			<view class="rt">{{createTime}}</view>
		</view>
		
		<view class="middle">
			<image :src="pic"></image>
			<view class="list">
				<view class="title">
					<view class="name">回复困惑和思考解放后开始是否是科技示范</view>
					<view class="content">36.9</view>
				</view>
				<view class="title">
					<view class="spec">手持花洒(五年质保)；</view>
				</view>
				<view v-if="id==8" class="title">
					<view class="fee">配送(运费)</view>
					<view class="content">￥20</view>
				</view>
				<view v-if="id!=8" class="title">
					<view class="fee">位于i速回复</view>
					<view class="content">dfa</view>
				</view>
				<view v-if="id!=8" class="title">
					<view class="fee">位于i速回复</view>
					<view class="content">dfa</view>
				</view>
			</view>
		</view>
		
		<view class="bottom">
			<view class="content">
				<text v-if="id==8">共计{{num}}个，实收￥{{price}}</text>
				<text v-if="id==1">实收</text>
			</view>
			<view class="status">待接单</view>
		</view>
		
		<view class="other">
			<!-- 地址 -->
			<view class="item" v-if="id==8">
				<image src="/static/cut/user/address_on.png"></image>
				<view class="content">
					<view class="address">广东深圳市龙岗区龙翔大道9002号志联佳大厦508</view>
					<view class="name">唐笑笑 1374545554</view>
				</view>
			</view>
			<!-- 留言 -->
			<view class="item" v-if="id==8">
				<image src="/static/cut/user/message.png"></image>
				<view class="content">急需要穿！！帮忙快点发货好吗，拜托了</view>
			</view>
			<view class="item" v-if="id==1">
				<image src="/static/cut/user/userInfo.png"></image>
				<view class="content">
					<view class="address">54545454545</view>
					<view class="name">唐笑笑 1374545554</view>
				</view>
			</view>
			<view class="item" v-if="id==1">
				<image src="/static/cut/user/signtime.png"></image>
				<view class="content">租期时长：</view>
			</view>
			<view class="item" v-if="id==10">
				<image src="/static/cut/user/reason.png"></image>
				<view class="content">急需要穿！！帮忙快点发货好吗，拜托了</view>
			</view>
			<view class="item" v-if="id==10">
				<image src="/static/cut/user/backtype.png"></image>
				<view class="content">急需要穿！！帮忙快点发货好吗</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	name:'businessOrder',
	props:{
		id:{
			type:Number,
			value:8
		},
		num:{
			type:Number,
			value:1
		},
		price:{
			type:String,
			value:'52.03'
		},
		createTime:{
			type:String
		},
		orderNum:{
			type:String
		},
		pic:{
			type:String
		}
	},
	data(){
		return{
			statusObj:{
				waitingRecieve:'待接单',
				waitingDeal:'待处理'
			}
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.box{
	background-color: #fff;
	margin-bottom: 20rpx;
}
.top{
	border-bottom: 1rpx solid #f2f2f2;
	padding:0 20rpx;
	height:87rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.lf{
		display: flex;
		align-items: center;
		image{
			width:24rpx;
			height:27rpx;
			margin-right: 10rpx;
		}
		.ordercode{
			font-size:20rpx;
			color:rgba(100,100,100,1);
		}
	}
	.rt{
		font-size:20rpx;
		color:rgba(140,140,140,1);
	}
}

.middle{
	display: flex;
	margin-top: 20rpx;
	border-bottom: 1rpx solid #f2f2f2;
	image{
		width:120rpx;
		height:120rpx;
		border-radius: 8rpx;
		margin-left: 18rpx;
	}
	.list{
		width:573rpx;
		margin-left: 19rpx;
		.title{
			margin-bottom: 10rpx;
			display: flex;
			justify-content: space-between;
			.name{
				width:400rpx;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.spec{
				font-size:22rpx;
				color:rgba(0,138,255,1);
			}
		}
	}
}
.bottom{
	border-bottom: 1rpx solid #f2f2f2;
	display: flex;
	height:83rpx;
	align-items: center;
	padding:0 20rpx;
	justify-content: space-between;
	.status{
		color:#008AFF;
	}
}

.other{
	padding:20rpx 20rpx 20rpx 20rpx;
	.item{
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		image{
			width:36rpx;
			height:36rpx;
		}
		.content{
			margin-left: 20rpx;
		}
	}
}
</style>
