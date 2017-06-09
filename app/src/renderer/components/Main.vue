<template>
<div>
	<h2>{{msg}}</h2>
	<button @click="download" v-if="hasNew">下载新版本</button>
	<div style="padding:20px"  v-if="lineProgress">
		<mu-linear-progress mode="determinate" :value="value" :max="max" :size="10"/>
	</div>
	
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
			hasNew: false,
			lineProgress: false,
			value: 0,
			max:0,
			url:null,
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
	        'loadCarInfos',
	    ]),

	    download() {
	    	const {remote} = this.$electron;
	    	const web = remote.getCurrentWebContents();
	    	let self = this;
	    	web.downloadURL(this.url);
	    	web.session.on('will-download', (e, item) =>{
	    		this.msg = "正在下载新版本。。"
	    		this.hasNew = false;
	    		item.on('updated', () => {
			       self.value = item.getReceivedBytes();
			   	});
			   	item.on('done', (e, state) => {
			   		if (state === 'interrupted') {
			           self.msg = "下载失败";
			          
			       	}
					if (state === 'cancelled') {
		           		self.msg = "下载取消";
		           		this.hasNew = true;
			       	}	//下载完成，让 dock 上的下载目录Q弹一下下
			       	if (state === 'completed') {
		           		self.msg = "下载完成";
		           		
			       	}
			   	});
	    	});
	    },
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
			util.get("carInfos",data => {this.loadCarInfos(data)}),
		]).then(result =>{
			this.msg = "加载完毕";
		}).catch(err =>{
			this.msg = "加载出错："+err.message;
		});

		util.get("version", data => {
			if(conf.version != data.version) {
				this.hasNew = true;		
				this.lineProgress = true;
				this.max = data.length;
				this.url = data.url;
			}	
		});   

		
	},
}
</script>