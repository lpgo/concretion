import conf from './conf.js'
import Vue from 'vue'

const vue = new Vue();

export default {
	request: function(res,method,data,success,fail) {
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
        		res.json().then(result => fail(result));
        	}
		});
	},
	requestForm: function(res,method,data,success,fail) {
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
        		res.json().then(result => fail(result));
        	}
		});
	},
	toast(msg) {
		vue.$emit("showToast", msg);
	},
	bus: vue,
}