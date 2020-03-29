<template>
	<view class="all">
		<view class="nav">
			<image src="/static/cut/back_white.png"></image>
			<view class="title">抽奖</view>
		</view>
		<view class="list">
			<view class="award" :key="index" v-for="(award,index) in awards" :class="['award'+index,{'active':index==current}]">
				<view>{{award.name}}</view>
			</view>
			<view id="start-btn" @click="start"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:null,
				awards:[
					{name:'一等奖',id:1},
					{name:'一等奖',id:2},
					{name:'一等奖',id:3},
					{name:'一等奖',id:4},
					{name:'一等奖',id:5},
					{name:'一等奖',id:6},
					{name:'一等奖',id:7},
					{name:'一等奖',id:8},
				],
				speed:200,
				diff:15,
				award:{},
				time:0
			}
		},
		methods: {
			start(){
                // 开始抽奖
                this.drawAward();

                this.time = Date.now();
                this.speed = 200;
                this.diff = 15;
            },
			drawAward(){
                // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
                setTimeout( () => {
                    this.award = {name:'一等奖',id:8}
                }, 1000 );

                this.move();
            },
			move(){
                window.timeout = setTimeout( () => {
                    this.current++;
                    if ( this.current > 7 ) {
                        this.current = 0;
                    }
                    if ( this.award.id && ( Date.now() - this.time ) / 1000 > 2 ) {
                        this.speed += this.diff;
                        if ( ( Date.now() - this.time ) / 1000 > 4 && this.award.id == this.awards[ this.current ].id ) {
                            clearTimeout( window.timeout );
                            setTimeout( () => {
                                uni.showToast({
                                	title:'恭喜你抽中了',
									icon:none,
									duration:1500
                                })
                            }, 0 );
                            return;
                        }
                    } else {
                        this.speed -= this.diff;
                    }

                    console.log( this.speed );
                    this.move();

                }, this.speed );
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
	height:2287rpx;
	background: url('~@/static/cut/lottery.png') no-repeat;
	background-size:750rpx 2287rpx;
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
	.award{
		width:180rpx;
		height:180rpx;
		position: absolute;
		background-color: #CE9FFF;
		border-radius: 20rpx;
		box-sizing: content-box;
		view{
			background-color: #fff;
			width:180rpx;
			height:165rpx;
			border-radius: 20rpx;
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
	}	
}
</style>


