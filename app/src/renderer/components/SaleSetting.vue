<template>
	<div style="padding:20px;font-size:16px;">

		<h2 style="font-size:20px;text-align:center">施工单位及价格</h2>
		<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%">
			<thead>
				<td>施工单位</td><td>运距</td><td>是否含税</td><td>电话</td><td colspan="15">价格</td>
				
			</thead>
			<tbody>
				<template v-for="item in salePrices">
					<tr>
						<td rowspan="3">{{item.com}}</td><td rowspan="3">{{item.distance}}</td><td rowspan="3"><span v-if="item.tax">是</span><span v-if="!item.tax">否</span></td><td rowspan="3">{{item.tel}}</td><td colspan="9">商砼价格</td> <td colspan="6">特殊砼加价</td>
					</tr>
					<tr>
						</td><td>强度等级</td><td>C15</td><td>C20</td><td>C25</td><td>C30</td><td>C35</td><td>C40</td><td>C45</td><td>C50</td><td>特殊砼名称</td><td>泵送费</td><td>细石</td><td>抗冻F200</td><td>P6</td><td>P8</td>
					</tr>
					<tr>
						<td>价格(元/M<sup>3</sup>)</td><td>{{noset(item.price.C15)}}</td><td>{{noset(item.price.C20)}}</td><td>{{noset(item.price.C25)}}</td><td>{{noset(item.price.C30)}}</td><td>{{noset(item.price.C35)}}</td><td>{{noset(item.price.C40)}}</td><td>{{noset(item.price.C45)}}</td><td>{{noset(item.price.C50)}}</td><td>加价(元/M<sup>3</sup>)</td><td>{{noset(item.attach.auto)}}</td><td>{{noset(item.attach.small)}}</td><td>{{noset(item.attach.frost)}}</td><td>{{noset(item.attach.P6)}}</td><td>{{noset(item.attach.P8)}}</td>
					</tr>
				</template>
			</tbody>
		</table>
		
		<hr/>
		<mu-raised-button label="添加" primary @click="dialog=true" style="margin:0 20px;float:right"/>
		<mu-dialog :open="dialog" @close="close" title="添加施工单位及价格" dialogClass="dialog">
			<span>施工单位：</span><mu-text-field  v-model="form.com" />
			<span>联系电话：</span><mu-text-field  v-model="form.tel" /><br/>
			<span>运距：</span><mu-text-field  v-model="form.distance" type="number" style="width:120px;margin-right:50px"/>
			<mu-switch label="此价格是否含税：" labelLeft v-model="form.tax"/><span v-if="form.tax">是</span><span v-if="!form.tax">否</span><br/>
			<h4>1.商砼价格：</h4>
			<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%">
				<thead>
					<td>强度等级</td><td>C15</td><td>C20</td><td>C25</td><td>C30</td><td>C35</td><td>C40</td><td>C45</td><td>C50</td>
				</thead>
				<tbody>
					<td>加价(元/M<sup>3</sup>)</td><td><mu-text-field type="number"  v-model="form.price.C15" style="width:45px"/></td><td><mu-text-field type="number"  v-model="form.price.C20" style="width:45px"/></td><td><mu-text-field type="number" v-model="form.price.C25" style="width:45px"/></td><td><mu-text-field type="number" v-model="form.price.C30" style="width:45px"/></td><td><mu-text-field type="number"  v-model="form.price.C35" style="width:45px"/></td><td><mu-text-field  type="number" v-model="form.price.C40" style="width:45px"/></td><td><mu-text-field type="number" v-model="form.price.C45" style="width:45px"/></td><td><mu-text-field type="number" v-model="form.price.C50" style="width:45px"/></td>
				</tbody>
			</table>
			<h4>2.特殊砼费用：</h4>
			<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%">
				<thead>
					<td>特殊砼名称</td><td>泵送费</td><td>细石</td><td>抗冻F200</td><td>P6</td><td>P8</td>
				</thead>
				<tbody>
					<td>加价(元/M<sup>3</sup>)</td><td><mu-text-field type="number" v-model="form.attach.auto" style="width:50px"/></td><td><mu-text-field type="number" v-model="form.attach.small" style="width:50px"/></td><td><mu-text-field type="number" v-model="form.attach.frost" style="width:90px"/></td><td><mu-text-field type="number" v-model="form.attach.P6" style="width:45px"/></td><td><mu-text-field type="number" v-model="form.attach.P8" style="width:45px"/></td>
				</tbody>
			</table>
			

		    <mu-flat-button primary label="确定" @click="addSalePrices" slot="actions"/>
		</mu-dialog>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import util from '../common/util.js'
export default {
	data() { 
		return {
			form:{
				com:null,
				distance:null,
				plan:300,
				tel:'',
				tax:false, //税
				price:{C15:null,C20:null,C25:null,C30:null,C35:null,C40:null,C45:null,C50:null},
				attach:{auto:null,small:null,frost:null,P6:null,P8:null},
			},
			dialog:false,
		};
	},
	methods: {

		click() {

		},

		setFormNumber() {
			this.form.distance = Number(this.form.distance);
			this.form.price.C15 = Number(this.form.price.C15);
			this.form.price.C20 = Number(this.form.price.C20);
			this.form.price.C25 = Number(this.form.price.C25);
			this.form.price.C30 = Number(this.form.price.C30);
			this.form.price.C35 = Number(this.form.price.C35);
			this.form.price.C40 = Number(this.form.price.C40);
			this.form.price.C45 = Number(this.form.price.C45);
			this.form.price.C50 = Number(this.form.price.C50);

			this.form.attach.auto = Number(this.form.attach.auto);
			this.form.attach.small = Number(this.form.attach.small);
			this.form.attach.frost = Number(this.form.attach.frost);
			this.form.attach.P6 = Number(this.form.attach.P6);
			this.form.attach.P8 = Number(this.form.attach.P8);
		},

		addSalePrices() {
			this.setFormNumber();
			util.post("salePrices",this.form,data => {
				this.addSalePrice(data);
				this.form = {
					com:null,
					distance:null,
					plan:300,
					tel:'',
					tax:false, //税
					price:{C15:null,C20:null,C25:null,C30:null,C35:null,C40:null,C45:null,C50:null},
					attach:{auto:null,small:null,frost:null,P6:null,P8:null},
				};
			}, err => {
				util.toast(err.message);
			});
			this.dialog = false;
		},

		deleteSalePrice(index,id) {
			util.delete("salePrices/"+id, data => {
				this.removeSalePrice(index);
			});
		},
		...mapMutations([
	        'addSalePrice',
	        'removeSalePrice',
	    ]),
	    open() {
	      this.dialog = true;
	    },
	    close() {
	      this.dialog = false;
	    },
	    noset(price) {
	    	if(price == 0)
	    		return '';
	    	else 
	    		return price;
	    },
	},
	computed:{
    	...mapState({
    		salePrices: state => state.salePrices,
    	}),
    },
}
</script>

<style>
.demo-chip{
  margin: 4px;
}
.dialog {
	
}
</style>