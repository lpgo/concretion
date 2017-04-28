<template>
	<div style="padding:20px;font-size:16px;">
		<span style="font-size:20px">型号：</span>
		<template v-for="item,index in types">
			<mu-chip class="demo-chip"  @delete="deleteType(index,item.id)" showDelete>{{item.name}}</mu-chip>
		</template>
		<mu-text-field  v-model="type" style="margin-left:20px;width:100px;"/><mu-raised-button label="添加" primary @click="add" style="margin:0 20px;"/>
		<hr/>
		<h2 style="font-size:20px;text-align:center">销售价格</h2>
		<mu-table :showCheckbox="false" @rowClick="click">
			<mu-thead slot="header" >
		      <mu-tr class="printListHead" >
		      	<mu-th tooltip="公司名称" class="tdHeader">公司名称</mu-th>
				<mu-th tooltip="价格" class="tdHeader">价格</mu-th>
		      	<mu-th tooltip="操作" class="tdHeader">操作</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		     	<mu-tr v-for="item,index in salePrices">
		     		<mu-td>{{item.com}}</mu-td>
		     		<mu-td>
			     		<template v-for="p in item.prices">
							<mu-chip class="demo-chip">{{p.name}}&nbsp&nbsp&nbsp&nbsp泵送:{{p.auto}},自卸:{{p.self}}</mu-chip>
						</template>
					</mu-td>
			      	<mu-td>
			      		<mu-flat-button label="删除" primary @click="deleteSalePrice(index,item.id)"/>
			      	</mu-td>
			    </mu-tr>
		    </mu-tbody>
		</mu-table>
		<hr/>
		<mu-raised-button label="添加" primary @click="dialog=true" style="margin:0 20px;float:right"/>
		<mu-dialog :open="dialog" @close="close" title="添加销售价格" dialogClass="dialog">
			<mu-text-field  v-model="newSalePrice.com" style="" hintText="公司名称"/>
			<template v-for="p in newSalePrice.prices">
				<mu-chip class="demo-chip">{{p.name}}&nbsp&nbsp&nbsp&nbsp泵送:{{p.auto}},自卸:{{p.self}}</mu-chip>
			</template>
			<mu-select-field v-model="saleName" :labelFocusClass="['label-foucs']" hintText="名称" style="">
			    <mu-menu-item v-for="item,index in types" :key="item.id" :value="item.name" :title="item.name" />
			</mu-select-field>
			
			<mu-text-field  v-model="autoPrice" style="" hintText="泵送" type="number" style="width:120px"/>
			<mu-text-field  v-model="selfPrice" style="" hintText="自卸" type="number" style="width:120px"/>
			<mu-raised-button label="添加价格" secondary @click="addSalePriceItem" style="float:right"/>
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
			type:'',
			newSalePrice:{com:null,prices:[]},
			saleName:null,
			salePrice:null,
			autoPrice:null,
			selfPrice:null,
			dialog:false,
		};
	},
	methods: {
		add() {
			util.post("types",{name:this.type},data => {
				this.addType(data);
				this.type = '';
			}, err => {
				util.toast(err.message);
			});
		},
		click() {

		},
		addSalePrices() {
			util.post("salePrices",{...this.newSalePrice},data => {
				this.addSalePrice(data);
				this.newSalePrice.com = null;
				this.newSalePrice.prices = [];
				this.salePrice = null;
				this.saleName = null;
			}, err => {
				util.toast(err.message);
			});
			this.dialog = false;
		},
		addSalePriceItem() {
			this.newSalePrice.prices.push({name:this.saleName,auto:Number(this.autoPrice),self:Number(this.selfPrice)});
			this.salePrice = null;
			this.saleName = null;
			this.autoPrice = null;
			this.selfPrice = null;
		},
		deleteType(index,id) {
			util.delete("types/"+id, data => {
				this.removeType(index);
			});
		},
		deleteSalePrice(index,id) {
			util.delete("salePrices/"+id, data => {
				this.removeSalePrice(index);
			});
		},
		...mapMutations([
	        'addType',
	        'removeType',
	        'addSalePrice',
	        'removeSalePrice',
	    ]),
	    open() {
	      this.dialog = true;
	    },
	    close() {
	      this.dialog = false;
	    },
	},
	computed:{
    	...mapState({
    		types: state => state.types,
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
	width:300px;
}
</style>