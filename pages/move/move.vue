<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <movable-area scale-area>
                <movable-view direction="all" movable-view="all" scale="true" scale-min="0.5" scale-max="4" :scale-value="1">
                    <view class="image">
						<view class="title">普通电子收据</view>
						<view class="code">
							<view class="code-title">收款编号：</view>
							<view class="code-date">
								<view>日期：<input v-model="queryInfo.year" style="width:60rpx"></view>
								<view>年：<input v-model="queryInfo.month"></view>
								<view>月：<input v-model="queryInfo.day"></view>
								<view>日</view>
							</view>
						</view>
						<view style="border-bottom:none;" class="line">
							<view>姓名</view>
							<input v-model="queryInfo.name">
						</view>
						<view style="border-bottom:none;" class="line">
							<view>电话</view>
							<input v-model="queryInfo.phone">
						</view>
						<view v-if="type!=1&&type!=5" style="border-bottom:none;" class="line">
							<view>保修期限</view>
							<input v-model="queryInfo.warrantyPeriod">
						</view>
						<view style="border-bottom:none;" class="line">
							<view>收款方式</view>
							<input v-model="queryInfo.paymentMethod">
						</view>
						<view style="border-bottom:none;" class="line">
							<view>收据事由</view>
							<input v-model="queryInfo.receiptReason">
						</view>
						<view class="line">
							<view>交款单位</view>
							<input v-model="queryInfo.payingUnit">
						</view>
						<view class="finance" v-if="type==5">
							<view class="item">
								<view>商品名称</view>
								<textarea v-model="financeName"></textarea>
							</view>
							<view class="item">
								<view style="border-right: none;">合约时长</view>
								<textarea v-model="contractTime" style="border-right:none"></textarea>
							</view>
						</view>
						<view v-if="type!=1&&type!=5" class="detail">
							<view class="item">
								<view>商品名称</view>
								<textarea v-model="queryInfo.goodsName"></textarea>
							</view>
							<view class="item">
								<view>规格</view>
								<textarea v-model="queryInfo.spec"></textarea>
							</view>
							<view class="item">
								<view>数量</view>
								<textarea v-model="queryInfo.num"></textarea>
							</view>
							<view class="item">
								<view>单价</view>
								<textarea v-model="queryInfo.price"></textarea>
							</view>
							<view class="item">
								<view style="border-right:none">金额</view>
								<textarea style="border-right:none" v-model="queryInfo.amount"></textarea>
							</view>
						</view>
						<view class="linetwo">
							<view><text style="width:210rpx">人民币(元):</text><input v-model="queryInfo.rmb"></view>
							<view><text>大写:</text><input></view>
						</view>
						<view class="line">
							<view>补充：</view>
							<input v-model="queryInfo.supplement">
						</view>
						<view class="people">收款人:
							<input v-model="queryInfo.payee">
						</view>
						<view class="button" @tap="toBack">提交</view>
					</view>
                </movable-view>
            </movable-area>
        </view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				type:'',
				contractTime:'',
				financeName:'',
				queryInfo:{
					year:'',
					month:'',
					day:'',
					name:'',
					phone:'',
					paymentMethod:'',
					receiptReason:'',
					payingUnit:'',
					rmb:'',
					supplement:'',
					orderId:'',
					warrantyPeriod:'',
					goodsName:'',
					spec:'',
					num:'',
					price:'',
					amount:'',
					payee:''
				}
			}
		},
		onLoad(options){
			this.type = options.type
			this.queryInfo.orderId = options.orderId
			this.token = options.token
		},
		methods: {
			toBack(){
				if(this.type!=1&&this.type!=5){
					uni.request({
						url:'https://sgz.wdttsh.com/app/receipt/lifeReceipt',
						method:'POST',
						data:this.queryInfo,
						header: {
							'content-type':'application/x-www-form-urlencoded', 
							'token':this.token
						},
						success(res){
							if (window.android) {
								window.android.finish()
							}
						}
					})
				}else if(this.type==1){
					delete this.queryInfo.warrantyPeriod
					delete this.queryInfo.goodsName
					delete this.queryInfo.spec
					delete this.queryInfo.num
					delete this.queryInfo.price
					delete this.queryInfo.amount
					uni.request({
						url:'https://sgz.wdttsh.com/app/receipt/houseReceipt',
						method:'POST',
						data:this.queryInfo,
						header: {
							'content-type':'application/x-www-form-urlencoded', 
							'token':this.token
						},
						success(res){
							if (window.android) {
								window.android.finish()
							}
						}
					})
					
				}else if(this.type==5){
					delete this.queryInfo.warrantyPeriod
					delete this.queryInfo.goodsName
					delete this.queryInfo.spec
					delete this.queryInfo.num
					delete this.queryInfo.price
					delete this.queryInfo.amount
					this.queryInfo.contractTime = this.contractTime
					this.queryInfo.financeName = this.financeName
					uni.request({
						url:'https://sgz.wdttsh.com/app/receipt/financeReceipt',
						method:'POST',
						data:this.queryInfo,
						header: {
							'content-type':'application/x-www-form-urlencoded', 
							'token':this.token
						},
						success(res){
							if (window.android) {
								window.android.finish()
							}
						}
					})
				}
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>

movable-view {
	/* display: flex; */
	align-items: center;
	justify-content: center;
	width: 100%;
	height:100%;
	input{
		font-size:24rpx;
		line-height: 24rpx;
	}
	.image{
		color:#B04201;
		font-size:16rpx;
		padding:0 20rpx;
		width:100%;
		.title{
			position: relative;
			font-size:28rpx;
			font-weight:600;
			color:rgba(176,66,1,1);
			margin-top:48rpx;
			text-align: center;
		}
		.title:before,.title:after{
			content:'';
			position: absolute;
			width:228rpx;
			height:2rpx;
			background:rgba(176,66,1,1);
		}
		.title:before{
			top:40rpx;
			right:241rpx;
		}
		.title:after{
			top:50rpx;
			right:241rpx;
		}
	}
	.code{
		margin-top: 66rpx;
		display: flex;
		align-items: center;
		font-size:18rpx;
		width:100%;
		justify-content: space-between;
		.code-title{
			font-size:18rpx;
			width:250rpx;
			display: flex;
			align-items: center;
			input{
				width:100rpx;
			}
		}
		.code-date{
			width:360rpx;
			display: flex;
			align-content: center;
			view{
				display: flex;
				align-items: center;
			}
			input{
				width:50rpx;
			}
		}
	}
	.line{
		border:1rpx solid #B04201;
		display: flex;
		align-items: center;
		height:64rpx;
		view{
			line-height: 64rpx;
			font-size:18rpx;
			height:100%;
			text-align: center;
			width:150rpx;
			border-right: 1rpx solid #B04201;
		}
		input{
			padding:0 10rpx;
			font-size:18rpx;
			height:34rpx;
			width:610rpx;
		}
	}
	.linetwo{
		border-right:1rpx solid #B04201;
		border-left:1rpx solid #B04201;
		display: flex;
		height:64rpx;
		align-items: center;
		view{
			text{
				padding:20rpx;
				width:100rpx;
			}
			display: flex;
			align-items: center;
			width:50%;
			input{
				padding-left:10rpx;
			}
		}
		
	}
	.detail{
		display: flex;
		width:100%;
		border:1rpx solid #B04201;
		border-top:none;
		.item{
			width:20%;
			view{
				border-bottom:1rpx solid #B04201;
				height:64rpx;
				line-height: 64rpx;
				width:100%;
				text-align: center;
				border-right:1rpx solid #B04201;
			}
			textarea{
				padding:10rpx;
				width:100%;
				border-right:1rpx solid #B04201;
			}
		}
	}
	.finance{
		display: flex;
		width:100%;
		border:1rpx solid #B04201;
		border-top:none;
		.item{
			width:50%;
			view{
				border-bottom: 1rpx solid #B04201;
				height:64rpx;
				line-height: 64rpx;
				width:100%;
				text-align: center;
				border-right:1rpx solid #B04201;
			}
			textarea{
				padding:10rpx;
				width:100%;
				border-right: 1rpx solid #B04201;
			}
		}
	}
	.people{
		margin-top: 10rpx;
		height:64rpx;
		display: flex;
	}
	.button{
		width:100rpx;
		height:60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border:1rpx solid #B04201;
	}
	
}

movable-area {
	height: 100%;
	width: 100%;
	position:fixed;
	overflow: hidden;
}
	

</style>
