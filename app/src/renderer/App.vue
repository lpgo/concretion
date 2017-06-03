<template>
  <div style="height:100%">
    <router-view></router-view>
    <mu-toast v-if="toast" :message="msg" @close="hideToast"/>
    <mu-dialog :open="loadDialog" title="加载数据" style="width:80px">
      <mu-circular-progress :size="60" :strokeWidth="5"/>
    </mu-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import util from './common/util.js'

export default {
  name: 'app',
  data () {
    return {
      toast: false,
      msg:'',
      loadDialog: false,
    }
  },
  mounted() {
    util.bus.$on('showToast', (msg)=> {
      console.log("app: showToast");
      this.msg = msg;
      this.toast = true;
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
    });

    util.bus.$on("loading", () => {
      this.loadDialog = true;
    });

    util.bus.$on("loaded", () => {
      this.loadDialog = false;
    })
  },
  methods: {
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    }
  },
}
</script>
<style>
body,html{
  margin:0px;
  padding: 0px;
  height:100%;
  font-family: '微软雅黑';
}
body{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
</style>