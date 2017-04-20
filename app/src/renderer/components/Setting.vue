<template>
	<div style="padding:20px;font-size:16px;">
		<span style="font-size:20px">型号：</span>
		<template v-for="item,index in types">
			<mu-chip class="demo-chip"  @delete="removeType(index)" showDelete>{{item.name}}</mu-chip>
		</template>
		<mu-text-field  v-model="type" style="margin-left:20px;width:100px;"/><mu-raised-button label="添加" primary @click="add" style="margin:0 20px;"/>
		<hr/>
		<mu-text-field  v-model="newPrice.com" style="margin-left:20px;width:200px;" hintText="公司名称"/>
		<template v-for="t,index in types">
 			<mu-text-field  v-model="newPrice[t.name]" style="margin-left:20px;width:150px;" :hintText="t.name"/>
      	</template>
		<mu-raised-button label="添加" primary @click="addPrices" style="margin:0 20px;"/>
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
		     	<mu-tr v-for="item,index in price">
		     		<mu-td>{{item.com}}</mu-td>
		     		<template v-for="t,ind in types">
		     			<mu-td>{{item[t.name]}}</mu-td>
			      	</template>
			      	<mu-td>
			      		<mu-flat-button label="删除" primary @click="removePrice(index)"/>
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
		addPrices() {
			this.addPrice({...this.newPrice});
			this.newPrice.com = null;
			for(let item of this.types) {
				this.newPrice[item.name] = null;
			}
			console.log(this.newPrice);
		},
		...mapMutations([
	        'addType',
	        'removeType',
	        'addPrice',
	        'removePrice',
	    ]),
	},
	computed:{
    	...mapState({
    		types: state => state.types,
    		price: state => state.price,
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