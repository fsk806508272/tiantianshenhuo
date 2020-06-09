<template>
	<view class="">
		<view class="header">
			<image src="../../../static/cut/home-left.png" mode="" @tap="back"></image>
			<text>选择定位地址</text>
			<text @tap="back">确定</text>
		</view>
		<view class="fix_top_box">
			<view class="top-Location" @tap="showMulLinkageThreePicker">
				<text>{{pickerText}}</text>
				<image class="drop-down" src="/static/cut/drop-down.png" mode=""></image>
			</view>
			<view class="top-search">
				<view>
					<image class="lf" src="/static/cut/ss.png" mode=""></image>
					<input type="text" style="color: #1e1e1e;" value="" placeholder="请输入您的定位地址" />
				</view>
				<image class="rt" src="/static/cut/yy.png" mode=""></image>
			</view>
		</view>
		<view class="map-box">
			<view id="allmap"></view>
			<image class="img01" src="../../../static/cut/location-icon-01.png" mode=""></image>
			<view class="bottom">
				<image class="img02" src="../../../static/cut/location-icon-02.png" mode=""></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="address_scroll_box">
			<view class="scroll_list">
				<view class="scroll_item_box">
					<view @tap="chooseRecieveAddress(mine)" class="scroll_item" v-for="(mine,idx) in my_address" :key="idx">
						<view class="si_title">{{mine.receiverAddress}}</view>
						<view class="si_info">{{mine.receiverName}}<text>{{mine.receiverPhone}}</text></view>
					</view>
				</view>
			</view>
		</scroll-view>

		<mpvue-city-picker :second="second" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {mapMutations} from 'vuex'
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import getCurrentCityName from '@/common/mapH5.js'
	import {IndexModel} from '@/common/models/index.js'
	const indexmodel = new IndexModel()
	export default {
		data() {
			return {
				//地址参数
				second: false,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: "#FF6600",
				pickerText: '',
				my_address: [],
				pos: ''
			}
		},
		onLoad(options) {
			this.bindMap()
			this.addressList = JSON.parse(options.data)
			console.log(this.addressList);
			this.pickerText = this.addressList.district
		},
		computed: {
			...mapState(['lat', 'lon', 'location'])
		},
		components: {
			mpvueCityPicker
		},
		methods: {
			...mapMutations(['getLat', 'getLon', 'setLocation']),
			// 展示地图
			bindMap() {
				let that = this
				getCurrentCityName.init().then(BMap => {
					// 实例化地图
					var map = new BMap.Map("allmap")
					var point = new BMap.Point(that.lon, that.lat)
					// 初始化地图
					map.centerAndZoom(point, 17)
					// 返回用户当前的位置，会首先调用浏览器自带的定位接口，
					// 如果失败或不支持则调用高精IP定位（需要开通权限，否则调用普通定位）接口，
					// 如果用户拒绝授权定位，则无法返回任何定位结果。
					var geolocation = new BMap.Geolocation()
					geolocation.getCurrentPosition(r => {
						var mk = new BMap.Marker(r.point)
						map.panTo(r.point)
						// 监听开始缩放事件
						map.addEventListener('zoomstart', function(res) {
							mk.setPosition(map.getCenter())
						})
						// 监听结束缩放事件
						map.addEventListener('zoomend', function(res) {
							that.pos = mk.getPosition()
							console.log(that.pos)
							// 创建地址解析对象
							var geoc = new BMap.Geocoder()
							geoc.getLocation(that.pos, function(rs) {
								console.log(rs);
								var addComp = rs.addressComponents
								// alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " +
								// 	addComp.streetNumber)
							})
						})
						// 监听地址移动事件
						map.addEventListener('ondragging', function() {
							mk.setPosition(map.getCenter())
						})
						// 地图停止移动后获取mk经纬度
						map.addEventListener('moveend', function() {
							that.pos = mk.getPosition()
							console.log(that.pos)
							// 创建地址解析对象
							var geoc = new BMap.Geocoder()
							geoc.getLocation(that.pos, function(rs) {
								console.log(rs);
								var addComp = rs.addressComponents
								// alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " +
								// 	addComp.streetNumber)
							})
						})
					}, {
						enableHighAccuracy: true
					})
				})
			},
			// 返回首页
			back() {
				uni.reLaunch({
					url: '../index'
				})
			},

			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(data) {
				console.log(data);
				console.log(data.label.split('-'));
			},
			chooseRecieveAddress(value) {
				let req = {}
				req.address = value.receiverCity + value.receiverDistrict + value.receiverAddress
				req.city = value.receiverCity
				req.ak = 'HxzxzR81OgNB9Z1izacsQMeq4A9Ii0ck'
				req.output = 'json'
				this.setLocation(value.receiverAddress)
				let that = this
				this.$jsonp('http://api.map.baidu.com/geocoding/v3/', req).then(json => {
					const {
						result: res
					} = json
					that.getLat(res.location.lat)
					that.getLon(res.location.lng)
					that.getNearbyList()
				})
			}
		}
	}
