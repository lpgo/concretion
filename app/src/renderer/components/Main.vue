<template>
<div>
	<h2>{{msg}}</h2>
	<span style="position:fixed;right:0;bottom:0;padding:20px">版本：{{version}}</span>
</div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import util from '../common/util.js'
import conf from '../common/conf.js'
export default {
	data() {
		return {
			msg: "正在加载数据。。。",
			version: conf.version,
		};
	},
	methods: {
		...mapMutations([
	        'addAllTypes',
	        'addAllSalePrices',
	        'addAllPurchasePrices',
	        'addComFrequency',
	        'addDriverFrequency',
	        'addCarFrequency',
	        'addProjectFrequency',

	    ]),
	},
	mounted() {
		Promise.all([
			util.get("types",data => {this.addAllTypes(data)}),
			util.get("salePrices",data => {this.addAllSalePrices(data)}),
			util.get("purchasePrices",data => {this.addAllPurchasePrices(data)}),
			util.get("getFrequency?name=com",data => {this.addComFrequency(data)}),
			util.get("getFrequency?name=project",data => {this.addProjectFrequency(data)}),
			util.get("getFrequency?name=driver",data => {this.addDriverFrequency(data)}),
			util.get("getFrequency?name=car",data => {this.addCarFrequency(data)}),
		]).then(result =>{
			this.msg = "加载完毕";
		}).catch(err =>{
			this.msg = "加载出错："+err.message;
		});
		
	},
}
</script>