<template>
	<view>
		<view class="chooseStoreType">
			<view class="star">选择店铺类型</view>
			<view class="items">
				<view @tap="chooseType(index)" class="button" v-for="(item,index) in typeList" :class="[typeIndex==index?'on':'']" :key="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				typeIndex:0,
				typeList:['生活服务','代购服务','维修服务','金融服务','房屋服务','家政服务']
			}
			
		},
		methods:{
			chooseType(index){
				this.typeIndex = index
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.chooseStoreType{
	margin-top: 20rpx;
	background-color: #fff;
	height:224rpx;
	padding:30rpx 19rpx;
	.items{
		display: flex;
		flex-wrap: wrap;
		.button{
			width:140rpx;
			height:50rpx;
			border:1rpx solid rgba(200,200,200,1);
			border-radius:8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
		.on{
			border:1px solid rgba(255,102,0,1);
			color:#ff6600;
		}
	}
}
</style>
