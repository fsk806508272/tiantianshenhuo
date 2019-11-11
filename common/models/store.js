import { HTTP } from '../http.js'

class StoreModel extends HTTP {
	
	getSellerInfo(data,success){
		let params = {
			method:"POST",
			url:'/app/seller/findSellerOneDetailed',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getShopGoods(data,success){
		let params = {
			method:"POST",
			url:'/app/sellerGroup/getUserSellerIdGoodsBySellerId',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	// 商家查看店铺信息
	
	getSellerStore(data,success){
		let params = {
			method:"POST",
			url:'/app/seller/findOne',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {StoreModel}