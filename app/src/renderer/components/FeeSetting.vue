<template>
	<div style="padding:20px;font-size:16px;">
		<h2 style="font-size:20px;text-align:center">运费设置</h2>
		<span>10公里内每方价格：</span><mu-text-field  v-model="form.in10" type="number" style="width:50px;"/>元
		<span style="margin-left:50px">超过10公里每公里每方价格：</span><mu-text-field  v-model="form.out10" type="number" style="width:50px;"/>元
		
		<h2 style="font-size:20px;text-align:center">泵送设置</h2>
		<span>泵送每方价格：</span><mu-text-field  v-model="form.auto" type="number" style="width:50px;"/>元
		<span style="margin-left:50px">最低泵送费：</span><mu-text-field  v-model="form.autoMin" type="number" style="width:50px;"/>元
		
		<h2 style="font-size:20px;text-align:center">司机提成设置</h2>
		<span>最小方量：</span><mu-text-field  v-model="form.minCapacity" type="number" style="width:50px;"/>方
		<span style="margin-left:50px">超过20公里每方价格：</span><mu-text-field  v-model="form.price" type="number" style="width:50px;"/>元<span style="margin-left:50px">小于20公里每方价格：</span><mu-text-field  v-model="form.minPrice" type="number" style="width:50px;"/>元<br/>
		<mu-raised-button label="修改" primary style="margin-left:20px;float:right"  @click="modify" />
	</div>
</template>
<script>
import util from '../common/util.js'

export default {
	data() {
		return {
			form:{
				in10:20,
				out10:1.5,
				auto:30,
				autoMin:900,
				minCapacity:8,
				price:1.5,
			},
		};
	},
	methods: {
		modify() {
			this.form.in10 = Number(this.form.in10);
			this.form.out10 = Number(this.form.out10);
			this.form.auto = Number(this.form.auto);
			this.form.autoMin = Number(this.form.autoMin);
			this.form.minCapacity = Number(this.form.minCapacity);
			this.form.price = Number(this.form.price);

			util.put("feeSetting",this.form, data=>{
				alert("修改成功");
			});
		},
	},
	mounted() {
		util.get("feeSetting", data => {
			if(data) {
				this.form = data;
			}
		});
	}
}
</script>