<template>
	<div style="padding:20px;">
		<h2 style="text-align:center">送货单</h2>
		<div class="formGroup">
			<span class="textLabel">施工单位：</span><mu-text-field  v-model="form.com"/>
			<span class="textLabel">驾驶员：&nbsp&nbsp</span><mu-text-field  v-model="form.driver"/>
			<span class="textLabel">本车方量：</span><mu-text-field  v-model="capacity"/>
		</div>
		<div class="formGroup">
			<span class="textLabel">工程名称：</span><mu-text-field  v-model="project"/>
			<span class="textLabel">运输车号：</span><mu-text-field  v-model="car"/>
			<span class="textLabel">浇筑方式：</span><mu-text-field  v-model="way"/>
		</div>
		<div class="formGroup">
			<span class="textLabel">施工部位：</span><mu-text-field  v-model="part"/>
			<span class="textLabel">强度等级：</span><mu-text-field  v-model="strength"/>
			<span class="textLabel">发货时间：</span><mu-text-field  v-model="time"/>
		</div>
		<div class="saleBtnGroup">
			<mu-raised-button label="确认" primary style="width:10%;margin:0 20px;" @click="test"/>
			<mu-raised-button label="取消" secondary style="width:10%;"/> 
		</div>
	</div>
</template>

<script>

import moment from 'moment'

export default {
	data() {
		return {
			name: "Sale",
			form: {},
		};
	},
	methods: {
		test() {
			console.log(moment().startOf('day').format());
			console.log(moment().endOf('day').format());
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