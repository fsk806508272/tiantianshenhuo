<template>
	<view  class="all">
		<view :class="pop==true?'mask':''">
			<image class="head-image" :src="image"></image>
			<view class="nav">
				<image @tap="toBack" src="/static/cut/back_white.png"></image>
				<view class="title">抽奖</view>
			</view>
			<view class="list">
				<view class="award-record">
					<swiper circular="true" autoplay="true" vertical="true">
						<swiper-item v-for="(item,index) in list" :key="index">
							<text>恭喜{{item.phone}}抽中了"<text class="red">{{item.drawruleDetail}}</text>"</text>
						</swiper-item>
					</swiper>
				</view>
				
				
				<view :class="pop==true?'mask':''">
					<view class="award" :key="index" v-for="(award,index) in awards" :class="['award'+index,{'active':index==current}]">
						<view class="awardBox">
							<image :src="award.drawPic"></image>
							<view>{{award.detail}}</view>
						</view>
					</view>
					<view id="start-btn" :class="btmove?'btnmove':''" @click="start">
						<view class="remain">还剩{{times}}次</view>
					</view>
					
					<view @tap="showMyAward" class="my-award"></view>
				</view>
				
			</view>
			<view class="rules">
				<view class="title">抽奖规则</view>
				<view v-for="(item,index) in rules" :key="index" class="rulesBox">
					<view class="index">{{index + 1}}</view>
					<view class="content">{{item.content}}</view>
				</view>
			</view>
			
			<view v-if="draw.win == true&&pop == true&&myAward==false" class="draw">
				<view class="imageBox">
					<image :src="draw.drawPic"></image>
				</view>
				<view class="award">您获得了"{{award.detail}}"</view>
				<view class="attention">注意：实物奖品的发放地址为APP内的"默认地址"</view>
				<image v-if="draw.needExchange==true&&exchanged==false" @tap="toExchange" class="exchange" src="/static/cut/exchange.png"></image>
				<image v-if="draw.needExchange==true&&exchanged==true" class="exchange" src="/static/cut/exchanged.png"></image>
				<image v-if="draw.needExchange==true" @tap="closeWindow" class="back" src="/static/cut/draw-back.png"></image>
				<image v-if="draw.needExchange==false" @tap="closeWindow" class="ikonw" src="/static/cut/iknow-icon.png"></image>
			</view>
			<view v-if="draw.win == false&&pop == true&&myAward==false" class="no-draw">
				<image class="cry" src="/static/cut/cry.png"></image>
				<view>很遗憾，没有中奖下次再接再厉吧</view>
				<image @tap="pop=false" class="iknow" src="/static/cut/iknow-icon.png"></image>
			</view>
			
			<view v-if="pop==true&&myAward==true" class="award-list">
				<text class="timeTitle">时间</text>
				<text class="awardTitle">奖品</text>
				<text class="statusTitle">状态</text>
				<view class="my-award-list">
					<view v-for="(item,index) in myList" :key="index" class="item">
						<view class="time">{{item.date}}</view>
						<view class="prize">{{item.prize}}</view>
						<view v-if="item.status==1" class="status">已领取</view>
						<view v-if="item.status==2" class="status">领取</view>
						<view v-if="item.status==3" class="status">已兑换</view>
						<view v-if="item.status==4" class="red" @tap="exchangeItem(item)">兑换</view>
						<view v-if="item.status==5" class="status">已失效</view>
					</view>
				</view>
				<image v-if="myList.length==0" src="/static/cut/no-award-record.png" class="noRecord"></image>
				<text class="noRecordText" v-if="myList.length==0">暂无中奖记录</text>
				<view class="tips">温馨提示：奖品券的有效期为30日，实物发放地址为APP“默认地址”。</view>
				<image @tap="closeMyAward" class="button" src="/static/cut/iknow-button.png"></image>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image:'',
				current:null,
				awards:[],
				speed:200,
				diff:15,
				award:{},
				time:0,
				rules:[],
				list:[],
				draw:{
					win:false,
					needExchange:false
				},
				pop:false,
				myAward:false,
				exchanged:false,
				myList:[],
				
				times:'',
				token:'',
				btmove:false
			}
		},
		onLoad(options){
			if (window.android) {
				window.android.setBarColor('#cd58ff')
			}
			this.token = options.token
			this.getTimes()
			this.getList()
			this.getRules()
			this.getMyAward()
			this.getAllRecords()
		},
		methods: {
			toBack(){
				if (window.android) {
					window.android.finish()
				}else if(window.webkit){
					window.webkit.messageHandlers.getBack.postMessage(0)
				} else {
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			getTimes(){
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbDrawUserChance/getList',
					method:'GET',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						that.times = res.data.data
					}
				})
			},
			getList(){
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/drawrule/getList',
					method:'GET',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						that.awards = res.data.data
					}
				})
			},
			getRules(){
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbDrawActivityRule/getList',
					method:'GET',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						that.rules = res.data.data.ruleList
						that.image = res.data.data.headerImg
					}
				})
			},
			getMyAward(){
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/hitdraw/selectListByUser',
					method:'GET',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						that.myList = res.data.data
					}
				})
			},
			getAllRecords(){
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/hitdraw/selectList',
					method:'GET',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						that.list = res.data.data
					}
				})
			},
			start(){
				if(this.times==0){
					uni.showToast({
						title:'您当前抽奖次数为0',
						icon:'none',
						duration:1500
					})
					return
				}
				this.times -= 1
				
                // 开始抽奖
				this.btmove = true
				setTimeout(()=>{
					this.btmove = false
				},1000)
                this.drawAward()
				this.myAward = false
                this.time = Date.now()
                this.speed = 200
                this.diff = 15
            },
			drawAward(){
                // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/hitdraw/excuteLuckDraw',
					method:'POST',
					data:{
						userChanceId:'1235'
					},
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						that.draw = res.data.data
						// that.draw.win = true
						// that.draw.hitdrawId = 2
						// that.draw.exchange = true
						for(let i of that.awards){
							if(i.drawruleId==that.draw.hitdrawId){
								that.award = i
								break
							}
						}
					}
				})

                this.move()
            },
			move(){
				let that = this
                window.timeout = setTimeout( () => {
                    this.current++
                    if ( this.current > 7 ) {
                        this.current = 0
                    }
                    if ( this.award.drawruleId && ( Date.now() - this.time ) / 1000 > 2 ) {
                        this.speed += this.diff
                        if ( ( Date.now() - this.time ) / 1000 > 3 && this.award.drawruleId == this.awards[ this.current ].drawruleId ) {
                            clearTimeout( window.timeout )
                            setTimeout( () => {
                                that.pop = true
                            }, 0 )
                            return
                        }
                    } else {
                        this.speed -= this.diff
                    }

                    this.move()

                }, this.speed )
            },
			toExchange(){
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/hitdraw/updateExchange',
					method:'POST',
					data:{
						hitdrawId :2
					},
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						that.exchanged = true
					}
				})
			},
			showMyAward(){
				this.pop = true
				this.myAward = true
			},
			closeMyAward(){
				this.pop = false
				this.myAward = false
			},
			closeWindow(){
				this.pop = false
				this.exchanged = false
			},
			exchangeItem(item){
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/hitdraw/updateExchange',
					method:'POST',
					data:{
						hitdrawId :item.hitdrawId
					},
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token
					},
					success(res){
						item.status = 3
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.all{
	position: absolute;
	top:0;
	left: 0;
	width:750rpx;
	min-height: 3054rpx;
	overflow: scroll;
	background: url('~@/static/cut/lottery.png') no-repeat;
	background-size:750rpx 3054rpx;
}

.mask{
	position: absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background:rgba(0,0,0,.5);
}

.head-image{
	width:750rpx;
	height:270rpx;
	position: absolute;
	top:128rpx;
}

.nav{
	position:relative;
	height:88rpx;
	image{
		position: absolute;
		width:23rpx;
		height:34rpx;
		top:27rpx;
		left:20rpx;
	}
	.title{
		position: absolute;
		height:88rpx;
		line-height:88rpx;
		left:339rpx;
		font-size:36rpx;
		color:rgba(255,255,255,1);
	}
}

.list{
	position: absolute;
	width:680rpx;
	height:997rpx;
	background: url('~@/static/cut/prize.png') no-repeat;
	background-size:680rpx 997rpx;
	top:410rpx;
	left:35rpx;
	.award-record{
		width:630rpx;
		height:60rpx;
		position: absolute;
		top:25rpx;
		left:25rpx;
		swiper{
			width:100%;
			height:100%;
			swiper-item{
				text-align: center;
				line-height:60rpx;
				text{
					font-weight:600;
					color:rgba(255,255,255,1);
				}
				.red{
					color:#FF5858;
				}
			}
		}
	}
	
	.my-award{
		width:680rpx;
		height:110rpx;
		position: absolute;
		top:887rpx;
	}
	.award{
		width:180rpx;
		height:180rpx;
		position: absolute;
		background-color: #CE9FFF;
		border-radius: 20rpx;
		box-sizing: content-box;
		.awardBox{
			background-color: #fff;
			width:180rpx;
			height:165rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image{
				width:100rpx;
				height:90rpx;
			}
			view{
				color:#1E1E1E;
			}
		}
		&.award0{
			top:212rpx;
			left:55rpx;
		}
		&.award1{
			top:212rpx;
			left:250rpx;
		}
		&.award2{
			top:212rpx;
			left:445rpx;
		}
		&.award3{
			top:407rpx;
			left:445rpx;
		}
		&.award4{
			top:602rpx;
			left:445rpx;
		}
		&.award5{
			top:602rpx;
			left:250rpx;
		}
		&.award6{
			top:602rpx;
			left:55rpx;
		}
		&.award7{
			top:407rpx;
			left:55rpx;
		}
		&.active{
			border:6rpx solid #07F9FC;
		}
	}
	#start-btn{
		position:absolute;
		top:407rpx;
		left:250rpx;
		width:180rpx;
		height:180rpx;
		background: url('~@/static/cut/start-btn.png');
		background-size: 180rpx 180rpx;
		.remain{
			width:100%;
			position: absolute;
			top:124rpx;
			text-align: center;
			font-size:24rpx;
			color:rgba(30,30,30,1);
		}
		&.btnmove{
			animation: buttonmove .5s 1;
		}
	}	
	@keyframes buttonmove{
		0%{
			transform: scale(1)
		}
		50%{
			transform: scale(0.9)
		}
		100%{
			transform: scale(1)
		}
	}
}

