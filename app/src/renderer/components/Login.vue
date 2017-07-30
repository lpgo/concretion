<template>
	<div class="login">
		<mu-paper class="paper" :zDepth="4" >
			<h2 class="center">系统登录</h2>
	
			<mu-select-field v-model="name" :labelFocusClass="['label-foucs']" :errorText="nameMsg" @change="nameMsg=null;pwdMsg=null" icon="account_box" hintText="用户名" fullWidth>
					<mu-menu-item v-for="item in users" :title="item" :value="item"/>
			</mu-select-field>

			<mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat fullWidth style="margin-bottom:30px" icon="vpn_key" v-model="pwd" :errorText="pwdMsg" @change="nameMsg=null;pwdMsg=null" @keyup.enter="login"/>
			<mu-raised-button label="登录" v-on:click="login" class="loginBtn" labelClass="loginText" primary />
		</mu-paper>
		<span style="position:fixed;bottom:20px;right:10px;color:white;font-size:20px">府谷县极客科技有限公司</span>
	</div>
</template>
 
<script>
import conf from '../common/conf.js'
import util from '../common/util.js'
import { mapMutations } from 'vuex'

export default {
	name: "login",
	data() {
		return {
			name:'',
			pwd: '',
			nameMsg: null,
			pwdMsg: null,
			toast: false,
			users:[
				"磅房",
				"结算",
				"调度",
				"实验室",
				"管理员",
			],
		};
	},
	methods: {
		login() {
			if(!this.name) {
				this.nameMsg = "请输入用户名";
				return;
			}
			if(!this.pwd) {
				this.pwdMsg = "请输入密码";
				return;
			}

			const form = new FormData();
			form.append("name",this.name);
			form.append("pwd", this.pwd);
			fetch(conf.server+"/login",
	          	{
		            credentials:"include",
		            method: "POST",
		            body:form,
	          	}
	        ).then(res => {
	        	if(res.ok) {
	        		res.json().then(result => {
	        			this.addUser(result);
	        			this.$router.push("/main");
	        		});
	        	} else {
	        		res.json().then(result =>{
	        			this.nameMsg = result.error;
	        			this.pwdMsg = result.error;
	        		});
	        	}
			}).catch(err => {
				console.log("catch: ",err);
				util.toast("网络错误");
			});
		},
		...mapMutations([
	        'addUser',
	    ]),
	}
}
</script>

<style>
.login {
	height:100%;
	width: 100%;
	background:#009688;
	background-image: url('../assets/bg.jpg');
	background-size:cover;
	display: flex;
	justify-content: center;
	align-items: center;
}
.paper {
	height: 400px;
	width: 400px;
	padding: 30px;
	background-color: #ffffff;
	opacity:0.85;
	border-radius: 15px;
}

.loginBtn {
	width: 100%;
}

.loginText {
	font-size: 20px;
	letter-spacing: 50px;
	margin-left: 50px;
}
.center {
	text-align: center;
}
</style>