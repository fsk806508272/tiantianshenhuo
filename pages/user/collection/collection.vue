<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in collectionType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<view v-if="tabbarIndex == 0" class="provideList">
			<block v-if="provideList.length==0">
				<image class="noCollect" src="/static/cut/nocollect.png"></image>
				<view class="noCollectContent">暂无收藏记录，快去逛逛吧~</view>
			</block>
			
			<block v-if="provideList.length!=0">
				<block v-for="(row,index) in provideList" :key="index">
					<view class="item" @tap="toDetail(row)">
						<image class="img" :src="row.smallPic"></image>
						<view class="detail">
							<view class="title">{{row.goodsName}}</view>
							<view class="price">
								<view class="price_lf">
									<view class="top">
										<view class="noFee" v-if="row.postFee==0">免费配送</view>
										<view class="tag" v-else>配送￥{{row.postFee}}</view>
										<view class="tag">月售{{row.monthSale}}</view>
									</view>
									<view class="bottom">
										￥{{row.price}}
									</view>
								</view>
								<image class="like" @tap.stop="delCollectGoods(row)" src="/static/cut/collected.png"></image>
							</view>
						</view>
					</view>
				</block>
				<uni-load-more :status="loadingType"></uni-load-more>
			</block>
			
		</view>
		
		<view v-if="tabbarIndex == 1" class="storeList">
			<block v-if="storeList.length==0">
				<image class="noCollect" src="/static/cut/nocollect.png"></image>
				<view class="noCollectContent">暂无收藏记录，快去逛逛吧~</view>
			</block>
			<block v-if="storeList.length!=0">
				<block v-for="(item,index) in storeList" :key="index">
					<view class="row" @tap="toStore(item)">
						<image class="img" :src="item.logoPic"></image>
						<view class="storeInfo">
							<view class="title">
								<view>{{item.nickName}}</view>
								<image @tap.stop="delCollectShop(item.sellerId)" src="/static/cut/collected.png"></image>
							</view>
							<view class="address">
								<view class="points">
									<image src="/static/cut/comment-star.png"></image>
									 {{item.mainScore}}
								</view>
								<view class="sale">总售{{item.monthlySale}}</view>
							</view>
							<view class="stars">
								<view class="tag">
									商品{{item.goodsCount}}
								</view>
								<view class="toShop">
									<view>进店</view>
									<image src="/static/cut/right_orange.png"></image>
								</view>
							</view>
							
						</view>
						
					</view>
				</block>
				<uni-load-more :status="loadingType"></uni-load-more>
			</block>
			
		</view>
		
		<view v-if="tabbarIndex == 2" class="vipcardList provideList">
			<block v-if="vipcardList.length==0">
				<image class="noCollect" src="/static/cut/nocollect.png"></image>
				<view class="noCollectContent">暂无收藏记录，快去逛逛吧~</view>
			</block>
			<block v-if="vipcardList.length!=0">
				<block v-for="(row,index) in vipcardList" :key="index">
					<view class="item" @tap="toVipDetail(row)">
						<image class="img" :src="row.firstPictures"></image>
						<view class="detail">
							<view class="title">{{row.title}}</view>
							<view class="price">
								<view class="price_lf">
									<view class="top">
										<view class="tag">办理人数{{row.totalSale}}</view>
									</view>
									<view class="bottom">
										<block v-if="row.cardType==1">
											<text>免费办理</text>
										</block>
										<block v-else>
											￥<text>{{row.price}}</text>
										</block>
									</view>
								</view>
								<image @tap.stop="delCollectCard(row.cardId)" src="/static/cut/collected.png"></image>
							</view>
						</view>
					</view>
				</block>
				<uni-load-more :status="loadingType"></uni-load-more>
			</block>
		</view>
		
		
	</view>
</template>

