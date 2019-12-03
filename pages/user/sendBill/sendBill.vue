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
			<input class="bill-name" type="text" value="" placeholder="请输入账单名称" placeholder-style="font-size:13px; margin-left:20rpx" />
			<view class="agency-box">
				 <view>
				        <view class="uni-list" >
				            <view class="uni-list-cell">
				                <view class="uni-list-cell-db agency">
				                    <picker @change="bindPickerChange" :value="index" :range="array">
				                        <view class="uni-input">{{array[index]}}</view>
				                    </picker>
				                </view>
				            </view>
				        </view>
				</view>
					<input class="agency" type="text" value="" placeholder="请输入价格" placeholder-style="font-size:13px; " />
				<view class="jia" @click="add">+</view>
			</view>
			<view class="agency-box" v-for="(item,index1) in moduleAmount">
				<view>
				        <view class="uni-list">
				            <view class="uni-list-cell">
				                <view class="uni-list-cell-db agency">
				                    <picker @change="bindPickerChange" :value="index1" :range="array">
				                        <view class="uni-input">{{moduleAmount[index1][index]}}</view>
				                    </picker>
				                </view>
				            </view>
				        </view>
				</view>
				<input class="agency" type="text" value="" placeholder="请输入价格" placeholder-style="font-size:13px; " />
				<view class="jian" @click="expurgate(index)">-</view>
			</view>
			<view class="total">
				<view class="text">合计：</view><view class="money">￥130.00</view>
			</view>
			</view>
			<view class="remarks">费用备注</view>
			<view class="describe">
				<textarea  style="width:100%;height:80px" placeholder="请输入费用明细描述"placeholder-style="font-size:13px; margin-left:20rpx; margin-top:10rpx; color:#B4B4B4"></textarea>
			</view>
			<view class="remarks">相关图片</view>
			<view class="uploading">
				<image class="img" src="/static/cut/upload_photo.png" mode="widthFix"></image>
			</view>
			<view class="null"></view>
			<view class="order">
				<view class="order-person">选择接单收件人</view>
				<view class="site">
					<image src="/static/cut/bigcode.png" mode="widthFix"></image>
					<view>
						<view class="name">王勇</view>
						<view class="name-site">深圳市龙岗区龙翔大道智联大厦8508</view>
					</view>
					<view class="clear">x</view>
				</view>
				<image class="site-img" src="/static/cut/site.png" mode="widthFix"></image>
			</view>
			<button type="warn">确认发送</button>
		</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default {
		 data() {
		        const currentDate = this.getDate({
		            format: true
		        })
		        return {
		            title: 'picker',
		            array: [],
					defaultArray:["请选择"],
		            index: 0,
					moduleAmount:[], //组件数量
					isOK:false //判断是否选择了项目
		        }
		    },
		    computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		    methods: {
		        bindPickerChange: function(e) {
		            console.log('picker发送选择改变，携带值为', e.target.value)
		            this.index = e.target.value
					this.isOK = true
					console.log(this.index)
		        },
		        getDate(type) {
		            const date = new Date();
		            let year = date.getFullYear();
		            let month = date.getMonth() + 1;
		            let day = date.getDate();
		
		            if (type === 'start') {
		                year = year - 60;
		            } else if (type === 'end') {
		                year = year + 2;
		            }
		            month = month > 9 ? month : '0' + month;;
		            day = day > 9 ? day : '0' + day;
		            return `${year}-${month}-${day}`;
		        },
				add(){
					if(this.array.length == this.moduleAmount.length){
						return
					}else{
						this.moduleAmount.push(this.array)
						let copyArray = this.array
						console.log(this.moduleAmount)
						
						
					}
					//console.log(this.)
				},
				expurgate(index1) {
					console.log(index1)
					this.moduleAmount.splice(index1,1)
				}
		    },

			onLoad() {
				//费用查询名称
				usermodel.getCostName({}, data => {
					data = JSON.parse(JSON.stringify(data))
					this.array = this.defaultArray.concat(data)
					
					
				})
			}
	}
