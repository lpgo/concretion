<template>
	<div style="margin:20px;">
		<mu-date-picker mode="landscape" hintText="开始时间" v-model="start" />
		<mu-date-picker mode="landscape" hintText="结束时间" v-model="end"  />
		<mu-radio label="未结账" name="group" nativeValue="false" v-model="value"  />
		<mu-radio label="已结账" name="group" nativeValue="true" v-model="value"/> 
	  	<mu-raised-button label="查询"  primary @click="search"  style="margin-left:20px"/>
	  	<mu-table  :showCheckbox="false" :fixedHeader="true" >
			<mu-thead slot="header" >
		      <mu-tr class="printListHead">
		        <mu-th tooltip="施工单位" class="tdHeader">施工单位</mu-th>
		        <mu-th tooltip="车号" class="tdHeader">车号</mu-th>
		        <mu-th tooltip="名称" class="tdHeader">名称</mu-th>
		        <mu-th tooltip="单价" class="tdHeader">单价</mu-th>
		        <mu-th tooltip="净重" class="tdHeader">净重</mu-th>
		        <mu-th tooltip="总价" class="tdHeader">总价</mu-th>
		        <mu-th tooltip="操作" class="tdHeader">操作</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		      <mu-tr v-for="item,index in data">
		        <mu-td>{{item.com}}</mu-td>
		        <mu-td>{{item.car}}</mu-td>
		        <mu-td>{{item.name}}</mu-td>
		        <mu-td>{{item.price}}</mu-td>
		        <mu-td>{{item.weight.toFixed(2)}}</mu-td>
		        <mu-td>{{item.total.toFixed(2)}}</mu-td>
		        <mu-td><mu-flat-button label="结账" primary @click="close(item.id,index)" v-if="!item.closing"/></mu-td> 
		      </mu-tr>
		    </mu-tbody>
		</mu-table>
	</div>
</template>

<script>
import util from '../common/util.js'
import moment from 'moment'

export default {
	data() {
		return {
			value:"false",
			data:[],
			start:moment().format('YYYY-MM-DD'),
			end:moment().format('YYYY-MM-DD'),
		};
	},
	methods: {
		close(id,index) {               //结账
			util.patch("purchases/"+id,{closing:true},data => {
				this.data.splice(index,1);
			});
		},
		search() {
			this.get();
		},
		get() {
			let s = encodeURIComponent(moment(this.start).startOf('day').format());
			let e = encodeURIComponent(moment(this.end).endOf('day').format());
			let url = `purchases?start=${s}&end=${e}&closing=${this.value}&complate=true`
			util.get(url, data => {
				if(data) {
					this.data = data;
				}
			});
		}
	},
	mounted() {
		this.get();
	},
}
</script>