import { HTTP } from '../http.js'


class IndexModel extends HTTP{


  getLatest(page,sCallback){
	    let result = {
			// distance:"distance",
			// order:"priceAsc",
			// latitude:114.258055,
			// longitude:22.727992,
			pageSize:10,
			userType:1,
			goodsFirsttype:8, //3
			// goodsSecondtype:"f2b3120e18eb44a99b55bba3814bad44",
			pageNo:page
		};
	                  
    this.request({
	  method:"POST",	
      url:'/app/goodss/getIndexList',
	  data:result,
      success:(data)=>{
          // // 如果不用箭头函数，this将指代不正确
          sCallback(data)
        }
    })
  }
  getSwiper(success){
	  let data={position:'index'}
  	  let params = {
  		method:"POST",
		data:data,
  		url:"/app/banner/getList", 
  		success:success
  	  }
    this.request(params)
  }

  getIcons(success){ 
	  let params = {
		method:"POST",
		url:"/app/firsttypeinfo/getList", 
		success:success
	  }
    this.request(params)
  }

  getNearby(success){ 
	  let params = {
		method:"POST",
		data: {type: 1},
		url:"/app/firsttypeinfo/getList", 
		success:success
	  }
    this.request(params)
  }

  getByNeedFirst(data,success){ 
	  let params = {
		method:"POST",
		data: data,
		url:"/app/secondtypeinfo/getListByNeedFirst", 
		success:success
	  }
    this.request(params)
  }
  
	getOther(success){
	  let params={
		  method:"POST",
		  url:"/app/otheradvert/getListNew?showPage=1",
		  success:success
	  }
	  this.request(params)
  }
  
	getIndexData(data,success){
		let params = {
			method:"POST",
			url:"/app/goodss/getIndexList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getDynamicData(data,success){
		let params = {
			method:"POST",
			url:"/app/tbUserDynamic/findUserDynamicList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	findAllSeller(data,success){
		let params = {
			method:"POST",
			url:'/app/seller/findSellerAll',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getReceiveAddress(success){
		let params = {
			method:"POST",
			url:'/app/receiveraddress/getByUserIdAddr',
			success:success
		}
		this.request(params)
	}
	
	getAdvertisement(data,success){
		let params = {
			method:'POST',
			url:'/app/banner/getAdvertisement',
			data:data,
			success:success
		}
		this.request(params)
	}
	
		getSearchComplete(data,success){
		let params = {
			method:"POST",
			url:'/app/goodss/searchCompletion',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getHomeRange(data,success){
		let params = {
			method:"POST",
			url:'/app/appuser/homeRange',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	searchAll(data,success){
		let params = {
			method:"POST",
			url:'/app/goodss/highlightHomeSearchAll',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getDrawRules(){
		let params = {
			method:"GET",
			url:'/app/tbDrawActivityRule/getList',
			success:success
		}
		this.request(params)
	}

}

export {IndexModel}