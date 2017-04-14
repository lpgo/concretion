import conf from './conf.js'
import Vue from 'vue'

const vue = new Vue();

export default {
	request: function(method,data,success,fail) {
		return fetch(conf.apiUrl+"purchases",
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
	toast(msg) {
		vue.$emit("showToast", msg);
	},
	bus: vue,
}