<template>
	<div style="padding:20px" class="myDivToPrint">
		<h2 style="font-size:20px;text-align:center">采购物资及价格</h2>
		<mu-table :showCheckbox="false">
			<mu-thead slot="header" >
		      <mu-tr class="printListHead" >
		      	<mu-th tooltip="公司名称" class="tdHeader">公司名称</mu-th>
		      	<mu-th tooltip="物资" class="tdHeader">物资</mu-th>
		      	<mu-th tooltip="规格" class="tdHeader">规格</mu-th>
		      	<mu-th tooltip="价格" class="tdHeader">价格</mu-th>
		      	<mu-th tooltip="操作" class="tdHeader">操作</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		     	<mu-tr v-for="item,index in purchasePrices">
		     		<mu-td>{{item.com}}</mu-td>
		     		<mu-td>{{item.material}}</mu-td>
		     		<mu-td>{{item.standard}}</mu-td>
		     		<mu-td>{{item.price}}</mu-td>
			      	<mu-td>
			      		<mu-flat-button label="删除" primary @click="deletePurchasePrice(index,item.id)"/>
			      	</mu-td>
			    </mu-tr>
		    </mu-tbody>
		</mu-table>
		<hr/>
		<mu-raised-button label="添加" primary @click="dialog=true" style="margin:0 20px;float:right"/>
		
		<mu-dialog :open="dialog" @close="close" title="添加物资及价格" dialogClass="dialog" >
			<mu-text-field  v-model="newPurchasePrice.com" style="" hintText="客户"/>
			<mu-text-field  v-model="newPurchasePrice.material" hintText="物资"/>
			<mu-text-field  v-model="newPurchasePrice.standard" hintText="规格"/>
			<mu-text-field  v-model="newPurchasePrice.price"  hintText="价格" type="number"/>
			<mu-flat-button primary label="确定" @click="addPurchasePrices" slot="actions"/>
			
		</mu-dialog>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import util from '../common/util.js'
import fs from 'fs'
export default {
	data() { 
		return {
			newPurchasePrice:{com:null,material:null,standard:null,price:null},
			materialName: null,
			standards:[],
			name:null,
			price:null,
			dialog:false,
		};
	},
	methods: {	
		addPurchasePrices() {
			this.newPurchasePrice.price = Number(this.newPurchasePrice.price);
			util.post("purchasePrices",this.newPurchasePrice, data => {
				this.addPurchasePrice(data);
				this.newPurchasePrice = {com:null,material:null,standard:null,price:null};
			});
			this.dialog = false;
		},
		deletePurchasePrice(index,id) {
			util.delete("purchasePrices/"+id, data => {
				this.removePurchasePrice(index);
			});
		},
		...mapMutations([
	        'addPurchasePrice',
	        'removePurchasePrice',
	    ]),
	    open() {
	      this.dialog = true;
	    },
	    close() {
	      this.dialog = false;
	    },
	    myPrint() {
	    	//window.print();
	    	const {remote} = this.$electron;
	    	const web = remote.getCurrentWebContents();
	    	web.printToPDF({}, (error, data) => {
			    if (error) throw error
			    fs.writeFile('print.pdf', data, (error) => {
			      if (error) throw error
			      console.log('Write PDF successfully.')
			    })
			});
	    },
	},
	computed:{
    	...mapState({
    		purchasePrices: state => state.purchasePrices,
    	}),
    },
}
</script>
<style>
	
</style>