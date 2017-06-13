<template>
<div >
	<div class="purchaseContainer noprint">
		<mu-paper class="purchase" :zDepth="0" >
			<div class="purchaseTitle">过磅单</div>
			<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择客户" style="" :disabled="disabled" fullWidth @change="comChange" label="请选择客户" labelFloat :errorText="error.com" >
				<mu-menu-item v-for="item,index in comList" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
			<mu-auto-complete :filter="myfilter" hintText="请输入车号" v-model="form.car" openOnFocus :dataSource="carPlates" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10" fullWidth :disabled="disabled" :errorText="error.car" @change="carChange"/>
			<mu-select-field v-model="form.name" :labelFocusClass="['label-foucs']" hintText="请选择物资" label="请选择物资" :disabled="disabled" fullWidth @change="nameChange" labelFloat :errorText="error.name">
				<mu-menu-item v-for="item,index in materialList" :key="item.id" :value="item.material" :title="item.material" />
			</mu-select-field>

			<mu-select-field v-model="form.standard" :labelFocusClass="['label-foucs']" hintText="请选择规格" label="请选择规格" :disabled="disabled" fullWidth @change="standardChange" labelFloat :errorText="error.standard">
				<mu-menu-item v-for="item,index in standardList" :key="item.id" :value="item.standard" :title="item.standard" />
			</mu-select-field>

			<mu-text-field label="请输入单价" labelFloat fullWidth type="number" v-model="form.price" :disabled="disabled" :errorText="error.price"/>

			<div class="labelGroup">
				<mu-text-field label="请输入扣款" labelFloat type="number" v-model="form.chargebacks" :disabled="disabled" style="width:150px"/>
				<mu-text-field label="请输入扣款原因" labelFloat fullWidth type="text" v-model="form.reason" :disabled="disabled"/>
			</div>
			<div class="labelGroup">
				<mu-text-field label="请输入毛重" labelFloat fullWidth type="number" v-model="form.totalWeight" :disabled="disabled"/>
				<mu-text-field label="请输入皮重" labelFloat fullWidth type="number" v-model="form.carWeight" :disabled="false"/>

			</div>
			
			<div class="btnContainer">
				<!--
				<mu-raised-button label="二次称重" class="purchaseBtn"  @click="save" secondary v-if="state == 'new'" :disabled="false"/>
				-->
				<mu-raised-button label="保存" fullWidth @click="once" primary v-if="state == 'new'" :disabled="false"/> 

				<template v-if="state == 'save'">
				<mu-raised-button label="新建" class="purchaseBtn" @click="newOrder" secondary />
				<mu-raised-button label="出单" class="purchaseBtn" @click="out" primary :disabled="false"/>
				</template>
				<template v-if="state == 'out'">
				<mu-raised-button label="新建" class="purchaseBtn" @click="newOrder" secondary />
				<mu-raised-button label="打印" class="purchaseBtn" @click="myPrint" primary />
				</template>
			</div>
		</mu-paper>
		<div>
			<!--<PurchaseList :height="height" theadClass="saveListHead" :data="saveList" @select="saveSelect"/>-->
			<PurchaseList :height="height" theadClass="printListHead" :data="outList" @select="outSelect"/>
	 
		</div>
	</div>
	<div class="hidden myDivToPrint">
		
		<h2 style="text-align:center;">府谷县茂奂建材有限责任公司过磅单</h2>
		<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%" text-align="center" style="font-size:18px;">
			<tr>
				<td>单位</td>
				<td colspan="2">{{printData.com}}</td>
				<td>日期</td>
				<td colspan="2">{{dateFormat(printData.time)}}</td>
				<td>单号</td>
				<td>{{printData.no}}</td>
			</tr>
			<tr>
				<td>车号</td>
				<td>{{printData.car}}</td>
				<td>物资</td>
				<td>{{printData.name}}</td>
				<td>单价</td>
				<td>{{printData.price}}</td>
				<td rowspan="3"><img :src="qrcodeSrc" style="width:128px;height:128px"></td>
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
				<td>单位</td>
				<td>吨</td>
				<td>扣款</td>
				<td>{{printData.chargebacks}}</td>
				<td>扣款原因</td>
				<td>{{printData.reason}}</td>
				
			</tr>

			<tr>
				<td>大写</td>
				<td colspan="3">{{numberToChinese(myFix(printData.total))}}</td>
				<td>实付金额</td>
				<td>{{myFix(printData.total)}}</td>
				<td>电话</td>
				<td>15319601610</td>
			</tr>
		</table>
		
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
				height:'500px',
				form : {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null,chargebacks:0,reason:null,standard:null},
				printData: {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null,weight:0,total:0,chargebacks:0,reason:null},
				disabled : false,
				totalWeightDisabled: true,
				carWeightDisabled: true,
				onceDisabled: true,
				getCarWeight:false,
				state: "new",
				outList: [],
				saveList: [],
				selectIndex:-1,
				//prices:[],
				qrcode:"",
				myfilter (searchText, key) {
					if(searchText) {
						return key.indexOf(searchText) !== -1;
					} else {
						return true;
					}
			    },
			  	port:null,
			  	error:{com:"",car:null,name:null,price:null},

			  	comList:[],    //客户列表
			  	materialList:[], //物资列表
			  	standardList:[],

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
				this.form.carWeight = Number(this.form.carWeight);
				this.form.chargebacks = Number(this.form.chargebacks);
				this.form.complate = false;
				util.post("purchases", this.form, data => {
					this.form.id = data.id;
					this.form.no = data.no;
					this.saveList.push(this.form);
					this.form = {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null};
					this.form.com = '';
					this.form.car = '';
					this.form.name = '';
					this.form.price = null;
					this.form.totalWeight = null;
					this.form.carWeight = null;
					this.form.chargebacks = null;
					this.form.reason = null;
					this.form.standard = null;
				}, err => {
					util.toast(err.message);
				},true);
			}, 
			print() {
				const {remote} = this.$electron;
		    	const web = remote.getCurrentWebContents();
		    	window.setTimeout(() => {web.print({silent:true})},2000);
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
			myPrint() {
				this.printData = this.form;
				this.print();
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
					this.form.chargebacks = null;
					this.form.reason = null;

					this.printData = data;
					this.print();
					this.addCarInfo({car:data.car,weight:data.carWeight});
		
				}, err => {
					util.toast(err.message);
				},true);
				
			},
			once() {
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
				this.form.carWeight = Number(this.form.carWeight);
				this.form.chargebacks = Number(this.form.chargebacks);
				this.form.weight = this.form.totalWeight - this.form.carWeight;
				this.form.total = this.form.price * this.form.weight;
				this.form.total -= this.form.chargebacks;
				this.form.complate = true;
				util.post("purchases", this.form, data => {
					this.form.id = data.id;
					this.form.no = data.no;
					this.outList.push(this.form);
					this.form = {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null};
					this.form.com = '';
					this.form.car = '';
					this.form.name = '';
					this.form.price = null;
					this.form.totalWeight = null;
					this.form.carWeight = null;
					this.form.weight = null;
					this.form.total = null;
					this.form.chargebacks = null;
					this.form.reason = null;
					this.form.standard = null;
					this.onceDisabled = true;

					this.printData = data;
					this.print();
					this.addCarInfo({car:data.car,weight:data.carWeight});
				}, err => {
					util.toast(err.message);
				},true);
			},
			newOrder() {
				this.form = {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null};
				this.state = "new";
				this.printData =  {com:null,car:null,name:null,price:null,totalWeight:null,carWeight:null,weight:0,total:0,chargebacks:0,reason:null};
				this.disabled = false;
			},
			saveSelect(index,tr) {
				this.selectIndex = index;
				this.willSelect(this.saveList[index])
				this.form = this.saveList[index];
				this.state = "save";

			},
			outSelect(index,tr) {
				this.selectIndex = index;
				this.willSelect(this.outList[index])
				this.form = this.outList[index];
				this.state = "out";
			},

			willSelect(value) {
				this.materialList = [];
				l1:for(let item of this.purchasePrices) {
					if(item.com == value.com) {
						for(let m of this.materialList) {
							if(item.material == m.material)
								continue  l1;
						}
						this.materialList.push(item);
					}
				}
				this.standardList = [];
				for(let item of this.purchasePrices) {
					if(item.com == value.com && item.material == value.name) {
						this.standardList.push(item);
					}
				}
				this.disabled = true;
			},

			comChange(value) {
				this.materialList = [];
				this.form.name = null;
				this.form.price = null;
				l1:for(let item of this.purchasePrices) {
					if(item.com == value) {
						for(let m of this.materialList) {
							if(item.material == m.material)
								continue  l1;
						}
						this.materialList.push(item);
					}
				}
				this.error.com = null;
			},
			nameChange(value) {
				this.standardList = [];
				this.form.standard = null;
				this.form.price = null;
				for(let item of this.purchasePrices) {
					if(item.com == this.form.com && item.material == value) {
						this.standardList.push(item);
					}
				}
				this.error.name = null;
			},
			standardChange(value) {
				for(let item of this.standardList) {
					if(item.standard == value)
						this.form.price = item.price;
				}
			},

			carChange(value) {
				for (var i = this.carInfos.length - 1; i >= 0; i--) {
					if(this.carInfos[i].car == value) {
						this.form.carWeight = this.carInfos[i].weight;
						this.getCarWeight = true;
					} else {
						this.getCarWeight = false;
						this.form.carWeight = null;
					}
				}
				this.error.car = null;
			},

			numberToChinese(num) {
				return util.moneyArabiaToChinese(num);
			},
			myFix(num) {
				return util.myFix(num);
			},
			dateFormat(time) {
				return moment(time).format("YYYY-MM-DD HH:mm:ss");
			},
			...mapMutations([
		        'addCarInfo',
		    ]),
		},
		components: {
			PurchaseList
		},
		computed:{
	    	...mapState({
	    		purchasePrices: state => state.purchasePrices,
	    		carPlates: state => state.carFrequency,
	    		carInfos: state => state.carInfos,
	    	}),
	    	qrcodeSrc() {
	    		return "http://182.61.33.210/api/qrcode?str=" + this.printData.no; 
	    	},
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
			/*
			SerialPort.list(function (err, ports) {
			  ports.forEach(function(port) {
			    console.log(port.comName);
			    console.log(port.pnpId);
			    console.log(port.manufacturer);
			  });
			});
			
			this.port = new SerialPort("COM3", {
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
				//console.log(data);
				let weight = Number(str.substring(3,8)) / Math.pow(10,Number(str[8]));

				if(last != weight) {
					last = weight;
					count = 0;
					this.totalWeightDisabled = true;
					this.carWeightDisabled = true;
					this.onceDisabled =true;
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
						this.onceDisabled = !this.getCarWeight;
					}
				}
			});
			*/
	
			out:for(let p of this.purchasePrices) {
				for(let c of this.comList) {
					if(c.com == p.com)
						continue out;
				}
				this.comList.push(p);
			}
		},
		beforeDestroy() {
			/*
			if(this.port.isOpen())
				this.port.close();
			*/
			
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