<template>
	<div style="padding:20px;font-size:16px;">
		<span style="font-size:20px">型号：</span>
		<template v-for="item,index in typeData">
			<mu-chip class="demo-chip"  @delete="remove(index)" showDelete>{{item.name}}</mu-chip>
		</template>
		<mu-text-field  v-model="type" style="margin-left:20px;width:100px;"/><mu-raised-button label="添加" primary @click="add" style="margin:0 20px;"/>
		<hr/>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			type:'',
			typeData:[
				{id:'1',name:"c20"},
				{id:'2',name:"c30"},
				{id:'3',name:"c40"},
			],
		};
	},
	methods: {
		add() {
			if(this.type) {
				this.typeData.push({id:"1",name:this.type});
			}
			this.type = null;
		},
		remove(index) {
			this.typeData.splice(index,1);
		},
	},
}
</script>

<style>
.demo-chip{
  margin: 4px;
}
</style>