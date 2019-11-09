<template>
	<view>
		<view class="page_bg"></view>
		<!-- 服务商子类 -->
		<view class="provide_box">
			<view class="pro_title gray star">服务商主类</view>
			<view class="pro_list">
				<view class="pro_item" @tap="selectDemandParent(index)" :class="[demand_parent_idx == index?'active':'']" v-for="(item,index) in provideItem" :key="index">{{item}}</view>
			</view>
		</view>
		
		<!-- 基本信息 -->
		<view class="graytitle">基本信息</view>
		<view class="listItem">
			<view class="star">商品名称</view>
			<input placeholder="请输入标题(26字内)"/>
		</view>
		<view class="listItem">
			<view class="star">商品价格</view>
			<input placeholder="请输入"/>
		</view>
		
		<!-- 店铺内商品所属分类 -->
		<view class="category">
			<view class="top"><view class="title">店铺内商品所属分类</view><view class="addOk">添加完成</view></view>
			<view class="category">
				<view class="gray">已有分类</view>
				<view class="buttons">
					<view>生活用品</view>
					<view>生活用品</view>
					<view>生活用品</view>
					<view>生活用品</view>
					<view>生活用品</view>
				</view>
			</view>
			<view class="category">
				<view class="gray">新增分类</view>
				<view class="input">
					<input placeholder="请输入分类名称(限4字内)"/>
					<view class="add">添加</view>
				</view>
			</view>
		</view>
		
		<!-- 设置规格 -->
		<view class="size">
			<view class="top"><view class="title">设置规格</view></view>
			<setting-spec></setting-spec>
		</view>
		
		<!-- 商品图片 -->
		<view class="grayButton">商品图片(注：第一张为主图，限6张)</view>
		<view class="uploadGoodsImg">
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
		</view>
	</view>
</template>

<script>
import settingSpec from '@/components/settingSpec.vue'
import {ProvideModel} from '@/common/models/provide.js'
const providemodel = new ProvideModel()
export default{
	components:{
		settingSpec
	},
	data(){
		return{
			provideItem:[]
		}
	},
	onLoad(){
		providemodel.getSecondType({firstType:'生活',type:2},(data)=>{
			for(let i of data){
				this.provideItem.push(i.title)
			}
		})
	}
}
</script>

<style lang="scss">
.provide_box{
	background-color: #fff;
	margin-top: 20rpx;
	padding:30rpx 20rpx 0 20rpx;
	.pro_list{
		margin-top: 20rpx;
		display: flex;
		flex-wrap:wrap;
		.pro_item{
			margin-bottom: 20rpx;
			display: flex;
			align-items:center;
			justify-content: center;
			width:140rpx;
			height:50rpx;
			margin-right: 20rpx;
			border:1rpx solid rgba(200,200,200,1);
			border-radius:8rpx;
			font-size:24rpx;
		}
	}
}

.listItem{
	background-color: #fff;
	padding-left:20rpx;
	display: flex;
	align-items: center;
	height:84rpx;
	border-bottom: 1rpx solid #f2f2f2;
	.star{
		margin-right: 20rpx;
	}
}

.category{
	background-color: #fff;
	margin-top: 20rpx;
	padding:0 20rpx 20rpx 20rpx;
	.category{
		display: flex;
		margin-bottom: 20rpx;
		align-items: center;
		.gray{
			width:150rpx;
		}
		.buttons{
			display: flex;
			flex-wrap: wrap;
			width:540rpx;
			view{
				margin-right: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width:140rpx;
				height:50rpx;
				margin-bottom: 20rpx;
				border:1px solid rgba(200,200,200,1);
				border-radius:8rpx;
			}
		}
		.input{
			display: flex;
			input{
				width:440rpx;
				height:64rpx;
				border:1px solid rgba(160,160,160,1);
				border-radius: 8rpx;
				padding-left: 10rpx;
			}
			.add{
				display: flex;
				align-items: center;
				justify-content: center;
				color:#fff;
				width:100rpx;
				height:64rpx;
				background:linear-gradient(180deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:8rpx;
			}
		}
	}
}

.top{
	height:83rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1rpx solid #f2f2f2;
	.addOk{
		color: #FF6600;
		font-size:24rpx;
	}
}

.size{
	margin-top: 20rpx;
	background-color: #fff;
	padding:0 20rpx;
}

.uploadGoodsImg{
	background-color: #fff;
	display: flex;
	padding:0 20rpx 30rpx 20rpx;
	flex-wrap: wrap;
	image{
		width:200rpx;
		height:200rpx;
		margin-top: 30rpx;
		margin-right: 30rpx;
	}
}
</style>
