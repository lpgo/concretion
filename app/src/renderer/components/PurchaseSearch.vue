<template>
	<div style="margin:20px;">
		<span style="font-size:18px">日期：</span><mu-date-picker mode="landscape" hintText="开始日期" v-model="start" />
		<mu-time-picker hintText="开始时间" format="24hr" v-model="startTime"  />
		至<mu-date-picker mode="landscape" hintText="结束日期" v-model="end" />
		<mu-time-picker hintText="结束时间" format="24hr" v-model="endTime"  /><br>
		<div style="display:flex;justify-content:space-around">
			<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择客户"       style="width:150px" >
				<mu-menu-item v-for="item,index in comList" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
			<mu-select-field v-model="form.name" :labelFocusClass="['label-foucs']" hintText="请选择物资"      style="width:150px">
				<mu-menu-item v-for="item,index in materialList" :key="item.id" :value="item.material" :title="item.material" />
			</mu-select-field>
			<mu-select-field v-model="form.standard" :labelFocusClass="['label-foucs']" hintText="请选择规格"     style="width:150px">
				<mu-menu-item v-for="item,index in standardList" :key="item.id" :value="item.standard" :title="item.standard"/>
			</mu-select-field>
			<mu-text-field hintText="请输入车号"   v-model="form.car"  style="width:150px"/>
			<mu-text-field hintText="请输入单号"   v-model="form.no"  style="width:150px"/>
	  		<mu-raised-button label="查询"  primary @click="search"  style="margin-left:20px"/>
	  		<mu-raised-button label="清空条件"  secondary @click="clear"  style="margin-left:20px"/>
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
		        <mu-th tooltip="操作" class="tdHeader">修改</mu-th>
				<mu-th tooltip="操作" class="tdHeader">删除</mu-th>
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
		        <mu-td><mu-flat-button label="修改" primary @click="updata(item.id,index)"/></mu-td>
		        <mu-td><mu-flat-button label="删除" secondary @click="remove(item.id,index)"/></mu-td> 
		      </mu-tr>
		    </mu-tbody>
		</mu-table>

		<mu-dialog :open="dialog" @close="close" dialogClass="dialog" >
			<mu-select-field v-model="updataForm.com" :labelFocusClass="['label-foucs']" hintText="请选择客户" style=""  fullWidth @change="updateComChange"   >
				<mu-menu-item v-for="item,index in comList" :key="item.id" :value="item.com" :title="item.com" />
			</mu-select-field>
			<mu-text-field hintText="请输入车号"  fullWidth  v-model="updataForm.car" />

			<mu-select-field v-model="updataForm.name" :labelFocusClass="['label-foucs']" hintText="请选择物资"    @change="updateNameChange" labelFloat >
				<mu-menu-item v-for="item,index in updataMaterialList" :key="item.id" :value="item.material" :title="item.material" />
			</mu-select-field>

			<mu-select-field v-model="updataForm.standard" :labelFocusClass="['label-foucs']" hintText="请选择规格"   fullWidth   >
				<mu-menu-item v-for="item,index in updataStandardList" :key="item.id" :value="item.standard" :title="item.standard" />
			</mu-select-field>

			<mu-text-field hintText="请输入单价"  fullWidth type="number" v-model="updataForm.price" />

			<div class="labelGroup">
				<mu-text-field label="请输入扣款" labelFloat type="number" v-model="updataForm.chargebacks"  style="width:150px"/>
				<mu-text-field label="请输入扣款原因" labelFloat fullWidth type="text" v-model="updataForm.reason" />
			</div>
			<div class="labelGroup">
				<mu-text-field label="请输入毛重" labelFloat fullWidth type="number" v-model="updataForm.totalWeight" />
				<mu-text-field label="请输入皮重" labelFloat fullWidth type="number" v-model="updataForm.carWeight" />

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
			updataForm:{com:null,name:null,car:null,standard:null,price:null,chargebacks:null,reason:null,totalWeight:null,carWeight:null},
			value:"false",
			data:[],
			start:moment().format('YYYY-MM-DD'),
			startTime:"00:00",
			end:moment().format('YYYY-MM-DD'),
			endTime:"23:59",
			comList:[],    //客户列表
		  	materialList:[], //物资列表
		  	standardList:[],

		  	//updataComList:[],
		  	updataMaterialList:[],
		  	updataStandardList:[],

		  	dialog:false,
		};
	},
	methods: {
		clear() {
			this.form = {com:null,name:null,standard:null,car:null,no:null};
		},
		updataSure() {
			this.updataForm.price = Number(this.updataForm.price);
			this.updataForm.chargebacks = Number(this.updataForm.chargebacks);
			this.updataForm.totalWeight = Number(this.updataForm.totalWeight);
			this.updataForm.carWeight = Number(this.updataForm.carWeight);
			this.updataForm.weight = this.updataForm.totalWeight - this.updataForm.carWeight;
			this.updataForm.total = this.updataForm.price * this.updataForm.weight;
			this.updataForm.total -= this.updataForm.chargebacks;
			util.put("purchases/"+this.updataForm.id, this.updataForm, data =>{
				this.dialog = false;
			},err =>{
				util.toast("修改失败");
			}, true);
		},
		updata(id,index) {
			this.willSelect(this.data[index]);
			this.updataForm = this.data[index];
			this.dialog = true;
		},
		remove(id,index) {
			if(!confirm("确定删除？")) 
				return ;
			util.delete("purchases/"+id, data=>{
				this.data.splice(index,1);
			}, err=>{
				util.toast("删除失败");
			}, true);
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
			let s = encodeURIComponent(moment(this.start+' '+this.startTime).format());
			let e = encodeURIComponent(moment(this.end+' '+this.endTime).format());
			let url = `purchases?start=${s}&end=${e}`
			if(this.form.com) {
				url += '&com='+this.form.com;
			}
			if(this.form.name) {
				url += '&name='+this.form.name;
			}
			if(this.form.standard) {
				url += '&standard='+this.form.standard;
			}
			if(this.form.car) {
				url += '&car='+this.form.car;
			}
			if(this.form.no) {
				url += '&no='+this.form.no;
			}
			util.get(url, data => {
				if(data) {
					this.data = data;
				} else {
					this.data = [];
				}
			});
		},
		willSelect(value) {
			this.updataMaterialList = [];
			l1:for(let item of this.purchasePrices) {
				if(item.com == value.com) {
					for(let m of this.updataMaterialList) {
						if(item.material == m.material)
							continue  l1;
					}
					this.updataMaterialList.push(item);
				}
			}
			this.updataStandardList = [];
			for(let item of this.purchasePrices) {
				if(item.com == value.com && item.material == value.name) {
					this.updataStandardList.push(item);
				}
			}
		},
		updateComChange(value) {
			this.updataMaterialList = [];
			this.updataForm.name = null;
			l3:for(let item of this.purchasePrices) {
				if(item.com == value) {
					for(let m of this.updataMaterialList) {
						if(item.material == m.material)
							continue  l3;
					}
					this.updataMaterialList.push(item);
				}
			}
			
		},
		updateNameChange(value) {
			this.updataStandardList = [];
			this.updataForm.standard = null;
			for(let item of this.purchasePrices) {
				if(item.com == this.updataForm.com && item.material == value) {
					this.updataStandardList.push(item);
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
		out1:for(let p of this.purchasePrices) {
			for(let c of this.materialList) {
				if(c.material == p.material)
					continue out1;
			}
			this.materialList.push(p);
		}
		out2:for(let p of this.purchasePrices) {
			for(let c of this.standardList) {
				if(c.standard == p.standard)
					continue out2;
			}
			this.standardList.push(p);
		}
	},
}
</script>

<style>
	.timeClass {
		width: 50px;
	}
</style>