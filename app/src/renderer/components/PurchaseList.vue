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
	        <mu-th tooltip="皮重" class="tdHeader">皮重</mu-th>
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
	        <mu-td>{{item.carWeight}}</mu-td> 
	      </mu-tr>
	    </mu-tbody>
	</mu-table>
</template>
<script>
export default {
	name: "PurchaseList",
	props: ['data', 'height', 'theadClass'],
	data() {
		return {};
	},
	methods: {
		click(index, tr) {
			console.log("table row click");
			this.$emit('select', index, tr);
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