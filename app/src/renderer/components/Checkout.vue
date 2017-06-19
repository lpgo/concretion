<template>
	<div style="margin:20px;">
		<div style="display:flex;padding:10px">
			<mu-radio label="采购" name="group" nativeValue="p" v-model="value"  />
			<mu-radio label="销售" name="group" nativeValue="s" v-model="value"/> 
			<span style="margin-left:30px;font-size:22px">单号：</span><input type="text" v-model="no" @keydown.enter="get" ref="no">
			<mu-raised-button label="查询" primary  @click="get" style="margin-left:30px" />
		  	
	  	</div>
	  	<mu-table  :showCheckbox="false" :fixedHeader="true" v-if="value == 's'">
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
		      <mu-tr v-for="item,index in sData">
		        <mu-td>{{item.com}}</mu-td>
		        <mu-td>{{item.driver}}</mu-td>
		        <mu-td>{{item.capacity}}</mu-td>
		        <mu-td>{{item.project}}</mu-td>
		        <mu-td>{{item.car}}</mu-td>
		        <mu-td>{{item.way}}</mu-td>
		        <mu-td>{{item.part}}</mu-td>
		        <mu-td>{{item.strength}}</mu-td>
		        <mu-td>{{dateFormat(item.time)}}</mu-td> 
		        <mu-td><mu-flat-button label="删除" primary @click="removeSale(item.id,index)" v-if="!item.closing"/></mu-td> 
		      </mu-tr>
		    </mu-tbody>
		</mu-table>

		<mu-table  :showCheckbox="false" :fixedHeader="true" v-if="value == 'p'">
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
		      <mu-tr v-for="item,index in pData">
		        <mu-td>{{item.com}}</mu-td>
		        <mu-td>{{item.car}}</mu-td>
		        <mu-td>{{item.name}}</mu-td>
		        <mu-td>{{item.price}}</mu-td>
		        <mu-td>{{item.weight.toFixed(2)}}</mu-td>
		        <mu-td>{{item.total.toFixed(2)}}</mu-td>
		        <mu-td><mu-flat-button label="删除" primary @click="removePurchase(item.id,index)" v-if="!item.closing"/></mu-td> 
		      </mu-tr>
		    </mu-tbody>
		</mu-table>
		<mu-raised-button label="全部结账"  primary @click="check"  style="margin-top:20px;float:right"/>
	</div>
</template>

<script>
import util from '../common/util.js'
import moment from 'moment'

export default {
	data() {
		return {
			value:"p",
			sData:[],
			pData:[],
			no:null,
		};
	},
	methods: {
		removeSale(id,index) {               
			this.sData.splice(index,1);
		},
		removePurchase(id,index) {               
			this.pData.splice(index,1);
		},
		check() {    //结账
			if(this.value == "s") {
				let total = 0;
				for (var i = this.sData.length - 1; i >= 0; i--) {
					total += this.sData[i].total;
				}
				if(confirm("共计："+total+",确定结账吗？")) {
					for (var i = this.sData.length - 1; i >= 0; i--) {
						util.patch("sales/"+this.sData[i].id,{closing:true},data => {
							this.sData.pop();
						});
					}
				}
			} else {
				let total = 0;
				for (var i = this.pData.length - 1; i >= 0; i--) {
					total += this.pData[i].total;
				}
				if(confirm("共计："+total+",确定结账吗？")) {
					for (var i = this.pData.length - 1; i >= 0; i--) {
						util.patch("purchases/"+this.pData[i].id,{closing:true},data => {
							this.pData.pop();
						});
					}
				}
			}
		},
		get() {
			let url;
			if(this.value == "s"){
				url = `sales?closing=false&no=${this.no}`
				util.get(url, data => {
					if(data) {
						this.sData.push(data[0]);
					}
				});
			} else {
				url = `purchases?closing=false&no=${this.no}`
				util.get(url, data => {
					if(data) {
						this.pData.push(data[0]);
					}
				});
			}
			this.no = null;
		},
		dateFormat(time) {
			return moment(time).format("YYYY-MM-DD HH:mm");
		},
	},
	mounted() {
		//this.get();
		this.$refs.no.focus()
	},
}
</script>