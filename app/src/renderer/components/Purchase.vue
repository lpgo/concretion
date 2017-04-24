<template>
<div style="display:flex;align-items:stretch;">
	<mu-paper class="purchase" :zDepth="0" >
		<div class="purchaseTitle">过磅单</div>
		<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择公司" style="" :disabled="disabled" fullWidth @change="comChange" label="请选择公司" labelFloat>
			<mu-menu-item v-for="item,index in purchasePrices" :key="item.id" :value="item.com" :title="item.com" />
		</mu-select-field>
		<mu-auto-complete label="请输入车号" filter="noFilter" hintText="请输入车号" fullWidth v-model="form.car" openOnFocus  :disabled="disabled" :dataSource="carPlates" labelFloat/>
		<mu-select-field v-model="form.name" :labelFocusClass="['label-foucs']" hintText="请输入名称" label="请选择名称" :disabled="disabled" fullWidth @change="nameChange" labelFloat>
			<mu-menu-item v-for="item,index in prices" :key="item.id" :value="item.name" :title="item.name" />
		</mu-select-field>
		<mu-text-field label="请输入单价" labelFloat fullWidth type="number" v-model="form.price" :disabled="disabled"/>
		<div class="labelGroup">
			<mu-text-field label="请输入毛重" labelFloat fullWidth type="number" v-model="form.totalWeight" :disabled="disabled"/>
			<mu-flat-button label="获取毛重" style="margin-bottom:18px;margin-left:10px" primary/>
		</div>
		<div class="labelGroup">
			<mu-text-field label="请输入皮重" labelFloat fullWidth type="number" v-model="form.carWeight" :disabled="carWeightDisabled"/>
			<mu-flat-button label="获取皮重" style="margin-bottom:18px;margin-left:10px" secondary/>
		</div>
		<div class="btnContainer">
			<mu-raised-button label="保存" style="width:100%" @click="save" secondary v-if="state == 'new'"/>
			<template v-if="state == 'save'">
			<mu-raised-button label="新建" class="purchaseBtn" @click="newOrder" secondary />
			<mu-raised-button label="出单" class="purchaseBtn" @click="out" primary />
			</template>
			<template v-if="state == 'out'">
			<mu-raised-button label="新建" class="purchaseBtn" @click="newOrder" secondary />
			<mu-raised-button label="打印" class="purchaseBtn" @click="print" primary />
			</template>
		</div>
	</mu-paper>
	<div>
		<PurchaseList :height="height" theadClass="saveListHead" :data="saveList" @select="saveSelect"/>
		<PurchaseList :height="height" theadClass="printListHead" :data="outList" @select="outSelect"/>
 
	</div>
</div>
</template> 

<script>
	import PurchaseList from './PurchaseList'
	import mock from '../mock.js'
	import util from '../common/util.js'
	import moment from 'moment'
	import { mapState,mapMutations } from 'vuex'

	export default {
		data() {
			return {
				height:'240px',
				form : {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null},
				disabled : false,
				carWeightDisabled: true,
				state: "new",
				outList: [],
				saveList: [],
				selectIndex:-1,
				prices:[],
			};
		},
		methods: {
			save() {
				this.form.price = Number(this.form.price);
				this.form.totalWeight = Number(this.form.totalWeight);
				this.form.complate = false;
				util.post("purchases", this.form, data => {
					this.form.id = data.id;
					this.saveList.push(this.form);
					this.form = {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null};
					this.form.com = '';
					this.form.car = '';
					this.form.name = '';
					this.form.price = null;
					this.form.totalWeight = null;
					this.form.carWeight = null;
				}, err => {
					util.toast(err.message);
				});
			}, 
			print() {

			},
			out() {
				this.form.carWeight = Number(this.form.carWeight);
				this.form.complate = true;
				util.patch("purchases/"+this.form.id, {carWeight:this.form.carWeight,complate: true}, data => {
					this.outList.push(this.form);
					this.saveList.splice(this.selectIndex, 1);
					this.state = "new";
					this.form = {};
					this.form.carWeight = null;
					this.disabled = false;
					this.carWeightDisabled = true;
				}, err => {
					util.toast(err.message);
				});
				
			},
			newOrder() {
				this.form = {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null};
				this.state = "new";
				this.disabled = false;
				this.carWeightDisabled = true;
			},
			saveSelect(index,tr) {
				this.selectIndex = index;
				for(let item of this.purchasePrices) {
					if(item.com == this.saveList[index].com) {
						this.prices = item.prices;
					}
				}
				this.form = this.saveList[index];
				this.state = "save";
				this.disabled = true;
				this.carWeightDisabled = false;
			},
			outSelect(index,tr) {
				this.selectIndex = index;
				for(let item of this.purchasePrices) {
					if(item.com == this.outList[index].com) {
						this.prices = item.prices;
					}
				}
				this.form = this.outList[index];
				this.state = "out";
				this.disabled = true;
				this.carWeightDisabled = true;
			},
			comChange(value) {
				for(let item of this.purchasePrices) {
					if(item.com == value) {
						this.prices = item.prices;
						this.form.name = null;
						this.form.price = null;
					}
				}
			},
			nameChange(value) {
				for(let item of this.prices) {
					if(item.name == value) {
						console.log(item,value);
						this.form.price = item.price;
					}
				}
			},
		},
		components: {
			PurchaseList
		},
		computed:{
	    	...mapState({
	    		purchasePrices: state => state.purchasePrices,
	    		carPlates: state => state.carPlates,
	    	}),
	    },
		mounted() {
			let start = encodeURIComponent(moment().startOf('day').format());
			let end = encodeURIComponent(moment().endOf('day').format());
			let url = `purchases?start=${start}&end=${end}&complate=`
			util.get(url+"false", data => {
				if(data) {
					this.saveList = data;
				}
			},err => {
				util.toast(err.message);
			});

			util.get(url+"true", data => {
				if(data) {
					this.outList = data;
				}
			},err => {
				util.toast(err.message);
			});
		},
	}
</script>


<style>
.btnContainer {
	display: flex;
	justify-content: space-between;
	padding: 20px 0;
}
.labelGroup {
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.purchase {
	width: 350px;
	padding: 10px 25px;
	margin: 20px;
	flex:1 0 350px;
	
}
.purchaseBtn {
	width: 45%;
}
.purchaseTitle {
	font-size: 24px;
	font-weight: 2px;
	text-align: center;
}
.saveListHead {
	background:#ec407a;
}
.printListHead {
	background:#26a69a;
}

</style>