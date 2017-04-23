import conf from './conf.js'
import Vue from 'vue'

const vue = new Vue();

export default {
	request: (res,method,data,success,fail) => {
		return fetch(conf.apiUrl+res,
			{
				credentials:"include",
	            method: method,
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
			toast("网络错误"); 
		});
	},
	requestForm: (res,method,data,success,fail) => {
		const form = new FormData;
		for(let k in data) {
			form.append(k,data[k])
		}
		return fetch(conf.apiUrl+res,
			{
				credentials:"include",
	            method: method,
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
			toast("网络错误:"+err);
		});
	},
	get: function(res,success,fail) {
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
		}).catch(err => {
			toast("网络错误:"+err);
		});
	},
	toast(msg) {
		vue.$emit("showToast", msg);
	},
	bus: vue,
}