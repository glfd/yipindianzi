<!--帐号设置-->
<template>
	<div class="accountset">
		<div class="accountset-content">
			<el-form ref="form" :model="form" label-width="100px" label-position="right">
			  <el-form-item label="用户名：">
			  	{{ form.name }}
			  </el-form-item>
			  <el-form-item label="旧密码：">
			    <el-input type="password" v-model="form.oldpasswd"></el-input>
			  </el-form-item>
			  <el-form-item label="新密码：">
			  	<el-input type="password" v-model="form.newpasswd"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：">
			  	<el-input type="password" v-model="form.confirmpasswd"></el-input>
			  </el-form-item>
			  <el-form-item style="text-align: center;">
			  	<el-button @click='commit'>保存</el-button>
			  	<el-button @click="clear">清空</el-button>
			  </el-form-item>
		    </el-form>
		</div>
	</div>
</template>
<script>
	import { cookie } from '../other/cookie.js';
	import myurl from '../json/myurl.json';
	
	export default{
        data: function () {
            return {
            	form:{
            		"id":"",
            		"name":"",
            		"oldpasswd":"",
            		"newpasswd":"",
            		"confirmpasswd":""
            	}
            }
        },
        methods: { //方法
        	commit:function(){
        		var _this = this
        		if(this.form.oldpasswd == null || this.form.oldpasswd == ""){
        			this.$message({
			          showClose: true,
			          message: '旧密码不能为空！',
			          type: 'error'
			        });
        			return;
        		}
        		if(this.form.newpasswd == null || this.form.newpasswd == ""){
        			this.$message({
			          showClose: true,
			          message: '新密码不能为空！',
			          type: 'error'
			        });
        			return;
        		}
        		if(this.form.newpasswd == this.form.oldpasswd){
        			this.$message({
			          showClose: true,
			          message: '旧密码与新密码一致！',
			          type: 'error'
			        });
        			return;
        		}
        		if(this.form.newpasswd != this.form.confirmpasswd){
        			this.$message({
			          showClose: true,
			          message: '两次密码不一致！',
			          type: 'error'
			        });
        			return;
        		}
        		this.$http.post(myurl.updatepassword,{userID:this.form.id,password:this.form.newpasswd,oldPasswd:this.form.oldpasswd},{emulateJSON: true})
		        .then(
		        	function (response){
		        		if(response.body.id == 1){
		        			this.$message({
					          showClose: true,
					          message: response.body.msg,
					          type: 'success'
					        });
		        		}else if(response.body.id == 0){
		        			this.$message({
					          showClose: true,
					          message: response.body.msg,
					          type: 'error'
					        });
		        		}else{
		        			this.$message({
					          showClose: true,
					          message: response.body.msg,
					        });
		        		}
		        	},
		        	function (error){
		        		_this.$message({
				          showClose: true,
				          message: '请求失败！',
				          type: 'error'
				        });
		        	});
        	},
        	clear:function(){
        		this.form.oldpasswd = "";
        		this.form.newpasswd = "";
        		this.form.confirmpasswd = "";
        	}
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	var user = JSON.parse(unescape(cookie.getcookie('user')));
        	this.form.name = user.realName;
        	this.form.id = user.userId;
        }
    }
</script>

<style lang="less">
	.accountset{
		width: 100%;
		height: 100%;
		padding-top: 80px;
		padding-left: 100px;
		display: flex;
		justify-content:center;
		.accountset-content{
			width: 600px;
			height: 350px;
			background-color: #fff;
			padding: 40px;
			margin-left: -150px;
			box-shadow:0px 0px 5px #999 inset;
			.el-button{
				padding: 6px 40px;
				background-color: red;
				margin-right: 30px;
				color: #fff;
				&:hover{
					color: #fff;
					border: 1px solid red;
				}
			}
		}
		
	}
</style>