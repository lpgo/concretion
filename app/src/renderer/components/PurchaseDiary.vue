<template>
	<mu-table style="margin:20px;" :showCheckbox="false" :fixedHeader="true" >
		<mu-thead slot="header" >
	      <mu-tr class="printListHead">
	      	<mu-th tooltip="时间" class="tdHeader" style="width:180px">时间</mu-th>
	      	<mu-th tooltip="单号" class="tdHeader">单号</mu-th>
	        <mu-th tooltip="客户" class="tdHeader" style="white-space:wrap">客户</mu-th>
	        <mu-th tooltip="车号" class="tdHeader">车号</mu-th>
	        <mu-th tooltip="物资" class="tdHeader">物资</mu-th>
	        <mu-th tooltip="规格" class="tdHeader">规格</mu-th>
	        <mu-th tooltip="单价" class="tdHeader">单价</mu-th>
	        <mu-th tooltip="毛重" class="tdHeader">毛重</mu-th>
	        <mu-th tooltip="皮重" class="tdHeader" >皮重</mu-th>
	        <mu-th tooltip="净重" class="tdHeader">净重</mu-th>
	        <mu-th tooltip="总价" class="tdHeader">总价</mu-th>
	        <mu-th tooltip="实付" class="tdHeader" >实付</mu-th>
	      </mu-tr>
	    </mu-thead>
	     <mu-tbody>
	      <mu-tr v-for="item,index in data">
	      	<mu-td style="width:180px">{{dateFormat(item.time)}}</mu-td>
	      	<mu-td>{{item.no}}</mu-td>
	        <mu-td style="white-space:pre-line">{{item.com}}</mu-td>
	        <mu-td>{{item.car}}</mu-td>
	        <mu-td>{{item.name}}</mu-td>
	        <mu-td>{{item.standard}}</mu-td>
	        <mu-td>{{item.price}}</mu-td>
	        <mu-td>{{item.totalWeight}}</mu-td>
	        <mu-td>{{item.carWeight}}</mu-td> 
	        <mu-td>{{item.weight.toFixed(2)}}</mu-td> 
	        <mu-td>{{item.total.toFixed(2)}}</mu-td> 
	        <mu-td>{{myFix(item.total)}}</mu-td> 
	      </mu-tr>
	    </mu-tbody>
	</mu-table>
</template>
<script>

import util from '../common/util.js'
import moment from 'moment'

export default {
	data() {
		return {
			data:[],
		};
	},
	methods: {
		myFix(num) {
			return util.myFix(num);
		},
		dateFormat(time) {
			return moment(time).format("YYYY-MM-DD HH:mm:ss");
		},
	},
	mounted() {
		let start = encodeURIComponent(moment().startOf('day').subtract(45, 'days').format()); 
		let end = encodeURIComponent(moment().endOf('day').format());
		let url = `purchases?start=${start}&end=${end}`
		util.get(url, data => {
			if(data) {
				this.data = data;
			}
		},err => {
			util.toast(err.message);
		},true);
	}
}
</script>