</script>

<style lang="scss">
.send-box{
	background: #E6E6E6;
	height: 100%;
	.send-type{
		height: 154rpx;
		background: #FFFFFF;
		.type{
			margin:20rpx 20rpx;
		}
		.bill-box{
			display: flex;
			.house{
				font-size: 24rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
				border: 1px solid #C8C8C8;
				padding: 6rpx 20rpx;
				border-radius: 10rpx;
			}
			.inance {
				border: 1px solid #C8C8C8;
				padding: 6rpx 20rpx;
				border-radius: 10rpx;
			}
		}
	}
	.cost-details {
		background: #FFFFFF;
		margin-top: 20rpx;
		overflow: hidden;
		.cost {
			margin-left: 20rpx;
			margin-top: 20rpx;
			width: 700rpx;
			height: 70rpx;
			border-bottom: 1px solid #E6E6E6;
		}
		.bill-name {
			margin-left: 20rpx;
			height: 64rpx;
			width: 640rpx;
			border: 1rpx solid #A0A0A0;
			margin-top: 40rpx;
			border-radius: 10rpx;
		}
		.agency-box{
			display: flex;
			.agency{
				margin-left: 20rpx;
				margin-top: 20rpx;
				border: 1px solid #A0A0A0;
				width: 310rpx;
				height: 64rpx;
				border-radius: 10rpx;
				padding-left: 20rpx;
				line-height: 64rpx;
			}
			.jia{
				width: 40rpx;
				height: 40rpx;
				background: #FF6600;
				border-radius: 50%;
				color: #FFFFFF;
				text-align: center;
				line-height: 40rpx;
				margin: 30rpx 0 0 20rpx;
			}
			.jian{
				width: 40rpx;
				height: 40rpx;
				background: #FFFFFF;
				border: 1px solid #FF6600;
				border-radius: 50%;
				color: #FF6600;
				text-align: center;
				margin: 30rpx 0 0 20rpx;
			}
		}
		.total{
			height: 84rpx;
			margin-top: 41rpx;
			display: flex;
			
			.text {
				margin-top: 20rpx;
				margin-left: 520rpx;
				color: #A0A0A0;
			}
			.money{
				margin-top: 20rpx;
				color: #FF6600;
				font-size: 30rpx;
				font-weight: 600;
			}
		}

	}
	.remarks {
		height: 60rpx;
		line-height: 60rpx;
		color: #787878;
		margin-left: 20rpx;
		font-size: 22rpx;
	}
	.describe{
		background: #FFFFFF;
	}
	.uploading{
		height: 280rpx;
		background: #FFFFFF;
		.img{
			width: 200rpx;
			height: 200rpx;
			margin: 30rpx 0 0rpx 20rpx;
		}
	}
	.null{
		height: 20rpx;
	}
	.order {
		height: 388rpx;
		background: #FFFFFF;
		overflow: hidden;
		.order-person {
			color: #3C3C3C;
			font-size: 26rpx;
			margin-left: 20rpx;
			margin-top: 30rpx;
			height: 70rpx;
			width: 700rpx;
			border-bottom: 1px solid #E6E6E6;
		}
		.site {
			display: flex;
			margin: 20rpx 0 0 20rpx;
			image {
				height: 80rpx;
				width: 80rpx;
				border:1px solid #E6E6E6;
				border-radius: 10rpx;
			}
			view {
				margin-left: 15rpx;
				width: 560rpx;
				.name {
					color: #3C3C3C;
					font-size: 30rpx;
					margin-top: 5rpx;
				}
				.name-site {
					color: #A0A0A0;
					font-size: 20rpx;
				}
			}
				.clear{
					height: 35rpx;
					width: 35rpx;
					border-radius: 50%;
					border: 1px solid #C0C0C0;
					text-align: center;
					line-height: 25rpx;
					color: #C0C0C0;
					margin-top: 20rpx;
				}
		}
		.site-img {
			height: 80rpx;
			width: 80rpx;
			margin: 30rpx 0 0 20rpx;
		}
	}
}

</style>
