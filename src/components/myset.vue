<!--个人设置-->
<template>
	<div class="myset">
		<div class="myset-content">
			<div class="myset-left">
				<el-form ref="form" v-model="form" label-width="100px" label-position="right">
				  <el-form-item label="姓名：">
				    <el-input v-model="form.realName"></el-input>
				  </el-form-item>
				  <el-form-item label="性别：">
					    <el-radio v-model="form.sex" label="1">男</el-radio>
					    <el-radio v-model="form.sex" label="2">女</el-radio>
				  </el-form-item>
				  <el-form-item label="出生年月：">
					<el-date-picker
					    v-model="birthday"
					    type="date"
					    placeholder="选择日期">
					</el-date-picker>
				  </el-form-item>
				  <el-form-item label="联系电话：">
				    <el-input v-model="form.phone"></el-input>
				  </el-form-item>
				  <el-form-item label="居住地址：">
				    <el-input v-model="form.addr"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="update">修改</el-button>
				  </el-form-item>
				</el-form>
			</div>
			<div class="myset-right">
				<img :src="photosrc" alt="头像" width="150px" height="160px"/>
				<el-upload
				  class="upload-demo"
				  :show-file-list="false"
				  :on-success="uploadsuccess"
				  :on-progress="onloadprogress"
				  :up-error="uploaderror"
				  :action="action"
				  :file-list="fileList">
				  <el-button type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
				</el-upload>
				<div class="text">
					选择本地照片，上传编辑自己的头像，文件支持jpg、jpeg、gif、png、bmp格式的图片
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { cookie } from '../other/cookie.js';
	import myurl from '../json/myurl.json';
	
	export default{
        data: function () {
            return {
            	user:{},
            	form:{
            		"userID":"",
            		"realName":"",
            		"sex":"1",
            		"birthday":"",
            		"phone":"",
            		"addr":""
            	},
            	birthday:"",
            	fileList:[],
            	photosrc:myurl.photo+JSON.parse(unescape(cookie.getcookie('user'))).photo,
            	action:myurl.userupdatePhoto+"?id="+JSON.parse(unescape(cookie.getcookie('user'))).userId,
            	imgloadtext:"点击上传"
            }
        },
        methods: { //方法
        	uploadsuccess:function(response,file,fileList){
        		console.log(response);
        		this.photosrc = myurl.photo+response.photo;
        		var user = JSON.parse(unescape(cookie.getcookie('user')));
        		user.photo = response.photo;
        		document.cookie="user="+escape(JSON.stringify(user));
        		console.log(this.photosrc);
        		this.imgloadtext="点击上传";
        	},
        	onloadprogress:function(event, file, fileList){
        		console.log(event);
        		this.imgloadtext="已加载"+event.percent+"%";
        	},
        	uploaderror:function(err,file,fileList){
        		console.log(response);
        		this.imgloadtext="点击上传";
        	},
        	update:function(){
        		var _this = this;
        		console.log(new Date(this.birthday).getTime().toString());
        		this.form.birthday = new Date(this.birthday).getTime().toString();
        		this.$http.post(myurl.messageupdate,this.form,{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response.body);
		        		if(response.body.id == 1){
				        	localStorage.setItem('realName', this.form.realName);
				        	localStorage.setItem('sex', this.form.sex);
				        	localStorage.setItem('birthday', this.birthday);
				        	localStorage.setItem('phone', this.form.phone);
				        	localStorage.setItem('addr', this.form.addr);
				        	_this.$message({
					          showClose: true,
					          message: '修改成功！',
					          type: 'success'
					        });
					        _this.user.realName = _this.form.realName;
					        _this.user.sex = _this.form.sex;
					        _this.user.birthday = _this.birthday;
					        _this.user.phone = _this.form.phone;
					        _this.user.addr = _this.form.addr;
					        document.cookie="user="+escape(JSON.stringify(_this.user));
					        _this.init(_this)
		        		}
		        		if(response.body.id == -1){
		        			_this.$message({
					          showClose: true,
					          message: '修改失败！',
					          type: 'error'
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
        	init:function(_this){
        		_this.user = JSON.parse(unescape(cookie.getcookie('user')));
        		_this.form.userID = _this.user.userId;
	        	_this.form.realName = _this.user.realName;
	        	_this.form.sex = _this.user.sex+"";
	        	_this.birthday = _this.user.birthday;
	        	_this.form.phone = _this.user.phone;
	        	_this.form.addr = _this.user.addr;
        	}
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	this.init(this)	
        }
    }
</script>

<style lang="less">
	.myset{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		justify-content:center;
		.myset-content{
			width: auto;
			display: flex;
			margin-top: 80px;
			margin-left:-80px;
			.myset-left{
				padding: 30px;
				width: 500px;
				text-align: left;
			}
			.myset-right{
				width: 200px;
				padding: 20px;
				text-align: center;
				.el-button{
					margin-top: 20px;
					margin-bottom: 20px;
					
				}
			}
		}		
	}
</style>