.rules{
	position: absolute;
	top:1457rpx;
	width:100%;
	.title{
		width:100%;
		text-align: center;
		font-size:34rpx;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.rulesBox{
		display: flex;
		width:570rpx;
		margin:50rpx 90rpx;
		.index{
			margin-top: 5rpx;
			width:36rpx;
			height:36rpx;
			background:rgba(185,114,255,1);
			border-radius:50%;
			margin-right: 18rpx;
			text-align: center;
			line-height: 36rpx;
			font-weight:600;
			color:rgba(255,255,255,1);
		}
		.content{
			width:516rpx;
			font-size:28rpx;
			color:rgba(255,255,255,1);
		}
	}
}

.no-draw{
	width:634rpx;
	height:687rpx;
	position: fixed;
	top:259rpx;
	left:58rpx;
	background:url('~@/static/cut/no-draw.png');
	background-size: 634rpx 687rpx;
	z-index:99;
	.cry{
		width:147rpx;
		height:147rpx;
		position:absolute;
		top:245rpx;
		left:245rpx;
	}
	view{
		text-align: center;
		position:absolute;
		top:431rpx;
		left:197rpx;
		width:260rpx;
		height:75rpx;
		font-size:30rpx;
		color:rgba(255,255,255,1);
		text-shadow:0px 4rpx 0px rgba(97,17,178,0.6);
	}
	.iknow{
		width:300rpx;
		height:77rpx;
		position: absolute;
		top:570rpx;
		left:167rpx;
	}
}



.draw{
	width:634rpx;
	height:687rpx;
	position:fixed;
	top:259rpx;
	left:58rpx;
	background:url('~@/static/cut/draw.png');
	background-size: 634rpx 687rpx;
	z-index:99;
	.imageBox{
		width:143rpx;
		height:143rpx;
		background-color: #fff;
		border:4rpx solid rgba(109,3,215,1);
		border-radius:20rpx;
		position: absolute;
		top:206rpx;
		left:246rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width:90rpx;
			height:100rpx;
		}
	}
	.award{
		position: absolute;
		top:380rpx;
		width:100%;
		text-align: center;
		font-size:34rpx;
		color:rgba(255,255,255,1);
		text-shadow:0rpx 4rpx 0rpx rgba(97,17,178,0.6);
	}
	.attention{
		width:287rpx;
		height:59rpx;
		text-align: center;
		position: absolute;
		top:451rpx;
		left:174rpx;
		font-size:24rpx;
		color:rgba(210,210,210,1);
	}	
	.exchange{
		width:200rpx;
		height:77rpx;
		position: absolute;
		top:570rpx;
		left:327rpx;
	}
	.back{
		width:200rpx;
		height:77rpx;
		position: absolute;
		top:570rpx;
		left:107rpx;
	}
	.ikonw{
		width:300rpx;
		height:77rpx;
		position: absolute;
		top:570rpx;
		left:167rpx;
	}
}

