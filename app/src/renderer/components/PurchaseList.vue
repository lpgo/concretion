<template>
	<mu-table style="margin:20px;" :showCheckbox="false" :fixedHeader="true" :height="height" @rowClick="click">
		<mu-thead slot="header" >
	      <mu-tr :class="theadClass">
	      	<mu-th tooltip="单号" class="tdHeader">单号</mu-th>
	        <mu-th tooltip="客户" class="tdHeader">客户</mu-th>
	        <mu-th tooltip="车号" class="tdHeader">车号</mu-th>
	        <mu-th tooltip="物资" class="tdHeader">物资</mu-th>
	        <mu-th tooltip="规格" class="tdHeader">规格</mu-th>
	        <mu-th tooltip="单价" class="tdHeader">单价</mu-th>
	        <mu-th tooltip="毛重" class="tdHeader">毛重</mu-th>
	        <mu-th tooltip="皮重" class="tdHeader" v-if="complate">皮重</mu-th>
	        <mu-th tooltip="净重" class="tdHeader" v-if="complate">净重</mu-th>
	        <mu-th tooltip="总价" class="tdHeader" v-if="complate">总价</mu-th>
	        <mu-th tooltip="实付" class="tdHeader" v-if="complate">实付</mu-th>
	      </mu-tr>
	    </mu-thead>
	     <mu-tbody>
	      <mu-tr v-for="item,index in data">
	      	<mu-td>{{item.no}}</mu-td>
	        <mu-td>{{item.com}}</mu-td>
	        <mu-td>{{item.car}}</mu-td>
	        <mu-td>{{item.name}}</mu-td>
	         <mu-td>{{item.standard}}</mu-td>
	        <mu-td>{{item.price}}</mu-td>
	        <mu-td>{{item.totalWeight}}</mu-td>
	        <mu-td v-if="complate">{{item.carWeight}}</mu-td> 
	        <mu-td v-if="complate">{{item.weight.toFixed(2)}}</mu-td> 
	        <mu-td v-if="complate">{{item.total.toFixed(2)}}</mu-td> 
	        <mu-td v-if="complate">{{myFix(item.total)}}</mu-td> 
	      </mu-tr>
	    </mu-tbody>
	</mu-table>
</template>
<script>


import util from '../common/util.js'

export default {
	name: "PurchaseList",
	props: ['data', 'height', 'theadClass','complate'],
	data() {
		return {};
	},
	methods: {
		click(index, tr) {
			this.$emit('select', index, tr);
		},
		myFix(num) {
			return util.myFix(num);
		},
	}
}
</script>
<style>
.tdHeader {
	color:white;
	font-size:13px;
}

</style>