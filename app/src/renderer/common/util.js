import conf from './conf.js'
import Vue from 'vue'

const vue = new Vue();

export default {
	post: (res,data,success,fail) => {
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
		}).catch(err => {
			toast("网络错误"); 
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
			toast("网络错误"); 
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
			toast("网络错误:"+err);
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
			toast("网络错误:"+err);
		});
	},
	toast(msg) {
		vue.$emit("showToast", msg);
	},
	bus: vue,
}