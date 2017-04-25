<template>
	<div style="padding:20px">
		<table border="1" bordercolor="black" cellspacing="0" cellpadding="5">
			<tr>  
	            <td>施工单位</td>  
	            <td>强度</td>  
	            <td colspan="4" align="center">泵送</td>
	            <td colspan="4" align="center">自卸</td>
	            <td align="center">合计/元</td>  
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
	</div>
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
	mounted() {
		let start = encodeURIComponent(moment().startOf('month').format());
		let end = encodeURIComponent(moment().endOf('month').format());
		let url = `statistics?start=${start}&end=${end}`
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
			console.log(map);
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
			console.log(ss);
			this.data = ss;
		});
	}
}
</script>