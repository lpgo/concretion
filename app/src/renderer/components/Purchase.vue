<template>
<div style="display:flex;background:#fafafa;height:100%;align-items:flex-start">
	<mu-paper class="purchase" :zDepth="0" >
		<!--<div class="purchaseTitle">过磅单</div>-->
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
	<div>
		<mu-table style="margin:20px;" :showCheckbox="false" :fixedHeader="true" :height="height">
			<mu-thead slot="header" >
		      <mu-tr style="background:#ff80ab">
		        <mu-th tooltip="施工单位" class="tdHeader">施工单位</mu-th>
		        <mu-th tooltip="车号" class="tdHeader">车号</mu-th>
		        <mu-th tooltip="名称" class="tdHeader">名称</mu-th>
		        <mu-th tooltip="单价" class="tdHeader">单价</mu-th>
		        <mu-th tooltip="毛重" class="tdHeader">毛重</mu-th>
		        <mu-th tooltip="皮重" class="tdHeader">皮重</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		      <mu-tr v-for="item,index in tableData">
		        <mu-td>{{item.com}}</mu-td>
		        <mu-td>{{item.car}}</mu-td>
		        <mu-td>{{item.name}}</mu-td>
		        <mu-td>{{item.price}}</mu-td>
		        <mu-td>{{item.maozhong}}</mu-td>
		        <mu-td>{{item.pizhong}}</mu-td>
		      </mu-tr>
		    </mu-tbody>
		</mu-table>

		<mu-table style="margin:20px;" :showCheckbox="false" :fixedHeader="true" :height="height">
			<mu-thead slot="header">
		      <mu-tr style="background:#26a69a">
		        <mu-th tooltip="施工单位" class="tdHeader">施工单位</mu-th>
		        <mu-th tooltip="车号" class="tdHeader">车号</mu-th>
		        <mu-th tooltip="名称" class="tdHeader">名称</mu-th>
		        <mu-th tooltip="单价" class="tdHeader">单价</mu-th>
		        <mu-th tooltip="毛重" class="tdHeader">毛重</mu-th>
		        <mu-th tooltip="皮重" class="tdHeader">皮重</mu-th>
		      </mu-tr>
		    </mu-thead>
		     <mu-tbody>
		      <mu-tr v-for="item,index in tableData">
		        <mu-td>{{item.com}}</mu-td>
		        <mu-td>{{item.car}}</mu-td>
		        <mu-td>{{item.name}}</mu-td>
		        <mu-td>{{item.price}}</mu-td>
		        <mu-td>{{item.maozhong}}</mu-td>
		        <mu-td>{{item.pizhong}}</mu-td>
		      </mu-tr>
		    </mu-tbody>
		</mu-table>	
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				height:'250px',
				tableData:[
					{com:"兴茂",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"},
					{com:"兴茂兴茂兴",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"},
					{com:"兴茂",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"},
					{com:"兴茂兴茂兴",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"},
					{com:"兴茂",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"},
					{com:"兴茂兴茂兴茂",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"},
					{com:"兴茂",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"},
					{com:"兴茂兴茂兴",car:"陕K12345",name:"石子",price:"200.5",maozhong:"1231",pizhong:"12"}
				],
			};
		},
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
	padding: 25px;
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
.tdHeader {
	color:white;
	font-size:13px;
}

</style>