import conf from './conf.js'
import Vue from 'vue'

const vue = new Vue();

export default {
	post: (res,data,success,fail,showload) => {
		if(showload) vue.$emit("loading", null);
		return fetch(conf.apiUrl+res,
			{
				credentials:"include",
	            method: 'POST',
	            body:JSON.stringify(data),
        	}
		).then(res => {
        	if(res.ok) {
        		res.json().then(result => success(result));
        	} else {
        		res.json().then(result => {
        			if(fail)  
        				fail(result);
        			else 
        				vue.$emit("showToast", "网络错误:"+result.error); 
        		});
        	}
        	vue.$emit("loaded", null);
		}).catch(err => {
			vue.$emit("showToast", "网络错误"); 
			vue.$emit("loaded", null);
		});
	},
	put: (res,data,success,fail) => {
		return fetch(conf.apiUrl+res,
			{
				credentials:"include",
	            method: 'PUT',
	            body:JSON.stringify(data),
        	}
		).then(res => {
        	if(res.ok) {
        		res.json().then(result => success(result));
        	} else {
        		res.json().then(result => {
        			if(fail)  
        				fail(result);
        			else 
        				vue.$emit("showToast", "网络错误:"+result.error); 
        		});
        	}
		}).catch(err => {
			vue.$emit("showToast", "网络错误:"); 
		});
	},
	patch: (res,data,success,fail) => {
		const form = new FormData;
		for(let k in data) {
			form.append(k,data[k])
		}
		return fetch(conf.apiUrl+res,
			{
				credentials:"include",
	            method: 'PATCH',
	            body:form,
        	}
		).then(res => {
        	if(res.ok) {
        		res.json().then(result => success(result));
        	} else {
        		res.json().then(result => {
        			if(fail)
        				fail(result);
        			else 
        				vue.$emit("showToast", "网络错误:"+result.error);
        		});
        	}
		}).catch(err => {
			vue.$emit("showToast", "网络错误:"); 
		});
	},
	get: function(res,success,fail,showload) {
		if(showload) {
			vue.$emit("loading", null);
		}
		return fetch(conf.apiUrl+res,
			{
				credentials:"include",
	            method: "GET",
        	}
		).then(res => {
        	if(res.ok) {
        		res.json().then(result => success(result));
        	} else {
        		res.json().then(result => {
        			if(fail)
        				fail(result);
        			else 
        				vue.$emit("showToast", "网络错误:"+result.error);
        		});
        	}
        	vue.$emit("loaded", null);
		}).catch(err => {
			vue.$emit("showToast", "网络错误:"); 
			vue.$emit("loaded", null);
		});
	},
	delete: function(res,success,fail) {
		return fetch(conf.apiUrl+res,
			{
				credentials:"include",
	            method: "DELETE",
        	}
		).then(res => {
        	if(res.ok) {
        		success();
        	} else {
        		res.json().then(result => {
        			if(fail) {
        				fail(result);
        			}
        			else {
        				vue.$emit("showToast", "网络错误:"+result.error);
        			}
        		});
        	}
		}).catch(err => {
			vue.$emit("showToast", "网络错误:"); 
		});
	},
	test: function(res,success,fail) {
		return fetch(conf.server+"/"+res,
			{
				credentials:"include",
	            method: "GET",
        	}
		).then(res => {
        	if(res.ok) {
        		res.json().then(result => success(result));
        	} else {
        		res.json().then(result => {
        			if(fail)
        				fail(result);
        			else 
        				vue.$emit("showToast", "网络错误:"+result.error);
        		});
        	}
		}).catch(err => {
			vue.$emit("showToast", "网络错误:"); 
		});
	},
	moneyArabiaToChinese: function(num) { 
		let Num = "";   //阿拉伯数字转中文大写格式
		var isNegative = false;// 是否负数
		if (num < 0) {
			Num = -num;
			isNegative = true;
		}
		if (typeof num == 'number') {
			Num = num.toString();
		}
		for (var i = Num.length - 1; i >= 0; i--) {
			Num = Num.replace(",", "");// 替换money中的“,”
			Num = Num.replace(" ", "");// 替换money中的空格
			}
			Num = Num.replace("￥", "");// 替换掉可能出现的￥字符
		if (isNaN(num)) { // 验证输入的字符是否为数字
			return;
		}
		// ---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
		let part = String(Num).split(".");
		let newchar = "";
		// 小数点前进行转化
		for (var i = part[0].length - 1; i >= 0; i--) {
			if (part[0].length > 10) {
			alertWarning("位数过大，无法计算");
			return "";
		} // 若数量超过拾亿单位，提示

		let tmpnewchar = "";
		let perchar = part[0].charAt(i);
		switch (perchar) {
		case "0" :
		tmpnewchar = "零" + tmpnewchar;
		break;
		case "1" :
		tmpnewchar = "壹" + tmpnewchar;
		break;
		case "2" :
		tmpnewchar = "贰" + tmpnewchar;
		break;
		case "3" :
		tmpnewchar = "叁" + tmpnewchar;
		break;
		case "4" :
		tmpnewchar = "肆" + tmpnewchar;
		break;
		case "5" :
		tmpnewchar = "伍" + tmpnewchar;
		break;
		case "6" :
		tmpnewchar = "陆" + tmpnewchar;
		break;
		case "7" :
		tmpnewchar = "柒" + tmpnewchar;
		break;
		case "8" :
		tmpnewchar = "捌" + tmpnewchar;
		break;
		case "9" :
		tmpnewchar = "玖" + tmpnewchar;
		break;
		}
		switch (part[0].length - i - 1) {
		case 0 :
		tmpnewchar = tmpnewchar + "元";
		break;
		case 1 :
		if (perchar != 0)
		tmpnewchar = tmpnewchar + "拾";
		break;
		case 2 :
		if (perchar != 0)
		tmpnewchar = tmpnewchar + "佰";
		break;
		case 3 :
		if (perchar != 0)
		tmpnewchar = tmpnewchar + "仟";
		break;
		case 4 :
		tmpnewchar = tmpnewchar + "万";
		break;
		case 5 :
		if (perchar != 0)
		tmpnewchar = tmpnewchar + "拾";
		break;
		case 6 :
		if (perchar != 0)
		tmpnewchar = tmpnewchar + "佰";
		break;
		case 7 :
		if (perchar != 0)
		tmpnewchar = tmpnewchar + "仟";
		break;
		case 8 :
		tmpnewchar = tmpnewchar + "亿";
		break;
		case 9 :
		tmpnewchar = tmpnewchar + "拾";
		break;
		}
		newchar = tmpnewchar + newchar;
		}

		// 小数点之后进行转化
		if (Num.indexOf(".") != -1) {
		if (part[1].length > 2) {
		alertWarning("小数点之后只能保留两位,系统将自动截段");
		part[1] = part[1].substr(0, 2);
		}
		for (var i = 0; i < part[1].length; i++) {
		let tmpnewchar = "";
		let perchar = part[1].charAt(i);
		switch (perchar) {
		case "0" :
		tmpnewchar = "零" + tmpnewchar;
		break;
		case "1" :
		tmpnewchar = "壹" + tmpnewchar;
		break;
		case "2" :
		tmpnewchar = "贰" + tmpnewchar;
		break;
		case "3" :
		tmpnewchar = "叁" + tmpnewchar;
		break;
		case "4" :
		tmpnewchar = "肆" + tmpnewchar;
		break;
		case "5" :
		tmpnewchar = "伍" + tmpnewchar;
		break;
		case "6" :
		tmpnewchar = "陆" + tmpnewchar;
		break;
		case "7" :
		tmpnewchar = "柒" + tmpnewchar;
		break;
		case "8" :
		tmpnewchar = "捌" + tmpnewchar;
		break;
		case "9" :
		tmpnewchar = "玖" + tmpnewchar;
		break;
		}
		if (i == 0)
		tmpnewchar = tmpnewchar + "角";
		if (i == 1)
		tmpnewchar = tmpnewchar + "分";
		newchar = newchar + tmpnewchar;
		}
		}
		// 替换所有无用汉字
		while (newchar.search("零零") != -1)
		newchar = newchar.replace("零零", "零");
		newchar = newchar.replace("零亿", "亿");
		newchar = newchar.replace("亿万", "亿");
		newchar = newchar.replace("零万", "万");
		newchar = newchar.replace("零元", "元");
		newchar = newchar.replace("零角", "");
		newchar = newchar.replace("零分", "");

		if (newchar.charAt(newchar.length - 1) == "元" || newchar.charAt(newchar.length - 1) == "角") {
		newchar = newchar + "整";
		}

		if (isNegative) {
		newchar = '负' + newchar;
		}

		return newchar;
	},

	//8进7不进 
	myFix(num) {
		let s = parseInt(num / 10);
		let y = num % 10;
		if(y >= 8) {
			return s*10 + 10;
		} else {
			return s*10 ;
		}
	},

	toast(msg) {
		vue.$emit("showToast", msg);
	},
	loading: () => {
		vue.$emit("loading", null);
	},
	loaded: ()=> {
		vue.$emit("loaded", null);
	},
	bus: vue,
}