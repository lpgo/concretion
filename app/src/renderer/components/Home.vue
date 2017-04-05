<template>
  <div style="background:#fafafa">
    <mu-appbar title="茂奂建材有限公司">
      <MenuButton :menuData="menuData" icon="devices" slot="right"/>
    </mu-appbar>
    <div class="content"> 
      <router-view></router-view>
    </div>
  </div>








  <!-- <div class="menu-list">
        <mu-list>
          <mu-list-item title="磅房" class="menuType" toggleNested nestedListClass="test">
            <mu-icon value="devices" slot="left"/>
            <mu-list-item title="录入过磅单" slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 录入过磅单</span>
            </mu-list-item>
            <mu-list-item  title="打印过磅单" slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 打印过磅单</span>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item  title="出售" class="menuType"  toggleNested nestedListClass="test">
            <mu-icon value="local_shipping" slot="left"/>
            <mu-list-item  title="录入出货单" slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 录入出货单</span>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item  title="查询" class="menuType"  toggleNested nestedListClass="test">
            <mu-icon value="search" slot="left"/>
            <mu-list-item  title="出货单查询"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 出货单查询</span>
            </mu-list-item>
            <mu-list-item  title="过磅单查询"  slot="nested" class="menuItem">
              <span slot="title">&#10148&nbsp&nbsp&nbsp 过磅单查询</span>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item  title="统计" class="menuType"  toggleNested nestedListClass="test">
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
          <mu-list-item  title="财务" class="menuType"  toggleNested nestedListClass="test" >
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
      menuData: {
        label: "磅房",
        items: [{title:"录入过磅单"}, {title: "打印过磅单"}]
      },
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
.content {
  flex: 1 1 auto;
}


/*.flex-container {
  display: flex;
}
.menu-list {
  flex: 0 0 250px;
  border-right: 3px solid #efebe9;
}
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