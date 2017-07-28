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
			    	<el-table :data="tabledata" style="width: 100%"  >
					    <el-table-column v-for="item in tablecolumn"
					      :label="item.label"
					      :prop="item.prop">
					    </el-table-column>
					    <el-table-column
					      label="操作"
					      :width="200">
					      <template scope="scope" class="mytablebut">
					      	<!--<el-button
					      	  @click.native.prevent="updataRow(scope.$index, data)"
					      	  size="small">
					      	 	 编辑
					      	</el-button>-->
					        <el-button
					          @click.native.prevent="deleteRow(scope.$index)"
					          size="small">
					         	 删除
					        </el-button>
					      </template>
					    </el-table-column>
					</el-table>
			    	<div class="mytable-page">
						<el-pagination
							:page-size="pagesize"
							@current-change = "currentchange"
							:current-page="currentpage"
						    layout="prev, pager, next"
						    :total="total">
						</el-pagination>
					</div>
			    </el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import MyTable from '../components/mytable.vue';
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/mytableone.vue';
	
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
		},
		{
			"label":"密码",
			"prop":"password"
		},
		{
			"label":"手机号",
			"prop":"phone"
		}
	];
	export default{
        data: function () {
            return {
            	mttabs:"createaccount",
            	form:{
            		"userName":"",
            		"password":"",
            		"phone":"",
            		"photo":"/uploadFiles/hard.png",
            		"realName":"",
            		"qx":""
            	},
				roles:roles,
				role:[],
				tabledataall:[],
				tabledata:[],
				tablecolumn:tablecolumn,
				titlebut:false,
				currentpage:1,
				total:1,
				pagesize:6
			}
        },
        methods: {
        	currentchange:function(currentPage){
        		this.currentpage = currentPage;
				this.tabledata = this.tabledataall.slice((currentPage-1)*this.pagesize,(currentPage-1)*this.pagesize+this.pagesize);
        	},
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
			        		_this.tabledataall = response.body;
			        		_this.tabledata = _this.tabledataall.slice((_this.currentpage-1)*_this.pagesize,(_this.currentpage-1)*_this.pagesize+_this.pagesize); 
			        		_this.total = _this.tabledataall.length;
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
						        _this.$http.post(myurl.userselect,{emulateJSON: true})
						        .then(
						        	function (response){
						        		_this.tabledataall = response.body;
						        		_this.tabledata = _this.tabledataall.slice((_this.currentpage-1)*_this.pagesize,(_this.currentpage-1)*_this.pagesize+_this.pagesize); 
						        		_this.total = _this.tabledataall.length;
						        	},
						        	function (error){
						        		_this.$message({
								          showClose: true,
								          message: '请求失败！',
								          type: 'error'
								        });
						        	});
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
			'my-table':MyTable,
			'my-table-one':MyTableOne
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
		.el-table{
			border: 0px;
			background-color: rgba(0,0,0,0);
		}
		.el-table__expanded-cell{
			box-shadow: 5px 5px 5px #ddd;
		}
		.el-table::after, .el-table::before{
		    background-color: rgba(0,0,0,0);
			z-index: 1;
		}
		.el-table tr{
			background-color: rgba(0,0,0,0);
		}
		.el-table--fit{
			border-radius: 6px;
		}
		.el-pagination{
			text-align: center;
		}
		.el-table td, .el-table th.is-leaf{
			border-bottom: 1px solid red;
		}
		.el-pager li.active{
			border-color: red;
			background-color: red;
		}
		.mytable-page{
				width: 100%;
				height: auto;
			/*分页列表样式*/
			.el-pagination{
				text-align: center;
			}
			.el-pager .active{
				border-color: red;
			}
		}	
	}
</style>