</script>

<style lang="scss">
	.BMap_scaleCtrl {
		left: 0 !important;
	}

	.map-box {
		width: 100%;
		height: 500rpx;
		position: relative;

		#allmap {
			width: 100%;
			height: 100%;
		}

		.img01 {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);
			width: 113rpx;
			height: 114rpx;
		}

		.bottom {
			position: absolute;
			right: 20rpx;
			bottom: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100rpx;
			background-color: #fff;
			border-radius: 50%;

			.img02 {
				width: 62rpx;
				height: 62rpx;
			}
		}
	}

	.header {
		width: 100%;
		height: 44px;
		display: flex;
		align-items: center;
		position: relative;

		image {
			position: absolute;
			left: 10px;
			width: 10.5px;
			height: 18px;
		}

		text {
			&:nth-child(2) {
				position: absolute;
				left: 50%;
				color: #1E1E1E;
				font-size: 18px;
				font-weight: 400;
				transform: translateX(-50%);
				-webkit-transform: translateX(-50%);
			}

			&:nth-child(3) {
				position: absolute;
				right: 10px;
				font-size: 14px;
				color: #FF6600;
			}
		}
	}

	.fix_top_box {
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.top-Location {
			max-width: 160rpx;
			color: #646464;
			display: flex;
			align-items: center;
			font-size: 26rpx;

			text {
				max-width: 120rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.drop-down {
				width: 14rpx;
				height: 8rpx;
				margin: 0 36rpx 0 18rpx;
			}
		}

		.top-search {
			flex: 1;
			// height: 64rpx;
			padding: 15rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #F6F6F6;
			border-radius: 30rpx;

			view {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				input {
					color: #B4B4B4;
					font-size: 26rpx;
				}
			}

			.lf {
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}

			.rt {
				width: 20rpx;
				height: 30rpx;
			}
		}
	}

	.now_fixed {
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		background: #fff;
		justify-content: space-between;
		align-items: center;
		border-top: 1rpx solid #DCDCDC;

		.nf_left {
			color: #A0A0A0;
			font-size: 26rpx;

			text {
				color: #3C3C3C;
				font-size: 28rpx;
			}
		}

		.nf_right {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
	}

	.address_scroll_box {
		height: 75vh;
	}

	.scroll_list {
		.scroll_item_box {
			padding: 0 20rpx;
			background: #fff;
			box-sizing: border-box;
		}

		.scroll_title {
			color: #A0A0A0;
			font-size: 24rpx;
			padding: 20rpx;
			background: #F2F2F2;
			box-sizing: border-box;
		}

		.scroll_item {
			padding: 20rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #EBEBEB;

			&:last-of-type {
				border-bottom: 0;
			}

			.si_title {
				color: #3C3C3C;
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}

			.si_info {
				color: #A0A0A0;
				font-size: 22rpx;

				text {
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
