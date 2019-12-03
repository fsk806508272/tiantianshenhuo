<template>
	<view class="send-box">
		<view class="send-type">
			<view class="type">*选择账单类型</view>
			<view class="bill-box">
				<view class="house">房屋账单</view>
				<view class="inance">金融账单</view>
			</view>
		</view>
		<view class="cost-details">
			<view class="cost">*费用明细</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page {
	background: #FFFFFF;
	.send-box {
		margin-top: 10rpx;
		
		.send-type {
			height: 164rpx;
			overflow: hidden;
			background: #FFFFFF;
			margin-left: 20rpx;
			.type {
				margin-top: 20rpx;
				font-size: 13rpx;
			}
			.bill-box {
				display: flex;
				margin-top: 10rpx;
				font-size: 24rpx;
				.house {
					margin-right: 20rpx;
					border: 1px solid #C8C8C8;
					padding: 6rpx 10rpx;
					border-radius: 10rpx;
				}
				.inance {
					border: 1px solid #FF6600;
					color: #FF6600;
					padding: 6rpx 10rpx;
					border-radius: 10rpx;
				}
			}
		}
		.cost-details {
			margin-top: 10rpx;
			margin-left: 20rpx;
			
			.cost {
				height: 100rpx;
				background: #E6E6E6;
			}
		}
	}
}

</style>
