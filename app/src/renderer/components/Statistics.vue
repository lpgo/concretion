<template>
	<div style="padding:20px;">
		<div class="noprint">
			<div style="display:flex">
				<span style="font-size:20px;margin-right:10px;">时间：</span>
			  	<mu-radio label="当月" name="group" nativeValue="month" v-model="value"  @change="change"/>
			  	<mu-radio label="自定义" name="group" nativeValue="user" v-model="value" style="margin-right:100px" />  
				<mu-date-picker mode="landscape" hintText="开始时间" v-model="start" :disabled="value!='user'" @change="startChange"/>
				<mu-date-picker mode="landscape" hintText="结束时间" v-model="end"  :disabled="value!='user'" @change="endChange"/>
			</div>
			<div style="display:flex">
				<mu-auto-complete :filter="myfilter" hintText="请选择施工单位" v-model="form.com" openOnFocus :dataSource="coms" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="30" :errorText="error" @change="error = ''" :maxHeight="500"/>

				<!--
				<mu-auto-complete :filter="myfilter" hintText="请输入车号" v-model="form.car" openOnFocus :dataSource="carPlates" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10"/>

				<mu-auto-complete :filter="myfilter" hintText="请选择泵送方式" v-model="form.way" openOnFocus :dataSource="ways" :maxSearchResults="10"/>

				<mu-auto-complete :filter="myfilter" hintText="请输入驾驶员" v-model="form.driver" openOnFocus :dataSource="driverFrequency" :dataSourceConfig="{text:'_id',value:'_id'}" :maxSearchResults="10"/>
				-->
				<mu-raised-button label="统计"  primary @click="statistics" />
				<mu-raised-button label="导出"  primary @click="exportExcel"  style="margin-left:20px"/>
				<mu-raised-button label="打印"  primary @click="print" style="margin-left:10px"/>
				<mu-raised-button label="清空条件"  secondary @click="clear" style="margin-left:20px"/>
			</div>
			
			
		</div>
		<div class="myDivToPrint">
			<h2 style="text-align:center">府谷县茂奂建材有限责任公司销售确认单</h2>
			<span>施工单位：{{saleCom}}</span><span style="float:right">电话：{{saleTel}}</span>
			<table border="1" bordercolor="black" cellspacing="0" cellpadding="5" width="100%" >
				<THEAD style="display:table-header-group;font-weight:bold">
					<tr>  
						<td>日期</td>
			            <td>强度</td>  
			            <td>自卸方量</td>
			            <td>泵送方量</td>
			            <td>特殊砼加价</td>
			            <td>泵送费</td>
			            <td>方价</td>
			            <td>泵款合计</td>
			            <td>施工部位</td>
			            <td>备注</td>  
			        </tr>
		        </THEAD>
	    		<tr v-for="(value,index) in data" :class="{newPage:index%30 == 0}">
	    			<td>{{getDateFromYear(value._id.day)}}</td>
	    			<td>{{value._id.strength}}</td>

	    			<template v-if="value._id.way != '自卸'">
						<td></td>
						<td>{{value.capacity}}</td>
						<td>{{value._id.autoPrice}}</td>
						<td>{{value.autoFee?value.autoFee:0}}</td>
						<td>{{value._id.price + (value._id.attachPrice?value._id.attachPrice:0)}}</td>
			        </template>
			        <template v-if="value._id.way == '自卸'">
						<td>{{value.capacity}}</td>
						<td></td>
						<td>0</td>
						<td></td>
						<td>{{value._id.price}}</td>
			        </template>
			        
			      
					<td>{{value.total}}</td>
					<td>{{value._id.part}}</td>
		        </tr>
		        <tr>
		        	<td colspan ="2">方量小计</td>
		        	<td>{{saleCount.self}}</td>
		        	<td>{{saleCount.auto45}}</td>
		        	<td>泵费小计</td>
		        	<td>{{saleCount.autoTotal}}</td>
		        	<td>砼款小计</td>
		        	<td>{{saleCount.total}}</td>
		        	<td></td>
		        </tr> 
		        <tr>
		        	<td colspan ="2">总方量</td>
		        	<td colspan ="2">{{saleCount.self + saleCount.auto45}}方</td>
					<td colspan ="2">合计（元）</td>
					<td colspan ="3">{{saleCount.autoTotal + saleCount.total}}</td>
		        </tr>
	 			<!--<TR>
	 				<td colspan="2">合计（人民币）</td>
	 				<td colspan="5">{{numberToChinese(saleCount.total)}}</td>
	 			</TR>
	 			<tr >
	 				<td >供货单位：</td><TD colspan="3"></TD>
	 				<td >使用单位：</td><td colspan="2"></td>
	 			</tr>
	 			<tr>
	 				<td >负责人：</td><TD colspan="3"></TD>
	 				<td >项目负责人：</td><td colspan="2"></td>
	 			</tr>
	 			<tr>
	 				<td >单位：</td><TD colspan="3"></TD>
	 				<td >单位：</td><td colspan="2"></td>
	 			</tr>
	 			<tr>
	 				<td >（盖章）</td><TD colspan="3">年&nbsp&nbsp&nbsp月&nbsp&nbsp&nbsp日</TD>
	 				<td >（盖章）</td><td colspan="2">年&nbsp&nbsp&nbsp月&nbsp&nbsp&nbsp日</td>
	 			</tr>
	 			-->
	 			<tr>
	 				<td colspan="5">
	 					<p align="left">供货单位：</p>
	 					<p align="left">负责人：</p>
	 					<p align="left">单位：</p>
	 					<p align="left">（盖章）</p>
	 					<p align="right"><span style="margin-right:30px">年</span><span style="margin-right:30px">月</span><span style="margin-right:30px">日</span></p>
	 				</td>
	 				<TD colspan="5">
	 					<p align="left">使用单位：</p>
	 					<p align="left">项目负责人：</p>
	 					<p align="left">单位：</p>
	 					<p align="left">（盖章）</p>
	 					
	 				</TD>
	 			</tr>
			</table>
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
import fs from 'fs'
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
			saleCount:{self:0,auto45:0,auto52:0,total:0},
			saleCom: null,
			saleTel: null,
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
		statistics() {
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
				if(!data) {
					this.data = [];
					this.saleCount = {self:0,auto45:0,auto52:0,total:0};
				} else {
					data.sort((a,b) => a._id.day - b._id.day)

					//合并泵送
					let newData = [];
					for(let i=0; i<data.length; i++) {
						if(i > 0) {
							if(data[i]._id.day == data[i-1]._id.day && data[i]._id.strength == data[i-1]._id.strength && data[i]._id.way != "自卸" && data[i-1]._id.way != "自卸" && data[i-1]._id.price == data[i]._id.price) {
								data[i-1].capacity += data[i].capacity;
								console.log("合并泵送",i-1,data[i-1].capacity,i,data[i].capacity);
							} else {
								newData.push(data[i]);
							}
						} else {
							newData.push(data[i]);
						}
					}

					this.data = newData;



					//算合计
					this.saleCount = {self:0,auto45:0,auto52:0,total:0,autoTotal:0} ;
					for(let item of this.data) {
						switch(item._id.way) {
							case '自卸': 
							{
								this.saleCount.self += item.capacity;
								item.autoFee = 0;
								break;
							}
							default:
							{
								this.saleCount.auto45 += item.capacity;
								//计算泵送费
								if(item.capacity < 35) {
									item.autoFee = 1050;
								} else {
									item.autoFee = item._id.autoPrice * item.capacity;
								}
								break;
							}
							
						}
						
						this.saleCount.total += item.total;
						this.saleCount.autoTotal += (item.autoFee?item.autoFee:0);
					}

					//获取施工单位和电话
					for(let item of this.salePrices) {
						if(this.form.com == item.com) {
							this.saleCom = item.com;
							this.saleTel = item.tel;
						}
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

		getComs(start, end ) {
			let s = encodeURIComponent(moment(start).startOf('day').format());
			let e = encodeURIComponent(moment(end).endOf('day').format());
			let url = `getComs?start=${s}&end=${e}`
			util.get(url, data => {
				if (data)
					this.coms = data;
			});
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
	    	
	    	
	  //   	web.printToPDF({}, (error, data) => {
			//     if (error) throw error
			//     fs.writeFile('sale.pdf', data, (error) => {
			//       if (error) throw error
			//       console.log('Write PDF successfully.')
			//     })
			// });
			
			web.print({silent:true});
			//window.print();
			
		},

		exportExcel() {
			const {remote} = this.$electron;
	    	const web = remote.getCurrentWebContents();
	    	let s = encodeURIComponent(moment(this.start).format());
			let e = encodeURIComponent(moment(this.end).format());
			let url = `statistics?start=${s}&end=${e}`
			if(this.form.com) {
				url += '&com='+this.form.com;
			}
	    	web.downloadURL(conf.apiUrl+url+'&fileType=excel');
		},

		startChange(value) {
			this.form.com = null;
			this.getComs(value,this.end);
		},

		endChange(value) {
			this.form.com = null;
			this.getComs(this.start,value);
		},

		toFullDate(day) {
			return moment(this.start).month()+1 +'月'+day+'日';
		},

		getDateFromYear(day) {
			return moment().startOf("year").day(day-1).format("MM月DD");
		},

		numberToChinese(num) {
			return util.moneyArabiaToChinese(num);
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

    mounted() {
		this.getComs(this.start, this.end);
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
	.newPage {
		page-break-before:always;
	}
</style>