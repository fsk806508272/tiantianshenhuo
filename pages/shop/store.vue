<template>
	<view>
		<bavigationbar></bavigationbar>
		<view class="storeInfo">
			<image src="/static/cut/alipay.png"></image>
			<view class="rt">
				<view class="title">
					<view class="titlecontent">
						<view>海底捞火锅店</view>
						<image src="/static/cut/company_cer.png"></image>
					</view>
					<image src="/static/cut/no_collect.png"></image>
				</view>
				<view class="score">
					<image src="/static/cut/star_off.png"></image>
					<text class="gray">店铺总评分</text>
				</view>
				<view class="address">
					<image src="/static/cut/grayloca.png"></image>
					<text class="gray">深圳市龙岗区龙翔大道9002号志联佳大厦508</text>
				</view>
			</view>
		</view>
		
		<view :style="'height:'+height+'px'" class="storeDetail">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop" scroll-with-animation>
				<view class="nav-left-item" v-for="(item,index) in list" @click="categoryClickMain(index)" :key="index" :class="index==categoryActive?'active':''">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation :scroll-into-view="itemScrollId">
				<view v-for="(foods,index) in list" :key="index" class="box">
					<view>{{foods.name}}</view>
					<view  class="nav-right-item" v-for="(item,i) in foods.goodsList" :key="i" @click="cart(item.name)">
						<image :src="item.smallPic"></image>
						<view class="detail">
							<view class="title">{{item.goodsName}}</view>
							<view class="price">{{item.price}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import {LikeModel} from '@/common/models/like.js'
	import {StoreModel} from '@/common/models/store.js'
	const Likemodel = new LikeModel()
	const storemodel = new StoreModel()
	export default{
		components:{
			bavigationbar
		},
		data(){
			return{
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollLeftTop: 0,
				list:'',
				arr:[0,584,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017],
				leftItemHeight: 51,
				navLeftHeight:0,
				diff: 0,
				tabBarHeight:0,
				itemScrollId:''
			}
		},
		
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight
			storemodel.getShopGoods({sellerId:'84a44f0e04c24ae08ff49bfe14a074c0'},(data)=>{
				this.list = []
				for(let i of data){
					if(i.goodsList.length!=0){
						this.list.push(i)
					}
				}
			})
		},
		onReady() {
				
		},
		methods: {
			categoryClickMain(index){
				this.categoryActive = index
				this.itemScrollId = index.toString()
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.storeInfo{
		margin-top: 20rpx;
		display: flex;
		background-color: #fff;
		padding:30rpx 20rpx;
		image{
			width:120rpx;
			height:120rpx;
		}
		.rt{
			width:570rpx;
			margin-left: 20rpx;
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.titlecontent{
					display: flex;
					align-items: center;
					image{
						width:24rpx;
						height:24rpx;
					}
					view{
						font-size:34rpx;
						color:rgba(60,60,60,1);
					}
				}
				image{
					width:41rpx;
					height:34rpx;
				}
			}
			.score{
				display: flex;
				align-items: center;
				image{
					width:25rpx;
					height:23rpx;
					margin-right: 10rpx;
				}
			}
			.address{
				display: flex;
				align-items: center;
				image{
					width:21rpx;
					height:25rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	
	.storeDetail{
		display: flex;
		background-color: #fff;
		.nav-left{
			width:180rpx;
			background-color: #FAFAFA;
		}
		.nav-left-item{
			height:104rpx;
			border-right: solid 1rpx #f1f1f1;
			border-bottom: solid 1rpx #f1f1f1;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.nav-left-item:last-child{
			border-bottom: none;
		}
		
		.nav-right{
			width:570rpx;
		}
		.box{
			display: block;
			overflow: hidden;
			border-bottom: 20rpx solid #f3f3f3;
			.nav-right-item{
				width:520rpx;
				height:160rpx;
				margin-bottom: 20rpx;
				display: flex;
				image{
					width:160rpx;
					height:160rpx;
					margin-left: 20rpx;
				}
				.detail{
					width:300rpx;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title{
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-wrap: break-word;
						word-break: break-all;
					}
				}
			}
		}
	}
	
	.active {
		color: #FF80AB;
		background: #fff;
		border-right: 0;
	}
	
</style>
