<template>
	<div class="login">
		<mu-paper class="paper" :zDepth="4" >
			<h2 class="center">系统登录</h2>
			<mu-text-field label="用户名" hintText="请输入用户名" type="text" labelFloat fullWidth icon="account_box" v-model="name"/>
			<mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat fullWidth style="margin-bottom:30px" icon="vpn_key" v-model="pwd" :errorText="msg"/>
			<mu-raised-button label="登录" v-on:click="login" class="loginBtn" labelClass="loginText" primary />
		</mu-paper>
 
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			name:'',
			pwd: '',
			msg: null,
		};
	},
	methods: {
		login() {
			const form = new FormData();
			form.append("name",this.name);
			form.append("pwd", this.pwd);
			fetch("http://182.61.33.210/login",
	          	{
		            credentials:"include",
		            method: "POST",
		            body:form,
	          	}
	        ).catch(err => console.log(err))
	        .then(resp => resp.json())
	        .then(result => {
	        	if(result.ok) {
	        		this.$router.push("/purchase");
	        		console.log(result.data);
	        	} else {
	        		this.msg = "用户名或密码错误";
	        	}
			});
		}
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