<script>
	import {LikeModel} from '@/common/models/like.js'
	let Likemodel=new LikeModel()
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
export default{
	components:{
		uniLoadMore
	},
	data(){
		return{
			page:1,
			loadingType:"",
			tabbarIndex:0,
			headerPosition:"fixed",
			headerTop:"0px",
			collectionType:['提供','店铺','会员卡'],
			provideList:[],
			needList:[],
			storeList:[],
			vipcardList: [],
			starIndex:[0,1,2,3,4],
			starSrc:'/static/cut/star_on.png',
		}
	},
	onLoad:function(option){
		this.getCollectgood(this.page)
		this.getCollectshop(this.page)
		this.getCollectcard(this.page)
		//兼容H5下排序栏位置
		// #ifdef H5
			//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);//清除定时器
				}
			},1);
		// #endif
	},
	onShow(){
		
	},
	onReady (){
		
	},
	onReachBottom (){
		this.page++
		this.getCollectgood(this.page)
	},
	methods:{
		getCollectgood(page){
			Likemodel.getCollectgood(page,(data)=>{
				console.log(data)
				this.provideList=this.provideList.concat(data)
				console.log(this.provideList);
			})
		},
		getCollectshop(page){
			Likemodel.getCollectshop(page,(data)=>{
				this.storeList=this.storeList.concat(data)
				console.log(this.storeList);
			})
		},
		getCollectcard(page){
			Likemodel.getCollectcard(page,(data)=>{
				this.vipcardList=this.vipcardList.concat(data)
				console.log(this.vipcardList);
			})
		},
		delCollectGoods(item){
			Likemodel.like(item.goodsId,item.goodsFirsttype,false,(datas)=>{
				Likemodel.getCollectgood(1,(data)=>{
					this.provideList=data
				})
			})
		},
		delCollectShop(sellerId){
			Likemodel.likeShop(sellerId,false,(datas)=>{
				Likemodel.getCollectshop(1,(data)=>{
					this.storeList=data
				})
			})
		},
		delCollectCard(cardId){
			Likemodel.deleteCard(cardId,(datas)=>{
				Likemodel.getCollectcard(1,(data)=>{
					this.vipcardList=data
				})
			})
		},
		showType(tbIndex){
			this.tabbarIndex = tbIndex;
		},
				toDetail(item){
			if(item.isMarketable==0){
				uni.showToast({
					icon:'none',
					duration:1500,
					title:'该商品已下架'
				})
				return 
			}
			
			
			if(item.goodsFirsttype!=5&&item.goodsFirsttype!=1){
				uni.navigateTo({
					url:`/pages/provide/detail?sellerId=${item.sellerId}&id=${item.goodsId}&type=${item.goodsFirsttype}`
				})
			}else if(item.goodsFirsttype==1){
				uni.navigateTo({
					url:'/pages/house/housedetail?data='+item.houseId
				})
			}else if(item.goodsFirsttype==5){
				uni.navigateTo({
					url:'/pages/finance/financedetail?financeId=' + item.goodsId + '&code=' + item.financeCode + '&sellerId=' + item.sellerId
				})
			}
		},
		toStore(row){
			uni.navigateTo({
				url:`/pages/shop/theStore?sellerId=${row.sellerId}&type=${row.firstTypeId}`
			})
		},	
		toVipDetail(row){
			uni.navigateTo({
				url:'/pages/VIPCard/vipdetail?id=' + row.cardId + '&sellerId=' + row.sellerId
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.topTabBar{
	border-radius: 0 0 30rpx 30rpx;
	margin-top:1rpx;
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:78rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	.grid{
		width:20%;
		height:78rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			color:#1E1E1E;
			height:40rpx;
			display: flex;
			align-items: center;
			&.on{
				color: #FF6600;
				border-bottom: solid 4rpx #FF6600;
			}
		}
	}
}

.provideList{
	margin-top:88rpx;
	.item{
		border-radius: 30rpx;
		background-color: #fff;
		margin-top:10rpx;
		height:190rpx;
		width:100%;
		padding:20rpx;
		display: flex;
		.img{
			width:150rpx;
			height:150rpx;
			border-radius: 10rpx;
		}
		.detail{
			width:540rpx;
			margin-left: 20rpx;
			.title{
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				font-size:30rpx;
				color:rgba(30,30,30,1);
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.price{
				display: flex;
				align-items: center;
				justify-content: space-between;
				image{
					width:41rpx;
					height:34rpx;
				}
				.price_lf{
					.top{
						margin-top: 20rpx;
						display: flex;
						.noFee{
							margin-right: 10rpx;
							font-size:22rpx;
							color:rgba(255,102,0,1);
							height:30rpx;
							border:1rpx solid rgba(255,102,0,1);
							border-radius:6rpx;
							padding:0 5rpx;
							line-height: 30rpx;
						}
						.tag{
							margin-right: 10rpx;
							font-size:22rpx;
							color:#8C8C8C;
							height:30rpx;
							border:1rpx solid #A0A0A0;
							border-radius:6rpx;
							padding:0 5rpx;
							line-height: 30rpx;
						}
					}
					.bottom{
						margin-top: 20rpx;
						font-size:36rpx;
						color:rgba(255,78,0,1);
						line-height:36rpx;
					}
				}
			}
		}
	}
}

.needList{
	margin-top:88rpx;
	.container{
		background-color: #fff;
		height:436rpx;
		margin-top:10rpx;
		.top{
			height:158rpx;
			display: flex;
			.icon{
				width:108rpx;
				padding-top: 40rpx;
				padding-left: 20rpx;
				image{
					width:88rpx;
					height:88rpx;
					border-radius:10rpx;
				}
			}
			.info{
				width:500rpx;
				padding-left: 21rpx;
				padding-top: 46rpx;
				.firstContainer{
					display: flex;
					align-items: center;
					image{
						width:24rpx;
						height:23rpx;
					}
					view{
						font-size:34rpx;
						font-family:Source Han Sans CN;
						font-weight:500;
						color:rgba(60,60,60,1);
					}
				}
				.secondContainer{
					display: flex;
					align-items: center;
					image{
						width:25rpx;
						height:23rpx;
					}
					view{
						margin-left: 10rpx;
					}
				}
			}
			.like{
				width:142rpx;
				padding-top:50rpx;
				padding-left:50rpx;
				image{
					width:41rpx;
					height:34rpx;
				}
			}
		}
		.middle{
			height:157rpx;
			background-color: #FAFAFA;
			margin:0 20rpx;
			padding-top: 22rpx;
			padding-left: 21rpx;
			.text{
				margin-left:23rpx;
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.needfor{
				display: flex;
				align-items: center;
				image{
					width:24rpx;
					height:24rpx;
				}
			}
			.serviceTime{
				display: flex;
				align-items: center;
				image{
					width:24rpx;
					height:24rpx;
				}
				
			}
			.location{
				display: flex;
				align-items: center;
				image{
					width:21rpx;
					height:25rpx;
				}

			}
		}
		.bottom{
			height:121rpx;
			display: flex;
			align-items: center;
			.release{
				margin-left: 19rpx;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				color:rgba(160,160,160,1);
			}
			.whiteButton{
				margin-left: 100rpx;
			}
			.yellowButton{
				margin-left: 19rpx;
			}
			
		}
	}
}

.storeList{
	margin-top: 88rpx;
	.row{
		margin-top:10rpx;
		display: flex;
		height:190rpx;
		background-color: #fff;
		padding:20rpx;
		.img{
			width:150rpx;
			height:150rpx;
			border-radius: 10rpx;
		}
		.storeInfo{
			width:540rpx;
			margin-left: 20rpx;
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				image{
					width:41rpx;
					height:34rpx;
				}
				view{
					font-size:32rpx;
					font-weight:600;
					color:rgba(30,30,30,1);
					line-height:32rpx;
				}
			}
			.address{
				margin-top: 30rpx;
				display: flex;
				align-items: center;
				.points{
					margin-right: 20rpx;
					font-size:26rpx;
					font-weight:600;
					color:rgba(255,198,0,1);
					image{
						margin-right: 5rpx;
						width:25rpx;
						height:25rpx;
					}
				}
				.sale{
					font-size:24rpx;
					color:rgba(80,80,80,1);
				}
			}
			.stars{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.tag{
					padding:0 5rpx;
					border:1rpx solid rgba(255,102,0,1);
					border-radius:6rpx;
					height:30rpx;
					line-height:30rpx;
					font-size:22rpx;
					color:rgba(255,102,0,1);
				}
				.toShop{
					display: flex;
					align-items: center;
					image{
						margin-left: 10rpx;
						width:10rpx;
						height:19rpx;
					}
					view{
						color:#FF6600;
					}
				}
			}
		}
	}
}

.title.col2{
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;
}

.noCollect{
	width:402rpx;
	height:389rpx;
	margin-top: 202rpx;
	margin-left: 174rpx;
}
.noCollectContent{
	margin-left: 200rpx;
	margin-top: 40rpx;
}
</style>
