<template>
	<mu-table style="margin:20px;" :showCheckbox="false" :fixedHeader="true" >
		<mu-thead slot="header" >
	      <mu-tr class="printListHead">
	        <mu-th tooltip="施工单位" class="tdHeader">施工单位</mu-th>
	        <mu-th tooltip="电话" class="tdHeader">电话</mu-th>
	        <mu-th tooltip="确认" class="tdHeader">确认</mu-th>
	      </mu-tr>
	    </mu-thead>
	    <mu-tbody>
	      <mu-tr v-for="item,index in salePrices">
	      	<mu-td>{{item.com}}</mu-td>
	      	<mu-td>{{item.tel}}</mu-td>
	      	<mu-td>
	      		<span @click="sureSalePrice(index,item.id)" class="greenLink" v-if="!item.sure">确认</span>
	      		<span v-if="item.sure">已确认</span>
	      	</mu-td>
	      </mu-tr>
	    </mu-tbody>
	</mu-table>
</template>

<script>
import util from '../common/util.js'
import { mapState,mapMutations } from 'vuex'
export default {
	mounted() {
		if (this.updateTime) clearInterval(this.updateTime);
      	this.updateTime = setInterval(() => {  
      		util.get("salePrices",data => {this.addAllSalePrices(data)});
      	}, 30000);
	},
	beforeDestroy() {
		if (this.updateTime) clearInterval(this.updateTime);
	},

	computed:{
    	...mapState({
    		salePrices: state => state.salePrices,
    	}),
    },
    methods: {
    	sureSalePrice(index, id) {
    		util.patch("salePrices/"+id, {sure:true}, data =>{
    			this.salePrices[index].sure = true;
    		},err=>{
    			util.toast("确认失败，网络错误");
    		});
    	},
    	 ...mapMutations([
	        'addAllSalePrices',
	    ]),
    },
}
</script>