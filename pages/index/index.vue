<template>
	<k-scroll-view>
	<view>
		<view class="top_fixed">
			<view class="head-box" @tap="toSelectFixed()">
				<image class="icon" src="/static/home/home-address.png" mode=""></image>
				<text class="title" :style="{'max-width':headtitle}">{{location}}</text>
				<image class="icon" src="/static/home/home-right.png" mode=""></image>
				<view class="top-search" v-show="searchshow" :style="{'opacity':searchcolor}" @click="clicksearch('')">
					<view style="display: flex;align-items: center;">
						<image class="lf" src="../../static/cut/ss.png" mode=""></image>
						<text>搜索标题</text>
					</view>
					<image class="rt" src="../../static/cut/yy.png" mode=""></image>
			
				</view>
			</view>
			<image src="/static/home/home-msg.png" @tap="toMessage()" mode=""></image>
		</view>
		<!-- 顶部导航 -->
		<view class="top">
			<view class="top-box">
				<view class="top-search" @click="clicksearch('')">
					<view style="display: flex;align-items: center;">
						<image class="lf" src="../../static/cut/ss.png" mode=""></image>
						<text>搜索标题</text>
					</view>
					<image class="rt" src="../../static/cut/yy.png" mode=""></image>
					<view @click="clicksearch('')" class="searchBtn">搜索</view>
				</view>
			</view>
		</view>
		<hrPullLoad
		  @refresh='refresh'
		  :height='-1'
		  :pullHeight='50'
		  :maxHeight='150'
		  :lowerThreshold='20'
		  :isAllowPull="true"
		  ref='hrPullLoad'
		>
		<!-- 轮播图 -->
		<view class="carousel-section">
			<swiper class="swiper" circular="true" autoplay="true" @change="changeSwiper">
				<swiper-item v-for="(item,index) in Swiperlist" :key="index">
					<image class="swiper-img" :src="item.coverImg" mode="" @tap="toLife(item,1)"></image>
				</swiper-item>

			</swiper>
			<!-- 轮播指示点样式修改 -->
			<view class="dots">
				<block v-for="(item,index) in Swiperlist.length" :key="item">
					<view class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
				</block>
			</view>
		</view>

		<view v-if="showDistance" class="distance-filter" :class="showDistance?'':'fadeOut'">
			<view class="distance-title">距离筛选</view>
			<view class="tags">
				<view class="tag" v-for="(item,index) in distanceList" :key="index" @tap="chooseTag(index)" :class="distanceIndex===index?'on':''">
					{{item}}
				</view>
			</view>
			<view @tap="confirmDistance" class="confirm-button">确定</view>
		</view>

		<!-- 分类 -->
		<view class="icons">
			<scroll-view @scrolltolower="scrolltolowerEvent" @scrolltoupper="scrolltoupperEvent" class="scroll_nav_box" scroll-x="true">
				<view>
					<view class="item" @click="Jump(item)" v-for="(item,index) in Iconslist" :key="index" v-if="index%2==0">
						<view>
							<image :src="item.coverImg" mode="widthFix"></image>
						</view>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view>
					<view class="item" @click="Jump(item)" v-for="(item,index) in Iconslist" :key="index" v-if="index%2==1">
						<view>
							<image :src="item.coverImg" mode="widthFix"></image>
						</view>
						<text>{{item.title}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="move">
				<image :src="showMove==0?showSrc[0]:showSrc[1]"></image>
				<image :src="showMove==0?showSrc[1]:showSrc[0]"></image>
			</view>
		</view>

		<view class="lifeCircle">
			<view class="title">
				<view class="lf">
					<view class="block"></view>
					<view class="word" >生活圈</view><!-- @tap="toLifecircles" -->
				</view>
				<image v-if="adShow==1" class="epid" :src="adImg" @tap.stop="toAdver()"></image>
				<view class="rt" @tap="toLifecircle">
					<view class="block">查看更多</view>
					<image src="/static/cut/right_orange.png"></image>
				</view>
			</view>
			<view class="content">
				<view class="user">
					<image @tap.stop="toDynamicUser" :src="DynamicData.logoImg"></image>
					<view class="info">
						<view class="nickName">{{DynamicData.nickname}}</view>
						<view class="time">{{DynamicData.createTime}}</view>
					</view>
				</view>
				<!-- <rich-text @tap="toDynamicDetail" :nodes="contentList" space="nbsp"></rich-text> -->
				<view @tap="toDynamicDetail" class="text" v-html="contentList"></view>
				<view @tap="toDynamicDetail" class="imageGroup" v-if="pictureList.length > 0">
					<image v-for="(item,index) in pictureList" :key="index" :src="item" mode=""></image>
				</view>
			</view>
		</view>


		<!-- 生活服务 -->
		<view class="life-box">
			<view class="title">
				<view class="mark"></view><text>生活服务</text>
			</view>
			<view class="life-cen">
				<view class="lf">
					<image @tap="toLife(Otherlisttwo[0],2)" :src="Otherlisttwo[0].coverImg" mode=""></image>
				</view>
				<view class="rt">
					<image :src="Otherlisttwo[1].coverImg" @tap="toLife(Otherlisttwo[1],2)" mode=""></image>
					<image :src="Otherlisttwo[2].coverImg" @tap="toLife(Otherlisttwo[2],2)" mode=""></image>
				</view>
			</view>
			<view class="life-bottom">
				<view class="item" v-for="(item,index) in Otherlistone" :key="index">
					<image :src="item.coverImg" mode="widthFix" @tap="toLife(item,2)"></image>
				</view>

			</view>
		</view>
		<!-- 其他服务 -->
		<view class="Other-box">
			<view class="title">
				<view class="mark"></view><text>其他服务</text>
			</view>
			<view class="item-img">
				<image v-for="(item,index) in Otherlistthree" :key="index" :src="item.coverImg" @tap="toLife(item,2)" mode=""></image>
			</view>
		</view>

		<view class="content">
			<view class="hits">
				<view class="hit-left">
					<view class="hit-border"></view>
					<view class="hit-title">热门推荐</view>
				</view>
				<view @tap="showDistance=!showDistance" class="hit-right">
					<view class="distance-title">距离筛选</view>
					<image src="https://sgz.ttshzg.com/mini_static/cut/triangle-down.png"></image>
				</view>
			</view>
			<view class="list">
				<!--  TA的提供-->
				<view class="list-lf" v-if="chenck">
					<view class="item" v-for="(item,index) in listlf" :key="index" @click="toGoods(item)">
						<image class="item-img" :src="item.smallPic" alt=""></image>
						<view class="main-left">
							<view class="main-title">
								<view class="tit ellipsis">{{item.goodsName}}</view>
								<!-- <text class="distance">{{item.distance|formatDistance}}</text> -->
							</view>
							<view class="main-tag">
								<view v-if="item.postFee==0" class="no-fee">免费配送</view>
								<view class="normal-tag" v-else>配送￥{{item.postFee}}</view>
								<view class="normal-tag">月售{{item.monthSale}}</view>
							</view>

							<view class="main-parameter">
								<view class="Rp">
									<text class="RenMinBi">￥</text>
									<text class="price">{{item.price}}</text>
								</view>
								<!-- <text class="volume">月销{{item.monthSale}}</text> -->
								<!-- <text class="volume">免费配送</text> -->
								<view class="distance">距离{{item.distance|formatDistance}}</view>
								<image class="smallCar-img" @tap.stop="addToCart(item)" src="/static/cut/car.png" mode=""></image>
							</view>
							<view class="shopSec">
								 <view class="shopName">{{item.sellerNickName}}</view>
								 <view class="goToShop">
									 <text class="text-shop">进店</text>
									 <image class="right-img" src="../../static/rightArrow.png" mode=""></image>
								 </view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<mpvue-city-picker :second="second" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		<uni-load-more :status="loadingType"></uni-load-more>
	 </hrPullLoad>
	</view>
</k-scroll-view>
</template>

<script>
	// 回到顶部的插件
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	// 下拉刷新
	import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue';
	import {
		ProvideModel
	} from '@/common/models/provide.js'
	const providemodel = new ProvideModel()
	import tool from "@/common/common.js"
	import bmap from '@/common/SDK/bmap-wx.js';
	import {
		IndexModel
	} from '@/common/models/index.js'
	let indexModel = new IndexModel()
	import {
		HouseModel
	} from '@/common/models/house.js'
	let housemodel = new HouseModel()
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import store from '@/store/index.js'
	import {
		mapState
	} from 'vuex'
	import {
		mapMutations
	} from "vuex"
	import getCurrentCityName from '@/common/mapH5.js'
	export default {
		filters: {
			formatDistance(value) {
				return (parseInt(value) / 1000).toFixed(1) + 'km'
			}
		},
		components: {
			mpvueCityPicker,
			uniLoadMore,
			hrPullLoad
		},
		data() {
			return {
				loadingType: "loading",
				city: '',
				isActive: false, // 滚动吸顶
				chenck: true, //tab切换
				//地址参数
				second: true,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: "#FF6600",
				pickerText: '北京',
				swiperCurrent: 0,
				listlf: [],
				listrt: [],
				pagelfunm: 1,
				pagertunm: 1,
				Iconslist: [],
				Swiperlist: [],
				Otherlistone: '',
				Otherlisttwo: [{
					coverImg: ""
				}, {
					coverImg: ""
				}, {
					coverImg: ""
				}],
				Otherlistthree: [],
				DynamicData: '',
				showMove: false,
				showSrc: ['https://sgz.ttshzg.com/mini_static/cut/show-on.png',
					'https://sgz.ttshzg.com/mini_static/cut/show-off.png'
				],
				adShow: false,
				adUrl: '',
				adImg: '',
				showDistance: false,
				distanceList: ['500m', '1km', '5km', '10km', '20km', '全部'],
				distanceIndex: null,
				dataParams: {
					latitude: '',
					longitude: '',
					pageNo: '',
					smallProgram: 1,
					pageSize: 10,
					goodsFirsttype: 8,
					homeRange: ''
				},
				homeRange: '',
				addressList:{
					province:'',
					city:'',
					district:''
				},
				contentList:'',
				pictureList:'',
				searchcolor:0,
				headtitle:'333rpx',
				searchshow:false,
				//fsk
				bottomTips:'',
				currentPage:1,
			}
		},
		computed: {
			...mapState(['hasLogin', 'lat', 'lon', 'uerInfo', 'location'])
		},
		onLoad() {
			this.getCurrentCity()
			let that = this
			uni.request({
				data: {
					type: 1,
					isMeOrAll: 2
				},
				url: 'https://sgz.ttshzg.com/app/tbUserDynamic/findUserDynamicList',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				success: (res) => {
					this.DynamicData = res.data.data.userDynamicList[0]
					this.contentList = this.DynamicData.dynamicContent.replace(/[\r\n\↵]/g,"<br/>")
					if(this.DynamicData.pictureList.length > 3){
						this.pictureList = this.DynamicData.pictureList.slice(0,3)
					}else{
						this.pictureList = this.DynamicData.pictureList
					}
				}
			})
			/*****************************************/
			 this.getExampleData(1);
		},
		onShow() {
			this.hrPullLoad = 1
			this.getprovide(this.pagelfunm)
		},
		onReady() {
			this.loadData()
		},
		onPageScroll(res){
			if (res.scrollTop > 0) {
				this.searchcolor = res.scrollTop / 50
				this.headtitle = '150rpx'
				this.searchshow = true
			} else if (res.scrollTop == 0) {
				this.searchcolor = 0
				this.headtitle = '333rpx'
				this.searchshow = false
			}
			this.isActive = res.scrollTop > 970 ? true : false
		},
		methods: {
			
			/************************************************/
			...mapMutations(['getLat', 'getLon', 'setLocation']),
			scrolltolowerEvent() {
				this.showMove = true
			},
			scrolltoupperEvent() {
				this.showMove = false
			},
			addToCart(item) {
				providemodel.addCart({
					goodsItemId: item.defaultItemId,
					num: 1
				}, (data) => {
					uni.showToast({
						title: "添加购物车成功",
						duration: 1500,
						icon: 'none'
					})
				})
			},
			toAdver() {
				uni.navigateTo({
					url: '/pages/index/webNavigation?src=' + this.adUrl
				})
			},
			chooseTag(index) {
				this.distanceIndex = index
			},
			confirmDistance() {
				this.showDistance = false
				let homeRange = ''
				if (this.distanceIndex === null) {
					return
				} else if (this.distanceIndex === 0) {
					this.homeRange = 500
				} else if (this.distanceIndex === 1) {
					this.homeRange = 1000
				} else if (this.distanceIndex === 2) {
					this.homeRange = 5000
				} else if (this.distanceIndex === 3) {
					this.homeRange = 10000
				} else if (this.distanceIndex === 4) {
					this.homeRange = 20000
				} else if (this.distanceIndex === 5) {
					this.homeRange = ''
				}
				this.pagelfunm = 1
				this.getDistanceData(this.homeRange)
			},
			getDistanceData(homeRange) {
				indexModel.getIndexData({
					latitude: this.lat,
					longitude: this.lon,
					pageNo: this.pagelfunm,
					smallProgram: 1,
					pageSize: 10,
					goodsFirsttype: 8,
					homeRange: homeRange
				}, data => {
					if (data.length == 0) {
						this.loadingType = 'nomore'
						return
					} else if (this.pagelfunm == 1) {
						this.loadingType = 'loading'
						this.listlf = data
					} else {
						this.listlf = this.listlf.concat(data)
					}
				})
			},
			getCurrentCity() {
				getCurrentCityName.init().then(BMap => {
					const geolocation = new BMap.Geolocation()
					const gc = new BMap.Geocoder();
					let that = this
					geolocation.getCurrentPosition(position => {
						var pt = position.point;
						// console.log(pt);
						gc.getLocation(pt, res => {
							console.log(res);
							that.addressList.province = res.addressComponents.province
							that.addressList.city = res.addressComponents.city
							that.addressList.district = res.addressComponents.district
							if(res.surroundingPois.length > 0){
								that.setLocation(res.surroundingPois[0].title)
							}else{
								that.setLocation(res.address)
							}
							that.getLat(res.point.lat)
							that.getLon(res.point.lng)
						})
					})
				})
			},
			toSelectFixed() {
				uni.navigateTo({
					url: '/pages/index/fixed/select_fixed?data=' + JSON.stringify(this.addressList)
				})
			},
			toDynamicUser() {
				let token = ''
				if (this.hasLogin) {
					token = this.uerInfo.token
				}
				let type = 1
				if (this.DynamicData.userId == this.uerInfo.appuserId) {
					type = 0
				}
				uni.navigateTo({

					//status为0表示进入个人主页的入口是app首页
					url: `/pages/lifecircle/personalIndex?type=${type}&token=${token}&item=${JSON.stringify(this.DynamicData)}&status=0`
				})
			},
			toDynamicDetail() {
				let token = ''
				if (this.hasLogin) {
					token = this.uerInfo.token
				}
				uni.navigateTo({
					url: `/pages/lifecircle/detail?token=${token}&id=${this.DynamicData.id}&status=0`
				})
			},
			toMessage() {
				uni.navigateTo({
					url: '/pages/msg/msg'
				})
			},
			toUserInfo() {
				// #ifdef H5
				uni.navigateTo({
					url: "/pages/login/login"
				})
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url: "/pages/login/getUserinfo"
				})
				// #endif
			},
			loadData() {
				indexModel.getIcons((data) => { //分类导航
					this.Iconslist = data;
					// for(let i=0;i<data.length;i++){
					// 	if(i==0 || i==1 || i==3 || i==5 || i==6){

					// 	}else{
					// 		this.Iconslist.push(data[i])
					// 	}
					// }
				})
				indexModel.getSwiper((data) => { // 首页轮播图
					this.Swiperlist = data
					// for(let i=0;i<data.length;i++){
					// 	if(i==0 || i==3 || i==11){
					// 		this.Swiperlist.push(data[i])
					// 	}
					// }
				})
				indexModel.getOther((data) => {
					this.Otherlistone = data[0].advertList
					this.Otherlisttwo = data[1].advertList
					this.Otherlistthree = data[2].advertList
					// for(let i=0;i<data[2].advertList.length;i++){
					// 	if(i==0 || i==3){
					// 		this.Otherlistthree.push(data[2].advertList[i])
					// 	}
					// }
				})

				// indexModel.getAdvertisement({}, data => {//疫情动态
				// 	console.log('res------',data);
				// 	this.adImg = data.coverImg
				// 	this.adUrl = data.skipId
				// 	if (data.status == 1) {
				// 		this.adShow = true
				// 	}
				// })
			},
			toLifecircle() {
				let token = ''
				if (this.hasLogin) {
					token = this.uerInfo.token
				}
				uni.navigateTo({
					url: '/pages/lifecircle/lifecircle?token=' + token
				})
			},
			// toLifecircles() {
			// 	let token = ''
			// 	if (this.hasLogin) {
			// 		token = this.uerInfo.token
			// 	}
			// 	uni.navigateTo({
			// 		url: '/pages/information/information?token=' + token +'&pushContentId='+'1'
			// 	})
			// },
			Jump(item) {

				if (item.firsttypeinfoId == 8) {
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 8
					})
				} else if (item.firsttypeinfoId == 3) {
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 3
					})
				} else if (item.firsttypeinfoId == 9) {
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 9
					})
				} else if (item.firsttypeinfoId == 10) {
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 10
					})
				} else if (item.firsttypeinfoId == 1) {
					uni.navigateTo({
						url: '/pages/house/house'
					})
				} else if (item.firsttypeinfoId == 5) {
					uni.navigateTo({
						url: '/pages/finance/finance'
					})
				} else if (item.firsttypeinfoId == 4) {
					uni.navigateTo({
						url: '/pages/VIPCard/VIPCard'
					})
				} else if (item.firsttypeinfoId == 2) {
					if (!this.hasLogin) {
						// #ifdef H5
						uni.navigateTo({
							url: "/pages/login/login"
						})
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url: "/pages/login/getUserinfo"
						})
						// #endif
					} else {
						uni.navigateTo({
							url: '/pages/user/attendance/attendance'
						})
					}
				} else if (item.firsttypeinfoId == 6) {
					uni.navigateTo({
						url: '/pages/user/collection/collection'
					})
				} else if (item.firsttypeinfoId == 7) {
					uni.navigateTo({
						url: '/pages/wallet/coupon'
					})
				} else if (item.firsttypeinfoId == 11) {
					uni.navigateTo({
						url: '/pages/index/feedback'
					})
				} else if (item.firsttypeinfoId == 12) {
					uni.navigateTo({
						url: '/pages/index/webNavigation?src=' + item.skipUrl
					})
				}

			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			clicksearch(type) {
				uni.navigateTo({
					url: `/pages/HM-search/HM-search?type=${type}`
				});
			},
			getprovide(pagelfunm) {
				console.log(this.lat, this.lon)
				indexModel.getIndexData({
					latitude: this.lat,
					longitude: this.lon,
					pageNo: this.pagelfunm,
					pageSize: 10,
					goodsFirsttype: 8
				}, data => {
					if (data.length == 0) {
						this.loadingType = 'nomore'
						return
					} else if (this.pagelfunm == 1) {
						this.listlf = data
					} else {
						this.listlf = this.listlf.concat(data)
					}
				})
			},
			//商品跳转
			toGoods(item) {
				if (this.showDistance == true) {
					return this.showDistance = false
				}
				uni.navigateTo({
					url: '/pages/provide/detail?id=' + item.id + '&type=' + 8 + '&sellerId=' + item.sellerId
				});
			},
			toLife(item, num) {
				if (num == 1) {
					providemodel.getBannerHits({
						bannerId: item.bannerId
					}, data => {})
				} else if (num == 2) {
					providemodel.getOtherAdvertHits({
						stripadvertId: item.stripadvertId
					}, data => {})
				}
				if (this.showDistance == true) {
					return this.showDistance = false
				}
				if (item.skipType == 1) {
					if (item.firstTypeId != 5 && item.firstTypeId != 1) {
						uni.navigateTo({
							url: `/pages/shop/theStore?sellerId=${item.skipId}&type=${item.firstTypeId}`
						})
					} else if (item.firstTypeId == 5) {
						uni.navigateTo({
							url: `/pages/shop/theStore?sellerId=${item.skipId}&type=5`
						})
					} else if (item.firstTypeId == 1) {
						uni.navigateTo({
							url: `/pages/shop/storeindex?sellerId=${item.sellerId}&type=1`
						})
					}

				} else if (item.skipType == 2) {
					if (item.firstTypeId != 5 && item.firstTypeId != 1) {
						uni.navigateTo({
							url: `/pages/provide/detail?sellerId=${item.sellerId}&id=${item.skipId}&type=${item.firstTypeId}`
						})
					} else if (item.firstTypeId == 5) {
						uni.navigateTo({
							url: '/pages/finance/financedetail?financeId=' + item.skipId + '&code=' + item.financeCode + '&sellerId=' +
								item.sellerId
						})
					} else if (item.firstTypeId == 1) {
						uni.navigateTo({
							url: '/pages/house/housedetail?data=' + item.shipId
						})
					}
				} else {
					window.location.href = item.skipUrl
				}
			},
			onCancel(e) {
				console.log(e)
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				let city = e.label.split("-")
				this.pickerText = city[1]
				console.log(e)
			},
			provide: function(e) {
				this.chenck = !this.chenck
			},
			provided: function(e) {
				this.chenck = !this.chenck
			},
			onHide: function() {

			},
			/****************fangshukai***************/
			getExampleData(type){
			/* type 1代表下拉刷新 2代表加载更多 */
			    setTimeout(()=>{
			     /* 接口获取到的数据 */
			    //  let res = this.getprovide(this.pagelfunm)
				// console.log(this.pagelfunm)
				uni.request({
					data: {
						type: 1,
						isMeOrAll: 2
					},
					url: 'https://sgz.ttshzg.com/app/tbUserDynamic/findUserDynamicList',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						this.DynamicData = res.data.data.userDynamicList[0]
						this.contentList = this.DynamicData.dynamicContent.replace(/[\r\n\↵]/g,"<br/>")
						if(this.DynamicData.pictureList.length > 3){
							this.pictureList = this.DynamicData.pictureList.slice(0,3)
						}else{
							this.pictureList = this.DynamicData.pictureList
						}
					}
				})
			        let data = [1,2,3];
			        /* 拿到数据后的处理 */
			        if(data.length>0){
			            if(type==1){
			                this.exampleInfo = data;
			            }
			            else if(type==2){
			                this.exampleInfo = this.exampleInfo.concat(data);
			            }
			            /* 这里的20是每次调用后台接口返回的最大数据条数，可以自定义 */
			            if(this.exampleInfo.length<20){
			                this.bottomTips = "nomore";
			            }
			            else{
			                this.bottomTips = "more";
			            }
			        }
			        else{
			            if(type==1){
			                this.exampleInfo = [];
			            }
			            else if(type==2){
			                this.currentPage--;
			            }
			            this.bottomTips = "nomore";
			        }
			        /* 这里300毫秒的延时，主要是为了优化视觉效果 */
			        setTimeout(()=>{
			            this.$refs.hrPullLoad.reSet();
			        },300);
			    },500);
			},
			//自定义上拉加载更多
			loadMore(){
			    this.currentPage++;
			    this.bottomTips = "loading";
			    this.getExampleData(2);
			},
			//自定义下拉刷新
			refresh(){
			    this.currentPage = 1;
			    this.getExampleData(1);
			},
		},

		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom: tool.debounce(function() {
			if (this.homeRange == '') {
				this.pagelfunm++
				this.getprovide()
			} else {
				this.pagelfunm++
				this.getDistanceData(this.homeRange)
			}
		}),
		onBackPress() { //监听页面返回
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() { //监听页面卸载
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	}
</script>

<style lang="scss">
	//ctrl+alt+/ 即可生成正确注释 条件编译是利用注释实现的，在不同语法里注释写法不一样，js使用 // 注释、css 使用 /* 注释 */、vue/nvue 模板里使用 <!-- 注释 -->；
	page {
		background: #f2f2f2;
	}

	.content {
		.hits {
			margin: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			border-radius: 30rpx;

			.hit-left {
				display: flex;
				align-items: center;
              
				.hit-border {
					margin-right: 12rpx;
					width: 12rpx;
					height: 30rpx;
					background: #FF6600;
					border-radius: 6rpx 7rpx 6rpx 6rpx;
				}

				.hit-title {
					font-size: 34rpx;
					color: #1E1E1E;
					font-weight: 700;
				}
			}

			.hit-right {
				display: flex;
				align-items: center;

				.distance-title {
					margin-right: 10rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: rgba(255, 102, 0, 1);
				}

				image {
					width: 18rpx;
					height: 12rpx;
				}
			}
		}
	}

	.lifeCircle {
		border-radius: 30rpx;
		width: 750rpx;
		background-color: #fff;

		.title {
			height: 90rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;

			.lf {
				display: flex;
				align-items: center;

				.block {
					width: 8rpx;
					height: 30rpx;
					background: rgba(255, 102, 0, 1);
				}

				.word {
					color: #1E1E1E;
					font-weight: 700;
					font-size: 34rpx;
					margin-left: 10rpx;
				}
			}

			.epid {
				width: 241rpx;
				height: 55rpx;
			}

			.rt {
				display: flex;
				align-items: center;

				.block {
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: rgba(255, 102, 0, 1);
				}

				image {
					margin-left: 10rpx;
					width: 12rpx;
					height: 22rpx;
				}
			}
		}

		.content {
			width: 100%;
			padding: 0 20rpx 20rpx 20rpx;

			.user {
				height: 74rpx;
				display: flex;

				.info {
					margin-left: 10rpx;

					.nickName {
						font-size: 30rpx;
						color: rgba(30, 30, 30, 1);
					}

					.time {
						font-size: 20prx;
						color: rgba(160, 160, 160, 1);
					}
				}

				image {
					width: 74rpx;
					height: 74rpx;
					border-radius: 50%;
				}
			}
		}


		.text {
			white-space: pre-wrap;
			margin-top: 20rpx;
		}

		.imageGroup {
			margin-top: 20rpx;
			display: flex;

			image {
				margin-right: 20rpx;
				width: 225rpx;
				height: 225rpx;
				border-radius: 10rpx;
			}
			image:last-child {
				margin-right: 0;
			}
		}
	}

	.getuser_box {
		position: fixed;
		left: 0;
		bottom: 0;
		/* #ifdef H5 */
		bottom: 50px;
		/* #endif */
		width: 100%;
		background: rgba(0, 0, 0, .5);
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		font-size: 26rpx;
		box-sizing: border-box;
		z-index: 50;

		button {
			display: inline-block;
			color: #fff;
			background: #FF9801;
			font-size: 26rpx;
			padding: 10rpx 15rpx;
			box-sizing: border-box;
			line-height: 1.2;
		}
	}

	.top_fixed {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background:linear-gradient(180deg,rgba(255,145,48,1),rgba(255,102,0,1));
		height: 88rpx;
		z-index: 1000;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	

		image {
			width: 30rpx;
			height: 36rpx;
		}

		.head-box {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.title {
				color: #FFFFFF;
				font-size: 30rpx;
				font-weight: 500;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.icon {
				&:nth-child(1){
					width: 26rpx;
					height: 31rpx;
					margin-right: 10rpx;
				}
				&:nth-child(3){
					width: 10rpx;
					height: 18rpx;
					margin-left: 10rpx;
				}
			}
			.top-search {
				margin-left: 10rpx;
				border-radius: 33rpx;
				width: 455rpx;
				height: 66rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
			
				.lf {
					width: 27rpx;
					height: 30rpx;
				}
			
				.rt {
					width: 27rpx;
					height: 36rpx;
				}
			
				text {
					font-size: 28rpx;
					color: #787878;
					padding-left: 17rpx;
				}
			}
		}
	}
//这里
	.top {
		width: 100%;
		height: 86rpx;
		background-color: #FF6600;
		
		.top-box{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			padding: 10rpx 20rpx 10rpx 20rpx;
			box-sizing: border-box;
			border-radius: 50rpx 50rpx 0 0;
			background-color: #fff;
			
			.top-search {
				border-radius: 33rpx;
				width: 710rpx;
				height: 66rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #F0F0F0;
				padding-left: 20rpx;
			
				.lf {
					width: 27rpx;
					height: 30rpx;
				}
			
				.rt {
					width: 27rpx;
					height: 36rpx;
					margin-left: 350rpx;
				}
			
				text {
					font-size: 28rpx;
					color: #787878;
					padding-left: 17rpx;
				}
				.searchBtn{
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, #FF9230, #FF6600);
					border-radius: 30px;
					text-align: center;
					line-height: 60rpx;
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
	}

	// height: 232rpx;
	.carousel-section {
		padding-top: 20rpx;
		background-color: #fff;
		width: 100%;
		height: 250rpx;
		position: relative;

		swiper {
			border-radius: 30rpx;
			width: 100%;
			height: 230rpx;
			position: relative;
			padding: 0 20rpx;

			swiper-item {
				border-radius: 30rpx;

				.swiper-img {
					border-radius: 30rpx;
					width: 100%;
					height: 230rpx;
				}
			}
		}

		.dots {
			position: absolute;
			bottom: 20rpx;
			left: 50%;
			// 这里一定要注意兼容不然很可能踩坑          
			transform: translate(-50%, 0);
			-webkit-transform: translate(-50%, 0);
			z-index: 99;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.dot {
				width: 8rpx;
				height: 8rpx;
				transition: all .6s;
				background: rgba(0, 0, 0, .3);
				margin-right: 10rpx;
			}

			.active {
				width: 8rpx;
				height: 8rpx;
				background: rgba(255, 255, 255, .8);
			}
		}
	}

	.icons {
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 0 0 30rpx 30rpx;
		padding-bottom: 4rpx;

		.scroll_nav_box {
			width: 100%;
			display: flex;
			box-sizing: border-box;
			white-space: nowrap;

			.item {
				margin: 0 24rpx;
				text-align: center;
				display: inline-block;

				image {
					width: 100rpx;
					height: 100rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 500;
					color: #3C3C3C;
				}
			}
		}

		.move {
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 30rpx;
				margin-right: 10rpx;
				height: 6rpx;
			}
			image:last-child{
				margin-right: 0;
			}
		}

	}

	.life-box {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 0 20rpx;
		padding-bottom: 30rpx;
		border-radius: 30rpx;
		height: 620rpx;
		padding: 0 20rpx;

		.life-cen {
			display: flex;
			justify-content: space-between;

			.lf {
				image {
					width: 444rpx;
					height: 290rpx;
					border-radius: 8rpx;
				}
			}

			.rt {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				image {
					width: 249rpx;
					height: 140rpx;
					border-radius: 8rpx;
				}
			}
		}

		.life-bottom {
			display: flex;
			justify-content: space-between;
			margin: 10rpx 0 30rpx 0;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 170rpx;
				height: 200rpx;
				background: rgba(247, 247, 247, 1);
				border-radius: 8px;

				image {
					width: 170rpx;
					height: 200rpx;
				}
			}
		}
	}

	.Other-box {
		background-color: #fff;
		border-radius: 30rpx;
		margin: 20rpx 0;
		padding: 0 20rpx;
		padding-bottom: 30rpx;

		.item-img {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			image {
				width: 350rpx;
				height: 200rpx;
				border-radius: 8rpx;
				margin-top: 10rpx;
			}
		}
	}
	
	.life-box,.Other-box{
		.title {
			display: flex;
			align-items: center;
			height: 90rpx;
		
			.mark {
				width: 8rpx;
				height: 32rpx;
				background-color: #FF6600;
				margin-right: 10rpx;
			}
		
			text {
				font-size: 34rpx;
				font-weight: 700;
				color: rgba(30, 30, 30, 1);
			}
		}
	}
	
	.tabs {
		display: flex;
		justify-content: space-around;
		height: 80rpx;
		background-color: #FFFFFF;

		&.activeClass {
			position: fixed;
			top: 44px;
			left: 0;
			right: 0;
			z-index: 1000;
		}

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color: #646464;

			text {
				font-size: 30rpx;
				font-weight: 400;
				padding: 25rpx 0 26rpx 0;

				&.checkclass {
					color: rgba(255, 102, 0, 1);
				}
			}

			view {
				width: 80rpx;
				height: 6rpx;
				border-radius: 3px;
				margin-top: -20rpx;

				&.checkclassbg {
					background: rgba(255, 102, 0, 1);
				}
			}

		}
	}

	.list {
		background: rgba(246, 246, 246, 1);

		.list-lf {
			margin: 5rpx 0;

			.item {
				border-radius: 30rpx;
				height: 250rpx;
				padding: 20rpx 20rpx;
				display: flex;
				margin: 10rpx 0;
				background: #FFFFFF;

				.item-img {
					width: 228rpx;
					height: 210rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
					background: #FAFAFA;
					border-radius: 14rpx;
				}

				.main-left {
					width: 520rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.main-title {
						display: flex;
						justify-content: space-between;
                     
						.tit {
							font-size: 30rpx;
							max-height: 80rpx;
							overflow: hidden;
							font-weight: 400;
							line-height: 40rpx;
							max-width: 478rpx;
							flex: 1;
						}

						.distance {
							font-size: 22rpx;
							color: rgba(120, 120, 120, 1);
                            line-height: 36rpx;
						}
					}

					.main-tag {
						margin-top: 10rpx;
						display: flex;

						view {
							margin-right: 10rpx;
						}

						.no-fee {
							padding: 0rpx 5rpx;
							font-size: 22rpx;
							color: #FF6600;
							background: rgba(255, 255, 255, 1);
							border: 1px solid rgba(255, 102, 0, 1);
							border-radius: 6rpx;
						}

						.normal-tag {
							padding: 0rpx 5rpx;
							font-size: 21rpx;
							color: #8C8C8C;
							height: 30rpx;
							background: #FFFFFF;
							border: 1px solid #A0A0A0;
							border-radius: 6rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 30rpx;
						}
					}

					.main-parameter {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
                        height:62rpx;
						line-height: 62rpx;
						.fh {
							color: #FF6600;
							font-size: 34rpx;
							color: rgba(160, 160, 160, 1);
						}
							
						.Rp{
							.RenMinBi{
								font-size: 26rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FF4E00;
								line-height: 36rpx;
							}
							.price {
								font-size: 36rpx;
								color: #FF6600;
							}
						}
						.distance{
							
							font-size: 26rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #8C8C8C;
							
						}
						.smallCar-img{
							width: 62rpx;
							height: 62rpx;
						}
                       

						.volume {
							font-size: 24rpx;
							color: rgba(180, 180, 180, 1);
						}

						image {
							width: 56rpx;
							height: 56rpx;
						}
					}
					.shopSec{
						display: flex;
						.shopName{
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #A0A0A0;
							line-height: 40rpx;
						}
						.goToShop{
							.text-shop{
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FF6600;
								line-height: 40rpx;
								margin-left: 13rpx;
							}
							.right-img{
								width: 10rpx;
								height: 19rpx;
								margin-left: 9rpx;
							}
						}
					}
				}
			}
		}

		.list-rt {
			margin: 10rpx 0;

			.item {
				height: 436rpx;
				padding: 40rpx 20rpx 30rpx;
				margin: 10rpx 0;
				background-color: #fff;

				.upper-part {
					display: flex;

					image {
						width: 88rpx;
						height: 88rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}

					.main-left {
						width: 590rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.main-title {
							display: flex;
							justify-content: space-between;

							.tit {
								font-size: 34rpx;
								font-weight: 500;
								color: rgba(60, 60, 60, 1);

								text {
									color: #FFCF27;
									margin-left: 10rpx;
								}
							}

							.distance {
								font-size: 24rpx;
								color: rgba(120, 120, 120, 1);
							}
						}

						.main-parameter {
							.score {
								font-weight: 400;
								color: $theme-text-color;

								text {
									margin-right: 10rpx;
								}
							}

							.serviceunm {
								margin-left: 20rpx;
								font-size: 24rpx;
								color: rgba(120, 120, 120, 1);
								font-weight: 400;

							}
						}
					}

				}

				.central-section {
					height: 157rpx;
					background: rgba(250, 250, 250, 1);
					margin: 30rpx 0;

					.it {
						padding: 10rpx 0 10rpx 10rpx;

						.iconfont {
							color: #FFAF7A;
							margin-right: 30rpx;
						}
					}
				}

				.lower-part {
					justify-content: space-between;
					align-items: center;
					display: flex;

					text {
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(160, 160, 160, 1);
					}

					.buts {
						display: flex;

						view {
							width: 160rpx;
							height: 60rpx;
						}

						.theme-button {
							margin-left: 28rpx;
						}
					}

				}
			}
		}

	}

	.distance-filter {
		z-index: 99;
		position: fixed;
		top: 170rpx;
		padding-bottom: 40rpx;
		background-color: #fff;
		-webkit-animation: fadenum 0.5s ease;
		-moz-animation: fadenum 0.5s ease;
		animation: fadenum 0.5s ease;

		.distance-title {
			color: #646464;
			display: inline-block;
			margin-top: 20rpx;
			margin-left: 10rpx;
		}

		.tags {
			display: flex;
			flex-wrap: wrap;

			.tag {
				margin: 20rpx;
				width: 145rpx;
				height: 58rpx;
				background: rgba(240, 240, 240, 1);
				border-radius: 29rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				&.on {
					background: rgba(255, 241, 232, 1);
					border: 1rpx solid rgba(255, 102, 0, 1);
					color: #FF6600;
				}
			}
		}

		.confirm-button {
			margin-top: 50rpx;
			margin-left: 20rpx;
			width: 710rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(255, 145, 48, 1), rgba(255, 102, 0, 1));
			border-radius: 35rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 30rpx;
		}
	}
</style>
