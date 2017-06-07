<template>
<div >
	<div class="purchaseContainer noprint">
		<mu-paper class="purchase" :zDepth="0" >
			<div class="purchaseTitle">过磅单</div>
			<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择公司" style="" :disabled="disabled" fullWidth @change="comChange" label="请选择公司" labelFloat :errorText="error.com" >
				<mu-menu-item v-for="item,index in purchasePrices" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
			<mu-auto-complete :filter="myfilter" hintText="请输入车号" v-model="form.car" openOnFocus :dataSource="carPlates" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10" fullWidth :disabled="disabled" :errorText="error.car" @change="error.car = null"/>
			<mu-select-field v-model="form.name" :labelFocusClass="['label-foucs']" hintText="请输入名称" label="请选择名称" :disabled="disabled" fullWidth @change="nameChange" labelFloat :errorText="error.name">
				<mu-menu-item v-for="item,index in prices" :key="item.id" :value="item.name" :title="item.name" />
			</mu-select-field>
			<mu-text-field label="请输入单价" labelFloat fullWidth type="number" v-model="form.price" :disabled="disabled" :errorText="error.price"/>
			<div class="labelGroup">
				<mu-text-field label="请输入毛重" labelFloat fullWidth type="number" v-model="form.totalWeight" :disabled="false"/>

			</div>
			<div class="labelGroup">
				<mu-text-field label="请输入皮重" labelFloat fullWidth type="number" v-model="form.carWeight" :disabled="false"/>
				
			</div>
			<div class="btnContainer">
				<mu-raised-button label="保存" style="width:100%" @click="save" secondary v-if="state == 'new'" :disabled="false"/>
				<template v-if="state == 'save'">
				<mu-raised-button label="新建" class="purchaseBtn" @click="newOrder" secondary />
				<mu-raised-button label="出单" class="purchaseBtn" @click="out" primary :disabled="false"/>
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
	<div class=" myDivToPrint">
		<h2 style="text-align:center">府谷县茂奂建材有限责任公司过磅单</h2>
		<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%" text-align="center">
			<tr>
				<td>送货单位：</td>
				<td colspan="2">{{printData.com}}</td>
				<td>日期：</td>
				<td colspan="2">{{dateFormat(printData.time)}}</td>
				<td>{{printData.no}}</td>
			</tr>
			<tr>
				<td>车号</td>
				<td>{{printData.car}}</td>
				<td>名称</td>
				<td>{{printData.name}}</td>
				<td>单价</td>
				<td>{{printData.price}}</td>
				<td>签字</td>
			</tr>
			<tr>
				<td>毛重</td>
				<td>{{printData.totalWeight}}</td>
				<td>皮重</td>
				<td>{{printData.carWeight}}</td>
				<td>净重</td>
				<td>{{printData.weight.toFixed(2)}}</td>
				<td rowspan="2"></td>
			</tr>
			<tr>
				<td>大写</td>
				<td colspan="3">{{numberToChinese(123124)}}</td>
				<td>实付金额</td>
				<td>{{printData.total.toFixed(2)}}</td>
			</tr>
		</table>
		<span style="float:right">15319601610</span>
	</div>
</div>
</template> 

<script>
	import PurchaseList from './PurchaseList'
	import mock from '../mock.js'
	import util from '../common/util.js'
	import moment from 'moment'
	import { mapState,mapMutations } from 'vuex'
	import fs from 'fs'

	import SerialPort from 'serialport'
	export default {
		data() {
			return {
				height:'240px',
				form : {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null},
				disabled : false,
				printData: {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null,weight:0,total:0},
				totalWeightDisabled: true,
				carWeightDisabled: true,
				state: "new",
				outList: [],
				saveList: [],
				selectIndex:-1,
				prices:[],
				myfilter (searchText, key) {
					if(searchText) {
						return key.indexOf(searchText) !== -1;
					} else {
						return true;
					}
			    },
			  	port:null,
			  	error:{com:"",car:null,name:null,price:null},
			};
		},
		methods: {
			save() {
				if (!this.form.com) {
					this.error.com = "请选择公司";
					return ;
				};
				if(!this.form.name) {
					this.error.name = "请选择名称";
					return ;
				}
				if(!this.form.car) {
					this.error.car = "请输入车号";
					return ;
				}

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
				},true);
			}, 
			print() {
				const {remote} = this.$electron;
		    	const web = remote.getCurrentWebContents();
		    	window.print();
		    	/*
		    	web.printToPDF({}, (error, data) => {
				    if (error) throw error
				    fs.writeFile('print.pdf', data, (error) => {
				      if (error) throw error
				      console.log('Write PDF successfully.')
				    })
				});
				*/
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

					this.printData = data;
					this.print();
		
				}, err => {
					util.toast(err.message);
				},true);
				
			},
			newOrder() {
				this.form = {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null};
				this.state = "new";

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
				this.printData = this.outList[index];
			},
			comChange(value) {
				for(let item of this.purchasePrices) {
					if(item.com == value) {
						this.prices = item.prices;
						this.form.name = null;
						this.form.price = null;
					}
				}
				this.error.com = null;
			},
			nameChange(value) {
				for(let item of this.prices) {
					if(item.name == value) {
						console.log(item,value);
						this.form.price = item.price;
					}
				}
				this.error.name = null;
			},
			numberToChinese(num) {
				return util.moneyArabiaToChinese(num);
			},
			dateFormat(time) {
				return moment(time).format("YYYY-MM-DD HH:mm:ss");
			},
		},
		components: {
			PurchaseList
		},
		computed:{
	    	...mapState({
	    		purchasePrices: state => state.purchasePrices,
	    		carPlates: state => state.carFrequency,
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

			SerialPort.list(function (err, ports) {
			  ports.forEach(function(port) {
			    console.log(port.comName);
			    console.log(port.pnpId);
			    console.log(port.manufacturer);
			  });
			});
			
			this.port = new SerialPort("COM4", {
			  baudRate: 2400,
			  autoOpen: false
			});
			
			this.port.open(function (err) {
			  if (err) {
			    return console.log('Error opening port: ', err.message);
			  }
			});
			let last,count;
			this.port.on('data', data => {
				
				let str = data.toString();	 
				console.log(data);
				let weight = Number(str.substring(3,8)) / Math.pow(10,Number(str[8]));

				if(last != weight) {
					last = weight;
					count = 0;
					this.totalWeightDisabled = true;
					this.carWeightDisabled = true;
				} else {
					count ++;
				}

				if(this.state == "save") {
					this.form.carWeight = weight;
					if(count >= 50 && weight != 0) {
						this.carWeightDisabled = false;
					}
				} else if(this.state == "new") {
					this.form.totalWeight = weight;
					if(count >= 50 && weight != 0) {
						this.totalWeightDisabled = false;
					}
				}
			});
		},
		beforeDestroy() {
			this.port.close();
		},
	}
</script>


<style>
.purchaseContainer{
	display:flex;
	align-items:stretch;
}
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
.hidden {
	display: none;
	height: 0;
	position: fixed;
	top:0;
	left: 0;
}
@media print {
	.myDivToPrint {
		background-color: red;
		height: 100%;
		width: 100%;
		position: fixed;
		top:0;
		left: 0;
		margin: 0;
		padding: 0px;
		font-size: 14px;
		line-height: 18px;
		display: block;
	}
	.noprint {    
	  	display: none;
	}   
}

</style>