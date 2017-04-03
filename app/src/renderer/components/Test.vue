<template>
  <div>
    <h4>Watch</h4>
    <div>
      <mu-icon value="face" color="blue" :size="48"/>
      <button v-on:click="num++">add</button>
      source: {{num}}  -> result: {{num$}}
    </div>
    <button v-on:click="test()">{{platform}}</button>{{portName}}
    <button v-on:click="test()">test1</button>
  </div>
</template>

<script>
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/delay'

import SerialPort from 'serialport'

import os from 'os'

export default {
  name: 'rx-watch',
  data() {
    return {
      num: 1,
      platform: os.platform(),
      portName:''
    }
  },
  subscriptions() {
    return {
      num$: this.$watchAsObservable('num')
        .pluck('newValue')
        .startWith(this.num)
        .map(a => a + 1)
        .delay(3000)
    }
  },
  methods: {
    test: function() {
      console.log('button test');
      const {ipcRenderer} = this.$electron;
      ipcRenderer.send('getPorts',null);
      ipcRenderer.on('getPorts', (event, arg) =>{
        this.portName = arg[0].comName;
        console.log(arg);
      });
    },
    test1: function() {
      SerialPort.list(function (err, ports) {
        console.log(err);
        ports.forEach(function(port) {
          console.log(port.comName);
          console.log(port.pnpId);
          console.log(port.manufacturer);
        });
      });
    }
  }
}
</script>