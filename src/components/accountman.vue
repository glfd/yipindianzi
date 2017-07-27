<!--帐号管理-->
<template>
	<div class="accountman">
		<div class="accountman-content">
			<el-tabs v-model="mttabs" type="card" @tab-click="seleteaccountc">
			    <el-tab-pane label="新建帐号" name="createaccount">
			    	<el-form class="createform" :model="form" label-width="100px">
					  <el-form-item label="姓名：">
					    <el-input v-model="form.realName"></el-input>
					  </el-form-item>
					  <el-form-item label="所属：">
					    <el-radio  v-model="form.belong" label="1">本公司</el-radio>
				    	<el-radio  v-model="form.belong" label="2">客户</el-radio>
					  </el-form-item>
					  <el-form-item label="联系电话：">
					    <el-input v-model="form.phone"></el-input>
					  </el-form-item>
					  <el-form-item label="帐号：">
					    <el-input v-model="form.userName"></el-input>
					  </el-form-item>
					  <el-form-item label="初始密码：">
					    <el-input v-model="form.password"></el-input>
					  </el-form-item>
					  <el-form-item label="权限分配：">
					    <el-checkbox-group 
						    v-model="role">
						    <el-checkbox v-for="item in roles" :label="item.value">{{ item.label }}</el-checkbox>
						</el-checkbox-group>
					  </el-form-item>
					  <el-form-item style="text-align: center;">
					    <el-button @click='usercreate'>创建</el-button>
					  </el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="查询帐号" name="seleteaccount">
			    	'<div>
			    		<my-table  :data="tabledata" mytableadd="查询帐号" :tablecolumn = "tablecolumn" 
			    			@deleteRow="deleteRow" @updataRow="updataRow" :mytitlebut="titlebut"
			    			@upup="change">
			    			<template scope="props">
							   <el-form label-position="left" inline class="demo-table-expand">
						        	<el-row :gutter="20">
									  <el-col :span="8">
									  	  <el-form-item label="密码">
								            <span>{{ props.text.password }}</span>
								          </el-form-item>
									  </el-col>
									  <el-col :span="8">
									  	  <el-form-item label="地址">
								            <span>{{ props.text.addr }}</span>
								          </el-form-item>
									  </el-col>
									  <el-col :span="8">
									  	  <el-form-item label="生日">
								            <span>{{ props.text.birthday }}</span>
								          </el-form-item>
									  </el-col>
									  <el-col :span="8">
									  	  <el-form-item label="手机号">
								            <span>{{ props.text.phone }}</span>
								          </el-form-item>
									  </el-col>
									</el-row>
						        </el-form>
							</template>
			    		</my-table>
			    	</div>
			    </el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import MyTable from '../components/mytable.vue';
	import myurl from '../json/myurl.json';
	
	var roles = [
		{
			label:"物料管理",
			value:"r1"
		},
		{
			label:"客户信息",
			value:"r2"
		},
		{
			label:"订单录入",
			value:"r3"
		},
		{
			label:"产品",
			value:"r4"
		},
		{
			label:"工单",
			value:"r5"
		},
		{
			label:"品质管理",
			value:"r6"
		},
		{
			label:"仓管",
			value:"r7"
		},
		{
			label:"帐号管理",
			value:"r100"
		}
	];
	var tablecolumn = [
		{
			"label":"ID",
			"prop":"userId"
		},
		{
			"label":"姓名",
			"prop":"realName"
		},
		{
			"label":"用户名",
			"prop":"userName"
		}
	];
	export default{
        data: function () {
            return {
            	mttabs:"createaccount",
            	form:{
            		"userName":"",
            		"belong":"1",
            		"password":"",
            		"phone":"",
            		"realName":"",
            		"qx":""
            	},
				roles:roles,
				role:[],
				tabledata:[],
				tablecolumn:tablecolumn,
				titlebut:false
			}
        },
        methods: {
        	clearl:function(){
        		this.form.userName = "";
        		this.form.password = "";
        		this.form.phone = "";
        		this.form.realName = "";
        		this.form.qx = "";
        		this.role=[];
        	},
        	seleteaccountc:function(obj){
        		var _this = this;
        		if(obj.name == "seleteaccount"){
		        	this.$http.post(myurl.userselect,{emulateJSON: true})
			        .then(
			        	function (response){
			        		console.log(response);
			        		this.tabledata = response.body;
			        	},
			        	function (error){
			        		_this.$message({
					          showClose: true,
					          message: '请求失败！',
					          type: 'error'
					        });
			        	});
        		}
        	},
        	deleteRow:function(data){
        		var _this = this;
        		this.$alert('确认删除？', '删除账号', {
		          confirmButtonText: '确定',
		          callback: function(action) {
		            if(action == 'cancel'){
		          		_this.$message({
				          showClose: true,
				          message: '取消删除！',
				          type: 'success'
				        });
				        return;
		          	}
		            _this.$http.post(myurl.userdelete,{'userId':_this.tabledata[data].userId},{emulateJSON: true})
			        .then(
			        	function (response){
			        		console.log(response);
			        		if(response.body.id = 1){
			        			_this.$message({
						          showClose: true,
						          message: '删除成功！',
						          type: 'success'
						        });
						        this.tabledata.splice(data,1);
			        		}else{
			        			_this.$message({
						          showClose: true,
						          message: '删除失败！',
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
		          }
		        });
        		
    			
    		},
    		updataRow:function(){
    			console.log("编辑");
    		},
        	change:function(){
        		
        	},
        	usercreate:function(){
        		var _this = this;
        		this.form.qx = JSON.stringify(this.role);
        		if(_this.form.userName == ""){
        			_this.$message({
			          showClose: true,
			          message: '帐号不能为空！',
			          type: 'error'
			        });
			        return;
        		}
        		if(_this.form.belong == ""){
        			_this.$message({
			          showClose: true,
			          message: '至少有一个所属！',
			          type: 'error'
			        });
			        return;
        		}
        		if(_this.form.password == ""){
        			_this.$message({
			          showClose: true,
			          message: '密码不能为空！',
			          type: 'error'
			        });
			        return;
        		}
        		if(_this.form.realName == ""){
        			_this.$message({
			          showClose: true,
			          message: '姓名不能为空！',
			          type: 'error'
			        });
			        return;
        		}
        		this.$http.post(myurl.usercreate,this.form,{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response.body);
		        		if(response.body.id == 1){
				        	_this.$message({
					          showClose: true,
					          message: '添加成功！',
					          type: 'success'
					        });
					        this.clearl();
		        		}else if(response.body.id == 0){
		        			_this.$message({
					          showClose: true,
					          message: '用户已存在！',
					          type: 'error'
					        });
		        		}else{
		        			_this.$message({
					          showClose: true,
					          message: '添加失败！',
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
        	}
        },
        components: { //组件放这里
			'my-table':MyTable
        },
        mounted: function () {        	 //DOM加载完成事件
        	
        }
    }
</script>

<style lang="less">
	.accountman{
		width: 100%;
		height: 100%;
		padding: 40px;
		.accountman-content{
			width: 100%;
			height: 100%;
			.createform{
				width: 500px;
				height: auto;
			}
		}
		.el-tabs__header{
			/*border-bottom: 1px solid #333;*/
			border-bottom: 1px solid red;
		}
		.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
			/*border: 1px solid #333;*/
			border: 1px solid red;
			border-bottom-color: #EFF2F7;
		}
	}
</style>