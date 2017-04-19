<template>
	<div style="padding:20px;">
		<h2 style="text-align:center">送货单</h2>
		<div class="formGroup">
			<span class="textLabel">施工单位：</span><mu-text-field  v-model="form.com"/>
			<span class="textLabel">驾驶员：&nbsp&nbsp</span><mu-text-field  v-model="form.driver"/>
			<span class="textLabel">本车方量：</span><mu-text-field  v-model="form.capacity"/>
		</div>
		<div class="formGroup">
			<span class="textLabel">工程名称：</span><mu-text-field  v-model="form.project"/>
			<span class="textLabel">运输车号：</span><mu-text-field  v-model="form.car"/>
			<span class="textLabel">浇筑方式：</span><mu-text-field  v-model="form.way"/>
		</div>
		<div class="formGroup">
			<span class="textLabel">施工部位：</span><mu-text-field  v-model="form.part"/>
			<span class="textLabel">强度等级：</span><mu-text-field  v-model="form.strength"/>
			<span class="textLabel">发货时间：</span><mu-text-field  v-model="form.time"/>
		</div>
		<div class="saleBtnGroup">
			<mu-raised-button label="确认" primary style="width:10%;margin:0 20px;" @click="save"/>
			<mu-raised-button label="取消" secondary style="width:10%;" @click="cancel"/> 
		</div>
		<mu-table style="margin:20px;" :showCheckbox="false" :fixedHeader="true" :height="height">
			<mu-thead slot="header" >
		      <mu-tr class="printListHead">
		        <mu-th tooltip="施工单位" class="tdHeader">施工单位</mu-th>
		        <mu-th tooltip="驾驶员" class="tdHeader">驾驶员</mu-th>
		        <mu-th tooltip="本车方量" class="tdHeader">本车方量</mu-th>
		        <mu-th tooltip="工程名称" class="tdHeader">工程名称</mu-th>
		        <mu-th tooltip="运输车号" class="tdHeader">运输车号</mu-th>
		        <mu-th tooltip="浇筑方式" class="tdHeader">浇筑方式</mu-th>
		        <mu-th tooltip="施工部位" class="tdHeader">施工部位</mu-th>
		        <mu-th tooltip="强度等级" class="tdHeader">强度等级</mu-th>
		        <mu-th tooltip="发货时间" class="tdHeader">发货时间</mu-th>
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
		        <mu-td>{{item.time}}</mu-td> 
		      </mu-tr>
		    </mu-tbody>
		</mu-table>
	</div>
</template>

<script>

import moment from 'moment'

export default {
	data() {
		return {
			name: "Sale",
			height: "300px",
			form: {},
			data: [],
		};
	},
	methods: {
		save() {
			this.data.push(this.form);
			this.form = {};
			this.form.com = "";
			this.form.driver = "";
			this.form.capacity = "";
			this.form.project = "";
			this.form.car = "";
			this.form.way = "";
			this.form.part = "";
			this.form.strength = "";
			this.form.time = "";
		},
		cancel() {
			console.log("cancel");
			this.form.com = "";
			this.form.driver = "";
			this.form.capacity = "";
			this.form.project = "";
			this.form.car = "";
			this.form.way = "";
			this.form.part = "";
			this.form.strength = "";
			this.form.time = "";
		},
	},
}
</script>

<style>
.formGroup {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.saleBtnGroup {
	display: flex;
	justify-content: flex-end;
	padding: 20px;
}
.textLabel {
	font-size: 18px;
}
</style>