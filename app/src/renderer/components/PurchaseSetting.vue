<template>
	<div style="padding:20px" class="myDivToPrint">
		<h2 style="font-size:20px;text-align:center">采购价格</h2>
		<mu-table :showCheckbox="false">
			<mu-thead slot="header" >
		      <mu-tr class="printListHead" >
		      	<mu-th tooltip="公司名称" class="tdHeader">公司名称</mu-th>
		      	<mu-th tooltip="价格" class="tdHeader">价格</mu-th>
		      	<mu-th tooltip="操作" class="tdHeader">操作</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		     	<mu-tr v-for="item,index in purchasePrices">
		     		<mu-td>{{item.com}}</mu-td>
		     		<mu-td>
			     		<template v-for="p in item.prices">
							<span style="font-size:18px">{{p.name}}:{{p.price}}&nbsp&nbsp&nbsp</span>
						</template>
					</mu-td>
			      	<mu-td>
			      		<mu-flat-button label="删除" primary @click="deletePurchasePrice(index,item.id)"/>
			      	</mu-td>
			    </mu-tr>
		    </mu-tbody>
		</mu-table>
		<hr/>
		<mu-raised-button label="添加" primary @click="dialog=true" style="margin:0 20px;float:right"/>
		<mu-raised-button label="打印" primary @click="myPrint" style="margin:0 20px;float:right"/>
		<mu-dialog :open="dialog" @close="close" title="添加采购价格" dialogClass="dialog">
			<mu-text-field  v-model="newPurchasePrice.com" style="" hintText="公司名称"/>
			<template v-for="p in newPurchasePrice.prices">
				<span style="font-size:18px">{{p.name}}:{{p.price}}&nbsp&nbsp&nbsp</span>
			</template>
			<mu-text-field  v-model="purchaseName" style="" hintText="名称"/>
			<mu-text-field  v-model="purchasePrice" style="" hintText="价格" type="number"/>
			<mu-raised-button label="添加价格" secondary @click="addPurchasePriceItem" style=""/>
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
			newPurchasePrice:{com:null,prices:[]},
			purchaseName:'',
			purchasePrice:null,
			dialog:false,
		};
	},
	methods: {
		
		addPurchasePrices() {
			console.log(this.newPurchasePrice);
			util.post("purchasePrices",this.newPurchasePrice, data => {
				this.addPurchasePrice(data);
				this.newPurchasePrice.com = null;
				this.newPurchasePrice.prices = [];
				this.purchasePrice = null;
				this.purchaseName = null;
			});
			this.dialog = false;
		},
		addPurchasePriceItem() {
			this.newPurchasePrice.prices.push({name:this.purchaseName,price:Number(this.purchasePrice)});
			this.purchasePrice = null;
			this.purchaseName = null;
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
	@media print {
		.myDivToPrint {
			background-color: red;
			height: 100%;
			width: 100%;
			position: fixed;
			top:0;
			left: 0;
			margin: 0;
			padding: 15px;
			font-size: 14px;
			line-height: 18px;
		}
	}
</style>