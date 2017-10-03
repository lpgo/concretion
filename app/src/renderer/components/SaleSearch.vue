<template>
	<div style="margin:20px;">
		<span style="font-size:18px">日期：</span><mu-date-picker mode="landscape" hintText="开始日期" v-model="start" @change="startChange"/>
		<mu-time-picker hintText="开始时间" format="24hr" v-model="startTime"  @change="startTimeChange" />
		至<mu-date-picker mode="landscape" hintText="结束日期" v-model="end" @change="endChange"/>
		<mu-time-picker hintText="结束时间" format="24hr" v-model="endTime"  @change="endTimeChange"/><br>

		<div style="display:flex;justify-content:space-around">
			<mu-auto-complete :filter="myfilter" hintText="请选择施工单位" v-model="form.com" openOnFocus :dataSource="coms" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="30" :errorText="error" @change="error = ''" :maxHeight="500"/>

			<mu-text-field hintText="请输入车号"   v-model="form.car"  style="width:150px"/>
			<mu-text-field hintText="请输入单号"   v-model="form.no"  style="width:150px"/>

	  		<mu-raised-button label="查询"  primary @click="search"  style="margin-left:20px"/>
	  		<mu-raised-button label="导出"  primary @click="exportExcel"  style="margin-left:20px"/>
	  		<mu-raised-button label="清空条件"  secondary @click="clear"  style="margin-left:20px"/>
	  	</div>
	  	<mu-table  :showCheckbox="false" :fixedHeader="true" >
			<mu-thead slot="header" >
		      <mu-tr class="printListHead">
		      	<mu-th  class="tdHeader">发货时间</mu-th>
		        <mu-th  class="tdHeader" style="white-space:pre-line;width:180px">施工单位</mu-th>
		        <mu-th  class="tdHeader">驾驭员</mu-th>
		        <mu-th  class="tdHeader">本车方量</mu-th>
		        <mu-th tooltip="已完方量" class="tdHeader">已完方量</mu-th>
			    <mu-th tooltip="计划方量" class="tdHeader">计划方量</mu-th>
		        <mu-th  class="tdHeader" style="white-space:pre-line;width:180px">工程名称</mu-th>
		        <mu-th  class="tdHeader">运输车号</mu-th>
		        <mu-th  class="tdHeader">浇筑方式</mu-th>
		        <mu-th  class="tdHeader">强度等级</mu-th>
		        <mu-th  class="tdHeader">附加</mu-th>
		        <mu-th  class="tdHeader">单价</mu-th>
		        <mu-th  class="tdHeader">总价</mu-th>
		        <!--<mu-th  class="tdHeader">操作</mu-th>-->
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		      <mu-tr v-for="item,index in data">
		       	<mu-td style="white-space:pre-line">{{timeFormat(item.time)}}</mu-td> 
		        <mu-td style="white-space:pre-line;width:180px">{{item.com}}</mu-td>
		        <mu-td style="white-space:pre-line">{{item.driver}}</mu-td>
		        <mu-td style="white-space:pre-line">{{item.capacity}}</mu-td>
		        <mu-td style="white-space:pre-line">{{item.acc}}</mu-td>
			    <mu-td style="white-space:pre-line">{{item.plan}}</mu-td>
		        <mu-td style="white-space:pre-line;width:180px">{{item.project}}</mu-td>
		        <mu-td style="white-space:pre-line">{{item.car}}</mu-td>
		        <mu-td style="white-space:pre-line">{{item.way}}</mu-td>
		        <mu-td style="white-space:pre-line">{{item.strength}}</mu-td>
		       	<mu-td style="white-space:pre-line">{{showAttachs(item.attach)}}</mu-td>
		        <mu-td style="white-space:pre-line">{{item.price.toFixed(2)}}</mu-td> 
		        <mu-td style="white-space:pre-line">{{item.total.toFixed(2)}}</mu-td> 
		        <!--<mu-td><span @click="close(item.id,index)" class="greenLink" v-if="!item.closing">结账</span></mu-td>--> 
		      </mu-tr>
		    </mu-tbody>
		</mu-table>
	</div>
</template>

<script>
import util from '../common/util.js'
import conf from '../common/conf.js'
import moment from 'moment'
import { mapState,mapMutations } from 'vuex'

export default {
	data() {
		return {
			value:"false",
			data:[],
			start:moment().format('YYYY-MM-DD'),
			startTime:"00:00",
			end:moment().format('YYYY-MM-DD'),
			endTime:"23:59",
			attachs:[
				{name:"细石",value:"small"},
				{name:"抗冻F200",value:"frost"},
				{name:"P6",value:"P6"},
				{name:"P8",value:"P8"},
			],
			form:{
				com:null,
				car:null,
				no:null,
			},
			error: '',
			coms:[],   //当前时间内的所有施工单位
			myfilter (searchText, key) {
				if(searchText) {
					return key.indexOf(searchText) !== -1;
				} else {
					return true;
				}
		    },
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
		clear() {
			this.form = {
				com:null,
				car:null,
				no:null,
			};
		},
		get() {
			let s = encodeURIComponent(moment(this.start+' '+this.startTime).format());
			let e = encodeURIComponent(moment(this.end+' '+this.endTime).format());
			let url = `sales?start=${s}&end=${e}`
			if(this.form.com) {
				url += '&com='+this.form.com;
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

		exportExcel() {
			const {remote} = this.$electron;
	    	const web = remote.getCurrentWebContents();

	    	let s = encodeURIComponent(moment(this.start+' '+this.startTime).format());
			let e = encodeURIComponent(moment(this.end+' '+this.endTime).format());
			let url = `sales?start=${s}&end=${e}`
			if(this.form.com) {
				url += '&com='+this.form.com;
			}
			if(this.form.car) {
				url += '&car='+this.form.car;
			}
			if(this.form.no) {
				url += '&no='+this.form.no;
			}
	    	
	    	web.downloadURL(conf.apiUrl+url+'&fileType=excel');
		},


		dateFormat(time) {
			return moment(time).format("YYYY-MM-DD HH:mm");
		},
		timeFormat(time) {
			return moment(time).format("HH:mm");
		},
		showAttachs(attach) {
			let names = [];
			for(let a of attach) {
				for(let n of this.attachs) {
					if(a === n.value) {
						names.push(n.name);
					}
				}
			}
			return names.join(",");
		},

		startChange(start) {
			this.form.com = null;
			console.log(start);
			this.getComs(start+' '+this.startTime, this.end+' '+this.endTime);
		},

		startTimeChange(startTime) {
			this.form.com = null;
			this.getComs(this.start+' '+startTime, this.end+' '+this.endTime);
		},

		endChange(end) {
			this.form.com = null;
			this.getComs(this.start+' '+this.startTime, end+' '+this.endTime);
		},

		endTimeChange(endTime) {
			this.form.com = null;
			this.getComs(this.start+' '+this.startTime, this.end+' '+endTime);
		},



		getComs(start, end) {
			let s = encodeURIComponent(moment(start).format());
			let e = encodeURIComponent(moment(end).format());
			let url = `getComs?start=${s}&end=${e}`
			util.get(url, data => {
				if (data)
					this.coms = data;
				else 
					this.coms = [];
			});
		},
	},
	computed:{
    	...mapState({
    		salePrices: state => state.salePrices,
    		
    	}),
  	},
	mounted() {
		this.get();
		this.getComs(this.start+' '+this.startTime, this.end+' '+this.endTime);
	},
}
</script>