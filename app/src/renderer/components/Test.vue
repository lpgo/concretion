<template>
  <div >
  <input type=button value=" 打 印 " onclick=javascript:window.print() class="noprint">
   <TABLE border="0" style="font-size:9pt;" width="300px" align="center">
    <THEAD style="display:table-header-group;font-weight:bold">
      <TR><TD colspan="2" align="center" style="font-weight:bold;border:3px double red">每页都有的表头</TD></TR>
    </THEAD>
    <TBODY style="text-align:center">
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR style="page-break-before:always;"><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
   
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
   
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
 
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
   
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
   
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
   
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
    <TR style="page-break-before:always;"><TD>表格内容</TD><TD>表格内容</TD></TR>
    </TBODY>
    <TFOOT style="display:table-footer-group;font-weight:bold">
      <TR>
        <TD colspan="2" align="center" style="font-weight:bold;border:3px double blue">每页都有的表尾</TD>
      </TR>
    </TFOOT>
    </TABLE>
    
  </div>
</template>

<script>
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/delay'

//import SerialPort from 'serialport'

import os from 'os'

export default {
  name: 'rx-watch',
  data() {
    return {
      num: 1,
      platform: os.platform(),
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
  }
}
</script>