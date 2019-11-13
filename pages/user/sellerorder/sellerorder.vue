<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<view v-if='tabbarIndex!=4'>
			<block v-for="(item,index) in orderList" :key="index">
				<block v-if="id==1">
					<business-order :id="id" :status="status" :orderNum="item.orderCode"
					:createTime="item.createDate" :pic="item.picture.split(',')[0]"
					:duration="item.duration" :username="item.name" :identityCard="item.identityCard"
					:phone="item.telephone" :title="item.title" :spec="item.paymentMethod"
					:price="item.rental" @checkCont="toContract(item)" :houseSum="item.sum"
					:houseService="item.serviceCharge" :deposit="item.deposit"></business-order>
				</block>
				
				<block v-if="id==8||id==9||id==3">
					<business-order :id="id" :status="status" :orderNum="item.orderId" type='1'
					:createTime="item.createTime" :goodsItemList="item.goodsOrderItemList"
					:sum="item.payment" :length="item.goodsOrderItemList.length" :deliver="item.postFee"
					@acceptOrder="accept(item)" @confirm="confirmService(item)"></business-order>
				</block>
			</block>
		</view>
		
		<view v-if="tabbarIndex==4">
			<block v-for="(item,index) in orderList" :key="index">
				<business-order :id="id" :status="item.myStatus" :orderNum="item.goodsOrderId"
				:createTime="item.createTime" :goodsItemList="item.goodsOrderItem"
				deliver="售后中" :length="item.goodsOrderItem.length" :type='item.type' :applyExplain="item.applyExplain"
				:applyMode="item.applyMode" :applyReason="item.applyReason"></business-order>
			</block>
		</view>
		
		
		
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
				status:'',
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
					if(this.id==1){
						
					}else if(this.id==8){
						this.status = 'waitingRecieve'
					}
					ordermodel.checkSellerOrder({type:1},(data)=>{
						this.orderList = data
					})
				}else if(tbIndex==1){
					if(this.id==1){
						this.status = 'houseWaitingDeal'
					}else if(this.id==8){
						this.status = 'waitingDeal'
					}
					ordermodel.checkSellerOrder({type:2},(data)=>{
						this.orderList = data
					})
				}else if(tbIndex==2){
					if(this.id==1){
						this.status = 'houseDealed'
					}else if(this.id==8){
						this.status = 'dealed'
					}
					ordermodel.checkSellerOrder({type:3},(data)=>{
						this.orderList = data
					})
				}else if(tbIndex==3){
					if(this.id==1){
						this.status = 'houseFinished'
					}else if(this.id==8||this.id==9){
						this.status = 'finished'
					}
					ordermodel.checkSellerOrder({type:4},(data)=>{
						this.orderList = data
					})
				}else if(tbIndex==4){
					ordermodel.sellerCheckBackOrder({},data=>{
						this.orderList = data
						for(let i of this.orderList){
							if(i.type==7){
								i.myStatus = 'applyBack'
							}else if(i.type==9){
								i.myStatus = 'applyMoney'
							}
						}
						console.log(this.orderList)
					})
				}
			},
			toContract(item){
				item = JSON.stringify(item)
				uni.navigateTo({
					url:`/pages/user/sellerorder/ordercontract?data=${item}`
				})
			},
			accept(item){
				ordermodel.sellerAcceptOrder({goodsOrderId:item.orderId},(data)=>{
					uni.showToast({
						title:'操作成功',
						icon:'none',
						duration:1500
					})
					setTimeout(()=>{
						this.showType(1)
					},1500)
				})
			},
			confirmService(item){
				ordermodel.sellerConfirmService({goodsOrderId:item.orderId},data=>{
					uni.showToast({
						title:'操作成功',
						icon:'none',
						duration:1500
					})
					setTimeout(()=>{
						this.showType(2)
					},1500)
				})
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
