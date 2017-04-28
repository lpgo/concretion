<template>
  <div class="container">
    <mu-appbar title="茂奂建材有限公司" class="noprint">
      <template v-for="data in menuData">
        <MenuButton :menuData="data" :icon="data.icon" slot="right"/>
      </template>
    </mu-appbar>
    <router-view class="content"></router-view>
  </div>








  <!-- <div class="menu-list">
        <mu-list>
          <mu-list-item title="磅房" class="menuType" toggleNested nestedListClass="test" :open="false">
            <mu-icon value="devices" slot="left"/>
            <mu-list-item title="录入过磅单" slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 录入过磅单</span>
            </mu-list-item>
            <mu-list-item  title="打印过磅单" slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 打印过磅单</span>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item  title="出售" class="menuType" :open="false" toggleNested nestedListClass="test">
            <mu-icon value="local_shipping" slot="left"/>
            <mu-list-item  title="录入出货单" slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 录入出货单</span>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item  title="查询" class="menuType" :open="false" toggleNested nestedListClass="test">
            <mu-icon value="search" slot="left"/>
            <mu-list-item  title="出货单查询"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 出货单查询</span>
            </mu-list-item>
            <mu-list-item  title="过磅单查询"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 过磅单查询</span>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item  title="统计" class="menuType" :open="false" toggleNested nestedListClass="test">
            <mu-icon value="equalizer" slot="left"/>
            <mu-list-item  title="根据施工单位统计"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 根据施工单位统计</span>
            </mu-list-item>
            <mu-list-item  title="根据司机统计"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 根据司机统计</span>
            </mu-list-item>
            <mu-list-item  title="当日统计"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 当日统计</span>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item  title="财务" class="menuType" :open="false" toggleNested nestedListClass="test" >
            <mu-icon value="monetization_on" slot="left"/>
            <mu-list-item  title="材料结算"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 材料结算</span>
            </mu-list-item>
            <mu-list-item  title="运费结算"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 运费结算</span>
            </mu-list-item>
            <mu-list-item  title="混凝土结算"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 混凝土结算</span>
            </mu-list-item>
          </mu-list-item>
        </mu-list>
      </div> -->
</template>

<script>

import MenuButton from './MenuButton'

export default {
  data() {
    return {
      menuData: [
        {label:"磅房",icon:"devices",items:[{title:"录入过磅单", url:"/purchase"}]},
        {label:"销售",icon:"local_shipping",items:[{title: "销售", url: "/sale"}]},
        {label:"查询",icon:"search",items:[{title: "采购查询", url: "/purchaseSearch"},{title: "销售查询", url: "/saleSearch"}]},
        {label:"统计",icon:"equalizer",items:[{title: "统计", url: "/statistics"}]},
        {label:"设置",icon:"monetization_on",items:[{title: "销售设置", url: "/saleSetting"},{title: "采购设置", url: "/PurchaseSetting"}]},
      ],
    }
  },
  methods: {
    
  },
  components: {
    MenuButton
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height:100%;
  background:#fafafa;
}
.content {
  flex: 1 0 auto;
}
@media print {   
  .noprint {    
  display: none    
  }   
}  
/*
.content {
  flex: 1 1 auto;
}
.flex-container {
  display: flex;
  align-items:stretch;
}
.menu-list {
  flex: 0 0 250px;
  border-right: 3px solid #efebe9;
  overflow-y: scroll; 
  height: 700px;

}
<<<<<<< HEAD
.menu-list::-webkit-scrollbar {display:none}
.content {
  flex: 1 1 auto;
}
=======
>>>>>>> 5efe987f585d81e82b77ba3eb0b15bd1a75669a0
.menuType {
  background: #efebe9;
}
.menuItem {
  background: #ffffff;
  width: 250px;
.test {
  padding: 0px !important;
}*/
</style>