.award-list{
	width:680rpx;
	height:825rpx;
	background: url('~@/static/cut/my-award.png');
	position: fixed;
	top:255rpx;
	left:35rpx;
	background-size: 680rpx 825rpx;
	.button{
		position: absolute;
		top:709rpx;
		left:160rpx;
		width:360rpx;
		height:76rpx;
	}
	.tips{
		position: absolute;
		top:557rpx;
		left:115rpx;
		width:450rpx;
	}
	text{
		font-size:28rpx;
		font-weight:600;
		color:rgba(30,30,30,1);
	}
	.timeTitle{
		position:absolute;
		left:86rpx;
		top:121rpx;
	}
	.awardTitle{
		position:absolute;
		top:121rpx;
		left:313rpx;
	}
	.statusTitle{
		position:absolute;
		top:121rpx;
		left:534rpx;
	}
	.noRecord{
		width:229rpx;
		height:163rpx;
		position:absolute;
		top:252rpx;
		left:224rpx;
	}
	.noRecordText{
		position:absolute;
		top:401rpx;
		left:258rpx;
	}
	.my-award-list{
		width:565rpx;
		height:300rpx;
		position: absolute;
		top:200rpx;
		left:58rpx;
		overflow:scroll ;
		font-size:28rpx;
		color:rgba(30,30,30,1);
		.item{
			display: flex;
			margin-bottom: 20rpx;
			.time{
				width:140rpx;
				margin-right:100rpx;
			}
			.prize{
				width:140rpx;
				margin-right: 80rpx;
			}
			.status{
				display: flex;
				align-items: center;
				justify-content: center;
				width:100rpx;
				height:36rpx;
				background:rgba(191,191,191,1);
				border-radius:18rpx;
				font-size:26rpx;
				color:rgba(255,255,255,1);
			}
			.red{
				display: flex;
				align-items: center;
				justify-content: center;
				width:100rpx;
				height:36rpx;
				background:rgba(255,74,73,1);
				border-radius:18rpx;
				font-size:26rpx;
				color:rgba(255,255,255,1);
			}
		}
	}
}


</style>


