<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<block v-for="(item,index) in orderList" :key="index">
			<block v-if="id==1">
				<business-order :id="id" :orderNum="item.orderCode.substring(0,20)+'...'"
				:createTime="item.createDate" :pic="item.picture.split(',')[0]"></business-order>
			</block>
		</block>
		
		
	</view>
</template>

<script>
	import businessOrder from '@/components/business/business-order.vue'
	import {OrderModel} from '@/common/models/order.js'
	const ordermodel = new OrderModel()
	export default {
		components:{
			businessOrder
		},
		data() {
			return {
				id:'',
				headerPosition:"fixed",
				headerTop:"0px",
				orderType: ['待接单','待处理','已处理','已完成','退款售后'],
				tabbarIndex:0,
				orderList:[]
			}
		},
		onLoad(option){
			this.id = parseInt(option.id)
			this.tabbarIndex = option.type || 0
			this.showType(option.type)
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);
				}
			},1);
		},
		methods:{
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				if(tbIndex == 0){
					
				}else if(tbIndex==1){
					ordermodel.checkSellerOrder({type:2},(data)=>{
						this.orderList = data
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f2f2f2;
	padding-top: 84rpx;
}
.topTabBar{
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:64rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	.grid{
		width:20%;
		height:64rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			height:62rpx;
			display: flex;
			align-items: center;
			&.on{
				color: #FF6600;
				border-bottom: solid 2rpx #FF6600;
			}
		}
	}
}
</style>
