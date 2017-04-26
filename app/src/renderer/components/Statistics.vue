<template>
	<div style="padding:20px;">
		<mu-radio label="当日" name="group" nativeValue="day" v-model="value" @change="change"/> 
	  	<mu-radio label="当月" name="group" nativeValue="month" v-model="value"  @change="change"/>
	  	<mu-radio label="自定义" name="group" nativeValue="user" v-model="value" style="margin-right:100px" />  
		<mu-date-picker mode="landscape" hintText="开始时间" v-model="start" :disabled="value!='user'"/>
		<mu-date-picker mode="landscape" hintText="结束时间" v-model="end"  :disabled="value!='user'"/>
		<mu-raised-button label="统计"  primary @click="statistics" :disabled="value!='user'"/>
		<h2>销售统计</h2>
		<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%" >
			<tr>  
	            <td>施工单位</td>  
	            <td>强度</td>  
	            <td colspan="4">泵送</td>
	            <td colspan="4">自卸</td>
	            <td>合计/元</td>  
	        </tr>
        	<template v-for="item in data">
        		<tr v-for="(value, key, index) in item">
        			<template v-if="key!='com' && key!='size'">
        				<td :rowspan="item.size" v-if="index == 0">{{item.com}}</td>  
			            <td>{{key}}</td>
							<template v-if="value['泵送']">
								<td>{{value['泵送'].capacity}}</td>
					            <td>方</td>
					            <td>{{value['泵送'].price}}</td>  
					            <td>元/方</td>
							</template>
							<template v-else>
								<td>&nbsp&nbsp&nbsp</td>
					            <td>方</td>
					            <td>&nbsp&nbsp&nbsp</td>  
					            <td>元/方</td>
							</template>
							<template v-if="value['自卸']">
								<td>{{value['自卸'].capacity}}</td>
					            <td>方</td>
					            <td>{{value['自卸'].price}}</td>  
					            <td>元/方</td>
							</template>
							<template v-else>
								<td>&nbsp&nbsp&nbsp</td>
					            <td>方</td>
					            <td>&nbsp&nbsp&nbsp</td>  
					            <td>元/方</td>
							</template>	
						<td>{{value.count}}</td>		
        			</template>
		        </tr> 
        	</template>
		</table>
		<h2>司机统计</h2>
		<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%" text-align="center">
			<tr>  
	            <td>司机</td>  
	            <td>强度</td>  
	            <td >方量</td>
	            <td >方量总计</td>
	            <td >次数</td>
	            <td >次数总计</td>
	        </tr>
        	<template v-for="item in driverData">
        		<tr v-for="value,index in item.items">
    				<td :rowspan="item.size" v-if="index == 0">{{item.driver}}</td>  
		            <td>{{value.strength}}</td>
		            <td>{{value.capacity}}</td>
		            <td :rowspan="item.size"  v-if="index == 0">{{item.cs}}</td>
		            <td>{{value.count}}</td>
		            <td :rowspan="item.size"  v-if="index == 0">{{item.total}}</td>
		        </tr> 
        	</template>
		</table>

	</div>
</template>
<script>
import util from '../common/util.js'
import moment from 'moment'
export default {
	data() {
		return {
			value:"day",
			data:[],
			driverData:[],
			start:moment().format('YYYY-MM-DD'),
			end:moment().format('YYYY-MM-DD'),
		};
	},
	methods: {
		statistics() {
			this.get(this.start,this.end);
		},
		change(value) {
			if('day' == value) {
				this.start = moment().format('YYYY-MM-DD');
				this.end = moment().format('YYYY-MM-DD');
				this.get(this.start,this.end);
			} else if('month' == value) {
				this.start = moment().startOf('month').format('YYYY-MM-DD');
				this.end = moment().endOf('month').format('YYYY-MM-DD');
				this.get(this.start,this.end);
			}
		},
		get(start, end) {
			let s = encodeURIComponent(moment(start).startOf('day').format());
			let e = encodeURIComponent(moment(end).endOf('day').format());
			let url = `statistics?start=${s}&end=${e}`
			util.get(url, data => {
				//处理数据为表格准备
				let map = new Map();
				for(let item of data) {
					if(map.has(item._id.com)) {
						map.get(item._id.com).push(item);
					} else {
						map.set(item._id.com,[item]);
					}
				} 

				let ss = [];
				for(let [key, value] of map) {
					let o = {};
					let size = 0;
					for(let item of value) {
						if(o[item._id.strength]) {
							o[item._id.strength][item._id.way] = {capacity:item.capacity,price:item._id.price,total:item.total};
							o[item._id.strength].count += item.total;
						} else {
							o[item._id.strength]={};
							o[item._id.strength][item._id.way] = {capacity:item.capacity,price:item._id.price,total:item.total};
							o[item._id.strength].count = item.total;
							size++;
						}
					}
					o.com = key;
					o.size = size;
					ss.push(o);	
				}
				this.data = ss;
			});

			//根据司机统计
			util.get(url+'&by=driver', data => {
				//处理数据为表格准备
				let map = new Map();
				for(let item of data) {
					if(map.has(item._id.driver)) {
						map.get(item._id.driver).push(item);
					} else {
						map.set(item._id.driver,[item]);
					}
				} 
				let ss = [];
				for(let [key, value] of map) {
					let o = {total:0,cs:0,size:0,items:[]};
					for(let item of value) {
						o.items.push({count:item.count,capacity:item.capacity,strength:item._id.strength});
						o.total += item.count;
						o.cs += item.capacity;
						o.size++;
					}
					o.driver = key;
					ss.push(o);	
				}
				this.driverData = ss;
			});
		},
	},
	mounted(){
		this.get(this.start,this.end);
	},
	
}
</script>
<style>
	td {
		text-align: center;
	}
	.radio {
		padding-top:10px;
	}
</style>