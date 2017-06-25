<template>
	<div>
		<div style="padding:20px;" class="noprint">
			<h2 style="text-align:center">新建送货单</h2>
			<div class="formGroup">
				<span class="textLabel">施工单位：</span>
				<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择施工单位" style="" @change="comChange" :errorText="error.com">
				<mu-menu-item v-for="item,index in salePrices" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
				<span class="textLabel">强度等级：</span>
				<mu-select-field v-model="form.strength" :labelFocusClass="['label-foucs']" hintText="请选择强度等级" style="" @change="typeChange" :errorText="error.strength" >
					<mu-menu-item v-for="item,index in strengths" :key="item" :value="item" :title="item" />
				</mu-select-field>
				<span class="textLabel">浇筑方式：</span>
				<mu-select-field v-model="form.way" :labelFocusClass="['label-foucs']" hintText="请选择浇筑方式" style="" @change="wayChange" :errorText="error.way" >
					<mu-menu-item v-for="item,index in ways" :key="item.id" :value="item.name" :title="item.name" />
				</mu-select-field>
			</div>
			<div class="formGroup">
				<span class="textLabel">工程名称：</span>
				<mu-select-field v-model="form.project" :labelFocusClass="['label-foucs']" hintText="工程名称" style=""  :errorText="error.project">
					<mu-menu-item v-for="item,index in salePrice.distances"  :value="item.project" :title="item.project" />
				</mu-select-field>
				<span class="textLabel">联系电话：</span><mu-text-field  v-model="form.pbbh" hintText="联系电话" :errorText="error.pbbh" @change="error.pbbh = null"/>
				

				<span class="textLabel">计划方量：</span>
				<mu-text-field  v-model="form.plan"/>
			</div>
			<div class="formGroup">
				<span class="textLabel">施工部位：</span><mu-text-field  v-model="form.part" hintText="请选输入施工部位" :errorText="error.part" @change="error.part = null"/>
				
				<span class="textLabel">附加条件：</span><mu-select-field v-model="form.attach" :labelFocusClass="['label-foucs']" hintText="请选择附加条件" style="" multiple>
					<mu-menu-item v-for="item,index in attachs" :key="item" :value="item.value" :title="item.name" />
				</mu-select-field>
				<span class="textLabel">已完方量：</span><mu-text-field type="number" v-model="form.acc"/>
			</div> 
			<div class="formGroup">
				<span class="textLabel">塌落度：</span>
				<mu-auto-complete :filter="myfilter" hintText="请选输入塌落度" v-model="form.tld" openOnFocus :dataSource="tlds" :maxSearchResults="10" :errorText="error.tld" @change="error.tld = null"/>
				<span class="textLabel">备注：</span><mu-text-field  v-model="form.remarks" hintText="请输入备注" :errorText="error.remarks" @change="error.remarks = null"/>
				<span class="textLabel">累计车次：</span><mu-text-field  v-model="form.count"  type="number"/>
				
			</div>
			<div class="saleBtnGroup">
					<mu-raised-button label="保存" primary style="width:10%;margin:0 20px;" @click="save"/>
					<mu-raised-button label="取消" secondary style="width:10%;" @click="cancel"/> 
			</div>
			
			<mu-table  style="white-space:pre-line" :showCheckbox="false" :fixedHeader="true" :height="height">
				<mu-thead slot="header"  >
			      <mu-tr class="printListHead">
			        <mu-th tooltip="施工单位" class="tdHeader">施工单位</mu-th>
			        <mu-th tooltip="驾驶员" class="tdHeader">驾驶员</mu-th>
			        <mu-th tooltip="本车方量" class="tdHeader">本车方量</mu-th>
			        <mu-th tooltip="已完方量" class="tdHeader">已完方量</mu-th>
			        <mu-th tooltip="计划方量" class="tdHeader">计划方量</mu-th>
			        <mu-th tooltip="累计车次" class="tdHeader">累计车次</mu-th>
			        <mu-th tooltip="工程名称" class="tdHeader">工程名称</mu-th>
			        <mu-th tooltip="运输车号" class="tdHeader">运输车号</mu-th>
			        <mu-th tooltip="浇筑方式" class="tdHeader">浇筑方式</mu-th>
			        <mu-th tooltip="施工部位" class="tdHeader">施工部位</mu-th>
			        <mu-th tooltip="强度等级" class="tdHeader">强度等级</mu-th>
			        <mu-th tooltip="发货时间" class="tdHeader">发货时间</mu-th>
			      </mu-tr>
			    </mu-thead>
			     <mu-tbody >
			      <mu-tr v-for="item,index in data">
			        <mu-td style="white-space:pre-line">{{item.com}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.driver}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.capacity}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.acc}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.plan}}</mu-td>
			         <mu-td style="white-space:pre-line">{{item.count}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.project}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.car}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.way}}</mu-td> 
			        <mu-td style="white-space:pre-line">{{item.part}}</mu-td>
			        <mu-td style="white-space:pre-line">{{item.strength}}</mu-td>
			        <mu-td style="white-space:pre-line">{{timeFormat(item.time)}}</mu-td> 
			      </mu-tr>
			    </mu-tbody>
			</mu-table>
		</div>
		<div class="hidden myDivToPrint">
			<h2 style="text-align:center;margin-bottom:-7px">府谷县茂奂建材有限责任公司送货单</h2>
			<div style="display:flex;justify-content:space-between;padding:0 20px">
				<span>出厂日期：{{dateFormat(printData.time)}}</span>
				<span>No:{{printData.no}}</span>
			</div>
			<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%" text-align="center">
				<tr>
					<td>施工单位：</td>
					<td colspan="3">{{printData.com}}</td>
					<td>驾驶员</td>
					<td>{{printData.driver}}</td>
					<td>本车方量</td>
					<td>{{printData.capacity}} M<sup>3</sup></td>
				</tr>
				<tr>
					<td>工程名称</td>
					<td colspan="3">{{printData.project}}</td>
					<td>运输车号</td>
					<td>{{printData.car}}</td>
					<td>已完方量</td>
					<td>{{printData.acc.toFixed(0)}} M<sup>3</sup></td>
				</tr>
				<tr>
					<td>施工部位</td>
					<td colspan="3">{{printData.part}}</td>
					<td>运距</td>
					<td>{{salePrice.distance}}</td>
					<td>计划方量</td>
					<td>{{printData.plan.toFixed(0)}} M<sup>3</sup></td>
				</tr>
				<tr>
					<td>强度等级</td>
					<td>{{printData.strength}}</td>
					<td>附加</td>
					<td>防冻</td>
					<td>发货时间</td>
					<td>{{timeFormat(printData.time)}}</td>
					<td>累计车次</td>
					<td>{{printData.count}}</td>
				</tr>
				<tr>
					<td>塌落度</td>
					<td>{{printData.tld}}</td>
					<td>浇筑方式</td>
					<td>{{printData.way}}</td>
					<td>联系电话</td>
					<td colspan="3">{{printData.pbbh}}</td>
				</tr>
				<tr>
					<td colspan="8" style="text-align:left">说明：求经本公司许可不得往混凝土内添加水或其它材料，否则由此引起的质量问题概不负责。</td>
				</tr>
				<tr>
					<td colspan="6" style="text-align:left;height:50px">备注：调度：18091998178或17792164189<br/>{{printData.remarks}}</td>
					<td>签字：</td>
					<td></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>

