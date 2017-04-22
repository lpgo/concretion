<template>
	<div style="padding:20px;font-size:16px;">
		<span style="font-size:20px">型号：</span>
		<template v-for="item,index in types">
			<mu-chip class="demo-chip"  @delete="removeType(index)" showDelete>{{item.name}}</mu-chip>
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
							<span style="font-size:18px">{{p.name}}:{{p.price}}&nbsp&nbsp&nbsp</span>
						</template>
					</mu-td>
			      	<mu-td>
			      		<mu-flat-button label="删除" primary @click="removeSalePrice(index)"/>
			      	</mu-td>
			    </mu-tr>
		    </mu-tbody>
		</mu-table>
		<hr/>
		<mu-raised-button label="添加" primary @click="dialog=true" style="margin:0 20px;float:right"/>
		<mu-dialog :open="dialog" @close="close" title="添加销售价格" dialogClass="dialog">
			<mu-text-field  v-model="newSalePrice.com" style="" hintText="公司名称"/>
			<template v-for="p in newSalePrice.prices">
				<span style="font-size:18px">{{p.name}}:{{p.price}}&nbsp&nbsp&nbsp</span>
			</template>
			<mu-select-field v-model="saleName" :labelFocusClass="['label-foucs']" hintText="名称" style="">
			    <mu-menu-item v-for="item,index in types" :key="item.id" :value="item.name" :title="item.name" />
			</mu-select-field>
			
			<mu-text-field  v-model="salePrice" style="" hintText="价格" type="number"/>
			<mu-raised-button label="添加价格" secondary @click="addSalePriceItem" style="float:right"/>
		    <mu-flat-button primary label="确定" @click="addSalePrices" slot="actions"/>
		</mu-dialog>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
	data() { 
		return {
			type:'',
			newSalePrice:{com:null,prices:[]},
			saleName:null,
			salePrice:null,
			dialog:false,
		};
	},
	methods: {
		add() {
			this.addType(this.type);
			this.type = '';
		},
		click() {

		},
		addSalePrices() {
			this.addSalePrice({...this.newSalePrice});
			this.newSalePrice.com = null;
			this.newSalePrice.prices = [];
			this.salePrice = null;
			this.saleName = null;
			this.dialog = false;
		},
		addSalePriceItem() {
			this.newSalePrice.prices.push({name:this.saleName,price:this.salePrice});
			this.salePrice = null;
			this.saleName = null;
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