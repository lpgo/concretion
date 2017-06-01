<template>
	<div>
		<div style="padding:20px;" class="noprint">
			<h2 style="text-align:center">送货单</h2>
			<div class="formGroup">
				<span class="textLabel">施工单位：</span>
				<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择施工单位" style="" @change="comChange">
				<mu-menu-item v-for="item,index in salePrices" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
				<span class="textLabel">驾驶员：&nbsp&nbsp</span>
				<mu-auto-complete :filter="myfilter" hintText="请输入驾驶员" v-model="form.driver" openOnFocus :dataSource="driverFrequency" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10"/>
				<span class="textLabel">本车方量：</span><mu-text-field  v-model="form.capacity" type="number"/>
			</div>
			<div class="formGroup">
				<span class="textLabel">工程名称：</span>
				<mu-auto-complete hintText="请输入工程名称" v-model="form.project" openOnFocus :dataSource="projectFrequency" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10" :filter="myfilter"/>
				<span class="textLabel">运输车号：</span>
				<mu-auto-complete :filter="myfilter" hintText="请输入车号" v-model="form.car" openOnFocus :dataSource="carPlates" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10"/>
				<span class="textLabel">浇筑方式：</span>
				<mu-select-field v-model="form.way" :labelFocusClass="['label-foucs']" hintText="请选择浇筑方式" style="" @change="wayChange">
					<mu-menu-item v-for="item,index in ways" :key="item.id" :value="item.name" :title="item.name" />
				</mu-select-field>
			</div>
			<div class="formGroup">
				<span class="textLabel">施工部位：</span><mu-text-field  v-model="form.part"/>
				<span class="textLabel">强度等级：</span>
				<mu-select-field v-model="form.strength" :labelFocusClass="['label-foucs']" hintText="请选择强度等级" style="" @change="typeChange">
					<mu-menu-item v-for="item,index in prices" :key="item.id" :value="item.name" :title="item.name" />
				</mu-select-field>
				<span class="textLabel">发货时间：</span><mu-text-field  v-model="form.time"/>
			</div>
			<div class="formGroup">
				<span class="textLabel">塌落度：</span><mu-text-field  v-model="form.tld"/>
				<span class="textLabel">配比编号：</span><mu-text-field  v-model="form.pbbh"/>
				<div class="saleBtnGroup">
					<mu-raised-button label="确认" primary style="width:10%;margin:0 20px;" @click="save"/>
					<mu-raised-button label="取消" secondary style="width:10%;" @click="cancel"/> 
				</div>
			</div>
			
			<mu-table style="" :showCheckbox="false" :fixedHeader="true" :height="height">
				<mu-thead slot="header" >
			      <mu-tr class="printListHead">
			        <mu-th tooltip="施工单位" class="tdHeader">施工单位</mu-th>
			        <mu-th tooltip="驾驶员" class="tdHeader">驾驶员</mu-th>
			        <mu-th tooltip="本车方量" class="tdHeader">本车方量</mu-th>
			        <mu-th tooltip="工程名称" class="tdHeader">工程名称</mu-th>
			        <mu-th tooltip="运输车号" class="tdHeader">运输车号</mu-th>
			        <mu-th tooltip="浇筑方式" class="tdHeader">浇筑方式</mu-th>
			        <mu-th tooltip="施工部位" class="tdHeader">施工部位</mu-th>
			        <mu-th tooltip="强度等级" class="tdHeader">强度等级</mu-th>
			        <mu-th tooltip="发货时间" class="tdHeader">发货时间</mu-th>
			      </mu-tr>
			    </mu-thead>
			     <mu-tbody>
			      <mu-tr v-for="item,index in data">
			        <mu-td>{{item.com}}</mu-td>
			        <mu-td>{{item.driver}}</mu-td>
			        <mu-td>{{item.capacity}}</mu-td>
			        <mu-td>{{item.project}}</mu-td>
			        <mu-td>{{item.car}}</mu-td>
			        <mu-td>{{item.way}}</mu-td> 
			        <mu-td>{{item.part}}</mu-td>
			        <mu-td>{{item.strength}}</mu-td>
			        <mu-td>{{timeFormat(item.time)}}</mu-td> 
			      </mu-tr>
			    </mu-tbody>
			</mu-table>
		</div>
		<div class="hidden myDivToPrint">
			<h2 style="text-align:center">送货单</h2>
			<div style="display:flex;justify-content:space-between;padding:0 20px">
				<span>搅拌站号：{{"茂奂建材有限责任公司"}}</span>
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
					<td colspan="2" rowspan="2"><img :src="barcodeSrc" @load="print"></td>
					
				</tr>
				<tr>
					<td>施工部位</td>
					<td colspan="3">{{printData.part}}</td>
					<td>运距</td>
					<td>0</td>
					
				</tr>
				<tr>
					<td>强度等级</td>
					<td>{{printData.strength}}</td>
					<td>附加</td>
					<td>防冻</td>
					<td>发货时间</td>
					<td>{{timeFormat(printData.time)}}</td>
					<td>累计车次</td>
					<td>1</td>
				</tr>
				<tr>
					<td>塌落度</td>
					<td>{{printData.tld}}</td>
					<td>浇筑方式</td>
					<td>{{printData.way}}</td>
					<td>配比编号</td>
					<td>{{printData.pbbh}}</td>
					<td>签收人</td>
					<td></td>
				</tr>
				<tr>
					<td colspan="8" style="text-align:left">说明：求经本公司许可不得往混凝土内添加水或其它材料，否则由此引起的质量问题概不负责。</td>
				</tr>
				<tr>
					<td colspan="8" style="text-align:left;height:100px">备注：调度：13112345678</td>
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
			height: "260px",
			form: {com:null,driver:null,capacity:null,project:null,car:null,way:null,part:null,strength:null,tld:null,pbbh:null,time:moment().format("HH:mm:ss"),price:null},
			data: [],
			prices:[],
			ways:[
				{id:1,name:"自卸"},
				{id:2,name:"45米泵送"},
				{id:2,name:"52米泵送"},
			],
			item:null,   //priceItem 包含两种方式的价格
			printData:{com:null,driver:null,capacity:null,project:null,car:null,way:null,part:null,strength:null,tld:null,pbbh:null,time:moment().format("HH:mm:ss"),price:null},
			barcode:"",
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
		save() {
			this.form.capacity = Number(this.form.capacity);
			this.form.time = null;
			util.post("sales", this.form, data => {
				this.data.push(data);
				this.printData = data;
				this.barcode = this.printData.no;

				this.form.com = "";
				this.form.driver = "";
				this.form.capacity = "";
				this.form.project = "";
				this.form.car = "";
				this.form.way = "";
				this.form.part = "";
				this.form.strength = "";
				this.price = null;
				this.prices = [];
				this.item = null;
				this.form.tld = null;
				this.form.pbbh = null;
				this.form.time = moment().format("HH:mm:ss");
			}, err => {
				util.toast(err.error);
			});
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
			this.price = null;
			this.prices = [];
			this.item = null;
			this.form.tld = null;
			this.form.pbbh = null;
			this.form.time = moment().format("HH:mm:ss");
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
					this.prices = item.prices;
				}
			}
		},
		typeChange(value) {
			for(let item of this.prices) {
				if(item.name == value) {
					if(this.form.way == "自卸") {
						this.form.price = item.self;
					} else {
						this.form.price = item.auto;
					}
					this.item = item;
				}
			}
		},
		wayChange(value) {
			if(this.item != null) {
				if(value == "自卸") {
					this.form.price = this.item.self;
				} else {
					this.form.price = this.item.auto;
				}
			}
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
    		types: state => state.types,
    		salePrices: state => state.salePrices,
    		carPlates: state => state.carFrequency,
    		comFrequency: state => state.comFrequency,
    		projectFrequency: state => state.projectFrequency,
    		driverFrequency: state => state.driverFrequency,
    	}),
    	barcodeSrc() {
    		return "http://182.61.33.210/api/barcode?str=" + this.barcode;
    	}
    },
	mounted() {
		let start = encodeURIComponent(moment().startOf('day').format());
		let end = encodeURIComponent(moment().endOf('day').format());
		let url = `sales?start=${start}&end=${end}&closing=false`
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
}
.textLabel {
	font-size: 18px;
}
</style>