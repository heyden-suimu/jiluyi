import Vue from 'vue'

var getPrams = function (url) {
	if(url.indexOf("?") == -1){return}
	var pram = url.split("?")[1];
	pram = pram.split("&");
	var prams = {},pra=[];
	for (var i = 0; i < pram.length; i++) {
		 pra = pram[i].split("=");
		 prams[pra[0]] = pra[1];
	}
	return prams;
}
//弹窗方法，首先得传vnode
const layer = (vnode,msg, type='error')=>{
	vnode.$message({
		type:type,
		message:msg
	})
}
// 时间转换

const DateFormat = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}

const onVue = new Vue();
// 退出
let exit = (vm)=>{
    let login = sessionStorage.login && JSON.parse(sessionStorage.login);
    if(!sessionStorage.login || (sessionStorage.login && !login.login)){
        layer(vm,"先请登录", "warning");
        sessionStorage.clear();
        vm.$router.push("/login");
    } 
}

//判断中断
const check = function(arr, vm){

    return arr.some((item,index)=>{
       return _a(item.bol, item.msg)
    })

    function _a(bol,msg){
      if(bol){
        layer(vm, msg)
        return true
      }
    }

}

const checkPro = function(path, vm, bol=false){
    let login = JSON.parse(sessionStorage.login)
    let notAdmin = login.level<2;

    if (path === 'admin') {
        login[path] = true;
    }

    if(!login[path] || (bol&&notAdmin)){
        vm.$router.push({path:'notPro'})
    }
}

export {getPrams, layer, onVue, DateFormat, exit, check, checkPro}