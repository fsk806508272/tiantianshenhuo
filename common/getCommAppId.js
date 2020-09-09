/**
 * 微信绑定：  需要获取app的id
 * @param {*} params 
 */
 export const getCommAppid = () => {
     let webview = openInWebview();
     if(webview == 'android') {
         //调用安卓得到id ,安卓可直接return 得到值
         let toKens = window.adwebkit.WebJs_getid();
         setCommAppid(toKens); //保存id
         
     }else if(webview == 'ios') {
         //setStore(TOKEN_KEY, id); //保存id
         window.webkit.messageHandlers.WebJs_getid.postMessage({});
     }

    // window.getAppid = this.getAppid; //ios需要回调在vue的mounted中
 }