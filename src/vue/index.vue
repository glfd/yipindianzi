<!--入口页 vue-->
<template>
    <div class="index" v-loading="loginloding" element-loading-text="登陆中...">
    	<h1 class="title">杭州壹品电子有限公司</h1>
        <div class="login">
        	<div class="logo">
        		<img src="../img/logo.png" alt="壹品电子" />
        	</div>
        	<div class="login-form">
        		<div class="form-item">
        			<label for="username">用户名：</label>
        			<input type="text" v-model="form.username" @keyup="enter($event)"/>
        		</div>
        		<div class="form-item">
        			<label for="passwd">密&nbsp;&nbsp;&nbsp;码：</label>
        			<input type="password" v-model="form.passwd" />
        		</div>
        		<div class="form-item" style="margin-top: -10px;margin-bottom: 10px;">
        			<el-checkbox label="记住密码" v-model="form.remember" style="margin-left: 90px;"></el-checkbox>
					<a href="javascript:void(0)">忘记密码</a>
        		</div>
    			<button class="confirm" @click="login">登&nbsp;&nbsp;&nbsp;录</button>
        	</div>
        </div>
    </div>
</template>
<script>
	import myurl from '../json/myurl.json';
	
    export default{
        data: function () {
            return {
               	form:{
               		username:"",
               		passwd:"",
					remember:true
               	},
               	loginloding:false
            }
        },
        methods: { //方法
        	enter:function(et){
        		if(et.keyCode == 13){  
                }  
        	},
			login:function(){
				var _this = this;
				_this.loginloding = true;
				this.$http.post(myurl.login,{userName:this.form.username,password:this.form.passwd},
					{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response.body);
		        		if(response.body.userId == 0){
		        			_this.$message({
					          showClose: true,
					          message: '密码错误！',
					          type: 'error'
					        });
			            }else if(response.body.userId == -1){
			            	_this.$message({
					          showClose: true,
					          message: '用户名不存在！',
					          type: 'error'
					        });
			            }else{
			            	document.cookie="user="+escape(JSON.stringify(response.body));
			            	/*document.cookie="userId="+escape(response.body.userId);
			            	document.cookie="realName="+escape(response.body.realName);*/
			            	localStorage.setItem('addr', response.body.addr);//地址
			            	localStorage.setItem('belong', response.body.belong);//1是本公司，2是客户
							if(response.body.birthday == null){
								localStorage.setItem('birthday', "");	
							}else{
								localStorage.setItem('birthday', response.body.birthday);//生日
							}
			            	localStorage.setItem('phone', response.body.phone);
			            	localStorage.setItem('photo', response.body.photo);//头像
			            	localStorage.setItem('realName', response.body.realName);//名称
			            	localStorage.setItem('sex', response.body.sex);//性别
			            	_this.loginloding = false;
			            	window.self.location = "homepage.html";
			            }
			            _this.loginloding = false;
		        	},
		        	function (error){
		        		_this.$message({
				          showClose: true,
				          message: '请求失败！',
				          type: 'error'
				        });
				        _this.loginloding = false;
		        	});
		        	/*window.location.href = "homepage.html";*/
			}
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        }
    }
</script>
<style lang="less">
	.index{
		width: 100%;
		height: 100%;
		text-align: center;
		display: flex;
		justify-content:center;
		flex-direction:column;
		background-color: #EFF2F7;
		.login{
			width: 750px;
			height: 480px;
			background-image: url('../img/圆角矩形 1.png');
			margin:0 auto;
			padding: 50px;
			display: flex;
			flex-direction:row;
			align-items:center;
			.logo{
				width: 90px;
				height: 180px;
				margin-left: 40px;
			}
			.login-form{
				flex-grow: 1;
				padding: 5px 30px;
				margin-left: 30px;
				.form-item{
					width: 100%;
					height: 35px;
					margin-bottom: 20px;
					padding-right: 20px;
					display:flex;
					justify-content:space-between;
					.el-checkbox__input.is-checked .el-checkbox__inner{
						background-color: red;
					}
					.el-checkbox__inner{
						border-color:red;
					}
					label{
						width: 100px;
						font-size: 18px;
						line-height: 35px;
						font-weight: 600;
					}
					input{
						flex-grow: 1;
						font-size: 16px;
						line-height: 35px;
						border: 2px solid #EC3A00;
						padding: 0 10px;
						border-radius: 5px;
						background-color: rgba(0,0,0,0);
					}
					a{
						font-size: 14px;
						line-height: 35px;
						font-weight: 600;
						margin-right: 10px;
						&:hover{
							color: blue;
						}
					}
				}
				.confirm{
					width: 140px;
					height: 40px;
					background-color: #EC3A00;
					color: #fff;
					border: 0px;
					border-radius: 6px;
					font-weight: 600;
					font-size:18px; 
					margin-left:100px; 
					&:hover{
						cursor: pointer;
					}
				}
			}
		}
	}
</style>