import moment from 'moment'
import util from '../common/util.js'
import { mapState,mapMutations } from 'vuex'
import fs from 'fs'

export default {
	data() {
		return {
			name: "Sale",
			height: "210px",
			form: {com:null,driver:null,capacity:null,project:null,car:null,way:null,part:null,strength:null,tld:null,pbbh:null,price:null,attach:[],acc:null,count:null},
			error: {com:null,driver:null,capacity:null,project:null,car:null,way:null,part:null,strength:null,tld:null,pbbh:null,price:null},
			data: [],
			salePrice: {acc:0.0,plan:0.0,count:0},//选定公司后的销售价格对象
			ways:[
				{id:1,name:"自卸"},
				{id:2,name:"45米泵送"},
				{id:2,name:"52米泵送"},
			],
			item:null,   //priceItem 包含两种方式的价格
			printData:{com:null,driver:null,capacity:null,project:null,car:null,way:null,part:null,strength:null,tld:null,pbbh:null,price:null,attach:[],count:null,acc:0,plan:0},
			barcode:"",

			lastAcc:0,   //上一次的累计方量用来计算本次累计方量
			/*
			attachs:[
				{id:1,name:"同标号细石砼",value:20},
				{id:2,name:"抗渗P6砼",value:15},
				{id:3,name:"抗渗P8砼",value:25},
				{id:4,name:"抗冻砼",value:25},
				{id:5,name:"抗裂防水HA-P8%",value:25},
				{id:6,name:"抗裂防水HA-P14%",value:40},
			],
			*/

			attachs:[
				{name:"细石",value:"small"},
				{name:"抗冻F200",value:"frost"},
				{name:"P6",value:"P6"},
				{name:"P8",value:"P8"},
			],
			tlds:[
				"140±20mm",
				"160±20mm",
				"180±20mm",
				"200±20mm",
				"220±20mm",
			],

			strengths:[
				"C15",
				"C20",
				"C25",
				"C30",
				"C35",
				"C40",
				"C45",
				"C50",
			],

			myfilter (searchText, key) {
				if(searchText) {
					return key.indexOf(searchText) !== -1;
				} else {
					return true;
				}
		    },
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
		save() {
			//检查输入
			if(!this.form.com) {
				this.error.com = "请选择施工单位";
				return ;
			}
			if(!this.form.way) {
				this.error.way = "请选择浇筑方式";
				return ;
			}
			if(!this.form.project) {
				this.error.project = "请输入工程名称";
				return ;
			}

			if(!this.form.part) {
				this.error.part = "请输入施工部位";
				return ;
			}
			if(!this.form.strength) {
				this.error.strength = "请选择强度等级";
				return ;
			}
			if(!this.form.tld) {
				this.error.tld = "请选输入塌落度";
				return ;
			}
			if(!this.form.pbbh) {
				this.error.pbbh = "请输入联系电话";
				return ;
			}

			this.form.capacity = Number(this.form.capacity);
			this.form.price = this.calcPrice();
			this.form.prepare = true;
			console.log(this.form.price);

			util.post("sales", this.form, data => {
				this.data.push(data);
				//this.printData = data;
				//this.print();
				this.cancel();
			}, err => {
				util.toast(err.error);
			},true);
		},

		calcPrice() {
			//基础商砼价格
			let basePrice = this.salePrice.price[this.form.strength];
			console.log(basePrice);
			console.log(this.form.attach)
			let sum = 0;
			for(let a of this.form.attach) {
				sum += this.salePrice.attach[a]
			}
			console.log(sum);
			if(basePrice == 0) {
				return 0;
			} else {
				return basePrice + this.salePrice.attach.auto + sum ;
			}
		},

		cancel() {
			this.form.com = "";
			this.form.driver = "";
			this.form.capacity = "";
			this.form.project = "";
			this.form.car = "";
			this.form.way = "";
			this.form.part = "";
			this.form.strength = "";
			this.form.plan = null;
			this.form.acc = null;
			this.form.count = null;
			this.price = null;
			this.prices = [];
			this.item = null;
			this.form.tld = null;
			this.form.pbbh = null;
			this.form.attach = [];
			this.form.remarks =null;
		},
		dateFormat(time) {
			return moment(time).format("YYYY-MM-DD");
		},
		timeFormat(time) {
			return moment(time).format("HH:mm:ss");
		},
		comChange(value) {
			for(let item of this.salePrices) {
				if(item.com == value) {
					this.salePrice = item;
					this.form.pbbh = item.tel;
					this.form.plan = item.plan;
				}
			}
			util.get(`sales?com=${value}&limit=1`,data => {
				if(data) {
					this.form = data[0];
					this.form.count += 1;
					this.form.acc += this.form.capacity;
					delete this.form.no;
					delete this.form.id;
					delete this.form.time;
				} else {
					this.lastAcc = 0;
					this.form.acc = 0;
					this.form.count = 1;
				}
			});
			this.error.com = null;
		},
		typeChange(value) {
			this.error.strength = null;
		},
		wayChange(value) {
			this.error.way = null;
		},
		capacityChange(value) {
			console.log(this.lastAcc);
			console.log(this.form.capacity);
			this.form.acc = this.lastAcc + Number(this.form.capacity);
			console.log(this.form.acc);
			this.error.capacity = null;
		},
		print() {
			const {remote} = this.$electron;
	    	const web = remote.getCurrentWebContents();
	    	
	    	/*
	    	web.printToPDF({}, (error, data) => {
			    if (error) throw error
			    fs.writeFile('sale.pdf', data, (error) => {
			      if (error) throw error
			      console.log('Write PDF successfully.')
			    })
			});
			*/
			web.print({silent:true});
			
		},
	},
	computed:{
    	...mapState({
    		salePrices: state => state.salePrices,
    		carPlates: state => state.carFrequency,
    		comFrequency: state => state.comFrequency,
    		projectFrequency: state => state.projectFrequency,
    		driverFrequency: state => state.driverFrequency,
    	}),
    	barcodeSrc() {
    		return "http://182.61.33.210/api/qrcode?str=" + this.barcode;
    	}
    },
	mounted() {
		let start = encodeURIComponent(moment().startOf('day').format());
		let end = encodeURIComponent(moment().endOf('day').format());
		let url = `sales?start=${start}&end=${end}&closing=false&prepare=true`
		util.get(url, data => {
			if(data) {
				this.data = data;
			}
		},err => {
			util.toast(err.error);
		});
	},
}
</script>

<style>
.formGroup {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.saleBtnGroup {
	display: flex;
	justify-content: flex-end;
	margin-left: 172px;
	margin-bottom: 10px;
}
.textLabel {
	font-size: 18px;
}
</style>