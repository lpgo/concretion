<template>
	<div style="padding:20px;">
		<div class="noprint">
			<div style="display:flex">
				<span style="font-size:20px;margin-right:10px;">时间：</span>
			  	<mu-radio label="当月" name="group" nativeValue="month" v-model="value"  @change="change"/>
			  	<mu-radio label="自定义" name="group" nativeValue="user" v-model="value" style="margin-right:100px" />  
				<mu-date-picker mode="landscape" hintText="开始时间" v-model="start" :disabled="value!='user'"/>
				<mu-date-picker mode="landscape" hintText="结束时间" v-model="end"  :disabled="value!='user'"/>
			</div>
			<div style="display:flex">
				<!--
				<mu-select-field v-model="form.com" :labelFocusClass="['label-foucs']" hintText="请选择施工单位" style="" >
					<mu-menu-item v-for="item,index in salePrices" :key="item.id" :value="item.com" :title="item.com" />
				</mu-select-field>
				<mu-auto-complete :filter="myfilter" hintText="请输入车号" v-model="form.car" openOnFocus :dataSource="carPlates" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10"/>

				<mu-auto-complete :filter="myfilter" hintText="请选择泵送方式" v-model="form.way" openOnFocus :dataSource="ways" :maxSearchResults="10"/>
				-->
				<mu-auto-complete :filter="myfilter" hintText="请输入驾驶员" v-model="form.driver" openOnFocus :dataSource="driverFrequency" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="30" :errorText="error" @change="error = ''" :maxHeight="500"/>
				
				<mu-raised-button label="统计"  primary @click="statistics" />
				<mu-raised-button label="导出"  primary @click="exportExcel"  style="margin-left:20px"/>
				<mu-raised-button label="打印"  primary @click="print" style="margin-left:10px"/>
				<mu-raised-button label="清空条件"  secondary @click="clear" style="margin-left:20px"/>
			</div>
			
			
		</div>
		<div class="myDivToPrint">
			<h2 style="text-align:center">{{form.driver}}-运费结算单-底工资结算</h2>
			<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%" >
				<TR>
					<td>底工资</td>
					<td>4000</td>
					<td>提成</td>
					<td>{{count.toFixed(2)}}</td>
					<td>合计</td>
					<td>{{Number(count.toFixed(2)) + 4000}}</td>
					<td>大写</td>
					<td>{{numberToChinese(Number(count.toFixed(2)) + 4000)}}</td>
				</TR>
				<tr>  
					<td>序号</td>
					<td>日期</td>
		            <td colspan="2">工程名称</td>  
		            <td colspan="2">方量</td>
		            <td colspan="2">提成合计/元</td>  
		        </tr>
	    		<tr v-for="(value,index) in data">
	    			<td>{{index+1}}</td>
	    			<td>{{getDateFromYear(value._id.day)}}</td>
	    			<td colspan="2">{{value._id.com}}</td>
					<td colspan="2">{{value.capacity}}</td>
					<td colspan="2">{{value.driverFee.toFixed(2)}}</td>
		        </tr>
			</table>
			<span>合计：</span><span>{{total}}</span>方
		</div>
		
		<!--
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
		-->
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
			value:"month",
			data:[],
			driverData:[],
			start:moment().startOf('month').format('YYYY-MM-DD'),
			end:moment().endOf('month').format('YYYY-MM-DD'),
			form:{com:null,driver:null,project:null,way:null,strength:null,car:null},
			ways:[
				'45米泵送',
				'52米泵送',
			],
			count: 0 ,
			error:'',
			total:0, //总方量
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
		statistics() {
			if(!this.form.driver) {
				this.error = "请输入驾驶员";
				return ;
			}
			this.get(this.start,this.end);
		},
		change(value) {
			if('month' == value) {
				this.start = moment().startOf('month').format('YYYY-MM-DD');
				this.end = moment().endOf('month').format('YYYY-MM-DD');
			}
		},
		get(start, end) {
			let s = encodeURIComponent(moment(start).startOf('day').format());
			let e = encodeURIComponent(moment(end).endOf('day').format());
			let url = `statistics?start=${s}&end=${e}`
			if(this.form.com) {
				url += `&com=${this.form.com}`
			}
			if(this.form.way) {
				url += `&way=${this.form.way}`
			}
			if(this.form.driver) {
				url += `&driver=${this.form.driver}`
			}
			if(this.form.car) {
				url += `&car=${this.form.car}`
			}
			util.get(url, data => {
				this.total = 0 ;
				if(!data) {
					this.data = [];
				} else {
					data.sort((a,b) => a._id.day - b._id.day)
					this.data = data;
					//算合计
					this.count = 0;
					for(let item of data) {
						this.count += item.driverFee;
						this.total += item.capacity;
					}
				}
			});

			/*//根据司机统计
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
			*/
			
		},
		clear() {
			this.form.com = null;
			this.form.project = null;
			this.form.strength = null;
			this.form.driver = null;
			this.form.car = null;
		},
		print() {
			const {remote} = this.$electron;
	    	const web = remote.getCurrentWebContents();
	    	
	    	/*
	    	web.printToPDF({}, (error, data) => {
			    if (error) throw error
			    fs.writeFile('sale.pdf', data, (error) => {
			      if (error) throw error
			      console.log('Write PDF successfully.')
			    })
			});
			*/
			web.print({silent:true});
			
		},
		exportExcel() {
			const {remote} = this.$electron;
	    	const web = remote.getCurrentWebContents();

	    	let s = encodeURIComponent(moment(this.start).format());
			let e = encodeURIComponent(moment(this.end).format());
			let url = `statistics?start=${s}&end=${e}`
			if(this.form.driver) {
				url += '&driver='+this.form.driver;
			}
	    	web.downloadURL(conf.apiUrl+url+'&fileType=excel');
		},
		numberToChinese(num) {
			return util.moneyArabiaToChinese(num);
		},
		toFullDate(day) {
			return moment(this.start).month()+1 +'月'+day+'日';
		},
		getDateFromYear(day) {
			return moment().startOf("year").day(day-1).format("MM月DD");
		},
	},
	computed:{
    	...mapState({
    		types: state => state.types,
    		salePrices: state => state.salePrices,
    		carPlates: state => state.carFrequency,
    		comFrequency: state => state.comFrequency,
    		projectFrequency: state => state.projectFrequency,
    		driverFrequency: state => state.driverFrequency,
    	}),
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