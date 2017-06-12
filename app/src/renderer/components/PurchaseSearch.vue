<template>
	<div style="margin:20px;">
		<span style="font-size:18px">日期：</span><mu-date-picker mode="landscape" hintText="开始日期" v-model="start" />
		<mu-time-picker hintText="开始时间" format="24hr" v-model="startTime"  />
		至<mu-date-picker mode="landscape" hintText="结束日期" v-model="end" />
		<mu-time-picker hintText="结束时间" format="24hr" v-model="endTime"  /><br>
		<div style="display:flex;justify-content:space-around">
			<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择客户"    @change="comChange"   style="width:150px" >
				<mu-menu-item v-for="item,index in comList" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
			<mu-select-field v-model="form.name" :labelFocusClass="['label-foucs']" hintText="请选择物资"    @change="nameChange"  style="width:150px">
				<mu-menu-item v-for="item,index in materialList" :key="item.id" :value="item.material" :title="item.material" />
			</mu-select-field>
			<mu-select-field v-model="form.standard" :labelFocusClass="['label-foucs']" hintText="请选择规格"     style="width:150px">
				<mu-menu-item v-for="item,index in standardList" :key="item.id" :value="item.standard" :title="item.standard"/>
			</mu-select-field>
			<mu-text-field hintText="请输入车号"   v-model="form.car"  style="width:150px"/>
			<mu-text-field hintText="请输入单号"   v-model="form.no"  style="width:150px"/>
	  		<mu-raised-button label="查询"  primary @click="search"  style="margin-left:20px"/>
	  	</div>
	  	<mu-table  :showCheckbox="false" :fixedHeader="true" >

			
		    <mu-thead slot="header" >
		      <mu-tr class="printListHead">
		      	<mu-th tooltip="单号" class="tdHeader">单号</mu-th>
		        <mu-th tooltip="客户" class="tdHeader">客户</mu-th>
		        <mu-th tooltip="车号" class="tdHeader">车号</mu-th>
		        <mu-th tooltip="物资" class="tdHeader">物资</mu-th>
		        <mu-th tooltip="规格" class="tdHeader">规格</mu-th>
		        <mu-th tooltip="单价" class="tdHeader">单价</mu-th>
		        <mu-th tooltip="毛重" class="tdHeader">毛重</mu-th>
		        <mu-th tooltip="皮重" class="tdHeader">皮重</mu-th>
		        <mu-th tooltip="总价" class="tdHeader">总价</mu-th>
		        <mu-th tooltip="操作" class="tdHeader">操作</mu-th>

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
		        <mu-td>{{item.total.toFixed(2)}}</mu-td>
		        <mu-td><mu-flat-button label="修改" primary @click="updata(item.id,index)" v-if="!item.closing"/></mu-td> 
		      </mu-tr>
		    </mu-tbody>
		</mu-table>

		<mu-dialog :open="dialog" @close="close" dialogClass="dialog" >
			<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择客户" style=""  fullWidth @change="comChange"   >
				<mu-menu-item v-for="item,index in comList" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
			<mu-text-field hintText="请输入车号"  fullWidth  v-model="form.car" />

			<mu-select-field v-model="form.name" :labelFocusClass="['label-foucs']" hintText="请选择物资"    @change="nameChange" labelFloat >
				<mu-menu-item v-for="item,index in materialList" :key="item.id" :value="item.material" :title="item.material" />
			</mu-select-field>

			<mu-select-field v-model="form.standard" :labelFocusClass="['label-foucs']" hintText="请选择规格"   fullWidth   >
				<mu-menu-item v-for="item,index in standardList" :key="item.id" :value="item.standard" :title="item.standard" />
			</mu-select-field>

			<mu-text-field hintText="请输入单价"  fullWidth type="number" v-model="form.price" />

			<div class="labelGroup">
				<mu-text-field label="请输入扣款" labelFloat type="number" v-model="form.chargebacks"  style="width:150px"/>
				<mu-text-field label="请输入扣款原因" labelFloat fullWidth type="text" v-model="form.reason" />
			</div>
			<div class="labelGroup">
				<mu-text-field label="请输入毛重" labelFloat fullWidth type="number" v-model="form.totalWeight" />
				<mu-text-field label="请输入皮重" labelFloat fullWidth type="number" v-model="form.carWeight" />

			</div>
			<mu-raised-button label="确定"   @click="updataSure" primary fullWidth />
		</mu-dialog>

	</div>
</template>

<script>
import util from '../common/util.js'
import moment from 'moment'
import { mapState,mapMutations } from 'vuex'

export default {
	data() {
		return {
			form:{com:null,name:null,standard:null,car:null,no:null},
			value:"false",
			data:[],
			start:moment().format('YYYY-MM-DD'),
			startTime:"00:00",
			end:moment().format('YYYY-MM-DD'),
			endTime:"23:59",
			comList:[],    //客户列表
		  	materialList:[], //物资列表
		  	standardList:[],

		  	dialog:false,
		};
	},
	methods: {
		updataSure() {

		},
		updata(id,index) {
			this.willSelect(this.data[index]);
			this.form = this.data[index];
			this.dialog = true;
		},
		open() {
	      this.dialog = true;
	    },
	    close() {
	      this.dialog = false;
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
		},
		willSelect(value) {
			this.materialList = [];
			for(let item of this.purchasePrices) {
				if(item.com == value.com) {
					this.materialList.push(item);
				}
			}
			this.standardList = [];
			for(let item of this.materialList) {
				if(item.material == value.name) {
					this.standardList.push(item);
				}
			}
			this.disabled = true;   
		},
		comChange(value) {
			this.materialList = [];
			this.form.name = null;
			for(let item of this.purchasePrices) {
				if(item.com == value) {
					this.materialList.push(item);
				}
			}
			
		},
		nameChange(value) {
			this.standardList = [];
			this.form.standard = null;
			for(let item of this.materialList) {
				if(item.material == value) {
					this.standardList.push(item);
				}
			}
			
		},
	},
	computed:{
	    	...mapState({
	    		purchasePrices: state => state.purchasePrices,
	    		carPlates: state => state.carFrequency,
	    	}),
	    },
	mounted() {
		//this.get();
		out:for(let p of this.purchasePrices) {
			for(let c of this.comList) {
				if(c.com == p.com)
					continue out;
			}
			this.comList.push(p);
		}
	},
}
</script>

<style>
	.timeClass {
		width: 50px;
	}
</style>