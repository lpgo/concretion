<template>
	<div style="padding:20px;font-size:16px;">
		<span style="font-size:20px">型号：</span>
		<template v-for="item,index in types">
			<mu-chip class="demo-chip"  @delete="removeType(index)" showDelete>{{item.name}}</mu-chip>
		</template>
		<mu-text-field  v-model="type" style="margin-left:20px;width:100px;"/><mu-raised-button label="添加" primary @click="add" style="margin:0 20px;"/>
		<hr/>
		<span style="font-size:20px">销售价格</span>
		<mu-text-field  v-model="newPrice.com" style="margin-left:20px;width:200px;" hintText="公司名称"/>
		<template v-for="t,index in types">
 			<mu-text-field  v-model="newPrice[t.name]" style="margin-left:20px;width:150px;" :hintText="t.name"/>
      	</template>
		<mu-raised-button label="添加" primary @click="addSalePrices" style="margin:0 20px;"/>
		<mu-table :showCheckbox="false" @rowClick="click">
			<mu-thead slot="header" >
		      <mu-tr class="printListHead" >
		      	<mu-th tooltip="公司名称" class="tdHeader">公司名称</mu-th>
		      	<template v-for="item,index in types">
		      		<mu-th tooltip="item.name" class="tdHeader">{{item.name}}</mu-th>
		      	</template>
		      	<mu-th tooltip="操作" class="tdHeader">操作</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		     	<mu-tr v-for="item,index in salePrices">
		     		<mu-td>{{item.com}}</mu-td>
		     		<template v-for="t,ind in types">
		     			<mu-td>{{item[t.name]}}</mu-td>
			      	</template>
			      	<mu-td>
			      		<mu-flat-button label="删除" primary @click="removeSalePrice(index)"/>
			      	</mu-td>
			    </mu-tr>
		    </mu-tbody>
		</mu-table>
		<hr/>
		<span style="font-size:20px">采购价格</span>
		<mu-text-field  v-model="newPurchasePrice.com" style="margin-left:20px;width:200px;" hintText="公司名称"/>
		<template v-for="p in newPurchasePrice.prices">
			<span>{{p.name}}:{{p.price}},</span>&nbsp
		</template>
		<mu-text-field  v-model="purchaseName" style="margin-left:50px;width:100px;" hintText="名称"/>
		<mu-text-field  v-model="purchasePrice" style="width:100px;" hintText="价格" type="number"/>
		<mu-raised-button label="添加价格" secondary @click="addPrice" style="margin:0 20px;"/>
		<mu-raised-button label="确认" primary @click="addPurchasePrices" style="margin:0 20px;"/>

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
							<span>{{p.name}}:{{p.price}},</span>&nbsp
						</template>
					</mu-td>
			      	<mu-td>
			      		<mu-flat-button label="删除" primary @click="removePurchasePrice(index)"/>
			      	</mu-td>
			    </mu-tr>
		    </mu-tbody>
		</mu-table>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
	data() { 
		return {
			type:'',
			newPrice:{com:null},
			newPurchasePrice:{com:null,prices:[]},
			purchaseName:'',
			purchasePrice:null,
		};
	},
	methods: {
		add() {
			this.addType(this.type);
			this.$set(this.newPrice,this.type,null);
			this.type = null;
		},
		click() {

		},
		addSalePrices() {
			this.addSalePrice({...this.newPrice});
			this.newPrice.com = null;
			for(let item of this.types) {
				this.newPrice[item.name] = null;
			}
			console.log(this.newPrice);
		},
		addPurchasePrices() {
			console.log(this.newPurchasePrice);
			this.addPurchasePrice({...this.newPurchasePrice});
			this.newPurchasePrice.com = null;
			this.newPurchasePrice.prices = [];
			this.purchasePrice = null;
			this.purchaseName = null;
		},
		addPrice() {
			this.newPurchasePrice.prices.push({name:this.purchaseName,price:this.purchasePrice});
			this.purchasePrice = null;
			this.purchaseName = null;
		},
		...mapMutations([
	        'addType',
	        'removeType',
	        'addSalePrice',
	        'removeSalePrice',
	        'addPurchasePrice',
	        'removePurchasePrice',
	    ]),
	},
	computed:{
    	...mapState({
    		types: state => state.types,
    		salePrices: state => state.salePrices,
    		purchasePrices: state => state.purchasePrices,
    	}),
    },
    mounted() {
    	for(let item of this.types) {
			this.$set(this.newPrice,item.name,null);
		}
    },
}
</script>

<style>
.demo-chip{
  margin: 4px;
}
</style>