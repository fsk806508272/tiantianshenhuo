<template>
	<view>
		<view v-for="(item,index) in agreementList" :key="index">
			<view class="top">
				<view class="status">{{status[item.status]}}</view>
				<view class="icon">乙方</view>
			</view>
			<view class="middle" @tap="toDetail()">
				<view class="title">#{{item.title}}#</view>
				<view class="default">合同编号：{{item.number}}</view>
				<view class="default">合同时长：{{item.duration}}</view>
				<view class="default">月租金：￥{{item.salary}}</view>
			</view>
			<view class="bottom">
				<view class="time">{{item.time}}</view>
				<view class="buttons" v-if="item.status==0">
					<view class="button">联系TA</view>
					<view class="button" @tap="toChange()">合同变更</view>
				</view>
				<view v-if="item.status==1" class="buttons">
					<view class="button">删除合同</view>
					<view class="button">账单详情</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			status:['履行中','已解约'],
			agreementList:[
				{
					status:'0',
					type:'乙方',
					title:'龙城广场A出口 电梯公寓直租',
					number:'TTSH12345678901234567890',
					duration:'2019-11-01至2020-10-01',
					salary:'2000/月',
					time:'2019-11-01  10:52'
				}
			]
		}
	},
	methods:{
		toDetail(){
			uni.navigateTo({
				url:'agreementdetail'
			})
		},
		toChange(){
			uni.navigateTo({
				url:'agreementchange'
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.top{
	margin-top: 20rpx;
	background-color: #fff;
	height:100rpx;
	border-bottom:1rpx solid #DCDCDC;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.status{
		margin-left: 20rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(255,102,0,1);
		line-height:40rpx;
	}
	.icon{
		width:99rpx;
		height:40rpx;
		background:rgba(41,181,246,1);
		border-radius:20rpx 0rpx 0rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:28rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:36rpx;
	}
}
.middle{
	background-color: #fff;
	height:254rpx;
	border-bottom:1rpx solid #DCDCDC;
	padding-left: 19rpx;
	padding-top: 29rpx;
	.title{
		font-weight:400;
		color:rgba(60,60,60,1);
		line-height:36rpx;
	}
	.default{
		margin-top: 25rpx;
		font-weight:400;
		color:rgba(140,140,140,1);
		line-height:36rpx;
	}
}
.bottom{
	background-color: #fff;
	height:100rpx;
	display: flex;
	.time{
		width:370rpx;
		padding-top: 41rpx;
		padding-left: 19rpx;
		font-size:22rpx;
		font-weight:400;
		color:rgba(160,160,160,1);
	}
	.buttons{
		width:380rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.button{
			display: flex;
			align-items: center;
			justify-content: center;
			width:160rpx;
			height:60rpx;
			background:rgba(255,255,255,1);
			border:1rpx solid rgba(200,200,200,1);
			border-radius:10rpx;
		}
	}
}
</style>
