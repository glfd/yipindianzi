<!--客户信息录入-->
<template>
	<div class="customer">
		<el-dialog title="客户信息" :visible.sync="dialogFormVisible">
		    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
			    <el-form-item label="客户编号"  prop="cNub">
				  <el-input v-model="form.cNub"></el-input>
				</el-form-item>
			  <el-form-item label="客户名称">
			    <el-input v-model="form.cName"></el-input>
			  </el-form-item>
			  <el-form-item label="注册地址">
			    <el-input v-model="form.reg_addr"></el-input>
			  </el-form-item>
			  <el-form-item label="联系人">
			    <el-input v-model="form.linkman"></el-input>
			  </el-form-item>
			  <el-form-item label="联系电话">
			    <el-input v-model="form.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="传真">
			    <el-input v-model="form.fax"></el-input>
			  </el-form-item>
			  <el-form-item label="发货地址">
			    <el-input v-model="form.ship_addr"></el-input>
			  </el-form-item>
			  <el-form-item label="证书上传">
			  <el-upload
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
			</el-form-item>
			</el-form>
			
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addcustomer('form')">确 定</el-button>
		  </div>
		</el-dialog>
		
		<div class="menu">
			<my-menu message="kh"></my-menu>
		</div>
		<div class="content" v-loading="tablelogin"  element-loading-text="拼命加载中">
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="{'edit':false,'remove':true}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column
			      label="联系人"
			      width="100">
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
			          <p>电话: {{ scope.row.phone }}</p>
			          <p>传真: {{ scope.row.fax }}</p>
			          <div slot="reference" class="name-wrapper">
			            <el-tag>{{ scope.row.linkman }}</el-tag>
			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
			    <el-table-column 
			    	property="credentials"
      				label="有效证书">
			    </el-table-column>
			</my-table-one>
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';

	var tablecolumn = [
		{
			"label":"客户编号",
			"property":"cNub"
		},
		{
			"label":"客户名称",
			"property":"cName"
		},
		{
			"label":"注册地址",
			"property":"reg_addr"
		},
		{
			"label":"发货地址",
			"property":"ship_addr"
		}
	];
	var selectdata = [
    	{
    		"label":"客户编号",
    		"value":"cNub"
    	},
    	{
    		"label":"客户名称",
    		"value":"cName"
    	}
    	
    ];
    export default{
        data: function () {
            return {
 				msg:"customer",
            	tabledata:[],
            	tabledataurl:myurl.customergetall,
            	tablecolumn:tablecolumn,
            	dialogFormVisible:false,         	
            	form:{
            		"cNub":"",
            		"cName":"",
            		"reg_addr":"",
            		"ship_addr":"",
            		"linkman":"",
            		"phone":"",
            		"fax":"",
            		"credentials":"",
            		
            		
            	},
            	rules:{
            		cNub:[
            			{ required: true, message: '请输入活动名称', trigger: 'blur' },
            			{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            		]
            	},
            	fileList: [],
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	selectdata:selectdata
            }
        },
        methods:{ //方法
        	change:function(msg) {
		        this.dialogFormVisible=true;
		    },
        	seleteother:function(val){
        		console.log(val);
        	},
        	
		    handleRemove:function(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview:function(file) {
		        console.log(file);
		    },
	        clearl:function(){
	        	this.form.cNub = "";
        		this.form.cName = "";
        		this.form.reg_addr = "";
        		this.form.ship_addr = "";
        		this.form.linkman = "";
        		this.form.phone = "";
        		this.form.fax = "";
        		this.form.credentials = "";
        		this.dialogFormVisible = false;
        	},
        	selected:function(val){
		    	this.selectedval = val;
		    },
	        add:function(tablethis){
		    	this.dialogFormVisible=true;
		    	this.tablethis = tablethis;
		    },
		    edit:function(tablethis){
		    	
		    },
		    remove:function(tablethis){
		    	this.tablethis = tablethis;
		    	var _this = this;
		    	this.$alert('确认删除？', '客户信息删除', {
		          confirmButtonText: '确定',
		          callback: function(action){
		          	console.log(action);
		          	if(action == 'cancel'){
		          		_this.$message({
				          showClose: true,
				          message: '取消删除！',
				          type: 'success'
				        });
				        return;
		          	}
		          	console.log()
		          	_this.$http.post(myurl.customerdelete,{"cid":_this.selectedval.cid},{emulateJSON: true})
			        .then(
			        	function (response){
			        		console.log(response);
			        		if(response.body.id == 1){
			        			_this.$message({
						          showClose: true,
						          message: '删除成功！',
						          type: 'success'
						        });
						        _this.tablethis.gettabledata(_this.tablethis);
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
		    addcustomer:function(formName){
		    	var formv = true;
		    	this.$refs[formName].validate(function(valid) {
		          if (valid) {
		          	formv = true;
		          } else {
		            formv = false;
		            return false;
		          }
		        });
		        if(!formv){
		        	return;
		        }
		    	var _this = this;
	      		this.$http.post(myurl.customercreate,this.form,{emulateJSON: true})
		        .then(
		        	function (response){
		        		if(response.body.id == 1){
		        			_this.$message({
					          showClose: true,
					          message: '添加成功！',
					          type: 'success'
					        });
					        _this.clearl();//添加成功就清空数据并关闭dialog
				        	_this.tablethis.gettabledata(_this.tablethis);
		        		}else if(response.body.id == 0){
		        			_this.$message({
					          showClose: true,
					          message: '客户编号重复！',
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
			'my-menu':MyMenu,
			'my-table-one':MyTableOne
        },
        mounted: function () {        	 //DOM加载完成事件
        	
        }
    }
</script>

<style lang="less">
	.customer{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		background-color: #F0F3F7;
		
		.menu{
			width: 200px;
			height: 100%;
			min-width: 200px;
		}
		.content{
			flex-grow: 1;
			.mytable{
				width: 90%;
				margin-left: 5%;
			}
			.el-input__inner {
			    height: 30px;
			    width: 110px;
			}
		
		}
	}
	
</style>