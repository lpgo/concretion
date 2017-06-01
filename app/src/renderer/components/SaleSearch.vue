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
		        <mu-th  class="tdHeader">施工单位</mu-th>
		        <mu-th  class="tdHeader">驾驭员</mu-th>
		        <mu-th  class="tdHeader">本车方量</mu-th>
		        <mu-th  class="tdHeader">工程名称</mu-th>
		        <mu-th  class="tdHeader">运输车号</mu-th>
		        <mu-th  class="tdHeader">浇筑方式</mu-th>
		        <mu-th  class="tdHeader">施工部位</mu-th>
		        <mu-th  class="tdHeader">强度等级</mu-th>
		        <mu-th  class="tdHeader">发货时间</mu-th>
		        <mu-th  class="tdHeader">操作</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		      <mu-tr v-for="item,index in data">
		        <mu-td>{{item.com}}</mu-td>
		        <mu-td>{{item.driver}}</mu-td>
		        <mu-td>{{item.capacity}}</mu-td>
		        <mu-td>{{item.project}}</mu-td>
		        <mu-td>{{item.car}}</mu-td>
		        <mu-td>{{item.way}}</mu-td>
		        <mu-td>{{item.part}}</mu-td>
		        <mu-td>{{item.strength}}</mu-td>
		        <mu-td>{{dateFormat(item.time)}}</mu-td> 
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
		close(id,index) {    
			if(confirm("共计："+this.data[index].total+",确定结账吗？")){
				util.patch("sales/"+id,{closing:true},data => {
					this.data.splice(index,1);
				});
			}           //结账
		},
		search() {
			this.get();
		},
		get() {
			let s = encodeURIComponent(moment(this.start).startOf('day').format());
			let e = encodeURIComponent(moment(this.end).endOf('day').format());
			let url = `sales?start=${s}&end=${e}&closing=${this.value}`
			util.get(url, data => {
				if(data) {
					this.data = data;
				}
			});
		},
		dateFormat(time) {
			return moment(time).format("YYYY-MM-DD HH:mm");
		},
	},
	mounted() {
		this.get();
	},
}
</script>