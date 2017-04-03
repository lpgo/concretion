<template>
	<mu-paper class="purchase" :zDepth="0" >
		<div class="purchaseTitle">过磅单</div>
		<mu-text-field label="请输入公司" labelFloat fullWidth/>
		<mu-text-field label="请输入车号" labelFloat fullWidth/>
		<mu-text-field label="请输入名称" labelFloat fullWidth/>
		<mu-text-field label="请输入单价" labelFloat fullWidth type="number"/>
		<div class="labelGroup">
			<mu-text-field label="请输入毛重" labelFloat fullWidth type="number"/>
			<mu-flat-button label="获取毛重" style="margin-bottom:18px;margin-left:10px" primary/>
		</div>
		<div class="labelGroup">
			<mu-text-field label="请输入皮重" labelFloat fullWidth type="number"/>
			<mu-flat-button label="获取皮重" style="margin-bottom:18px;margin-left:10px" secondary/>
		</div>
		<div class="btnContainer">
			<mu-raised-button label="新增" class="purchaseBtn"  secondary />
			<mu-raised-button label="保存" class="purchaseBtn" primary />
		</div>
	</mu-paper>
</template>

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
	padding: 30px;
	margin: 20px;
	
}
.purchaseBtn {
	width: 45%;
}
.purchaseTitle {
	font-size: 24px;
	font-weight: 2px;
	text-align: center;
}

</style>