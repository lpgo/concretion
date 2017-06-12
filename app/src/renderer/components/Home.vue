<template>
  <div class="container">
    <mu-appbar title="茂奂建材有限公司" class="noprint">
      <mu-flat-button label="刷新"  slot="right" @click="refresh"/>
      <mu-flat-button label="修改密码" slot="right" @click="openPwd"/>
      <template v-for="data in menuData">
        <MenuButton :menuData="data" :icon="data.icon" slot="right"/>
      </template>
    </mu-appbar>
    <router-view class="content"></router-view>
    <mu-dialog :open="changePwdDialog" title="修改密码" dialogClass="changePwdDialog">
      <span class="textLabel">旧密码：</span><mu-text-field type="password" v-model="oldPwd" :errorText="oldPwdError" @change="oldPwdError = ''"/><br/>
      <span class="textLabel">新密码：</span><mu-text-field  type="password" v-model="newPwd" :errorText="newPwdError" @change="newPwdError = ''"/><br/>
      <span class="textLabel">确认新密码：</span><mu-text-field type="password"  v-model="newPwd2"  :errorText="newPwdError2" @change="newPwdError2 = ''"/>

      <mu-flat-button slot="actions" @click="closePwd" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="change" label="确定"/>
    </mu-dialog>

    <mu-dialog :open="refreshDialog" title="加载数据">
      <mu-linear-progress mode="determinate" :value="value"/>
    </mu-dialog>
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
import { mapState,mapMutations } from 'vuex'
import util from '../common/util.js'

export default {
  data() {
    return {
      menuData: null,
      admin:[
        {label:"磅房",icon:"devices",items:[{title:"手动录入过磅单", url:"/purchaseSelf"}]},
        {label:"销售",icon:"local_shipping",items:[{title: "销售", url: "/sale"}]},
        {label:"查询",icon:"search",items:[{title: "采购查询", url: "/purchaseSearch"},{title: "销售查询", url: "/saleSearch"},{title: "结账", url: "/checkout"}]},
        {label:"统计",icon:"equalizer",items:[{title: "统计", url: "/statistics"}]},
        {label:"设置",icon:"monetization_on",items:[{title: "销售设置", url: "/saleSetting"},{title: "采购设置", url: "/PurchaseSetting"}]},
      ],
      cw:[
        {label:"查询",icon:"search",items:[{title: "采购查询", url: "/purchaseSearch"},{title: "销售查询", url: "/saleSearch"},{title: "结账", url: "/checkout"}]},
      ],
      bf:[
        {label:"磅房",icon:"devices",items:[{title:"录入过磅单", url:"/purchase"}]},
      ],
      xs:[
        {label:"销售",icon:"local_shipping",items:[{title: "销售", url: "/sale"}]},
      ],

      changePwdDialog: false,
      oldPwd: "",
      newPwd: "",
      newPwd2: "",
      oldPwdError: null,
      newPwdError: null,
      newPwdError2: null,

      refreshDialog: false,
      value:0,
    }
  },
  methods:{
    openPwd() {
      this.changePwdDialog = true;
    },
    closePwd() {
      this.changePwdDialog = false;
    },
    change() {
      if(!this.oldPwd) {
        this.oldPwdError = "请输入旧密码";
        return;
      } 
      if(!this.newPwd) {
        this.newPwdError = "请输入新密码";
        return;
      }
      if(!this.newPwd2) {
        this.newPwdError2 = "请再次输入新密码";
        return;
      }
      if(this.newPwd != this.newPwd2) {
        this.newPwdError = "两次输入密码不同";
        this.newPwdError2 = "两次输入密码不同";
        return ;
      }

      util.patch("user/"+this.user.id, {oldPwd:this.oldPwd,newPwd: this.newPwd}, data =>{
          util.toast("修改成功");
          this.changePwdDialog = false;
          this.oldPwdError = null;
          this.newPwd = null;
          this.newPwd2 = null;
          this.oldPwd = null;
          this.newPwdError2 = null;
          this.newPwdError = null;
      }, err => {
          util.toast(err.error);
      });

    },
    refresh() {
      this.refreshDialog = true;
      Promise.all([
        util.get("types",data => {this.addAllTypes(data);this.value += 15;}),
        util.get("salePrices",data => {this.addAllSalePrices(data);this.value += 15;}),
        util.get("purchasePrices",data => {this.addAllPurchasePrices(data);this.value += 15;}),
        util.get("getFrequency?name=com",data => {this.addComFrequency(data);this.value += 15;}),
        util.get("getFrequency?name=project",data => {this.addProjectFrequency(data);this.value += 15;}),
        util.get("getFrequency?name=driver",data => {this.addDriverFrequency(data);this.value += 15;}),
        util.get("getFrequency?name=car",data => {this.addCarFrequency(data);this.value += 15;}),
      ]).then(result =>{
        this.refreshDialog = false;
      }).catch(err =>{
        util.toast(err.message);
      });
    },
    ...mapMutations([
        'addAllTypes',
        'addAllSalePrices',
        'addAllPurchasePrices',
        'addComFrequency',
        'addDriverFrequency',
        'addCarFrequency',
        'addProjectFrequency',
    ]),
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  mounted() { 
    console.log(this.user);
    this.menuData = this[this.user.role];
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

.changePwdDialog {
  width:300px;
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