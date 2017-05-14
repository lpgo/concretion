<template>
	<h2>{{msg}}</h2>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import util from '../common/util.js'
export default {
	data() {
		return {
			msg: "正在加载数据。。。",
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