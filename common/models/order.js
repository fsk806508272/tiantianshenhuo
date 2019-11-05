import { HTTP } from '../http.js'

class OrderModel extends HTTP {
	
	getCartList(success){
		let params = {
			method:"POST",
			url:"/app/shCarts/findCartList",
			success:success
			}
		this.request(params)
	}
	
	deleteCart(data,success){
		let params = {
			method:"POST",
			url:"/app/shCarts/deleteGoodsToCartList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	changeNum(data,success){
		let params = {
			method:"POST",
			url:"/app/shCarts/alterGoodsNumToCartList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	
	settleMent(data,success){
		let params = {
			method:'POST',
			url:'/app/shCarts/total',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询进行中订单
	queryIngOrder(success){
		let params = {
			method:'POST',
			url:'/app/goodsOrder/getOrderListByMake',
			success:success
		}
		this.request(params)
	}
	
	//查询待付款订单
	queryUnpaidOrder(data,success){
		let params = {
			method:'POST',
			url:'/app/goodsOrder/getOrderListByWaitingPay',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	
	//查询待评价订单
	queryUnCommentedOrder(success){
		let params = {
			method:'POST',
			url:'/app/goodsOrder/getOrderListByComment',
			success:success
		}
		this.request(params)
	}
		
	//查询已完成订单
	queryFinishedOrder(success){
		let params = {
			method:'POST',
			url:'/app/goodsOrder/getOrderListByFulfil',
			success:success
		}
		this.request(params)
	}
	
	//查询售后订单
	queryBackOrder(success){
		let params = {
			method:'POST',
			url:'/app/goodsBackorder/userGetList',
			success:success
		}
		this.request(params)
	}
	
	
	//查询订单详情
	getOrderDetail(data,success){
		let params = {
			method:'POST',
			url:'/app/goodsOrder/getOrder',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//确认完成按钮
	confirmOrder(data,success){
		let params = {
			method:'POST',
			url:'/app/goodsOrder/needTakeOrder',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//添加商品评论
	commentOrder(data,success){
		let params = {
			method:'POST',
			url:'/app/goodComment/addList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//申请售后
	applyBack(data,success){
		
		let params = {
			method:'POST',
			url:'/app/goodsBackorder/add',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询商品评论
	queryGoodsComment(data,success){
		let params = {
			method:'POST',
			url:'/app/goodComment/getByGoodsId',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//取消待付款订单
	cancelUnpaidOrder(data,success){
		let params = {
			method:'POST',
			url:'/app/goodsOrder/needDelete',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {OrderModel}