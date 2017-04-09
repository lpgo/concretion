<template>
<div style="display:flex;align-items:stretch">
	<mu-paper class="purchase" :zDepth="0" >
		<div class="purchaseTitle">过磅单</div>
		<mu-text-field label="请输入公司" labelFloat fullWidth v-model="form.com" :disabled="disabled"/>
		<mu-text-field label="请输入车号" labelFloat fullWidth v-model="form.car" :disabled="disabled"/>
		<mu-text-field label="请输入名称" labelFloat fullWidth v-model="form.name" :disabled="disabled"/>
		<mu-text-field label="请输入单价" labelFloat fullWidth type="number" v-model="form.price" :disabled="disabled"/>
		<div class="labelGroup">
			<mu-text-field label="请输入毛重" labelFloat fullWidth type="number" v-model="form.totalWeight" :disabled="disabled"/>
			<mu-flat-button label="获取毛重" style="margin-bottom:18px;margin-left:10px" primary/>
		</div>
		<div class="labelGroup">
			<mu-text-field label="请输入皮重" labelFloat fullWidth type="number" v-model="form.carWeight" :disabled="carWeightDisabled"/>
			<mu-flat-button label="获取皮重" style="margin-bottom:18px;margin-left:10px" secondary/>
		</div>
		<div class="btnContainer">
			<mu-raised-button label="保存" style="width:100%" @click="save" secondary v-if="state == 'new'"/>
			<template v-if="state == 'save'">
			<mu-raised-button label="新建" class="purchaseBtn" @click="newOrder" secondary />
			<mu-raised-button label="出单" class="purchaseBtn" @click="out" primary />
			</template>
			<template v-if="state == 'out'">
			<mu-raised-button label="新建" class="purchaseBtn" @click="newOrder" secondary />
			<mu-raised-button label="打印" class="purchaseBtn" @click="print" primary />
			</template>
		</div>
	</mu-paper>
	<div>
		<PurchaseList :height="height" theadClass="saveListHead" :data="saveList" @select="saveSelect"/>
		<PurchaseList :height="height" theadClass="printListHead" :data="outList" @select="outSelect"/>
 
	</div>
</div>
</template> 

<script>
	import PurchaseList from './PurchaseList'
	import mock from '../mock.js'

	export default {
		data() {
			return {
				height:'240px',
				form : {},
				disabled : false,
				carWeightDisabled: true,
				state: "new",
				outList: [],
				saveList: [],
				selectIndex:-1,
			};
		},
		methods: {
			save() {
				this.saveList.push(this.form);
				this.form = {};
				this.form.com = '';
				this.form.car = '';
				this.form.name = '';
				this.form.price = null;
				this.form.totalWeight = null;
				this.form.carWeight = null;
			}, 
			print() {

			},
			out() {
				this.outList.push(this.form);
				this.saveList.splice(this.selectIndex, 1);
				this.state = "new";
				this.form = {};
				this.form.carWeight = null;
				this.disabled = false;
				this.carWeightDisabled = true;
			},
			newOrder() {
				this.form = {};
				this.state = "new";
				this.disabled = false;
				this.carWeightDisabled = true;
			},
			saveSelect(index,tr) {
				this.selectIndex = index;
				this.form = this.saveList[index];
				this.state = "save";
				this.disabled = true;
				this.carWeightDisabled = false;
			},
			outSelect(index,tr) {
				this.selectIndex = index;
				this.form = this.outList[index];
				this.state = "out";
				this.disabled = true;
				this.carWeightDisabled = true;
			},
		},
		components: {
			PurchaseList
		}
	}
</script>


<style>
.btnContainer {
	display: flex;
	justify-content: space-between;
	padding: 20px 0;
}
.labelGroup {
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.purchase {
	width: 350px;
	padding: 10px 25px;
	margin: 20px;
	flex:1 0 350px;
	
}
.purchaseBtn {
	width: 45%;
}
.purchaseTitle {
	font-size: 24px;
	font-weight: 2px;
	text-align: center;
}
.saveListHead {
	background:#ec407a;
}
.printListHead {
	background:#26a69a;
}

</style>